# Supabase Backend Configuration Guide

This directory contains the database migration for the **Anthony Riel C. Diango Portfolio** contact form backend.

---

## 1. Applying the Database Migration

### Option A: Via the Supabase Web Dashboard (Recommended)

1. Open your project dashboard at [supabase.com](https://supabase.com/dashboard).
2. In the left sidebar, navigate to the **SQL Editor**.
3. Click **New Query**.
4. Copy and paste the entire contents of:
   - [`supabase/migrations/20261118000000_create_messages_table.sql`](./migrations/20261118000000_create_messages_table.sql)
   - [`supabase/migrations/20261118000001_create_site_settings_table.sql`](./migrations/20261118000001_create_site_settings_table.sql)
5. Click **Run** (or press `Ctrl+Enter`).
6. You will see a success message: `Success. No rows returned`.

### Option B: Via the Supabase CLI

If you have linked your Supabase project locally:
```bash
supabase db push
```

---

## 2. Retrieving Your Project Credentials

1. In your Supabase Dashboard, navigate to **Project Settings** (gear icon at bottom left).
2. Click **API** in the settings menu.
3. Locate the following two values under **Project API keys**:
   - **Project URL**: e.g. `https://xyzcompany.supabase.co`
   - **anon / public key**: a long alphanumeric JWT string starting with `eyJ...`
4. **Security Notice**: Never use the `service_role` key in your frontend. Only use the `anon` public key.

---

## 3. Configuring Local Environment (`.env.local`)

In the root of the portfolio project, create a file named `.env.local` (which is excluded from Git via `.gitignore`):

```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Once saved:
- Restart your Vite dev server (`npm run dev`).
- The contact form will automatically switch from **"Graceful Mail Fallback"** mode to **"Direct API Form"** mode.
- Submissions will be inserted directly into your `messages` table in PostgreSQL.

---

## 4. Configuring Production Environment (Render / Vercel)

When deploying to Render or Vercel:
1. In your hosting dashboard, go to your project's **Environment Variables** settings.
2. Add:
   - `VITE_SUPABASE_URL`: Your Supabase Project URL.
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase Anon/Public Key.
3. Trigger a redeploy.

---

## 5. Security & Row-Level Security (RLS) Verification

The migration enforces strict Row-Level Security:
- **Anonymous Visitors (`anon`)**: Can only `INSERT` new messages (validated for non-empty name, email regex format, and 10+ character message). They cannot read, update, or delete any messages.
- **Authenticated Admins (`authenticated`)**: Can view, triage, update status (`new` -> `read` -> `replied`), and delete messages.
- **Data Exposure Protection**: Even if a malicious actor inspects network requests, they cannot query other users' contact inquiries.
