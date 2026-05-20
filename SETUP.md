# AI Career Quiz — Setup Guide

## Quick start (local, no Supabase)

```bash
npm install
npm run dev
```

Open http://localhost:3000. The quiz runs fully without Supabase — lead saves are logged to the console in demo mode.

---

## Supabase setup (for lead collection)

### 1. Create a Supabase project

Go to https://supabase.com and create a new project.

### 2. Run the SQL script

In your Supabase project, open the **SQL Editor** and run the contents of `supabase/schema.sql`.

### 3. Add environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Server-only (for lead inserts and admin API — more secure than anon key)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Optional: protect the /admin page
ADMIN_PASSWORD=your-admin-password
```

Find these values in your Supabase dashboard under **Project Settings → API**.

### 4. Restart the dev server

```bash
npm run dev
```

---

## Deployment (Vercel)

1. Push the repo to GitHub
2. Import into Vercel
3. Add the same environment variables in the Vercel dashboard
4. Deploy

---

## Admin page

Visit `/admin` and enter your `ADMIN_PASSWORD` to view all leads in a table.

If `ADMIN_PASSWORD` is not set, the admin page will reject all requests.

---

## Editing the quiz

Everything quiz-related lives in **`lib/quiz.ts`**:

| What to edit | Where |
|---|---|
| Questions & answer choices | `QUESTIONS` array |
| Scoring per answer | `scores` field inside each answer object |
| Result path copy | `RESULT_PATHS` object |
| Tie-breaker order | `PATH_ORDER` array |
| Path colours & icons | `color`, `gradient`, `icon` fields in `RESULT_PATHS` |

---

## Project structure

```
app/
  page.tsx              — Landing page
  quiz/page.tsx         — Quiz flow
  result/page.tsx       — Result page
  api/leads/route.ts    — Lead save API
  api/admin/leads/      — Admin leads API
  admin/page.tsx        — Admin UI

components/
  Hero.tsx              — Landing hero section
  ProofSection.tsx      — Stats/proof cards section
  WhyNowSection.tsx     — "Who it's for" + "What you'll discover"
  QuizCard.tsx          — Single question card + navigation
  AnswerOption.tsx      — Individual answer button
  ProgressBar.tsx       — Animated progress bar
  ResultCard.tsx        — Full result page content
  LeadCaptureForm.tsx   — Email/name capture form
  PathBadge.tsx         — Coloured path label pill

lib/
  quiz.ts               — All quiz data, scoring logic
  supabase.ts           — Supabase client (gracefully degrades)
  utils.ts              — cn() helper

supabase/
  schema.sql            — SQL to create the leads table
```
