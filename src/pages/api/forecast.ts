import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const {
      business_name,
      contact_name,
      email,
      phone,
      monthly_volume,
      capacity,
      current_contracts,
      monthly_leads,
      monthly_conversations,
      growth_target,
      projected_month12_volume,
      projected_12month_revenue,
      projected_new_accounts,
    } = body;

    if (!business_name || !email || !contact_name) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const notes = [
      `Forecast Tool Submission`,
      `Monthly Volume: ${monthly_volume} lbs`,
      `Capacity: ${capacity} lbs`,
      `Current Contracts: ${current_contracts}`,
      `Monthly Leads: ${monthly_leads}`,
      `Sales Conversations: ${monthly_conversations}`,
      `Growth Target: ${growth_target}`,
      `---`,
      `Projected Month-12 Volume: ${projected_month12_volume} lbs`,
      `Projected 12-Month Revenue: $${projected_12month_revenue}`,
      `Projected New Accounts: +${projected_new_accounts}`,
    ].join('\n');

    // 1. Save lead to Airtable
    const airtableToken = import.meta.env.AIRTABLE_TOKEN;
    const airtableRes = await fetch(
      `https://api.airtable.com/v0/app0cpbQjtdZh1sHT/Leads`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${airtableToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                Name: contact_name,
                Company: business_name,
                Email: email,
                Phone: phone || '',
                Notes: notes,
                Source: 'Forecast Tool',
                Status: 'New',
              },
            },
          ],
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
      `<h2>New Forecast Lead — ${business_name}</h2>`,
      `<p><strong>Name:</strong> ${contact_name}</p>`,
      `<p><strong>Email:</strong> ${email}</p>`,
      `<p><strong>Phone:</strong> ${phone || 'Not provided'}</p>`,
      `<hr/>`,
      `<p><strong>Current Volume:</strong> ${monthly_volume} lbs/mo</p>`,
      `<p><strong>Capacity:</strong> ${capacity} lbs/mo</p>`,
      `<p><strong>Current Contracts:</strong> ${current_contracts}</p>`,
      `<p><strong>Monthly Leads:</strong> ${monthly_leads}</p>`,
      `<p><strong>Sales Conversations:</strong> ${monthly_conversations}</p>`,
      `<p><strong>Growth Target:</strong> ${growth_target}</p>`,
      `<hr/>`,
      `<p><strong>Projected Month-12 Volume:</strong> ${projected_month12_volume} lbs</p>`,
      `<p><strong>Projected 12-Month Revenue:</strong> $${projected_12month_revenue}</p>`,
      `<p><strong>Projected New Accounts:</strong> +${projected_new_accounts}</p>`,
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
        subject: `Forecast Lead — ${business_name} (${projected_12month_revenue ? '$' + Number(projected_12month_revenue).toLocaleString() : 'N/A'} projected)`,
        html: emailHtml,
      }),
    });

    if (!resendRes.ok) {
      const err = await resendRes.text();
      console.error('Resend error:', err);
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('Forecast API error:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
};
