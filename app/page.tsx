"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { GALLERY_DATA, GalleryCategory } from "@/lib/gallery-data";

/* ─── CONSTANTS ──────────────────────────────────────────────────── */
const ART_TYPES = [
  "Custom Portrait",
  "Pencil Sketch",
  "Watercolor",
  "Oil Painting",
  "Pet Portrait",
  "Gift Artwork",
];

const TESTIMONIALS = [
  { name: "Sarah J.",    role: "Client",    initial: "S", color: "#c9606a", text: "The portrait of my dog brought tears to my eyes. Simply beautiful." },
  { name: "Varun ",    role: "Client",    initial: "V", color: "#5c6bc0", text: "Ordered a landscape for my wife's birthday. Best gift ever." },
  { name: "Anita ",    role: "Art Lover", initial: "A", color: "#7a9e8a", text: "The details in the pencil sketch are mind-blowing." },
  { name: "Amritha", role: "Client",    initial: "A", color: "#8d6e63", text: "Sheema captured the emotion perfectly. Highly recommended!" },
  { name: "Ravi S.",    role: "Client",    initial: "R", color: "#c9993a", text: "She gave life to the character perfectly. A true artist." },
  { name: "Neha ",    role: "Client",    initial: "N", color: "#7986cb", text: "Got my art delivered on time. Highly satisfied." },
  { name: "Arjun K.",   role: "Client",    initial: "A", color: "#a84450", text: "She merged my ideas perfectly. A true artist." },
  { name: "Jasmine", role: "Client",    initial: "J", color: "#ec407a", text: "The magical portrait was a true masterpiece!" },
  { name: "Priya V.",   role: "Art Lover", initial: "P", color: "#ab47bc", text: "Absolutely stunning — the colours are alive!" },
  { name: "Karthik", role: "Client",    initial: "K", color: "#c9606a", text: "Commissioned a pet portrait. She nailed every whisker!" },
  { name: "Deepa N.",   role: "Client",    initial: "D", color: "#26a69a", text: "A gift for my parents' anniversary. They were speechless." },
  { name: "Arun P.",    role: "Client",    initial: "A", color: "#5c6bc0", text: "The oil painting exceeded every expectation I had." },
  { name: "Sowmya ",  role: "Art Lover", initial: "S", color: "#7a9e8a", text: "The sketch looked more real than a photo. Incredible!" },
  { name: "Mahesh C.",  role: "Client",    initial: "M", color: "#8d6e63", text: "Fast delivery, beautiful packaging, even more beautiful art!" },
  { name: "Lakshmi G.", role: "Client",    initial: "L", color: "#d4a017", text: "My daughter's portrait was done with so much love." },
  { name: "Rahul J.",   role: "Client",    initial: "R", color: "#7986cb", text: "The couple portrait is hanging proudly in our living room." },
  { name: "Meera ",   role: "Art Lover", initial: "M", color: "#ec407a", text: "Pure emotion captured in every stroke. A rare gem." },
  { name: "Suresh ",  role: "Client",    initial: "S", color: "#ab47bc", text: "So detailed I had to look twice. Simply amazing!" },
  { name: "Aiswarya M.",role: "Client",    initial: "A", color: "#26a69a", text: "I cried when I saw the final piece. Exactly what I imagined." },
  { name: "Naveen ",  role: "Client",    initial: "N", color: "#c9606a", text: "Professional, responsive, incredibly talented. 10/10!" },
  { name: "Divya ",   role: "Art Lover", initial: "D", color: "#5c6bc0", text: "The watercolor of my hometown was so nostalgic." },
  { name: "Sanjay ",  role: "Client",    initial: "S", color: "#c9993a", text: "Gifted to my mother. She loves it more than any gift I've ever given." },
  { name: "Bhavana ", role: "Client",    initial: "B", color: "#5d4037", text: "The shading and technique in my portrait is unbelievable." },
  { name: "Gopal V.",   role: "Client",    initial: "G", color: "#7a9e8a", text: "Commissioned three pieces. Every single one was stunning." },
  { name: "Ishaan ",  role: "Art Lover", initial: "I", color: "#1565c0", text: "Cherry Chue's work belongs in a gallery. Exceptional." },
  { name: "Nandini B.", role: "Client",    initial: "N", color: "#a84450", text: "The attention to detail in my pet's portrait was heartwarming." },
  { name: "Hari Ram",   role: "Client",    initial: "V", color: "#ec407a", text: "Quick turnaround, no compromise on quality. Wonderful." },
  { name: "Smitha R.",  role: "Art Lover", initial: "S", color: "#8d6e63", text: "A perfect blend of realism and emotion. A fan for life!" },
];

/* ─── COMPONENT ────────────────────────────────────────────────────── */
export default function Home() {
  const [menuOpen,       setMenuOpen]       = useState(false);
  const [scrolled,       setScrolled]       = useState(false);
  const [selectedCat,    setSelectedCat]    = useState<GalleryCategory | null>(null);
  const [lightbox,       setLightbox]       = useState<string | null>(null);
  const [contactOpen,    setContactOpen]    = useState(false);
  const [prefilledType,  setPrefilledType]  = useState("");
  const [formData,       setFormData]       = useState({ name:"", email:"", phone:"", artType:"", vision:"", occasion:"" });
  const [refFile,        setRefFile]        = useState<File|null>(null);
  const [fieldErr,       setFieldErr]       = useState<Record<string,string>>({});
  const [status,         setStatus]         = useState<"idle"|"sending"|"success"|"error">("idle");
  const [errMsg,         setErrMsg]         = useState("");

  const contactRef = useRef<HTMLDivElement>(null);

  /* Nav scroll */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Scroll reveal */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add("in-view")),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [selectedCat, contactOpen]);

  /* Lock body scroll when lightbox/modal open */
  useEffect(() => {
    document.body.style.overflow = (lightbox || (contactOpen)) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox, contactOpen]);

  /* Open enquiry with optional pre-fill */
  const openEnquiry = useCallback((artType = "") => {
    setPrefilledType(artType);
    setFormData(f => ({ ...f, artType }));
    setStatus("idle");
    setFieldErr({});
    setContactOpen(true);
  }, []);

  /* Validation */
  const validate = () => {
    const e: Record<string,string> = {};
    if (!formData.name.trim() || /\d/.test(formData.name))
      e.name = "Enter a valid name (letters only).";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = "Enter a valid email address.";
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\s/g, "")))
      e.phone = "Phone must be exactly 10 digits.";
    if (!formData.artType)
      e.artType = "Please select an art type.";
    if (!formData.vision.trim())
      e.vision = "Please describe your vision.";
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setFieldErr(errs); return; }
    setFieldErr({});
    setStatus("sending");
    setErrMsg("");
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([k,v]) => fd.append(k,v));
      if (refFile) fd.append("reference", refFile);
      const res = await fetch("/api/enquiry", { method: "POST", body: fd });
      if (res.ok) {
        setStatus("success");
        setFormData({ name:"", email:"", phone:"", artType:"", vision:"", occasion:"" });
        setRefFile(null);
      } else {
        const d = await res.json().catch(() => ({}));
        setErrMsg(d.error || "Something went wrong. Please WhatsApp or email directly.");
        setStatus("error");
      }
    } catch {
      setErrMsg("Network error. Please WhatsApp or email directly.");
      setStatus("error");
    }
  };

  const setField = (k: keyof typeof formData) =>
    (ev: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
      setFormData(f => ({ ...f, [k]: ev.target.value }));
      if (fieldErr[k]) setFieldErr(f => { const n={...f}; delete n[k]; return n; });
    };

  /* ─── Keyboard handlers ─────────────────────────────────────────── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setLightbox(null); setContactOpen(false); setSelectedCat(null); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* ─── RENDER ──────────────────────────────────────────────────── */
  return (
    <>
      {/* ══════ NAV ══════ */}
      <header className={`nav${scrolled ? " nav--scrolled" : ""}`} role="banner">
        <div className="nav-inner">
          <Link href="/" className="nav-logo" aria-label="Cherry Chue home">
            <Image src="/assets/logo.png" alt="" width={36} height={36} className="nav-logo-img" priority />
            <span><em className="logo-c">Cherry</em> Chue</span>
          </Link>

          <nav className={`nav-links${menuOpen ? " nav-links--open" : ""}`} aria-label="Main navigation">
            <a href="#about"   onClick={() => setMenuOpen(false)}>About</a>
            <a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a>
            <a href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
            <button className="nav-cta" onClick={() => { setMenuOpen(false); openEnquiry(); }}>
              Commission Art
            </button>
          </nav>

          <button
            className={`hamburger${menuOpen ? " hamburger--open" : ""}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <main>
        {/* ══════ HERO ══════ */}
        <section className="hero" id="home">
          <div className="hero-bg" aria-hidden="true">
            <div className="blob b1" />
            <div className="blob b2" />
            <div className="blob b3" />
            <div className="grain" />
            {[...Array(10)].map((_,i) => <div key={i} className={`speck speck-${i+1}`} />)}
          </div>

          <div className="hero-content">
            <p className="eyebrow">✦ Handcrafted Art from Chennai</p>
            <h1 className="hero-title">
              <span className="ht-line ht-1">Where colors</span>
              <span className="ht-line ht-2">dance &amp;</span>
              <span className="ht-line ht-3">Emotions sing</span>
            </h1>
            <p className="hero-sub">
              Original pencil sketches, watercolors &amp; oil paintings — each piece a living memory, made just for you.
            </p>
            <div className="hero-ctas">
              <a href="#gallery" className="btn btn-primary">View Collection</a>
              <button className="btn btn-outline" onClick={() => openEnquiry()}>Commission Art</button>
            </div>
            <div className="hero-stats">
              <div className="stat"><strong>100+</strong><span>Artworks</span></div>
              <div className="stat-sep" />
              <div className="stat"><strong>5 ★</strong><span>Rated</span></div>
              <div className="stat-sep" />
              <div className="stat"><strong>2020</strong><span>Est.</span></div>
            </div>
          </div>

          {/* Decorative paintbrush — Fix: straight orientation */}
          <div className="hero-deco" aria-hidden="true">
            <svg className="brush-svg" viewBox="0 0 40 200" xmlns="http://www.w3.org/2000/svg">
              {/* Handle */}
              <rect x="16" y="0" width="8" height="130" rx="4" fill="rgba(26,16,8,0.15)" />
              <rect x="17" y="1" width="6" height="128" rx="3" fill="rgba(26,16,8,0.08)" />
              {/* Ferrule */}
              <rect x="14" y="126" width="12" height="18" rx="2" fill="rgba(26,16,8,0.2)" />
              {/* Bristles */}
              <ellipse cx="20" cy="162" rx="9" ry="22" fill="rgba(201,96,106,0.45)" />
              <ellipse cx="20" cy="170" rx="6" ry="14" fill="rgba(201,96,106,0.55)" />
              <ellipse cx="20" cy="178" rx="4" ry="9" fill="rgba(201,153,58,0.5)" />
              <ellipse cx="20" cy="184" rx="2.5" ry="5" fill="rgba(201,96,106,0.7)" />
            </svg>
            <div className="brush-splatter" aria-hidden="true">
              {[...Array(7)].map((_,i) => <div key={i} className={`spl spl-${i+1}`} />)}
            </div>
          </div>

          <a href="#about" className="scroll-hint" aria-label="Scroll down">
            <span>Scroll</span>
            <span className="scroll-line" />
          </a>
        </section>

        {/* ══════ ABOUT ══════ */}
        <section className="about-section" id="about" aria-labelledby="about-h">
          <div className="section-deco" aria-hidden="true" />
          <div className="container about-grid">
            <div className="about-img reveal">
              <div className="about-frame">
                <Image
                  src="/assets/sheema.jpg"
                  alt="Sheema, the artist behind Cherry Chue"
                  fill
                  sizes="(max-width: 720px) 100vw, 50vw"
                  style={{ objectFit:"cover" }}
                  priority
                />
              </div>
              <div className="about-badge" aria-hidden="true"><strong>100+</strong><small>Pieces</small></div>
            </div>
            <div className="about-text">
              <p className="eyebrow reveal">The Artist</p>
              <h2 id="about-h" className="section-title reveal">Meet Sheema</h2>
              <div className="divider reveal" aria-hidden="true" />
              <p className="about-para reveal">
                A passionate self-taught artist based in Chennai (TN-91). Since 2020, Cherry Chue has been
                dedicated to capturing raw Emotions on canvas — creating art not just for decoration, but
                for gifting memories that last a lifetime.
              </p>
              <p className="about-para reveal">
                Specializing in detailed pencil sketches, vibrant watercolors, and deep oil paintings,
                every stroke is a conversation between artist and emotion.
              </p>
              <div className="about-tags reveal">
                <span className="tag">Custom Art</span>
                <span className="tag">Portraits</span>
                <span className="tag">Gifts</span>
              </div>
              <button className="btn btn-primary reveal" onClick={() => openEnquiry()}>
                Get Your Custom Art ✦
              </button>
            </div>
          </div>
        </section>

        {/* ══════ GALLERY ══════ */}
        <section className="gallery-section" id="gallery" aria-labelledby="gallery-h">
          <div className="container">
            <div className="section-header reveal">
              <p className="eyebrow">The Collection</p>
              <h2 id="gallery-h" className="section-title">Each Piece, A Story</h2>
              <p className="section-sub reveal">Click a category to explore the full collection.</p>
            </div>

            {/* ── Category cards grid ── */}
            {!selectedCat && (
              <div className="cat-grid">
                {GALLERY_DATA.map((cat, i) => (
                  <button
                    key={cat.key}
                    className="cat-card"
                    style={{ animationDelay: `${i * 0.06}s` }}
                    onClick={() => setSelectedCat(cat)}
                    aria-label={`View ${cat.label} — ${cat.images.length} artworks`}
                  >
                    <div className="cat-card-img-wrap">
                      {/* Use regular <img> for cover — avoids fill/position issues in grid */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={cat.cover}
                        alt={`${cat.label} preview`}
                        className="cat-cover-img"
                        loading="lazy"
                      />
                      <div className="cat-card-overlay">
                        <span className="cat-count">{cat.images.length} works</span>
                        <span className="cat-explore">Explore →</span>
                      </div>
                    </div>
                    <div className="cat-card-info">
                      <h3 className="cat-card-title">{cat.label}</h3>
                      <p className="cat-card-desc">{cat.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* ── Expanded category view ── */}
            {selectedCat && (
              <div className="cat-expanded">
                <div className="cat-expanded-header">
                  <button
                    className="back-btn"
                    onClick={() => setSelectedCat(null)}
                    aria-label="Back to all categories"
                  >
                    ← All Categories
                  </button>
                  <div className="cat-expanded-meta">
                    <h3 className="cat-expanded-title">{selectedCat.label}</h3>
                    <p className="cat-expanded-count">{selectedCat.images.length} artworks</p>
                  </div>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => openEnquiry(selectedCat.label)}
                  >
                    Commission Similar
                  </button>
                </div>

                {/* Artwork image grid — fixed aspect ratio, no fill layout issues */}
                <div className="artwork-grid">
                  {selectedCat.images.map((img, i) => (
                    <button
                      key={i}
                      className="artwork-card"
                      onClick={() => setLightbox(img.src)}
                      aria-label={`View artwork full size`}
                    >
                      <div className="artwork-img-wrap">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="artwork-img"
                          loading={i < 9 ? "eager" : "lazy"}
                        />
                        <div className="artwork-hover-overlay">
                          <span className="zoom-icon">⊕</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="cat-cta">
                  <button
                    className="btn btn-primary btn-large"
                    onClick={() => openEnquiry(selectedCat.label)}
                  >
                    ✦ Commission a {selectedCat.label}
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ══════ PROCESS ══════ */}
        <section className="process-section" aria-labelledby="process-h">
          <div className="process-bg" aria-hidden="true"><div className="process-grain" /></div>
          <div className="container process-grid">
            <div className="process-text">
              <p className="eyebrow eyebrow-light reveal">Behind the Canvas</p>
              <h2 id="process-h" className="section-title section-title-light reveal">The Process</h2>
              <div className="divider divider-gold reveal" aria-hidden="true" />
              <p className="process-para reveal">
                Every stroke is intentional. Every layer carries emotion. Watch how raw materials
                transform into living memories through patient craft and genuine passion.
              </p>
              <div className="process-steps reveal">
                {["Reference & Concept","Sketching & Drafting","Layering & Detail","Final Touches & Delivery"]
                  .map((s,i) => (
                  <div key={s} className="process-step">
                    <span className="step-num">0{i+1}</span>
                    <span className="step-label">{s}</span>
                  </div>
                ))}
              </div>
              <button className="btn btn-gold reveal" onClick={() => openEnquiry()}>
                Start Your Journey
              </button>
            </div>
            <div className="process-video-wrap reveal">
              <video
                className="process-video"
                src="/assets/process.mp4"
                autoPlay loop muted playsInline
                aria-label="Artwork creation time-lapse"
              />
              <div className="video-frame" aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* ══════ TESTIMONIALS ══════ */}
        <section className="reviews-section" id="reviews" aria-labelledby="reviews-h">
          <div className="container">
            <div className="section-header reveal" style={{textAlign:"center"}}>
              <p className="eyebrow">Words from Hearts</p>
              <h2 id="reviews-h" className="section-title">Loved by Collectors</h2>
            </div>
          </div>
          <div className="marquee-wrap" aria-label="Client testimonials">
            {[TESTIMONIALS.slice(0,14), TESTIMONIALS.slice(14)].map((row, ri) => (
              <div key={ri} className="marquee-row">
                <div className={`marquee-track${ri===1?" marquee-rev":""}`} aria-hidden={ri===1}>
                  {[...row, ...row].map((t,i) => (
                    <figure key={i} className="t-card">
                      <div className="t-stars">★★★★★</div>
                      <blockquote><p className="t-text">&ldquo;{t.text}&rdquo;</p></blockquote>
                      <figcaption className="t-author">
                        <span className="t-avatar" style={{background:t.color}} aria-hidden="true">{t.initial}</span>
                        <span>
                          <strong>{t.name}</strong>
                          <em>{t.role}</em>
                        </span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════ CONTACT ══════ */}
        <section className="contact-section" id="contact" aria-labelledby="contact-h" ref={contactRef}>
          <div className="contact-blob" aria-hidden="true" />
          <div className="container">
            <div className="section-header reveal" style={{textAlign:"center"}}>
              <p className="eyebrow">Let&apos;s Create Together</p>
              <h2 id="contact-h" className="section-title">Let&apos;s Create Something Beautiful</h2>
              <p className="section-sub reveal">Whether it&apos;s a custom portrait or a unique gift, I&apos;m just a message away.</p>
            </div>

            {/* Contact method cards — no details shown */}
            <div className="contact-cards reveal">
              <a href="https://wa.me/918939215704" target="_blank" rel="noopener noreferrer" className="c-card" aria-label="Chat on WhatsApp">
                <div className="c-icon c-icon-wa">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </div>
                <h3>WhatsApp</h3>
                <p>Tap to chat instantly</p>
              </a>
              <a href="https://instagram.com/cherry_chue" target="_blank" rel="noopener noreferrer" className="c-card" aria-label="View Instagram">
                <div className="c-icon c-icon-ig">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </div>
                <h3>Instagram</h3>
                <p>View my latest works</p>
              </a>
              <a href="mailto:cherrychue98@gmail.com" className="c-card" aria-label="Send email">
                <div className="c-icon c-icon-em">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="26" height="26" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <h3>Email</h3>
                <p>Drop me a message</p>
              </a>
            </div>

            <div className="contact-cta reveal">
              <button className="btn btn-primary btn-large" onClick={() => openEnquiry()}>
                ✦ &nbsp;Send an Enquiry
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ══════ FOOTER ══════ */}
      <footer className="footer" role="contentinfo">
        <div className="footer-inner container">
          <div className="footer-brand">
            <Image src="/assets/logo.png" alt="Cherry Chue" width={44} height={44} style={{borderRadius:"50%", opacity:.85}} />
            <span className="footer-name">Cherry Chue</span>
            <p className="footer-tag">Where colors dance &amp; Emotions sing</p>
          </div>
          <nav className="footer-links" aria-label="Footer">
            <Link href="/privacy">Privacy Policy</Link>
            <span aria-hidden="true">•</span>
            <Link href="/terms">Terms &amp; Conditions</Link>
            <span aria-hidden="true">•</span>
            <a href="#gallery">Gallery</a>
            <span aria-hidden="true">•</span>
            <a href="#contact">Contact</a>
          </nav>
          <p className="footer-copy">© 2025 Cherry Chue. All rights reserved.</p>
          <p className="footer-credit">
            Made with love by{" "}
            <a href="https://www.xographics.in/" target="_blank" rel="noopener noreferrer">XO Graphics</a>
          </p>
        </div>
      </footer>

      {/* ══════ ENQUIRY MODAL ══════ */}
      {contactOpen && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={e => { if (e.target === e.currentTarget) setContactOpen(false); }}
        >
          <div className="modal-box">
            <button className="modal-close" onClick={() => setContactOpen(false)} aria-label="Close">✕</button>

            {status === "success" ? (
              <div className="form-success">
                <div className="success-star">✦</div>
                <h2>Message Received!</h2>
                <p>Thank you! Sheema will reply within 24 hours.<br/>Check your inbox for a confirmation email.</p>
                <button className="btn btn-primary" onClick={() => { setStatus("idle"); setContactOpen(false); }}>Done</button>
              </div>
            ) : (
              <>
                <h2 id="modal-title" className="modal-title">Commission Your Art</h2>
                <p className="modal-sub">Tell me about your vision — I&apos;ll bring it to life.</p>
                <form onSubmit={handleSubmit} className="enq-form" noValidate>
                  <div className="form-row">
                    <label className="fg">
                      <span>Full Name *</span>
                      <input type="text" required placeholder="Your name" value={formData.name} onChange={setField("name")} />
                      {fieldErr.name && <em className="fe">{fieldErr.name}</em>}
                    </label>
                    <label className="fg">
                      <span>Email *</span>
                      <input type="email" required placeholder="you@example.com" value={formData.email} onChange={setField("email")} />
                      {fieldErr.email && <em className="fe">{fieldErr.email}</em>}
                    </label>
                  </div>
                  <div className="form-row">
                    <label className="fg">
                      <span>Phone (10 digits)</span>
                      <input type="tel" placeholder="10-digit number" maxLength={10} value={formData.phone} onChange={setField("phone")} />
                      {fieldErr.phone && <em className="fe">{fieldErr.phone}</em>}
                    </label>
                    <label className="fg">
                      <span>Art Type *</span>
                      <select required value={formData.artType} onChange={setField("artType")}>
                        <option value="">Select type…</option>
                        {ART_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      {fieldErr.artType && <em className="fe">{fieldErr.artType}</em>}
                    </label>
                  </div>
                  <label className="fg fg-full">
                    <span>Describe Your Vision *</span>
                    <textarea required rows={4} placeholder="Style, size, colours, mood, occasion…" value={formData.vision} onChange={setField("vision")} />
                    {fieldErr.vision && <em className="fe">{fieldErr.vision}</em>}
                  </label>
                  <label className="fg fg-full">
                    <span>Occasion / Special Details</span>
                    <input type="text" placeholder="e.g. Birthday, Anniversary, Wedding…" value={formData.occasion} onChange={setField("occasion")} />
                  </label>
                  <label className="fg fg-full">
                    <span>Reference Image (optional)</span>
                    <div className="file-drop">
                      <input type="file" accept="image/*" id="ref-img" className="file-input" onChange={e => setRefFile(e.target.files?.[0] ?? null)} />
                      <label htmlFor="ref-img" className="file-label">
                        {refFile ? `✓ ${refFile.name}` : "Click to attach a reference photo"}
                      </label>
                    </div>
                  </label>
                  {status === "error" && <p className="form-err" role="alert">{errMsg}</p>}
                  <button type="submit" className="btn btn-primary btn-full" disabled={status==="sending"}>
                    {status === "sending" ? "Sending…" : "Send Enquiry ✦"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ══════ LIGHTBOX ══════ */}
      {lightbox && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Artwork full view"
          onClick={() => setLightbox(null)}
        >
          <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">✕</button>
          <div className="lightbox-img" onClick={e => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={lightbox} alt="Artwork full view" style={{maxWidth:"90vw", maxHeight:"88vh", objectFit:"contain"}} />
          </div>
        </div>
      )}

      {/* ══════ ALL STYLES ══════ */}
    </>
  );
}
