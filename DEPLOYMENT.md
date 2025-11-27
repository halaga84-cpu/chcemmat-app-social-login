# 🚀 ChcemMať.sk - Deployment Guide

## 📋 Prerequisites

Before deploying, ensure you have:
- ✅ Supabase project created at https://vrbynghjgqbiczweuvel.supabase.co
- ✅ Resend account with API key for email functionality
- ✅ GitHub account (for GitHub deployments)
- ✅ Vercel account (for Vercel deployments)

## 🔧 Environment Variables

### Required Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://vrbynghjgqbiczweuvel.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
RESEND_API_KEY=your_resend_api_key
```

### Where to Add Environment Variables

#### Option 1: Vercel Dashboard
1. Go to your Vercel project settings
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable with its value
4. Make sure to select **Production**, **Preview**, and **Development** environments

#### Option 2: Vercel CLI
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add RESEND_API_KEY
```

## 🎯 Deployment Methods

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Configure deployment settings"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click **"Add New Project"**
   - Import your GitHub repository
   - Vercel will automatically detect Next.js

3. **Configure Environment Variables:**
   - Add all environment variables in the project settings
   - Or they will be read from `vercel.json` if configured

4. **Deploy:**
   - Click **"Deploy"**
   - Vercel will build and deploy automatically

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

### Method 3: Deploy via GitHub Integration

1. **Connect GitHub to Vercel:**
   - Vercel will auto-deploy on every push to `main` branch
   - Preview deployments for pull requests

2. **Automatic Deployments:**
   - Push to `main` → Production deployment
   - Create PR → Preview deployment

## ✅ Post-Deployment Checklist

After deployment, verify:

- [ ] Website loads at your Vercel URL
- [ ] Supabase authentication works (login/register)
- [ ] Social login (Google/Facebook) works
- [ ] Contact form sends emails via Resend
- [ ] Wishlist creation and sharing works
- [ ] Item reservation functionality works
- [ ] Dark/light theme toggle works
- [ ] Language switcher (SK/EN) works

## 🔐 Supabase Configuration

### Database Tables
Ensure these tables exist in your Supabase project:
- `profiles` - User profiles
- `wishlists` - Wishlist data
- `items` - Wishlist items
- `reservations` - Item reservations

### Authentication Providers
Configure in Supabase Dashboard → Authentication → Providers:
- ✅ Email/Password
- ✅ Google OAuth
- ✅ Facebook OAuth

### Redirect URLs
Add these to Supabase → Authentication → URL Configuration:
- `http://localhost:3000/api/auth/callback` (development)
- `https://your-domain.vercel.app/api/auth/callback` (production)

## 📧 Resend Configuration

### Edge Function Secret
The Resend API key is stored as an Edge Function secret:

```bash
# List secrets
supabase functions list-secrets

# Add secret (if not exists)
supabase functions add-secret RESEND_API_KEY=re_W3Pg6kJR_CQed5PSEnVoUedaQwA7a2H16
```

### Verified Domain
Ensure `chcemmat.sk` is verified in your Resend dashboard for sending emails.

## 🐛 Troubleshooting

### Build Fails with "Missing Supabase environment variables"
- Verify all environment variables are added in Vercel settings
- Check `vercel.json` has correct values
- Redeploy after adding variables

### Authentication Not Working
- Check Supabase redirect URLs include your Vercel domain
- Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
- Check browser console for errors

### Contact Form Fails
- Verify `RESEND_API_KEY` is set in Vercel and Supabase Edge Function
- Check Edge Function is deployed: `supabase functions list`
- Test locally: `supabase functions serve send-contact-email`

### Social Login Fails
- Verify OAuth redirect URIs in Google/Facebook developer consoles
- Check Supabase authentication settings
- Ensure callback URL matches: `/api/auth/callback`

## 📱 Domain Configuration

### Custom Domain Setup
1. Go to Vercel → Project Settings → Domains
2. Add your custom domain (e.g., `chcemmat.sk`)
3. Configure DNS records as instructed by Vercel
4. Update Supabase redirect URLs to include custom domain

## 🔄 Continuous Deployment

### Automatic Deployments
- **Production:** Push to `main` branch
- **Preview:** Create pull request
- **Rollback:** Use Vercel dashboard to rollback to previous deployment

### Build Performance
- Average build time: 2-3 minutes
- Next.js optimizations enabled
- Image optimization with Vercel Image CDN

## 📊 Monitoring

### Vercel Analytics
- Built-in analytics available in Vercel dashboard
- Monitor page views, performance, and errors

### Supabase Monitoring
- Database usage in Supabase dashboard
- Auth logs and user activity
- Edge Function invocations

## 🆘 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check Supabase logs
3. Review browser console errors
4. Contact support at support@chcemmat.sk

---

**Last Updated:** 2025-11-27
**Version:** 1.0.0