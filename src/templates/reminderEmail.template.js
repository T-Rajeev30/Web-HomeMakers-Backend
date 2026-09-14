// Onboarding reminder email — same visual language as approvalEmail.template.js.

const STEP_LABELS = {
  1: "Personal Information",
  2: "Address Details",
  3: "Tax Details",
  4: "Bank Details",
  5: "FSSAI License",
  6: "About Your Food",
  7: "Kitchen Photos",
  8: "Review & Submit",
};

export function reminderEmailHtml({ cookName, currentStep, dashboardUrl }) {
  const name = cookName || "there";
  const gradient =
    "linear-gradient(120deg, #FA8C0A 0%, #F05A64 55%, #7832F0 100%)";

  const completed = Object.entries(STEP_LABELS)
    .filter(([step]) => Number(step) < currentStep)
    .map(([, label]) => label);

  const remaining = Object.entries(STEP_LABELS)
    .filter(([step]) => Number(step) >= currentStep)
    .map(([, label]) => label);

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Finish setting up your Zingro kitchen</title>
</head>
<body style="margin:0; padding:0; background-color:#fffaf2; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fffaf2; padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:480px; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 20px rgba(26,18,5,0.08);">

          <!-- Header banner -->
          <tr>
            <td style="background:${gradient}; padding:36px 32px; text-align:center;">
              <p style="margin:0 0 8px; color:#ffffff; font-size:12px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; opacity:0.9;">
                Almost there
              </p>
              <h1 style="margin:0; color:#ffffff;font-size:26px; font-weight:800; letter-spacing:-0.02em;">
                You're ${completed.length} of 8 steps in
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 16px; color:#1a1205; font-size:16px; line-height:1.6;">
                Namaste ${escapeHtml(name)},
              </p>
              <p style="margin:0 0 20px; color:#5c4f3d; font-size:15px; line-height:1.65;">
                You're partway through setting up your kitchen on Zingro. Here's where things stand:
              </p>

              ${
                completed.length > 0
                  ? `<p style="margin:0 0 8px; color:#0fb59b; font-size:13px; font-weight:700; letter-spacing:0.04em; text-transform:uppercase;">Completed</p>
                     ${completed.map((label) => checkItem(label)).join("")}`
                  : ""
              }

              <p style="margin:20px 0 8px; color:#F05A64; font-size:13px; font-weight:700; letter-spacing:0.04em; text-transform:uppercase;">Still remaining</p>
              ${remaining.map((label) => pendingItem(label)).join("")}

              <!-- CTA button -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px auto 0;">
                <tr>
                  <td style="border-radius:999px;background:${gradient};">
                    <a href="${dashboardUrl}" style="display:inline-block; padding:14px 32px; color:#ffffff; font-size:15px; font-weight:700; text-decoration:none;">
                      Continue setup →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px; border-top:1px solid #f0eae0; text-align:center;">
              <p style="margin:0 0 4px; color:#8a7b63; font-size:12px;">
                Questions? Reach out anytime through the Support page in your app.
              </p>
              <p style="margin:0; color:#8a7b63; font-size:12px;">
                © ${new Date().getFullYear()} Zingro
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function checkItem(text) {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:6px;">
      <tr>
        <td style="width:20px; height:20px; border-radius:50%; background:#0fb59b; text-align:center; vertical-align:middle;">
          <span style="color:#ffffff; font-size:11px; font-weight:700;">✓</span>
        </td>
        <td style="padding-left:10px; color:#5c4f3d; font-size:14px; line-height:1.5;">
          ${escapeHtml(text)}
        </td>
      </tr>
    </table>`;
}

function pendingItem(text) {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:6px;">
      <tr>
        <td style="width:20px; height:20px; border-radius:50%; border:2px solid #F05A64; text-align:center; vertical-align:middle;">
        </td>
        <td style="padding-left:10px; color:#5c4f3d; font-size:14px; line-height:1.5;">
          ${escapeHtml(text)}
        </td>
      </tr>
    </table>`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
