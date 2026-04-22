import { NextRequest, NextResponse } from "next/server";

// ─── CONFIG ───────────────────────────────────────────────────────────────────
// Set these in Vercel Dashboard → Project → Settings → Environment Variables
const GMAIL_USER  = process.env.GMAIL_USER  || "sheemaphotos03@gmail.com";  
const GMAIL_PASS  = process.env.GMAIL_PASS  || "SheemavsPhotos@03";   
const TO_EMAIL    = process.env.TO_EMAIL    || "cherrychue98@gmail.com";   
const FORMSPREE_ID = process.env.FORMSPREE_ID || ""; // fallback (optional)

// ─── HTML HELPERS ─────────────────────────────────────────────────────────────
function esc(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #e8e0d8;font-size:11px;
                 letter-spacing:.08em;text-transform:uppercase;color:#aaa;
                 width:130px;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #e8e0d8;font-size:14px;
                 color:#1a1008;vertical-align:top;">${esc(value)}</td>
    </tr>`;
}

function artistEmailHtml(d: Record<string, string>): string {
  const rows = [
    row("Name",     d.name    || "—"),
    row("Email",    d.email   || "—"),
    d.phone    ? row("Phone",    d.phone)    : "",
    d.artType  ? row("Art Type", d.artType)  : "",
    d.occasion ? row("Occasion", d.occasion) : "",
  ].join("");

  const visionBlock = d.vision ? `
    <div style="margin-top:20px;">
      <p style="font-size:11px;letter-spacing:.08em;text-transform:uppercase;
                color:#aaa;margin-bottom:8px;">Vision / Description</p>
      <div style="background:#fff;padding:16px;border-left:3px solid #c9606a;
                  font-size:14px;line-height:1.8;color:#3d2b1a;">
        ${esc(d.vision).replace(/\n/g, "<br>")}
      </div>
    </div>` : "";

  const refNote = d.hasReference === "true"
    ? `<p style="margin-top:12px;font-size:13px;color:#c9606a;">
        📎 A reference image was attached — check the attachments section of this email.
       </p>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5ede4;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0">
  <tr><td align="center" style="padding:40px 16px;">
    <table width="600" cellpadding="0" cellspacing="0"
           style="background:#fdf8f3;max-width:600px;">
      <tr><td style="background:#1a1008;padding:28px 36px;">
        <p style="margin:0;font-size:11px;letter-spacing:.18em;
                  text-transform:uppercase;color:#c9606a;">Cherry Chue</p>
        <p style="margin:6px 0 0;font-size:22px;font-weight:300;
                  color:#fdf8f3;">New Commission Enquiry</p>
        <p style="margin:4px 0 0;font-size:12px;color:rgba(253,248,243,.4);">
          ${new Date().toLocaleDateString("en-IN", { dateStyle: "full" })}
        </p>
      </td></tr>
      <tr><td style="padding:32px 36px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          ${rows}
        </table>
        ${visionBlock}
        ${refNote}
        <div style="margin-top:28px;padding-top:20px;border-top:1px solid #e8e0d8;">
          <a href="mailto:${esc(d.email)}"
             style="display:inline-block;background:#c9606a;color:#fdf8f3;
                    padding:10px 24px;font-size:12px;letter-spacing:.08em;
                    text-transform:uppercase;text-decoration:none;">
            Reply to ${esc(d.name)}
          </a>
        </div>
        <p style="margin-top:24px;font-size:11px;color:#bbb;">
          Sent from cherry-chue.vercel.app enquiry form
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function clientEmailHtml(name: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5ede4;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0">
  <tr><td align="center" style="padding:40px 16px;">
    <table width="600" cellpadding="0" cellspacing="0"
           style="background:#fdf8f3;max-width:600px;">
      <tr><td style="background:#1a1008;padding:28px 36px;">
        <p style="margin:0;font-size:11px;letter-spacing:.18em;
                  text-transform:uppercase;color:#c9606a;">Cherry Chue</p>
        <p style="margin:6px 0 0;font-size:13px;color:rgba(253,248,243,.5);
                  font-style:italic;">Where colors dance &amp; emotions sing</p>
      </td></tr>
      <tr><td style="padding:36px;">
        <p style="font-size:19px;color:#1a1008;margin-bottom:14px;">
          Hello ${esc(name)},
        </p>
        <p style="font-size:14px;line-height:1.8;color:#3d2b1a;margin-bottom:14px;">
          Thank you for reaching out to <strong>Cherry Chue</strong>! I've received
          your enquiry and I'm genuinely excited to learn about your vision.
        </p>
        <p style="font-size:14px;line-height:1.8;color:#3d2b1a;margin-bottom:14px;">
          I'll personally get back to you within <strong>24 hours</strong>.
          In the meantime, browse my latest work on
          <a href="https://instagram.com/cherry_chue" style="color:#c9606a;">
            Instagram @cherry_chue
          </a>.
        </p>
        <p style="font-size:14px;line-height:1.8;color:#3d2b1a;margin-bottom:28px;">
          Need a quicker reply?
          <a href="https://wa.me/918072888570" style="color:#c9606a;">
            WhatsApp me directly
          </a>.
        </p>
        <p style="font-size:14px;color:#3d2b1a;">With warmth,</p>
        <p style="font-size:22px;font-style:italic;color:#c9606a;margin-top:8px;">
          Sheema ✦
        </p>
        <hr style="border:none;border-top:1px solid #e8e0d8;margin:24px 0;">
        <p style="font-size:11px;color:#bbb;">
          Cherry Chue · Chennai, Tamil Nadu ·
          <a href="https://cherry-chue.vercel.app" style="color:#c9606a;">
            cherry-chue.vercel.app
          </a>
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

// ─── SEND VIA NODEMAILER (Gmail SMTP) ─────────────────────────────────────────
interface MailAttachment {
  filename: string;
  content: Buffer;
  contentType: string;
}

async function sendViaGmail(
  data: Record<string, string>,
  attachment?: MailAttachment
): Promise<void> {
  if (!GMAIL_USER || !GMAIL_PASS) {
    throw new Error("GMAIL_USER or GMAIL_PASS not configured");
  }

  const nodemailer = await import("nodemailer");

  const transporter = nodemailer.default.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // SSL
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS,
    },
  });

  // Verify connection before sending
  await transporter.verify();

  const attachments = attachment
    ? [{ filename: attachment.filename, content: attachment.content, contentType: attachment.contentType }]
    : [];

  // 1. Email to artist / owner
  await transporter.sendMail({
    from: `"Cherry Chue Website" <${GMAIL_USER}>`,
    to: TO_EMAIL || GMAIL_USER,
    replyTo: data.email,
    subject: `✦ New Enquiry — ${data.name}${data.artType ? ` · ${data.artType}` : ""}`,
    html: artistEmailHtml(data),
    attachments,
  });

  // 2. Auto-reply to the person who submitted
  await transporter.sendMail({
    from: `"Sheema — Cherry Chue" <${GMAIL_USER}>`,
    to: data.email,
    subject: "Thank you for reaching out — Cherry Chue ✦",
    html: clientEmailHtml(data.name),
  });
}

// ─── FALLBACK: FORMSPREE ──────────────────────────────────────────────────────
async function sendViaFormspree(data: Record<string, string>): Promise<void> {
  if (!FORMSPREE_ID) throw new Error("FORMSPREE_ID not set");

  const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name:     data.name,
      email:    data.email,
      phone:    data.phone    || "Not provided",
      artType:  data.artType  || "Not specified",
      vision:   data.vision   || "",
      occasion: data.occasion || "",
      _replyto: data.email,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "Unknown error");
    throw new Error(`Formspree error: ${res.status} — ${body}`);
  }
}

// ─── ROUTE HANDLER ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    const data: Record<string, string> = {};
    let attachment: MailAttachment | undefined;

    // Parse multipart form (has file) or JSON
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      for (const [key, value] of formData.entries()) {
        if (key === "reference" && value instanceof File && value.size > 0) {
          // Cap at 4MB to stay within Vercel's 4.5MB payload limit
          if (value.size <= 4 * 1024 * 1024) {
            const buffer = Buffer.from(await value.arrayBuffer());
            attachment = {
              filename: value.name || "reference.jpg",
              content: buffer,
              contentType: value.type || "image/jpeg",
            };
            data.hasReference = "true";
          } else {
            data.hasReference = "too_large"; // skip attachment, note it
          }
        } else if (typeof value === "string") {
          data[key] = value.trim();
        }
      }
    } else {
      // JSON body (no file)
      const json = await req.json().catch(() => ({}));
      Object.assign(data, json);
    }

    // ── Validate required fields
    const errors: string[] = [];
    if (!data.name?.trim())    errors.push("Name is required");
    if (!data.email?.trim())   errors.push("Email is required");
    if (!data.artType?.trim()) errors.push("Art type is required");
    if (!data.vision?.trim())  errors.push("Vision description is required");

    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(". ") }, { status: 400 });
    }

    // ── Try Gmail first, Formspree as fallback
    if (GMAIL_USER && GMAIL_PASS) {
      await sendViaGmail(data, attachment);
      return NextResponse.json({ success: true, via: "gmail" });
    }

    if (FORMSPREE_ID) {
      await sendViaFormspree(data);
      return NextResponse.json({ success: true, via: "formspree" });
    }

    // Neither configured — log in dev, return success so UI isn't broken
    console.warn("[Cherry Chue] No email provider configured. Enquiry data:", data);
    return NextResponse.json({ success: true, via: "logged" });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[Cherry Chue enquiry error]", message);

    return NextResponse.json(
      {
        error:
          "We couldn't send your message right now. Please contact us directly via " +
          "WhatsApp (+91 8939215704) or email (cherrychue98@gmail.com).",
      },
      { status: 500 }
    );
  }
}
