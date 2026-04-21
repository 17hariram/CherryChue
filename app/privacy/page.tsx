import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Cherry Chue Privacy Policy — how we collect, use and protect your information.",
  alternates: { canonical: "https://cherry-chue.vercel.app/privacy" },
};

const sections = [
  { n:"01", h:"Information We Collect", body:"When you commission artwork or make an enquiry via our website, WhatsApp, or Instagram, we may collect: your name, email, phone number, shipping address, reference photos, and communication history. We collect only what is strictly necessary to fulfil your artwork." },
  { n:"02", h:"How We Use Your Data", body:"Your information is used solely to: process and deliver your commissioned artwork, communicate with you about your piece, send order confirmations and delivery updates, and resolve any issues. We do not sell, trade, or rent your personal information to anyone." },
  { n:"03", h:"Payments & Financial Data", body:"Cherry Chue does not store card details, UPI PINs, or banking credentials. All payments are processed through UPI apps or direct bank transfer as agreed during the commission enquiry." },
  { n:"04", h:"Data Storage & Security", body:"Your data is stored securely and accessed only by Sheema (the artist). We use encrypted communication channels and do not store sensitive financial information. No method of electronic storage is 100% secure; we encourage you to use secure channels." },
  { n:"05", h:"Cookies & Analytics", body:"Our website may use minimal, privacy-respecting analytics to understand visitor behaviour. We do not use invasive tracking cookies or advertising networks. Any analytics are anonymised and aggregated." },
  { n:"06", h:"Third-Party Links", body:"Our website contains links to Instagram, WhatsApp, and XO Graphics. Cherry Chue is not responsible for the privacy practices of these external platforms. Please review their own privacy policies." },
  { n:"07", h:"Children's Privacy", body:"Our services are not directed at children under 13. We do not knowingly collect information from children under 13. If you believe a child has provided us information, please contact us and we will remove it promptly." },
  { n:"08", h:"Your Rights", body:"You have the right to access, correct, or delete your personal data held by us, and to withdraw consent for marketing communications at any time. Contact us at cherrychue98@gmail.com to exercise these rights." },
  { n:"09", h:"Changes to This Policy", body:"We may update this Privacy Policy periodically. The updated policy will be posted on this page with a revised date. Continued use of our services after any change constitutes acceptance." },
  { n:"10", h:"Contact", body:"Questions about this policy: cherrychue98@gmail.com · WhatsApp: +91 89392 15704 · Instagram: @cherry_chue. We respond within 48 hours." },
];

export default function PrivacyPage() {
  return (
    <>
      <nav className="pnav">
        <div className="pnav-inner">
          <Link href="/" className="pnav-logo">
            <span className="pc">Cherry</span> Chue
          </Link>
          <Link href="/" className="back-link">← Back to Home</Link>
        </div>
      </nav>

      <main className="policy-main">
        <div className="policy-bg">
          <div className="pb1" />
          <div className="pb2" />
        </div>

        <header>
          <p className="p-eyebrow">Legal</p>
          <h1 className="policy-title">Privacy Policy</h1>
          <p className="policy-sub">Your trust is our greatest canvas.</p>
          <p className="policy-date">Last updated: January 2025 &nbsp;✦&nbsp; Cherry Chue, Chennai</p>
        </header>

        <div className="policy-intro">
          At Cherry Chue, art is an act of trust — between artist and collector. We treat your personal
          information with the same care and respect we bring to every brushstroke.
        </div>

        <div className="policy-sections">
          {sections.map(s => (
            <section key={s.n} className="policy-sec">
              <div className="sec-num" aria-hidden="true">{s.n}</div>
              <div>
                <h2 className="sec-h">{s.h}</h2>
                <p className="sec-body">{s.body}</p>
              </div>
            </section>
          ))}
        </div>
      </main>

      <footer className="pfooter">
        <div className="pfooter-inner">
          <span className="footer-name">Cherry Chue</span>
          <p className="footer-tag">Where colors dance &amp; emotions sing</p>
          <nav className="footer-links" aria-label="Footer navigation">
            <Link href="/privacy">Privacy Policy</Link>
            <span aria-hidden="true">•</span>
            <Link href="/terms">Terms &amp; Conditions</Link>
            <span aria-hidden="true">•</span>
            <Link href="/">Home</Link>
          </nav>
          <p className="footer-copy">© 2025 Cherry Chue. All rights reserved.</p>
          <p className="footer-credit">
            Made with love by{" "}
            <a href="https://www.xographics.in/" target="_blank" rel="noopener noreferrer">
              XO Graphics
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
