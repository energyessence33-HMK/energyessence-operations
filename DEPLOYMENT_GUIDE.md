# Kingdom Executor Studio - Production Deployment Guide

**Domain:** EnergyEssence3.com  
**Platform:** Vercel  
**Database:** PostgreSQL  
**Status:** Ready for Production

---

## 1. Pre-Deployment Checklist

- [x] All features implemented and tested
- [x] Privacy policy and terms of service created
- [x] Email verification service configured
- [x] Accessibility features implemented
- [x] Rate limiting configured
- [x] Performance optimized
- [x] vercel.json configuration created
- [ ] Domain DNS configured
- [ ] Environment variables set in Vercel
- [ ] Database backups configured
- [ ] Monitoring and alerts set up

---

## 2. Domain Configuration (EnergyEssence3.com)

### Step 1: Point Domain to Vercel

1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Update DNS records to point to Vercel:
   - **Type:** A Record
   - **Name:** @
   - **Value:** 76.76.19.21
   - **Type:** CNAME
   - **Name:** www
   - **Value:** cname.vercel-dns.com

Or use Vercel's nameservers:
- ns1.vercel-dns.com
- ns2.vercel-dns.com
- ns3.vercel-dns.com
- ns4.vercel-dns.com

### Step 2: Configure in Vercel Dashboard

1. Go to vercel.com/dashboard
2. Select Kingdom Executor Studio project
3. Go to Settings → Domains
4. Add domain: EnergyEssence3.com
5. Add www subdomain: www.EnergyEssence3.com
6. Vercel will automatically provision SSL certificate

---

## 3. Environment Variables Setup

### In Vercel Dashboard:

Go to Settings → Environment Variables and add:

```
DATABASE_URL=postgresql://user:password@host:port/kingdom_executor
JWT_SECRET=your-secret-key-min-32-characters
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx (or sk_live_xxxxx for production)
KLING_ACCESS_KEY=your-kling-access-key
KLING_SECRET_KEY=your-kling-secret-key
NODE_ENV=production
```

---

## 4. Database Configuration

### PostgreSQL Setup:

1. **Local Development:**
   ```bash
   pnpm db:push  # Apply migrations
   ```

2. **Production Database:**
   - Use managed PostgreSQL (AWS RDS, DigitalOcean, Heroku Postgres, or Supabase)
   - Update DATABASE_URL in Vercel environment variables
   - Run migrations: `pnpm db:push`

3. **Backup Strategy:**
   - Enable automated daily backups
   - Keep 30-day backup retention
   - Test restore procedures monthly

---

## 5. Deployment Steps

### Option A: Deploy via Vercel CLI (Recommended)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Link project to Vercel
cd /home/ubuntu/kingdom-executor-mobile
vercel link

# 4. Deploy to production
vercel --prod

# 5. Verify deployment
vercel env list
```

### Option B: Deploy via GitHub (Recommended for Continuous Deployment)

1. Push code to GitHub repository
2. Connect GitHub to Vercel:
   - Go to vercel.com/dashboard
   - Click "New Project"
   - Select GitHub repository
   - Configure build settings
   - Deploy

---

## 6. Post-Deployment Configuration

### SSL Certificate

- Vercel automatically provisions Let's Encrypt SSL
- Renews automatically every 90 days
- Verify: https://EnergyEssence3.com

### Email Configuration (SendGrid)

1. Create SendGrid account: sendgrid.com
2. Generate API key
3. Add to Vercel environment variables
4. Test email sending:
   ```bash
   pnpm test:email
   ```

### Payment Processing (Stripe)

1. Create Stripe account: stripe.com
2. Get API keys (test mode first)
3. Add to Vercel environment variables
4. Test payment flow in Stripe dashboard
5. Switch to live keys when ready

### Monitoring & Analytics

1. **Vercel Analytics:**
   - Automatic performance monitoring
   - Real-time deployment logs
   - Error tracking

2. **Application Monitoring:**
   - Set up error tracking (Sentry)
   - Configure performance monitoring (DataDog)
   - Set up uptime monitoring (UptimeRobot)

---

## 7. Security Checklist

- [x] HTTPS/SSL enabled
- [x] Security headers configured (vercel.json)
- [x] Rate limiting implemented
- [x] Input validation enabled
- [x] CORS configured
- [x] Environment variables secured
- [ ] Web Application Firewall (WAF) enabled
- [ ] DDoS protection configured
- [ ] Regular security audits scheduled

---

## 8. Performance Optimization

### Vercel Edge Caching

```javascript
// Set cache headers in vercel.json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600"
        }
      ]
    }
  ]
}
```

### Image Optimization

- Use Vercel Image Optimization
- Automatic WebP conversion
- Responsive image serving

### Database Query Optimization

- Add indexes to frequently queried columns
- Implement connection pooling
- Cache frequently accessed data

---

## 9. Monitoring & Maintenance

### Daily Tasks

- Monitor error logs
- Check uptime status
- Review performance metrics

### Weekly Tasks

- Review analytics
- Check database performance
- Monitor API response times

### Monthly Tasks

- Security audit
- Backup verification
- Performance review
- Update dependencies

---

## 10. Scaling Strategy

### Phase 1: Initial Launch (0-1,000 users)
- Single Vercel deployment
- PostgreSQL on managed service
- SendGrid free tier

### Phase 2: Growth (1,000-10,000 users)
- Enable Vercel Edge Functions
- Implement Redis caching
- Upgrade SendGrid plan

### Phase 3: Scale (10,000+ users)
- Multi-region deployment
- Database replication
- CDN for static assets
- Load balancing

---

## 11. Troubleshooting

### Deployment Fails

```bash
# Check build logs
vercel logs

# Verify environment variables
vercel env list

# Check dependencies
pnpm install

# Clear cache and redeploy
vercel --prod --force
```

### Database Connection Issues

```bash
# Test database connection
psql $DATABASE_URL -c "SELECT 1"

# Check connection pool
pnpm db:status

# Migrate database
pnpm db:push
```

### Email Not Sending

```bash
# Verify SendGrid API key
echo $SENDGRID_API_KEY

# Test email service
pnpm test:email

# Check SendGrid logs
# Go to sendgrid.com/mail/logs
```

---

## 12. Rollback Procedure

If deployment has critical issues:

```bash
# Rollback to previous deployment
vercel rollback

# Or redeploy specific commit
vercel --prod --target=production
```

---

## 13. Contact & Support

**Vercel Support:** vercel.com/support  
**SendGrid Support:** sendgrid.com/support  
**Stripe Support:** stripe.com/support  

---

## 14. Next Steps After Deployment

1. **Verify Website:**
   - Visit https://EnergyEssence3.com
   - Test all features
   - Check mobile responsiveness

2. **Set Up Email:**
   - Configure SendGrid API key
   - Test daily affirmation emails
   - Set up welcome sequence

3. **Configure Payments:**
   - Create Stripe account
   - Set up subscription plans
   - Test payment flow

4. **Marketing Launch:**
   - Create landing page
   - Set up email capture
   - Launch social media campaign

5. **Monitor Performance:**
   - Set up analytics
   - Monitor uptime
   - Track user engagement

---

**Deployment Status:** ✅ READY FOR PRODUCTION

Your Kingdom Executor Studio is configured and ready to deploy to EnergyEssence3.com!
