# Supabase Setup Guide (Netlify Integration)

This guide will help you set up Supabase as the database for your Smart Saving App using Netlify's Supabase extension.

## Prerequisites

1. A Supabase account (free at https://supabase.com)
2. A Netlify account (free at https://netlify.com)
3. Node.js and npm installed on your machine

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter a project name (e.g., "smart-saving-app")
5. Enter a database password (save this for later)
6. Choose a region close to you
7. Click "Create new project"

## Step 2: Deploy to Netlify

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [Netlify](https://netlify.com) and sign up/login
3. Click "New site from Git"
4. Connect your repository and deploy your site

## Step 3: Install Supabase Extension

1. In your Netlify dashboard, go to your site's **Site Configuration**
2. In the sidebar, click on **Extensions**
3. Find the **Supabase** extension and click **Install**
4. Click **Connect** to connect your Supabase account
5. Select your Supabase project
6. Choose your framework (React/Vite) or select "Other" for custom configuration
7. Click **Save**

The extension will automatically set up these environment variables:
- `SUPABASE_DATABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_JWT_SECRET`

## Step 4: Set Up the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the contents of `supabase-schema.sql` into the editor
4. Click "Run" to execute the SQL

This will create:
- A `goals` table with all necessary columns
- Row Level Security (RLS) policies
- Indexes for better performance
- Automatic timestamp updates

## Step 5: Test the Setup

1. Your site should automatically redeploy with the new environment variables
2. Visit your Netlify site URL
3. Try creating a new goal
4. Try adding a deposit
5. Check that data appears in your Supabase dashboard under **Table Editor** > **goals**

## Step 6: Local Development (Optional)

For local development, you can create a `.env` file with the same environment variables:

```env
SUPABASE_DATABASE_URL=your_project_url_here
SUPABASE_ANON_KEY=your_anon_key_here
```

You can find these values in your Netlify dashboard under **Site Configuration** > **Environment variables**.

## Step 7: Remove json-server (Optional)

Since you're now using Supabase, you can remove the json-server dependency:

```bash
npm uninstall json-server
```

You can also delete the `db.json` file if you want.

## Troubleshooting

### Common Issues:

1. **"Invalid API key" error**
   - Check that the Supabase extension is properly installed in Netlify
   - Verify the environment variables are set in your Netlify dashboard
   - Make sure you're using the correct Supabase project

2. **"Failed to load goals" error**
   - Verify your Supabase URL is correct in the Netlify environment variables
   - Check that the `goals` table was created successfully in Supabase
   - Ensure RLS policies are set up correctly

3. **Environment variables not working**
   - Check your Netlify dashboard under **Site Configuration** > **Environment variables**
   - Make sure the Supabase extension is connected and configured
   - Try redeploying your site after setting up the extension

4. **CORS errors**
   - Supabase handles CORS automatically, but if you see CORS errors, check your browser's developer console for more details

### Getting Help:

- Check the [Supabase documentation](https://supabase.com/docs)
- Visit the [Supabase community](https://github.com/supabase/supabase/discussions)
- Check the browser console for detailed error messages

## Security Notes

- The current setup allows all operations on the goals table
- For production, you should implement proper authentication and more restrictive RLS policies
- Never commit your `.env` file to version control
- The `anon` key is safe to use in client-side code, but the `service_role` key should never be exposed

## Next Steps

Once Supabase is working, you can:

1. Add user authentication
2. Implement real-time updates
3. Add more sophisticated RLS policies
4. Set up database backups
5. Add analytics and monitoring 