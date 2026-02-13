# Apple App Store Submission Guide

## Pre-Submission Requirements

### Developer Account Setup
- [ ] Apple Developer Account created ($99/year)
- [ ] Payment method added
- [ ] Developer profile completed
- [ ] App IDs created in Certificates, Identifiers & Profiles
- [ ] Signing certificates generated
- [ ] Provisioning profiles created

### App Configuration
- [ ] App name finalized: "Kingdom Executor"
- [ ] Bundle ID: `space.manus.kingdom.executor.t[timestamp]`
- [ ] Version number: 1.0.0
- [ ] Build number: 1
- [ ] Minimum iOS version: 14.0+
- [ ] Supported devices: iPhone (iPad optional)

### Assets Preparation
- [ ] App icon (1024x1024 PNG, no transparency)
- [ ] Screenshots prepared:
  - iPhone 6.7" (1284x2778) - 5 screenshots
  - iPhone 6.1" (1170x2532) - 5 screenshots
  - iPad Pro 12.9" (2048x2732) - 5 screenshots
- [ ] App preview video (30 seconds, MP4)
- [ ] Privacy policy URL ready
- [ ] Support URL ready

---

## Build Process

### Generate IPA via EAS

```bash
# Login to Expo
eas login

# Build for iOS
eas build --platform ios

# Wait for build completion (20-30 minutes)
# Download IPA from EAS Dashboard
```

### Verify Build
- [ ] IPA file generated successfully
- [ ] File size < 4GB
- [ ] No build errors or warnings
- [ ] Provisioning profile valid

---

## App Store Connect Setup

### Create App Listing

1. **Go to App Store Connect**
   - Navigate to https://appstoreconnect.apple.com
   - Sign in with Apple ID
   - Click "My Apps"

2. **Create New App**
   - Click "+"
   - Select "New App"
   - Choose "iOS"

3. **App Information**
   - [ ] App Name: "Kingdom Executor"
   - [ ] Bundle ID: Select from dropdown
   - [ ] SKU: "KINGDOM-EXECUTOR-001"
   - [ ] User Access: Select appropriate level

---

## App Metadata

### General Information

**App Name:**
```
Kingdom Executor
```

**Subtitle (30 chars max):**
```
Elite Brand Building & AI
```

**Description (4000 chars max):**
```
Kingdom Executor Studio is your complete platform for building an elite 
personal brand rooted in spiritual alignment and authentic identity.

✨ FEATURES:
• Spiritual Identity Foundation - Align with your true purpose
• Premium Brand Studio - AI-powered logo, colors, and voice
• AI Video Generator - Create professional 1-min & 3-min videos
• Customer Psychology Engine - Master emotional selling
• Learn & Grow - Elite branding and monetization courses
• Monetize Module - "How to Get Paid 2 Exist" system
• Intelligent Navigation - Smart routing based on your progress

🎯 PERFECT FOR:
- Entrepreneurs building personal brands
- Content creators and influencers
- Digital product creators
- Coaches and consultants
- Anyone wanting to monetize their authenticity

Built with premium standards. Aligned with highest consciousness.

FEATURES:
- Spiritual alignment framework
- AI-powered branding tools
- Professional video generation
- Customer psychology training
- Revenue stream activation
- Intelligent learning paths
- Real-time analytics

Get paid to exist. Build with authenticity. Scale with integrity.
```

**Keywords (100 chars max):**
```
branding, entrepreneurship, AI, content creation, video, monetization
```

**Support URL:**
```
https://yourdomain.com/support
```

**Privacy Policy URL:**
```
https://yourdomain.com/privacy
```

**Marketing URL (optional):**
```
https://yourdomain.com
```

---

## App Previews & Screenshots

### Screenshots (5 per device type)

**iPhone 6.7" (1284x2778):**
1. Dashboard overview
2. Spiritual Identity screen
3. Brand Studio with AI tools
4. Video Generator interface
5. Monetization dashboard

**iPhone 6.1" (1170x2532):**
(Same 5 screens, optimized for smaller screen)

**iPad Pro 12.9" (2048x2732):**
(Same 5 screens, optimized for tablet)

### App Preview Video (Optional but Recommended)

**Specifications:**
- Duration: 15-30 seconds
- Format: MP4 or MOV
- Resolution: 1920x1080 minimum
- Aspect ratio: 16:9 or 9:16

**Content:**
```
0-3 seconds: App opening with title
3-8 seconds: Key feature 1 (Spiritual Identity)
8-13 seconds: Key feature 2 (Brand Studio)
13-18 seconds: Key feature 3 (Video Generator)
18-23 seconds: Key feature 4 (Monetization)
23-30 seconds: Call to action + app name
```

---

## Pricing & Availability

### Pricing
- [ ] Select pricing tier: Free
- [ ] In-app purchases configured (if applicable)
- [ ] Subscription tiers set up (if applicable)

### Availability
- [ ] Select countries/regions
- [ ] Set release date
- [ ] Configure availability schedule

---

## App Review Information

### Contact Information
- [ ] First Name
- [ ] Last Name
- [ ] Email Address
- [ ] Phone Number
- [ ] URL (support or company website)

### Demo Account (if required)
- [ ] Username: demo@example.com
- [ ] Password: [Secure password]
- [ ] Notes: "Use demo account for testing all features"

### App Review Notes
```
Kingdom Executor is a premium brand-building and content creation platform.

FEATURES OVERVIEW:
1. Spiritual Identity Foundation - Users establish core values and purpose
2. Brand Studio - AI-powered tools for logo, colors, and brand voice
3. Video Generator - Creates professional 1-min and 3-min videos
4. Psychology Module - Teaches customer emotion and sales psychology
5. Learn & Grow - Comprehensive courses on branding and monetization
6. Monetize - Tools for activating revenue streams

THIRD-PARTY SERVICES:
- Kling AI API for video generation
- PostgreSQL database for data persistence
- OAuth for user authentication

SPECIAL NOTES:
- App includes spiritual/consciousness alignment content
- No explicit content or mature themes
- All features work offline where applicable
- Internet required for AI video generation and cloud sync

TESTING INSTRUCTIONS:
1. Launch app and complete spiritual identity questionnaire
2. Navigate to Brand Studio and test AI logo generator
3. Go to Video Generator and create a test video
4. Review Learn & Grow courses
5. Check Monetize module for revenue tracking

The app respects user privacy and does not collect unnecessary data.
```

---

## Content Rating

### Complete IARC Questionnaire
- [ ] Select "Business" category
- [ ] Answer all questions accurately
- [ ] Content rating: 4+ (PEGI) / 4+ (USK)
- [ ] Ads: Yes (if monetizing)
- [ ] In-app purchases: Yes (for premium features)
- [ ] Submit questionnaire

### Age Rating
- [ ] 4+: No mature content
- [ ] 12+: Minimal content concerns
- [ ] 17+: Not applicable
- [ ] 18+: Not applicable

---

## Submission Checklist

### Final Review
- [ ] App name finalized
- [ ] All metadata completed
- [ ] Screenshots uploaded (all device sizes)
- [ ] Privacy policy live and accessible
- [ ] Support URL valid
- [ ] Content rating completed
- [ ] Demo account created (if needed)
- [ ] No placeholder text remaining
- [ ] All links working
- [ ] No external links to app stores

### Build Submission
- [ ] IPA uploaded via Transporter or Xcode
- [ ] Build version selected
- [ ] Release notes added
- [ ] Compliance information verified
- [ ] Encryption compliance confirmed
- [ ] IDFA usage declared (if applicable)

### Submit for Review
- [ ] Review all information one final time
- [ ] Click "Submit for Review"
- [ ] Confirm submission
- [ ] Note submission date/time
- [ ] Monitor email for review status

---

## Review Timeline

| Stage | Duration | Notes |
|-------|----------|-------|
| Initial Review | 24-48 hours | Apple reviews for compliance |
| Metadata Review | 24 hours | Content, description, assets |
| Binary Review | 24-48 hours | Code and functionality testing |
| Final Approval | 2-4 hours | Last checks before release |

**Total Time:** 2-5 days average

---

## Common Rejection Reasons & Solutions

### "App crashes on launch"
- [ ] Test on multiple iOS versions (14.0+)
- [ ] Check Xcode console for errors
- [ ] Verify all dependencies installed
- [ ] Test database connectivity
- [ ] Resubmit with fix

### "Misleading description"
- [ ] Ensure features match description
- [ ] Remove exaggerated claims
- [ ] Add screenshots showing features
- [ ] Be specific about AI capabilities

### "Privacy policy missing or incomplete"
- [ ] Create comprehensive privacy policy
- [ ] Host on secure HTTPS URL
- [ ] Address all data collection
- [ ] Include contact information
- [ ] Update in app and store listing

### "Requires sign-in without clear benefit"
- [ ] Explain why authentication is needed
- [ ] Offer guest/demo mode (if applicable)
- [ ] Make sign-in optional for basic features
- [ ] Clarify data usage

### "Unclear or incomplete metadata"
- [ ] Write clear, specific descriptions
- [ ] Use professional screenshots
- [ ] Ensure all fields completed
- [ ] Avoid marketing jargon
- [ ] Be honest about features

---

## Post-Approval

### After Approval
- [ ] App appears in App Store
- [ ] Monitor user reviews
- [ ] Respond to feedback
- [ ] Track download metrics
- [ ] Monitor crash reports

### Ongoing Maintenance
- [ ] Review analytics weekly
- [ ] Respond to user reviews
- [ ] Plan feature updates
- [ ] Monitor performance metrics
- [ ] Update app regularly (monthly minimum)
- [ ] Maintain iOS compatibility

---

## Marketing After Launch

### Day 1 (Launch Day)
- [ ] Announce on social media
- [ ] Send email to list
- [ ] Share in relevant communities
- [ ] Reach out to influencers

### Week 1
- [ ] Gather initial reviews
- [ ] Fix any critical issues
- [ ] Respond to all reviews
- [ ] Monitor analytics

### Month 1
- [ ] Aim for 500+ downloads
- [ ] Maintain 4.5+ star rating
- [ ] Release first update
- [ ] Plan feature roadmap

---

## Resources

- **App Store Connect**: https://appstoreconnect.apple.com
- **App Store Review Guidelines**: https://developer.apple.com/app-store/review/guidelines/
- **Xcode Documentation**: https://developer.apple.com/xcode/
- **TestFlight**: https://developer.apple.com/testflight/
- **App Analytics**: https://appstoreconnect.apple.com/analytics

---

**Status**: ✅ Ready for Submission

**Next Action**: Build IPA via EAS, then submit following this guide.
