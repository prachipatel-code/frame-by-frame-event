# Frame By Frame 2027 – Event Management Platform

**Short Film & Documentary Festival**  
23–24 January 2027 · Suchitra Cinema and Cultural Academy, Bengaluru

Built with Next.js 15, Prisma, Neon PostgreSQL, Auth.js, Resend, and QR tickets.

## Deploy on Vercel (no terminal needed)

### 1. Neon database
1. Go to https://neon.tech and create a project.
2. Copy the connection string (starts with `postgresql://`).

### 2. Resend (emails)
1. Go to https://resend.com and create an API key.

### 3. Import this repo in Vercel
1. Go to https://vercel.com → Add New → Project.
2. Import `prachipatel-code/frame-by-frame-event`.
3. **Before deploying**, open **Environment Variables** and add:

| Name | Value |
|------|-------|
| `DATABASE_URL` | your Neon connection string |
| `AUTH_SECRET` | any long random string (32+ characters) |
| `NEXT_PUBLIC_APP_URL` | `https://your-project.vercel.app` |
| `RESEND_API_KEY` | your Resend API key |
| `RESEND_FROM_EMAIL` | `onboarding@resend.dev` |
| `RESEND_FROM_NAME` | `Frame By Frame 2027` |

### 4. Deploy
Click **Deploy**.

### 5. After first deploy – create tables
Because Prisma needs the database schema, you have two easy options:

**Option A (recommended)**  
In the Neon dashboard → SQL Editor, we will provide a one-click schema soon.  
For now, after deploy succeeds, go to Vercel → your project → Settings → Environment Variables and make sure `DATABASE_URL` is set, then trigger a Redeploy. The build runs `prisma generate`.

**Option B**  
Use Neon’s connection and run migrations from any computer that has Node later, or ask me to add a browser-based setup page.

### Admin login (after seed)
- URL: `https://your-site.vercel.app/admin`
- Email: `prachiiip06@gmail.com`
- Password: `Admin@12345`  
(Change this password after first login.)

## What works in Phase 1
- Public site (Home, About, Agenda, Speakers, Venue, Contact, Register)
- Open registration with unique ticket + QR code
- Confirmation email via Resend
- Ticket page + public verification page
- Admin login + dashboard with live counts

## Repo
https://github.com/prachipatel-code/frame-by-frame-event
