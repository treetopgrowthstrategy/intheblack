import type { APIRoute } from 'astro';

function buildProspectEmail(data: Record<string, any>): string {
  const {
    business_name,
    contact_name,
    monthly_volume,
    capacity,
    current_contracts,
    monthly_leads,
    projected_month12_volume,
    projected_12month_revenue,
    projected_new_accounts,
    growth_target,
  } = data;

  const capacityUsed = capacity > 0 ? Math.round((monthly_volume / capacity) * 100) : 0;
  const growthLabel = growth_target === 'aggressive' ? 'Aggressive' : growth_target === 'moderate' ? 'Moderate' : 'Steady';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0;padding:0;background-color:#0A0A0A;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0A0A;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding:32px 40px;text-align:center;">
              <div style="width:60px;height:1px;background:linear-gradient(90deg,transparent,#C9A84C,transparent);margin:0 auto 24px;"></div>
              <h1 style="color:#ffffff;font-size:28px;font-weight:300;margin:0 0 4px;letter-spacing:1px;">
                In The <span style="color:#C9A84C;font-weight:600;">Black</span>
              </h1>
              <p style="color:#666;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0;">Coffee Co.</p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:0 40px 32px;">
              <p style="color:#ffffff;font-size:20px;font-weight:300;margin:0 0 12px;">
                ${contact_name}, here's your
              </p>
              <h2 style="color:#C9A84C;font-size:32px;font-weight:600;margin:0 0 16px;line-height:1.1;">
                Wholesale Growth Forecast
              </h2>
              <p style="color:#999;font-size:15px;line-height:1.6;margin:0;">
                Based on what you told us about ${business_name}, here's what 12 months of commissioned wholesale sales could look like.
              </p>
            </td>
          </tr>

          <!-- Current State -->
          <tr>
            <td style="padding:0 40px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#111111;border:1px solid #222222;">
                <tr>
                  <td style="padding:24px 28px 8px;">
                    <p style="color:#666;font-size:10px;letter-spacing:3px;text-transform:uppercase;margin:0;">Where You Are Today</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 28px 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="50%" style="padding:8px 0;">
                          <p style="color:#C9A84C;font-size:28px;font-weight:600;margin:0;">${Number(monthly_volume).toLocaleString()}</p>
                          <p style="color:#666;font-size:11px;margin:4px 0 0;">lbs / month</p>
                        </td>
                        <td width="50%" style="padding:8px 0;">
                          <p style="color:#C9A84C;font-size:28px;font-weight:600;margin:0;">${current_contracts}</p>
                          <p style="color:#666;font-size:11px;margin:4px 0 0;">wholesale accounts</p>
                        </td>
                      </tr>
                      <tr>
                        <td width="50%" style="padding:8px 0;">
                          <p style="color:#C9A84C;font-size:28px;font-weight:600;margin:0;">${monthly_leads}</p>
                          <p style="color:#666;font-size:11px;margin:4px 0 0;">leads / month</p>
                        </td>
                        <td width="50%" style="padding:8px 0;">
                          <p style="color:#C9A84C;font-size:28px;font-weight:600;margin:0;">${capacityUsed}%</p>
                          <p style="color:#666;font-size:11px;margin:4px 0 0;">capacity used</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Projected Results -->
          <tr>
            <td style="padding:0 40px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#111111;border:1px solid #222222;">
                <tr>
                  <td style="padding:24px 28px 8px;">
                    <p style="color:#666;font-size:10px;letter-spacing:3px;text-transform:uppercase;margin:0;">Your 12-Month Projection · ${growthLabel} Growth</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 28px 28px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:12px 0;border-bottom:1px solid #222;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="color:#999;font-size:13px;">Month-12 Volume</td>
                              <td align="right" style="color:#C9A84C;font-size:24px;font-weight:600;">${Number(projected_month12_volume).toLocaleString()} lbs</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:12px 0;border-bottom:1px solid #222;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="color:#999;font-size:13px;">12-Month Wholesale Revenue</td>
                              <td align="right" style="color:#C9A84C;font-size:24px;font-weight:600;">$${Number(projected_12month_revenue).toLocaleString()}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:12px 0;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="color:#999;font-size:13px;">New Accounts Added</td>
                              <td align="right" style="color:#C9A84C;font-size:24px;font-weight:600;">+${projected_new_accounts}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- How It Works -->
          <tr>
            <td style="padding:0 40px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#111111;border:1px solid #222222;">
                <tr>
                  <td style="padding:24px 28px 8px;">
                    <p style="color:#666;font-size:10px;letter-spacing:3px;text-transform:uppercase;margin:0;">How We Make This Happen</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 28px 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:8px 0;color:#999;font-size:14px;line-height:1.6;">
                          <span style="color:#C9A84C;font-weight:600;">01</span>&nbsp;&nbsp;We research and prospect wholesale accounts in your target markets.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;color:#999;font-size:14px;line-height:1.6;">
                          <span style="color:#C9A84C;font-weight:600;">02</span>&nbsp;&nbsp;You cover samples. We handle outreach, follow-up, and closing.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;color:#999;font-size:14px;line-height:1.6;">
                          <span style="color:#C9A84C;font-weight:600;">03</span>&nbsp;&nbsp;You only pay commission when we close a deal. Zero risk.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:0 40px 40px;text-align:center;">
              <p style="color:#ffffff;font-size:18px;font-weight:300;margin:0 0 20px;">
                Ready to make this <span style="color:#C9A84C;font-weight:600;">real?</span>
              </p>
              <a href="https://calendar.app.google/sErhyQBke9cvrtv2A"
                style="display:inline-block;background-color:#C9A84C;color:#0A0A0A;font-size:16px;font-weight:700;text-decoration:none;padding:16px 40px;letter-spacing:0.5px;">
                Book a Strategy Call
              </a>
              <p style="color:#666;font-size:12px;margin:16px 0 0;">20 minutes. No obligation. We'll build a custom plan for ${business_name}.</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #222;text-align:center;">
              <p style="color:#444;font-size:11px;margin:0 0 4px;">In The Black Coffee Co.</p>
              <p style="color:#333;font-size:10px;margin:0;">intheblack.coffee</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

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

    const resendApiKey = import.meta.env.RESEND_API_KEY;

    // 2. Send branded forecast email TO THE PROSPECT
    const prospectEmailHtml = buildProspectEmail(body);

    const prospectEmailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Bill at In The Black <bill@intheblack.coffee>',
        to: [email],
        subject: `${business_name} — Your 12-Month Wholesale Growth Forecast`,
        html: prospectEmailHtml,
      }),
    });

    if (!prospectEmailRes.ok) {
      const err = await prospectEmailRes.text();
      console.error('Prospect email error:', err);
    }

    // 3. Send notification email TO BILL
    const notifyHtml = [
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

    const notifyRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'In The Black <bill@intheblack.coffee>',
        to: ['bill@intheblack.coffee'],
        subject: `Forecast Lead — ${business_name} ($${Number(projected_12month_revenue).toLocaleString()} projected)`,
        html: notifyHtml,
      }),
    });

    if (!notifyRes.ok) {
      const err = await notifyRes.text();
      console.error('Notify email error:', err);
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('Forecast API error:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
};
