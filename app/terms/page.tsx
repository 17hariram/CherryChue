import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Cherry Chue Terms & Conditions — commissions, payments, shipping, IP rights and more.",
  alternates: { canonical: "https://cherry-chue.vercel.app/terms" },
};

const sections = [
  { n:"01", h:"Nature of Artwork", body:"All artworks by Cherry Chue are 100% handmade by artist Sheema. Due to the nature of hand-painted art, slight variations in colour, texture, and stroke compared to digital reference images may occur. Screen calibration differences may also cause perceived colour shifts from the physical piece. These are not defects — they are the hallmarks of authentic, living art." },
  { n:"02", h:"Commission Process", body:"By confirming a commission you agree to: provide a detailed brief (reference images, size, medium, occasion) before work begins; pay a 50% non-refundable advance before the artist starts; receive work-in-progress photos at key stages; and receive up to two rounds of minor revisions within the fee. Additional revisions may incur extra charges agreed in advance. Cherry Chue reserves the right to decline any commission request." },
  { n:"03", h:"Pricing & Payments", body:"Prices are in Indian Rupees (INR) and are determined by size, medium, and complexity. A 50% advance is required to reserve your slot. The remaining balance is due before dispatch. Prices quoted are valid for 7 days. Rush orders (within 3–5 days) may attract a 20–30% surcharge. Accepted methods: UPI (GPay, PhonePe, Paytm) and direct bank transfer." },
  { n:"04", h:"Shipping & Delivery", body:"Artworks are wrapped in acid-free tissue, bubble wrap, and sturdy packaging. India delivery: 3–7 business days after completion. International shipping is available on request (10–21 business days). Tracking details are shared once dispatched. Cherry Chue is not liable for damage or delay caused by third-party courier services. Report wrong items or visibly damaged sealed packages within 24 hours of delivery." },
  { n:"05", h:"Cancellation & Refunds", body:"The 50% advance is non-refundable once work has begun. Cancellations before work starts are eligible for a full advance refund. If a completed artwork arrives damaged due to our packaging failure, we will offer a reproduction or partial refund (subject to evidence provided within 24 hours). Refunds are not provided for colour or style variations within normal handmade art tolerances. Ready-made artworks may be returned within 7 days in original undamaged condition, minus shipping." },
  { n:"06", h:"Intellectual Property", body:"Artist Sheema retains all copyright and reproduction rights to every artwork. Purchasing a physical artwork does not grant rights to reproduce, scan, print, or use it commercially. You may display it personally and share photos on social media — crediting @cherry_chue is appreciated. Commercial use requires a separate written licence. The artist may photograph and share completed works for portfolio purposes unless you request confidentiality. Rights are retained under the Indian Copyright Act, 1957." },
  { n:"07", h:"Reference Images & Privacy", body:"Reference photographs you submit are used exclusively to create your artwork, are not shared with third parties, and are retained only for the duration of the commission. By submitting reference images, you confirm you have the right to share them for artistic purposes. The artist may retain a low-resolution copy of the completed artwork for their portfolio." },
  { n:"08", h:"Communication & Conduct", body:"All commissions are handled personally by Sheema via WhatsApp, Instagram, or email. We aim to respond within 24 hours on business days. Abusive, threatening, or harassing behaviour will result in immediate cancellation without refund. Changes to requirements after work has begun may affect timelines and pricing." },
  { n:"09", h:"Limitation of Liability", body:"Cherry Chue's maximum liability for any claim shall not exceed the amount paid for the specific artwork in question. We are not liable for indirect, consequential, or special damages. We are not responsible for delays caused by natural disasters, courier failures, or other force majeure events. These limitations do not affect your statutory consumer rights under the Consumer Protection Act, 2019." },
  { n:"10", h:"Governing Law & Disputes", body:"These Terms are governed by the laws of India. Any disputes are subject to the exclusive jurisdiction of courts in Chennai, Tamil Nadu. We encourage resolution through direct communication before pursuing legal channels. Both parties agree to first attempt mediation in good faith." },
  { n:"11", h:"Amendments", body:"Cherry Chue reserves the right to update these Terms at any time. Changes are posted on this page with an updated date. Continued use of our services after changes are posted constitutes acceptance. We recommend checking periodically if you are an ongoing client." },
];

export default function TermsPage() {
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
          <h1 className="policy-title">Terms &amp; Conditions</h1>
          <p className="policy-sub">Please read carefully before commissioning.</p>
          <p className="policy-date">Last updated: January 2025 &nbsp;✦&nbsp; Cherry Chue, Chennai</p>
        </header>

        <div className="policy-intro">
          These Terms &amp; Conditions govern your use of Cherry Chue&apos;s services and purchase of
          custom artworks. By commissioning a piece or placing an order, you acknowledge that you have
          read, understood, and agreed to be bound by these terms. Art is built on trust — so are we.
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
          <p className="footer-tag">Where colors dance &amp; Emotions sing</p>
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
