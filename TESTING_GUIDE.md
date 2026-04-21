# Cherry Chue — Testing Guide

Run through this checklist before every deployment. Zero issues should remain.

---

## 1. Build Test (Critical — must pass)

```bash
npm run build
```

✅ Expected output:
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Generating static pages (7/7)
Route (app)   Size   First Load JS
○ /           ~14kB  ~110kB
○ /privacy    ~179B  ~96kB
○ /terms      ~179B  ~96kB
ƒ /api/enquiry  0B   0B
```

❌ If build fails:
- Run `npx tsc --noEmit` to see TypeScript errors
- Run `npx next lint` to see ESLint errors
- Fix the reported file and line number

---

## 2. Local Dev Test

```bash
npm run dev
```

Open http://localhost:3000

### Homepage
- [ ] Page loads without console errors (open DevTools → Console)
- [ ] Fonts load correctly (Cormorant Garamond for headings, DM Sans for body)
- [ ] Hero section: three animated text lines appear with stagger
- [ ] Hero: floating paint blobs animate smoothly
- [ ] Hero: paintbrush decorative element visible on right side (desktop)
- [ ] Hero: floating paint specks drift slowly
- [ ] Custom paintbrush cursor visible and tracks mouse (desktop)
- [ ] Scroll down: elements reveal with fade-up animation
- [ ] Nav becomes frosted glass on scroll

### Navigation
- [ ] Logo click → scrolls to top
- [ ] About link → scrolls to About section
- [ ] Gallery link → scrolls to Gallery section
- [ ] Reviews link → scrolls to Reviews section
- [ ] Contact link → scrolls to Contact section
- [ ] "Commission Art" button → opens enquiry modal
- [ ] On mobile (< 860px): hamburger menu appears
- [ ] Hamburger opens/closes the mobile nav correctly
- [ ] Mobile nav links work and close the menu on tap

### About Section
- [ ] Artist photo displays (or placeholder if not added yet)
- [ ] Spinning "100+ Pieces" badge visible
- [ ] "Custom Art", "Portraits", "Gifts" tags display
- [ ] "Get Your Custom Art" button opens enquiry modal

### Gallery Section
- [ ] 4 category cards display: Pencil Sketch, Watercolor, Oil Painting, Custom Works
- [ ] Each card shows a preview image
- [ ] Card hover: image zooms, overlay with count + arrow appears
- [ ] Click "Pencil Sketch" → shows all 17 pencil artworks
- [ ] Click "Watercolor" → shows all 5 watercolor artworks
- [ ] Click "Oil Painting" → shows all 18 oil painting artworks
- [ ] Click "Custom Works" → shows all 72 custom artworks
- [ ] In expanded view: "← All Categories" button returns to category grid
- [ ] In expanded view: artwork images load progressively
- [ ] Click any artwork → lightbox opens with full-size image
- [ ] Lightbox: click outside or ✕ button closes it
- [ ] Lightbox: Escape key closes it
- [ ] "Commission Similar" button in expanded view opens modal with correct type pre-filled
- [ ] "Commission a [Category]" CTA at bottom of expanded view works

### Process Section
- [ ] Dark background section loads
- [ ] 4 process steps display
- [ ] Video plays (autoplay, muted, looping)
- [ ] Gold frame accent visible on video
- [ ] "Start Your Journey" button opens modal

### Reviews Section
- [ ] Two rows of testimonial cards scroll automatically
- [ ] Top row scrolls left, bottom row scrolls right
- [ ] 14 unique names in top row, 14 in bottom row (no repeats)
- [ ] Coloured avatar circles for each reviewer
- [ ] Cards show on hover: lift + rose border

### Contact Section
- [ ] 3 contact cards: WhatsApp, Instagram, Email
- [ ] NO phone number, email address, or username visible in card text
- [ ] WhatsApp card → opens WhatsApp chat link
- [ ] Instagram card → opens Instagram profile
- [ ] Email card → opens email client
- [ ] "Send an Enquiry" button opens modal

### Enquiry Modal
- [ ] Modal opens with animation
- [ ] Clicking backdrop (outside modal) closes it
- [ ] ✕ button closes it
- [ ] Escape key closes it
- [ ] Full Name: rejects if contains numbers (e.g. "Raj3") → shows error
- [ ] Full Name: accepts if letters only (e.g. "Raj Kumar")
- [ ] Email: rejects invalid format → shows error
- [ ] Email: accepts valid format (e.g. test@gmail.com)
- [ ] Phone: rejects if not exactly 10 digits → shows error
- [ ] Phone: accepts 10-digit number; field is optional
- [ ] Art Type: required — shows error if left blank
- [ ] Describe Your Vision: required — shows error if blank
- [ ] Occasion: optional, no validation
- [ ] Reference Image: optional file attach works
- [ ] Submit with all valid data → "Sending…" state appears
- [ ] On success → success screen with cherry chue logo star
- [ ] Check cherrychue98@gmail.com — enquiry email received with all fields
- [ ] Check sender's email (the one entered in form) — auto-reply received
- [ ] Auto-reply comes from Cherry Chue / Sheema, not cherrychue98@gmail.com

### Pre-fill Test
- [ ] Click "Commission Similar" on a "Watercolor" artwork → modal opens with Art Type = "Watercolor"
- [ ] Click "Commission Art" in hero → Art Type is blank

### Footer
- [ ] Privacy Policy link → opens /privacy page
- [ ] Terms & Conditions link → opens /terms page
- [ ] Gallery link → scrolls to gallery
- [ ] Contact link → scrolls to contact
- [ ] XO Graphics link → opens https://www.xographics.in/ in new tab
- [ ] © 2025 Cherry Chue text visible

### Privacy Policy Page (/privacy)
- [ ] Page loads without errors
- [ ] "Cherry Chue" logo in nav links back to home
- [ ] "← Back to Home" links back to home
- [ ] All 10 sections display with numbered headings
- [ ] Same cream/rose colour theme as homepage
- [ ] Footer XO Graphics link → opens xographics.in
- [ ] Page title in browser tab shows "Privacy Policy | Cherry Chue"

### Terms & Conditions Page (/terms)
- [ ] Page loads without errors
- [ ] All 11 sections display
- [ ] Same colour theme as homepage
- [ ] Page title shows "Terms & Conditions | Cherry Chue"

---

## 3. Responsive / Mobile Test

Resize browser or use DevTools device simulation:

| Breakpoint | Test |
|-----------|------|
| 480px (phone) | Hero text readable, CTA buttons stack vertically |
| 600px (small tablet) | Gallery shows 2 columns |
| 720px (tablet) | About grid goes single column |
| 860px (large tablet) | Hamburger menu appears |
| 1200px (desktop) | Full layout, brush decoration visible |

- [ ] No horizontal scroll on any screen width
- [ ] Touch targets (buttons) are at least 44×44px on mobile
- [ ] Modal is usable on mobile (scrollable, close button accessible)
- [ ] Gallery lightbox works on mobile (full-screen image)

---

## 4. Performance Check

In Chrome: DevTools → Lighthouse → Run for Desktop and Mobile

Target scores:
- Performance: > 85
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 95

Common quick wins if score is low:
- Ensure images are not over 2MB each
- The gallery images (112 images) use lazy loading — only first 8 load eagerly

---

## 5. SEO Check

- [ ] Browser tab title: "Cherry Chue | Handcrafted Art — Custom Portraits, Sketches & Paintings"
- [ ] Right-click → View Page Source → find `<meta name="description"` — content is present
- [ ] Share homepage URL in WhatsApp or Telegram — OG image (Cherry Chue logo) should appear
- [ ] Google Search Console: submit sitemap after first deploy

---

## 6. Email Deliverability Check

- [ ] Enquiry email lands in inbox (not spam) at cherrychue98@gmail.com
- [ ] If going to spam: in Gmail → mark as "Not spam" → add sender to contacts
- [ ] Auto-reply to client arrives within seconds
- [ ] Both emails render correctly (HTML tables, colours, fonts)
- [ ] Mobile email clients (Gmail app) render correctly

---

## 7. Known Acceptable Behaviours

These are expected and not errors:

- **Paintbrush cursor** appears as a crosshair on mobile/tablet (touch devices) — correct, custom CSS cursors don't work on touch
- **Gallery images** load progressively — intentional lazy loading for performance
- **Process video** autoplays muted — correct, browsers require muted for autoplay
- **Testimonial marquee** pauses on hover — not implemented (acceptable, not required)
- **Watercolor category** has only 5 images vs 17–72 in others — reflects the actual artwork distribution from the ZIP

---

## 8. Pre-Deployment Final Checklist

Before pushing to GitHub and deploying:

- [ ] `npm run build` passes with zero errors
- [ ] All images display locally
- [ ] Enquiry form sends email successfully (with `.env.local` set)
- [ ] WhatsApp number is correct
- [ ] Artist photo (`sheema.jpg`) is updated to actual photo
- [ ] Process video is updated to actual video (or placeholder is acceptable)
- [ ] Vercel environment variables (`GMAIL_USER`, `GMAIL_PASS`, `TO_EMAIL`) are set in Vercel dashboard
- [ ] Custom domain is configured (if applicable)

---

## 9. Post-Deployment Verification

After Vercel deployment completes:

```bash
# Test the live form (replace with your actual domain)
curl -X POST https://cherry-chue.vercel.app/api/enquiry \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","artType":"Watercolor","vision":"Test submission"}'
```

Expected response: `{"success":true}`

- [ ] Check cherrychue98@gmail.com for the test email
- [ ] Live URL loads correctly in an incognito window
- [ ] All gallery images load on the live URL (not just locally)
- [ ] Mobile view works on an actual phone

---

## 10. Troubleshooting

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Form submission fails on Vercel | `GMAIL_PASS` not set | Add env var in Vercel dashboard → Redeploy |
| Images not showing on Vercel | Files not committed to git | Run `git add . && git commit && git push` |
| Build fails with TypeScript error | Type mismatch in code | Run `npx tsc --noEmit` and fix reported errors |
| Git push rejected | Local branch behind remote | Run `git pull origin main --rebase` then push |
| Gallery category missing images | Images not in correct folder | Check `public/gallery/[category]/` folder |
| Fonts look wrong | Google Fonts blocked by adblocker | System fallback fonts (Georgia, sans-serif) are the backup |
| Cursor not showing as brush | Touch/mobile device | Expected — CSS cursors don't work on touch |
