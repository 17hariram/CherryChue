# Cherry Chue — Setup & Deployment Instructions

## Overview
Next.js 14 + React 18. Zero external UI/animation libs — pure CSS animations, no dependency conflicts.

---

## Step 1 — Prerequisites
- **Node.js v18+** → https://nodejs.org
- **Git** → https://git-scm.com
- **GitHub account** → https://github.com
- **Vercel account** → https://vercel.com (sign up free with GitHub)

---

## Step 2 — Install Dependencies

```bash
cd cherry-chue
npm install
```

Installs only: next, react, react-dom, nodemailer. No peer conflicts.

---

## Step 3 — Set Up Gmail App Password

The enquiry form emails land at cherrychue98@gmail.com via Gmail SMTP.

1. Go to Google Account → Security → 2-Step Verification (enable if needed)
2. Search "App passwords" → https://myaccount.google.com/apppasswords
3. App: Mail | Device: Other → name it "Cherry Chue" → Generate
4. Copy the 16-character password

Create `.env.local` in the project root:

```
GMAIL_USER=sheemaphotos03@gmail.com
GMAIL_PASS=SheemavsPhotos@03
TO_EMAIL=cherrychue98@gmail.com
```

> Remove spaces from the App Password. Never commit this file (it's in .gitignore).

---

## Step 4 — Test Locally

```bash
npm run dev
```
Open http://localhost:3000 and test the enquiry form.

```bash
npm run build
```
Must complete with no errors before pushing.

---

## Step 5 — Push to GitHub

### NEW repo (first time):

```bash
git init
git add .
git commit -m "Initial commit — Cherry Chue website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/CherryChue.git
git push -u origin main
```

### EXISTING repo (your situation — fixing the rejected push):

Your error was: `! [rejected] main -> main (non-fast-forward)`
GitHub had commits your local copy didn't have. Fix:

```bash
git pull origin main --rebase
git push origin main
```

If conflicts appear during rebase:
```bash
# Edit conflicted files, then:
git add .
git rebase --continue
git push origin main
```

### Every future update:
```bash
git add .
git commit -m "Describe what changed"
git push origin main
```
Vercel auto-redeploys on every push to main.

---

## Step 6 — Deploy on Vercel

1. Go to https://vercel.com → sign in with GitHub
2. Click **Add New Project** → Import **CherryChue**
3. Vercel auto-detects Next.js — keep default settings
4. **Before clicking Deploy** → open **Environment Variables** and add:

| Name | Value |
|------|-------|
| `GMAIL_USER` | `sheemaphotos03@gmail.com` |
| `GMAIL_PASS` | `password` |
| `TO_EMAIL` | `cherrychue98@gmail.com` |

5. Click **Deploy** → wait ~2 minutes
6. Site live at `https://your-project.vercel.app`

### Custom Domain:
Vercel Dashboard → Project → Settings → Domains → Add Domain → follow DNS instructions from your registrar.

---

## Step 7 — Replace Placeholder Images

**Artist photo** — replace `/public/assets/sheema.jpg` with Sheema's actual photo (portrait, 600×800px+):
```bash
git add public/assets/sheema.jpg
git commit -m "Add artist photo"
git push origin main
```

**Process video** — replace `/public/assets/process.mp4` with your own MP4 video (max 30MB):
```bash
git add public/assets/process.mp4
git commit -m "Add process video"
git push origin main
```

---

## Step 8 — Update WhatsApp Number

Search for `918072888570` in `app/page.tsx` and `app/api/enquiry/route.ts`. Replace with new number (no + or spaces).

---

## Quick Reference

| Task | Command |
|------|---------|
| Run locally | `npm run dev` |
| Build check | `npm run build` |
| Push update | `git add . && git commit -m "msg" && git push` |
| View emails | Check cherrychue98@gmail.com |
| View logs | Vercel dashboard → Functions tab |
