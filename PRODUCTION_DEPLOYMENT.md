# Kingdom Executor Studio - Production Deployment Guide

**Domain:** energyessence2.store  
**Platform:** Vercel  
**Mode:** Free Tier (All Features Accessible)  
**Status:** Ready for Deployment

---

## Quick Start Deployment

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Authenticate with Vercel

```bash
vercel login
```

### Step 3: Deploy to Production

```bash
cd /home/ubuntu/kingdom-executor-mobile
vercel --prod
```

Vercel will:
- Build the project
- Deploy to production
- Provide a deployment URL
- Show deployment status

---

## Step 4: Configure Custom Domain

### Option A: Using Vercel's Domain Management (Recommended)

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select "Kingdom Executor Studio" project
3. Go to **Settings → Domains**
4. Click **Add Domain**
5. Enter: `energyessence2.store`
6. Vercel will show DNS configuration options:
   - **Option 1:** Change nameservers to Vercel's (easiest)
   - **Option 2:** Add DNS records manually (if keeping current registrar)

### Option B: Manual DNS Configuration

If you want to keep your current domain registrar:

1. In Vercel dashboard, select **Add Domain** → **Use External Nameserver**
2. Vercel will provide DNS records to add:
   - A Record: `@` → `76.76.19.21`
   - CNAME Record: `www` → `cname.vercel-dns.com`

3. Go to your domain registrar (GoDaddy, Namecheap, etc.)
4. Update DNS records with the values from Vercel
5. Wait 24-48 hours for DNS propagation
6. Verify in Vercel dashboard when domain is active

---

## Step 5: Set Production Environment Variables

In Vercel Dashboard:

1. Go to **Settings → Environment Variables**
2. Add the following:

```
JWT_SECRET = [Generated secure random string - see below]
NODE_ENV = production
NEXT_PUBLIC_APP_URL = https://energyessence2.store
```

### Generate JWT_SECRET

Run this command in terminal:
```bash
openssl rand -base64 32
```

Copy the output and paste it as `JWT_SECRET` value in Vercel.

---

## Step 6: Verify Deployment

1. Visit `https://energyessence2.store` in your browser
2. Verify the app loads correctly
3. Test key features:
   - Navigation works
   - Spiritual companion loads
   - Dashboard displays correctly
   - Video generator accessible
   - All modules functional

---

## Production Configuration Summary

### What's Enabled (Free Tier)
✅ All app features accessible to all users  
✅ Spiritual Identity Foundation  
✅ Brand Studio tools  
✅ Video Generator (Kling AI ready)  
✅ Psychology Module  
✅ Learn & Grow Academy  
✅ Monetize Module  
✅ Community features  
✅ Analytics dashboard  
✅ Real-time updates  

### What's Disabled (Free Mode)
❌ Payment processing (Stripe)  
❌ Subscription tiers  
❌ Email service (optional)  
❌ Premium features gating  

### Database
- Uses local SQLite storage
- No external database required
- Data persists on user device
- Optional: Can add PostgreSQL later

---

## Post-Deployment Checklist

- [ ] Domain resolves to EnergyEssence3.com
- [ ] SSL certificate active (green lock icon)
- [ ] App loads without errors
- [ ] Navigation works on all screens
- [ ] Spiritual companion displays
- [ ] Video generator accessible
- [ ] All modules functional
- [ ] Mobile responsive on all devices
- [ ] Dark mode works correctly
- [ ] Analytics dashboard accessible

---

## Monitoring & Maintenance

### View Deployment Logs
```bash
vercel logs kingdom-executor-studio
```

### View Real-time Logs
```bash
vercel logs kingdom-executor-studio --follow
```

### Redeploy After Changes
```bash
vercel --prod
```

### Rollback to Previous Deployment
1. Go to Vercel dashboard
2. Select project
3. Go to **Deployments**
4. Find previous deployment
5. Click **Promote to Production**

---

## Troubleshooting

### Domain Not Resolving
- Wait 24-48 hours for DNS propagation
- Clear browser cache and DNS cache
- Check DNS records in Vercel dashboard

### App Not Loading
- Check Vercel deployment logs
- Verify environment variables are set
- Check browser console for errors

### Features Not Working
- Verify all dependencies installed: `pnpm install`
- Check server logs: `vercel logs`
- Ensure JWT_SECRET is set correctly

---

## Future Enhancements

When ready to add paid features:

1. **Add Stripe Integration**
   - Set `STRIPE_SECRET_KEY` in Vercel
   - Enable subscription system
   - Configure payment webhooks

2. **Add Email Service**
   - Set `SENDGRID_API_KEY` in Vercel
   - Enable email affirmations
   - Configure email templates

3. **Add Database**
   - Set `DATABASE_URL` in Vercel
   - Configure PostgreSQL
   - Enable cloud sync

---

## Support & Documentation

- **Vercel Docs:** https://vercel.com/docs
- **Expo Docs:** https://docs.expo.dev
- **React Native Docs:** https://reactnative.dev

---

**Deployment Date:** April 5, 2026  
**Status:** Production Ready  
**Version:** 1.0.0
