# EA-001 Credential Rotation Handoff

## Purpose

This handoff provides the exact operating sequence for the credential-containment decision. It intentionally excludes credential values, account numbers, token labels, personal details, payout data, and screenshot content.

> **Approval condition:** This sequence may be executed only after the owner explicitly approves **EA-001**. The application can record a readiness preflight, but it cannot and must not rotate or revoke provider credentials on its own.

| Step | Responsible party | Action | Evidence to retain | Stop condition |
|---|---|---|---|---|
| 1 | Owner | Identify active applications, CI jobs, webhooks, and integrations that depend on the affected provider credentials. | Consumer inventory without secret values. | Any unknown consumer remains. |
| 2 | Owner | Generate replacement credentials inside the provider dashboard with the smallest valid scope. | Creation timestamp and scope summary only. | Scope includes payout, customer, payment, or destructive access without a specific need. |
| 3 | Approved system owner | Store replacement values through secure server-side configuration only. | Environment-variable names and deployment target; never values. | A value appears in chat, source, client config, screenshot, or log. |
| 4 | Owner | Run a bounded, read-only health check against the intended provider capability. | Timestamp, operation name, non-sensitive result summary. | Health check fails or returns unexpected scope. |
| 5 | Owner | Revoke superseded credentials in the provider dashboard. | Revocation timestamp and affected integration category. | An active consumer has not passed the health check. |
| 6 | System | Re-scan source and audit artifacts; refresh the integration register. | Clean scan result and updated verification timestamp. | Secret-like data remains or provider health is degraded. |

## Non-negotiable boundaries

The replacement credential must never be placed in the mobile app, client bundle, source repository, documentation, test fixtures, plain-text configuration, issue comments, or chat. The first permitted app-side use is a server-only read-only health check whose response is reduced to non-sensitive status metadata.

## Post-rotation evidence standard

The completion record must contain the provider, action category, role, timestamp, verification result, and rollback/cutover reference. It must not contain a credential value, partial value, identifier, user record, payment record, bank data, or screenshot.
