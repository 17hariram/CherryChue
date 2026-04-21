import { NextRequest, NextResponse } from "next/server";

const TO_EMAIL = process.env.TO_EMAIL || "cherrychue98@gmail.com";
const FROM_USER = process.env.GMAIL_USER || "sheemaphotos03@gmail.com";

function esc(s: string) {
  return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

function artistHtml(d: Record<string,string>): string {
  const rows: [string,string][] = [
    ["Name", d.name],
    ["Email", d.email],
    ...(d.phone ? [["Phone", d.phone] as [string,string]] : []),
    ...(d.artType ? [["Art Type", d.artType] as [string,string]] : []),
    ...(d.occasion ? [["Occasion", d.occasion] as [string,string]] : []),
  ];
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head><body style="margin:0;padding:0;background:#f5ede4;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 16px;">
<table width="600" style="background:#fdf8f3;max-width:600px;" cellpadding="0" cellspacing="0">
  <tr><td style="background:#1a1008;padding:28px 36px;">
    <p style="margin:0;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#c9606a;">Cherry Chue</p>
    <p style="margin:6px 0 0;font-size:22px;font-weight:300;color:#fdf8f3;">New Commission Enquiry</p>
  </td></tr>
  <tr><td style="padding:36px;">
    <table width="100%" cellpadding="0" cellspacing="0">
      ${rows.map(([l,v])=>`<tr><td style="padding:10px 0;border-bottom:1px solid #e8e0d8;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#aaa;width:110px;">${l}</td><td style="padding:10px 0;border-bottom:1px solid #e8e0d8;font-size:14px;color:#1a1008;">${esc(v)}</td></tr>`).join("")}
    </table>
    ${d.vision?`<div style="margin-top:20px;"><p style="font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#aaa;margin-bottom:8px;">Vision</p><div style="background:#fff;padding:16px;border-left:3px solid #c9606a;font-size:14px;line-height:1.8;color:#3d2b1a;">${esc(d.vision).replace(/\n/g,"<br>")}</div></div>`:""}
    ${d.hasReference==="true"?`<p style="margin-top:12px;font-size:13px;color:#c9606a;">📎 Reference image attached.</p>`:""}
    <p style="margin-top:28px;font-size:11px;color:#bbb;">Sent from cherry-chue.vercel.app</p>
  </td></tr>
</table></td></tr></table></body></html>`;
}

function clientHtml(name: string): string {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head><body style="margin:0;padding:0;background:#f5ede4;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 16px;">
<table width="600" style="background:#fdf8f3;max-width:600px;" cellpadding="0" cellspacing="0">
  <tr><td style="background:#1a1008;padding:28px 36px;">
    <p style="margin:0;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#c9606a;">Cherry Chue</p>
    <p style="margin:6px 0 0;font-size:13px;color:rgba(253,248,243,0.5);font-style:italic;">Where colors dance &amp; Emotions sing</p>
  </td></tr>
  <tr><td style="padding:36px;">
    <p style="font-size:19px;color:#1a1008;margin-bottom:14px;">Hello ${esc(name)},</p>
    <p style="font-size:14px;line-height:1.8;color:#3d2b1a;margin-bottom:14px;">Thank you for reaching out to Cherry Chue! I've received your enquiry and I'm excited to hear about your vision.</p>
    <p style="font-size:14px;line-height:1.8;color:#3d2b1a;margin-bottom:14px;">I'll personally get back to you within <strong>24 hours</strong>. In the meantime, browse my work on <a href="https://instagram.com/cherry_chue" style="color:#c9606a;">Instagram</a>.</p>
    <p style="font-size:14px;line-height:1.8;color:#3d2b1a;margin-bottom:24px;">Need a quicker reply? <a href="https://wa.me/918072888570" style="color:#c9606a;">WhatsApp me directly</a>.</p>
    <p style="font-size:14px;color:#3d2b1a;">With warmth,</p>
    <p style="font-size:21px;font-style:italic;color:#c9606a;margin-top:6px;">Sheema ✦</p>
    <hr style="border:none;border-top:1px solid #e8e0d8;margin:24px 0;">
    <p style="font-size:11px;color:#bbb;">Cherry Chue · Chennai · <a href="https://cherry-chue.vercel.app" style="color:#c9606a;">cherry-chue.vercel.app</a></p>
  </td></tr>
</table></td></tr></table></body></html>`;
}

async function viaNodmailer(data: Record<string,string>, refBuf?: Buffer, refName?: string) {
  
  // Dynamic import to avoid issues with edge runtimes
  const nodemailer = await import("nodemailer");
  const t = nodemailer.default.createTransport({ service:"gmail", auth:{ user:process.env.GMAIL_USER, pass:process.env.GMAIL_PASS } });
  await t.sendMail({
    from:`"Cherry Chue" <${FROM_USER}>`,
    to: TO_EMAIL,
    replyTo: data.email,
    subject:`New Enquiry — ${data.name}${data.artType?` (${data.artType})`:""}`,
    html: artistHtml(data),
    attachments: refBuf && refName ? [{ filename:refName, content:refBuf }] : [],
  });
  await t.sendMail({
    from:`"Sheema — Cherry Chue" <${FROM_USER}>`,
    to: data.email,
    subject:"Thank you for reaching out — Cherry Chue",
    html: clientHtml(data.name),
  });
}

async function viaFormspree(data: Record<string,string>) {
  const id = process.env.FORMSPREE_ID;
  if (!id) throw new Error("No FORMSPREE_ID");
  const r = await fetch(`https://formspree.io/f/${id}`,{
    method:"POST",
    headers:{"Content-Type":"application/json",Accept:"application/json"},
    body: JSON.stringify(data),
  });
  if (!r.ok) throw new Error(await r.text());
}

export async function POST(req: NextRequest) {
  try {
    const ct = req.headers.get("content-type") || "";
    const data: Record<string,string> = {};
    let refBuf: Buffer|undefined;
    let refName: string|undefined;

    if (ct.includes("multipart/form-data")) {
      const fd = await req.formData();
      for (const [k,v] of fd.entries()) {
        if (k === "reference" && v instanceof File && v.size > 0) {
          refBuf = Buffer.from(await v.arrayBuffer());
          refName = v.name;
          data.hasReference = "true";
        } else if (typeof v === "string") {
          data[k] = v;
        }
      }
    } else {
      Object.assign(data, await req.json());
    }

    if (!data.name?.trim() || !data.email?.trim() || !data.artType?.trim() || !data.vision?.trim()) {
      return NextResponse.json({ error:"Name, email, art type and vision are required." }, { status:400 });
    }

    if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
      await viaNodmailer(data, refBuf, refName);
      return NextResponse.json({ success:true });
    }
    if (process.env.FORMSPREE_ID) {
      await viaFormspree(data);
      return NextResponse.json({ success:true });
    }
    // Dev mode — just log
    console.log("[ENQUIRY DEV]", data);
    return NextResponse.json({ success:true });
  } catch(err) {
    console.error("[ENQUIRY ERROR]", err);
    return NextResponse.json({ error:"Failed to send. Please WhatsApp or email directly." }, { status:500 });
  }
}
