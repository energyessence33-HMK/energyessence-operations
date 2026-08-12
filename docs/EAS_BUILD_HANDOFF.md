# EAS Build & Play Store Handoff Guide

## Purpose and Security Boundary

This guide provides the exact sequence for completing the **owner-controlled** Android build and Play Store release for Kingdom Executor Studio. In accordance with platform governance, all authentication, secret handling, builds, and store submissions remain under the account owner's direct control. No credentials, tokens, or automated publishing commands are executed by the AI agent.

---

## 1. Project Initialization & EAS Configuration

The project is pre-configured with Expo SDK 54 and linked to the owner's EAS project ID:
- **Project ID:** `e841d939-383f-49d1-98c2-5b88cc9c203d`
- **Application ID:** `space.manus.kingdom.executor.mobile.t20260210`
- **Display Name:** `Kingdom Executor`
- **Live Platform Endpoint:** `https://thoughtos-dripo8be.manus.space`

---

## 2. Owner-Controlled Authentication & Build Sequence

### Step 1: Install EAS CLI Globally (if not already installed)
```bash
npm install --global eas-cli
```

### Step 2: Authenticate with Expo / EAS
Open Microsoft Edge or your preferred browser, navigate to the Expo sign-in page, and complete the sign-in flow under your account:
```bash
eas login
```

### Step 3: Link or Verify EAS Project ID
If prompted to link the project in your local repository, associate it with the existing EAS project ID:
```bash
eas init --id e841d939-383f-49d1-98c2-5b88cc9c203d
```

### Step 4: Configure Build Profiles (`eas.json`)
Ensure your `eas.json` is configured for production Android builds (App Bundle `.aab` for Google Play):
```json
{
  "cli": {
    "version": ">= 12.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

### Step 5: Trigger the Owner-Controlled Android Build
Run the production build command in your terminal. EAS will manage the secure cloud build process and provide a downloadable `.aab` artifact:
```bash
eas build --platform android --profile production
```

---

## 3. Google Play Store Submission Checklist

1. **Internal Testing Track:** Upload the generated `.aab` bundle to the Google Play Console **Internal Testing** track first.
2. **Device Smoke Test:** Install the test build on a physical Android device to verify:
   - Five-group task-first navigation
   - Agent Opus video asset library rendering
   - Four-domain external links (`essencepulse.store`, `hitmaking.store`, `hitmaking.co.za`, `thought2ponder.store`)
   - High-frequency theme tokens and anime-pixel visual styling
3. **Store Listing & Metadata:** Complete store graphics, feature screenshots, description, and privacy-policy URLs.
4. **Data Safety & Permissions:** Declare `POST_NOTIFICATIONS` and audio permissions accurately in the Play Console Data Safety form.
5. **Production Promotion:** Once internal testing passes, promote the release candidate to the **Production** track.
