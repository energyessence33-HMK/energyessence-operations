# Kingdom Executor Studio - Deployment to energyessence2.store

**Status:** Production Ready  
**Domain:** energyessence2.store  
**Platform:** Vercel  
**Mode:** Free Tier (All Features Accessible)

---

## Overview

Kingdom Executor Studio is fully configured and ready to deploy to your domain. This guide provides step-by-step instructions for deployment.

---

## Deployment Method: Vercel

Vercel is the recommended platform for deploying this Expo/React Native web app.

### Why Vercel?
✅ Free tier available  
✅ Automatic SSL certificates  
✅ Global CDN  
✅ Serverless functions support  
✅ Easy custom domain setup  
✅ Automatic deployments from Git  

---

## Step 1: Create Vercel Account (if needed)

1. Go to https://vercel.com
2. Click "Sign Up"
3. Choose authentication method (GitHub, GitLab, Bitbucket, or email)
4. Complete signup

---

## Step 2: Import Project to Vercel

### Option A: From GitHub (Recommended)

1. Push project to GitHub repository
2. Go to https://vercel.com/dashboard
3. Click "Add New" → "Project"
4. Select "Import Git Repository"
5. Authorize Vercel to access your GitHub account
6. Select the kingdom-executor-mobile repository
7. Click "Import"

### Option B: Upload Project Files

1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Select "Deploy from Git" or upload files directly
4. Follow the prompts

---

## Step 3: Configure Project Settings

In Vercel Dashboard:

1. **Project Name:** Kingdom Executor Studio
2. **Framework:** Expo (or Auto-detect)
3. **Build Command:** `pnpm build`
4. **Output Directory:** `dist` (or auto-detected)
5. **Install Command:** `pnpm install`

---

## Step 4: Set Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables:

Add the following variables:

```
JWT_SECRET = p4Ic8dieo+meRqNxdBv5dmnVc3j9ZcTdQgEwiOIOztM=
NODE_ENV = production
NEXT_PUBLIC_APP_URL = https://energyessence2.store
```

**Note:** If you need a different JWT_SECRET, generate one:
```bash
openssl rand -base64 32
```

---

## Step 5: Deploy

1. In Vercel Dashboard, click "Deploy"
2. Wait for build to complete (typically 2-5 minutes)
3. Once complete, you'll see a deployment URL
4. Click the preview link to verify deployment

---

## Step 6: Configure Custom Domain

### In Vercel Dashboard:

1. Go to Project Settings → **Domains**
2. Click "Add Domain"
3. Enter: `energyessence2.store`
4. Vercel will show DNS configuration options

### Option A: Use Vercel Nameservers (Easiest)

1. Vercel will provide 4 nameservers
2. Go to your domain registrar (GoDaddy, Namecheap, etc.)
3. Update nameservers to Vercel's:
   - ns1.vercel-dns.com
   - ns2.vercel-dns.com
   - ns3.vercel-dns.com
   - ns4.vercel-dns.com
4. Wait 24-48 hours for DNS propagation
5. Vercel will automatically verify and activate

### Option B: Add DNS Records Manually

If you want to keep your current registrar:

1. In Vercel, select "Use External Nameserver"
2. Vercel will show DNS records to add:
   - **A Record:** @ → 76.76.19.21
   - **CNAME Record:** www → cname.vercel-dns.com
3. Go to your domain registrar
4. Add these DNS records
5. Wait 24-48 hours for propagation

---

## Step 7: Verify Deployment

Once DNS propagates:

1. Visit `https://energyessence2.store` in your browser
2. Verify the app loads correctly
3. Check for SSL certificate (green lock icon)
4. Test key features:
   - ✅ Navigation works
   - ✅ Spiritual companion loads
   - ✅ Dashboard displays
   - ✅ Video generator accessible
   - ✅ All modules functional
   - ✅ Dark mode works
   - ✅ Mobile responsive

---

## What's Included in This Deployment

### ✅ Enabled Features (Free Tier)
- Dashboard with ecosystem management
- Spiritual Identity Foundation
- Brand Studio with AI tools
- Video Generator (Kling AI ready)
- Customer Psychology Module
- Learn & Grow Academy
- Monetize Module
- Community features
- Analytics dashboard
- Real-time updates
- All navigation and UI elements

### ❌ Disabled Features (Free Mode)
- Payment processing (Stripe)
- Subscription tiers
- Email service (optional)
- Premium feature gating

---

## Post-Deployment Checklist

- [ ] Domain resolves to energyessence2.store
- [ ] SSL certificate active (green lock)
- [ ] App loads without errors
- [ ] All navigation working
- [ ] Spiritual companion displays
- [ ] Video generator accessible
- [ ] All modules functional
- [ ] Mobile responsive
- [ ] Dark mode works
- [ ] Analytics dashboard accessible

---

## Monitoring & Maintenance

### View Deployment Status
1. Go to Vercel Dashboard
2. Select project
3. Go to "Deployments" tab
4. View current and previous deployments

### View Logs
1. Click on a deployment
2. Scroll to "Build Logs" or "Runtime Logs"
3. View any errors or warnings

### Redeploy After Changes
1. Make changes to code
2. Push to GitHub (if using Git integration)
3. Vercel automatically redeploys
4. Or manually click "Redeploy" in Vercel Dashboard

### Rollback to Previous Version
1. Go to Deployments
2. Find previous deployment
3. Click "Promote to Production"

---

## Troubleshooting

### Domain Not Resolving
- **Issue:** Domain shows "Not Found"
- **Solution:** 
  - Wait 24-48 hours for DNS propagation
  - Clear browser cache: Ctrl+Shift+Delete
  - Try incognito/private browsing
  - Check DNS records in Vercel dashboard

### App Shows Build Error
- **Issue:** "Build failed" message
- **Solution:**
  - Check build logs in Vercel
  - Verify all dependencies installed
  - Check environment variables are set
  - Ensure Node.js version compatible

### Features Not Working
- **Issue:** Buttons don't respond, features unavailable
- **Solution:**
  - Check browser console for errors (F12)
  - Verify all environment variables set
  - Check Vercel runtime logs
  - Clear browser cache and reload

### SSL Certificate Issues
- **Issue:** "Not Secure" warning
- **Solution:**
  - Wait for Vercel to provision certificate (24-48 hours)
  - Refresh browser
  - Try different browser
  - Check Vercel dashboard for certificate status

---

## Future Enhancements

### Add Payment Processing
When ready to monetize:
1. Create Stripe account
2. Set `STRIPE_SECRET_KEY` in Vercel environment
3. Enable subscription system in app
4. Configure payment webhooks

### Add Email Service
When ready for email affirmations:
1. Create SendGrid account
2. Set `SENDGRID_API_KEY` in Vercel environment
3. Enable email system in app
4. Configure email templates

### Add Database
When ready for cloud sync:
1. Create PostgreSQL database (Supabase, AWS RDS, etc.)
2. Set `DATABASE_URL` in Vercel environment
3. Enable cloud sync in app
4. Configure database backups

---

## Support & Resources

- **Vercel Documentation:** https://vercel.com/docs
- **Expo Documentation:** https://docs.expo.dev
- **React Native Documentation:** https://reactnative.dev
- **Project Repository:** [Your GitHub URL]

---

## Summary

Your Kingdom Executor Studio app is production-ready and configured for deployment to energyessence2.store. Follow the steps above to deploy and configure your custom domain.

**Estimated Time:** 15-30 minutes for deployment + 24-48 hours for DNS propagation

**Questions?** Refer to the troubleshooting section or contact Vercel support.

---

**Last Updated:** April 5, 2026  
**Version:** 1.0.0  
**Status:** Ready for Production
