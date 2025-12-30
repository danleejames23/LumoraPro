# Supabase Database Setup Guide

This guide will help you set up a free Supabase PostgreSQL database for your Netlify deployment.

## Why Supabase?

- **Free tier**: 500MB database, unlimited API requests
- **PostgreSQL compatible**: All existing queries work without changes
- **No code rewrite needed**: Just update the connection string
- **Automatic backups**: Daily backups on free tier

## Step 1: Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" and sign up (GitHub login recommended)
3. Create a new organization if prompted

## Step 2: Create a New Project

1. Click "New Project"
2. Fill in:
   - **Name**: `lumora-pro` (or your preferred name)
   - **Database Password**: Generate a strong password and **save it somewhere safe**
   - **Region**: Choose the closest to your users
3. Click "Create new project"
4. Wait 2-3 minutes for the project to be provisioned

## Step 3: Get Your Connection String

1. In your Supabase dashboard, go to **Settings** (gear icon) → **Database**
2. Scroll down to **Connection string** section
3. Select **URI** tab
4. Copy the connection string
5. Replace `[YOUR-PASSWORD]` with your database password

Your connection string will look like:
```
postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
```

## Step 4: Initialize the Database Schema

1. In Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click "New query"
3. Copy the entire contents of `database/init.sql` from this project
4. Paste it into the SQL editor
5. Click "Run" to execute

This creates all the required tables:
- `customers` - User accounts
- `quotes` - Quote requests
- `projects` - Active projects
- `invoices` - Billing invoices
- `payment_methods` - Saved payment methods
- `billing_settings` - Billing preferences
- `project_files` - File management
- `github_repositories` - GitHub integrations
- `messages` - Customer communications
- `notifications` - System notifications
- `admin_users` - Admin accounts

## Step 5: Configure Netlify Environment Variables

1. Go to your Netlify dashboard
2. Select your site → **Site settings** → **Environment variables**
3. Add the following variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Your Supabase connection string |
| `JWT_SECRET` | A random 32+ character string |
| `NEXT_PUBLIC_BASE_URL` | Your Netlify site URL (e.g., `https://your-site.netlify.app`) |
| `ADMIN_EMAIL` | Your admin email address |
| `NODE_ENV` | `production` |

Optional (for email functionality):
| Variable | Value |
|----------|-------|
| `SENDGRID_API_KEY` | Your SendGrid API key |
| `FROM_EMAIL` | Your sender email |
| `FROM_NAME` | Your business name |

## Step 6: Redeploy Your Site

1. In Netlify, go to **Deploys**
2. Click "Trigger deploy" → "Deploy site"
3. Wait for the build to complete

## Step 7: Test the Connection

1. Visit your site's `/api/check-database` endpoint
2. You should see a success message if connected properly

## Troubleshooting

### "Connection refused" or timeout errors
- Make sure you're using the **pooler** connection string (contains `pooler.supabase.com`)
- Check that your password doesn't contain special characters that need URL encoding

### "SSL required" errors
- The app automatically enables SSL for Supabase connections
- No action needed

### "Relation does not exist" errors
- Run the `database/init.sql` script in Supabase SQL Editor
- Make sure all queries executed successfully

### Password issues
- If your password contains special characters like `@`, `#`, `$`, etc., URL-encode them:
  - `@` → `%40`
  - `#` → `%23`
  - `$` → `%24`
  - `%` → `%25`

## Data Migration (Optional)

If you have existing data in your Docker database that you want to migrate:

1. Export from Docker PostgreSQL:
   ```bash
   docker exec -t your-container pg_dump -U freelance_user freelance_website > backup.sql
   ```

2. Import to Supabase:
   - Go to SQL Editor in Supabase
   - Paste and run the backup SQL

## Security Notes

- Never commit your `DATABASE_URL` to version control
- Use Netlify environment variables for all secrets
- The connection string contains your database password - keep it private
- Supabase provides Row Level Security (RLS) if you need additional security

## Support

- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
