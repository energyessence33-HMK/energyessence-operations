# Google Play Release Handoff

## Purpose and approval boundary

This handoff describes the **owner-controlled** release route for Kingdom Executor. It does not authorize an app-store submission, production release, paid action, account-permission change, or external publication. Those steps remain L4 actions and must be completed by the account owner through the relevant publishing interfaces.

> **Current posture:** release configuration and static validation have passed. An Android build, real-device smoke test, Play Console metadata review, and track promotion remain owner-controlled release gates.

## Validated local release evidence

| Area | Observed result | Evidence status |
|---|---|---|
| Unit and governance regressions | 14 test files and 32 tests passed | TESTED |
| TypeScript | `pnpm check` passed with no diagnostics | TESTED |
| Lint | `pnpm lint` passed | TESTED |
| API production bundle | `pnpm build` passed; `dist/index.js` emitted | TESTED |
| Mobile branding assets | Icon, splash icon, favicon, adaptive foreground/background, and monochrome asset are present | TESTED |
| Android configuration | App name, immutable slug, package, launcher icons, portrait orientation, and version resolve correctly through Expo configuration | TESTED |
| Store package / live release | No Android App Bundle was created or uploaded; no Play Console record was changed | PLANNED |

## Current release identity

| Field | Current value | Owner check before release |
|---|---|---|
| Display name | Kingdom Executor | Confirm this is the final store-facing name. |
| Immutable project slug | `kingdom-executor-mobile` | Do not change unless project identity is intentionally migrated. |
| Version | `1.0.0` | Set the intended first-release version only when the release decision is approved. |
| Android application ID | `space.manus.kingdom.executor.mobile.t20260210` | Confirm that this is the package identity to reserve permanently in the Play Console before the first upload. |
| Icon system | Local branded icon plus adaptive foreground/background/monochrome assets | Inspect the actual Android build on a device before submission. |
| Android adaptive background | `#06090F` | Matches the approved midnight-black visual system. |
| Target web domain | `energyessence2.store` | Verify production routing, TLS, privacy-policy URL, and deep-link ownership separately. |

## Owner-controlled release sequence

1. **Review the release checkpoint.** Confirm that the current version is the approved release candidate and that no unapproved connector, credential, or social-publication action is included.
2. **Open the project management interface and select Publish.** Use the platform-managed Android build path rather than attempting a manual local Android build. This creates the release artifact under the owner’s control.
3. **Install and test the generated Android artifact.** Perform a short smoke test on a physical Android device: launch, sign-in/session handling, five-group navigation, four-domain external links, generated social-draft rendering, and recovery from offline or expired-session states.
4. **Prepare the Play Console app record.** In the owner’s Google Play Console account, create or select the application matching the application ID above. Enter the store listing, category, contact details, privacy-policy URL, content rating, target audience, and data-safety answers based on the features actually enabled in this release.
5. **Review permissions and disclosures.** The resolved Android configuration includes notification support and audio-related permissions from installed audio features. Declare only data collection, sharing, permissions, and feature use that are true for the submitted build. Remove or disable unused features before submission rather than making an inaccurate disclosure.
6. **Upload to a test track first.** Upload the platform-generated Android artifact to an internal or closed testing track, complete the owner-facing review, and distribute only to designated testers. Capture functional findings and policy warnings before proceeding.
7. **Promote only after explicit L4 approval.** When test results, privacy disclosures, screenshots, store metadata, and Google’s automated checks are acceptable, the owner may promote the exact tested artifact to production in Play Console.
8. **Record the outcome.** Add the artifact version, Play track, release date, policy-review result, rollback approach, and any production URL or listing reference to the audit register. Do not record credentials, account tokens, payments, or personal tester data.

## Required store materials

| Material | Source / owner action | Status |
|---|---|---|
| Signed Android release artifact | Generate through the project’s Publish flow | BLOCKED on owner-controlled build |
| Store title and short/full descriptions | Final owner-reviewed copy | PLANNED |
| Screenshots and feature graphic | Capture from the tested Android build | PLANNED |
| Privacy policy | Publish a truthful policy at a stable HTTPS URL | PLANNED |
| Data safety and content rating | Complete from actual release behavior and permissions | PLANNED |
| App access / account instructions | Provide only if review requires authenticated access | PLANNED |
| Test-track evidence | Owner-controlled tester feedback and issue log | PLANNED |

## Non-negotiable controls

- **Do not paste provider credentials, store passwords, API keys, or webhook URLs into the app, build notes, source control, or release forms.**
- **Do not promote a test artifact that has not been checked on a physical Android device.**
- **Do not claim social posting, payments, Printify fulfilment, or automation capabilities unless the exact submitted build exposes them truthfully and their approval gates are active.**
- **Do not imply scientific, medical, financial, or supernatural outcomes in store copy.** Scripture, interpretation, AI inference, and technical facts must remain clearly distinguishable.
- **Use Google Play Console’s current policy prompts as the authoritative source at submission time.** Policies and required fields may change after this handoff is written.

## Rollback posture

If production review or post-release behavior identifies a critical issue, halt promotion of the current track, retain the previous approved artifact, and prepare a corrected version with an incremented Android version code through the owner-controlled build path. Record the release decision and verification evidence in the governed audit trail.
