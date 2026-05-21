# Deploying the AI Career Quiz

A 20-minute walkthrough from zero to live URL with leads landing in Airtable.

---

## Step 1 — Set up your Airtable base (5 min)

### 1.1 Create the base
1. Go to [airtable.com](https://airtable.com) and create a new base (or open an existing one).
2. Rename the default table to **`Leads`** (or any name — you'll set it as an env var later).

### 1.2 Create these exact field names in your `Leads` table

| Field name | Field type |
|---|---|
| `Name` | Single line text |
| `Email` | Email |
| `WhatsApp` | Phone number (or Single line text) |
| `Role` | Single line text |
| `Result` | Single select (options: `builder`, `automation`, `data`, `creative`, `growth`) |
| `Builder Score` | Number |
| `Automation Score` | Number |
| `Data Score` | Number |
| `Creative Score` | Number |
| `Growth Score` | Number |
| `Answers` | Long text |
| `Source` | Single line text |

> Field names are **case-sensitive** and must match exactly. The app uses Airtable's `typecast` option, so it will auto-create new options for `Result` if needed — but the field names themselves can't be renamed without updating `lib/airtable.ts`.

### 1.3 Get your Airtable credentials

**Personal Access Token:**
1. Visit [airtable.com/create/tokens](https://airtable.com/create/tokens) → **Create new token**
2. Name: `Career Quiz`
3. Scopes: ✅ `data.records:write` (and `data.records:read` if you want to read later)
4. Access: pick your base
5. Click **Create**, then copy the token (it starts with `pat...`). **Save it — you can't see it again.**

**Base ID:**
1. Open your base in the browser. The URL looks like `https://airtable.com/appXXXXXXXXXXXXXX/...`
2. The `appXXXXXXXXXXXXXX` part is your `AIRTABLE_BASE_ID`.

---

## Step 2 — Deploy to Vercel (3 min)

### 2.1 Push to GitHub (already done if you used the existing repo)
```bash
git push
```

### 2.2 Import the repo to Vercel
1. Go to [vercel.com/new](https://vercel.com/new).
2. Click **Import Git Repository** → select your repo (`ai-career-quiz`).
3. Framework preset: **Next.js** (auto-detected).
4. Don't deploy yet — first add env vars.

### 2.3 Set environment variables
In the Vercel "Configure Project" screen, expand **Environment Variables** and add:

| Name | Value |
|---|---|
| `AIRTABLE_TOKEN` | `pat...` (your token from Step 1.3) |
| `AIRTABLE_BASE_ID` | `app...` (your base ID from Step 1.3) |
| `AIRTABLE_TABLE_NAME` | `Leads` (or whatever you named your table) |

### 2.4 Click **Deploy**
Vercel will build and give you a live URL like `ai-career-quiz-xxxx.vercel.app`. Done.

### 2.5 (Optional) Custom domain
In your Vercel project → **Settings → Domains** → add your domain. Vercel gives you the DNS records to copy into your registrar (or Cloudflare). SSL is auto.

---

## Step 3 — Test the end-to-end flow

1. Open your live URL.
2. Take the quiz.
3. On the result page, fill in the lead capture form.
4. Open your Airtable base — the lead should appear within seconds.

If it doesn't:
- Check Vercel → **Deployments → [latest] → Functions logs** for errors.
- Most common issue: a field name in Airtable doesn't match exactly (case + spacing matter).

---

## Local development

```bash
cp .env.example .env.local
# Paste your AIRTABLE_TOKEN and AIRTABLE_BASE_ID into .env.local
npm install
npm run dev
```

Open http://localhost:3000.

Without env vars set, the API runs in **demo mode** — leads are logged to the terminal instead of saved.

---

## What changed when we deployed?

- **Frontend** (landing, quiz, result page) is served by Vercel's edge network globally.
- **API** (`/api/leads`) runs as a Vercel serverless function, gets the form POST, and forwards it to Airtable.
- **Your DigitalOcean droplet** is untouched — keep it for other projects.

## Updating the quiz later

Just push to GitHub:
```bash
git add . && git commit -m "Update quiz copy" && git push
```
Vercel auto-deploys within ~60 seconds. No SSH, no rebuilds, no downtime.

---

## Where things live in the code

| File | What it does |
|---|---|
| `lib/quiz.ts` | All questions, scoring, result copy |
| `lib/airtable.ts` | Airtable adapter (field mapping lives here) |
| `app/api/leads/route.ts` | Form-submit endpoint |
| `components/IdentityCard.tsx` | The Career Identity Card |
| `components/Hero.tsx` | Landing hero with kinetic typography |
| `components/ResultCard.tsx` | Result page layout |
