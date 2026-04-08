import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { roastery, name, email, phone, markets, volume, message } = body;

    // Validate required fields
    if (!roastery || !name || !email || !markets || !volume) {
      return new Response(JSON.stringify({ success: false, error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Build notes string
    const notesParts = [
      `Primary Markets: ${markets}`,
      `Monthly Roasting Volume: ${volume}`,
    ];
    if (message) {
      notesParts.push(`Message: ${message}`);
    }
    const notes = notesParts.join('\n');

    // 1. POST to Airtable
    const airtableToken = import.meta.env.AIRTABLE_TOKEN || import.meta.env.AIRTABLE_API_KEY;
    const airtableBaseId = 'app0cpbQjtdZh1sHT';
    const airtableTable = 'Leads';

    const airtableRes = await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/${encodeURIComponent(airtableTable)}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${airtableToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            Name: name,
            Company: roastery,
            Email: email,
            Phone: phone || '',
            Notes: notes,
            Source: 'In The Black Website',
            Status: 'New',
          },
        }),
      }
    );

    if (!airtableRes.ok) {
      const err = await airtableRes.text();
      console.error('Airtable error:', err);
    }

    // 2. Send notification email via Resend
    const resendApiKey = import.meta.env.RESEND_API_KEY;

    const emailHtml = [
      `<h2>New inquiry from the In The Black website</h2>`,
      `<p><strong>Roastery:</strong> ${roastery}</p>`,
      `<p><strong>Name:</strong> ${name}</p>`,
      `<p><strong>Email:</strong> ${email}</p>`,
      `<p><strong>Phone:</strong> ${phone || 'Not provided'}</p>`,
      `<p><strong>Primary Markets:</strong> ${markets}</p>`,
      `<p><strong>Monthly Volume:</strong> ${volume}</p>`,
      `<p><strong>Message:</strong> ${message || 'None'}</p>`,
    ].join('\n');

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'In The Black <bill@intheblack.coffee>',
        to: ['bill@intheblack.coffee'],
        subject: `New Inquiry — ${roastery}`,
        html: emailHtml,
      }),
    });

    if (!resendRes.ok) {
      const err = await resendRes.text();
      console.error('Resend error:', err);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
