# Kingdom Executor Studio — Approval Packets

## Governing rule

These packets are **proposals, not authorizations**. An execution packet may proceed only after a named human approver accepts the stated scope, risk level, expected effects, validation method, and rollback posture. Every execution must be bound to an approval record and audit event.

| Packet | Provider | Risk level | Proposed action | Current state |
|---|---|---|---|---|
| AP-001 | Shopify | L3 | Normalize selected catalog metadata after record-level review. | Awaiting human approval. |
| AP-002 | Slack | L4 | Reauthorize connector OAuth and confirm granted scopes. | Blocked pending user connection. |
| AP-003 | Notion | L3 | Create a governed audit/archive page after reviewing destination and content. | Awaiting human approval. |
| AP-004 | GitHub | L4 | Configure CI/CD secrets and repository publication workflow. | Blocked pending secret and explicit approval. |
| AP-005 | Production | L4 | Reconcile database configuration and conduct staging deployment verification. | Blocked pending architecture decision. |
| AP-006 | Stripe | L4 | Enable payment processing. | Explicitly deferred by free-access mode. |

## AP-001 — Shopify catalog normalization

| Field | Proposed control |
|---|---|
| Objective | Standardize vendor spelling and product-type taxonomy only for exact, reviewed product records. |
| Evidence | The read-only reconciliation showed vendor variations such as `HitMa'KING` and `HitmaKING`, plus inconsistent singular/plural product types. |
| Required precondition | Produce a record-level diff showing product ID, current field, proposed field, reason, storefront/SEO impact, and recovery value. |
| Execution boundary | No pricing, inventory, media, description, publication, channel, order, customer, or discount changes. |
| Validation | Re-read each changed product and compare the intended metadata values. |
| Rollback | Restore each field from the pre-approved diff; retain the approval and result reference. |
| Approval required | Yes — named owner approval for the exact product list. |

## AP-002 — Slack OAuth recovery

| Field | Proposed control |
|---|---|
| Objective | Restore Slack connector access for operational alerts. |
| Evidence | Capability discovery returned an expired or invalid OAuth authorization error. |
| Required precondition | User completes provider reauthorization and reviews the requested OAuth scopes. |
| Execution boundary | No messages, channel changes, app installations, membership actions, or automations are authorized by this packet. |
| Validation | Run a single read-only capability or workspace check after connection succeeds. |
| Rollback | Revoke the connector authorization if the granted scope is broader than approved. |
| Approval required | Yes — permission change is L4. |

## AP-003 — Notion audit archive

| Field | Proposed control |
|---|---|
| Objective | Create a named, user-visible audit archive page in the confirmed workspace location. |
| Evidence | Read-only identity verification succeeded for Energy Essence’s Space; create/update permissions are available. |
| Required precondition | Confirm page title, parent page or workspace location, and approved document set. |
| Execution boundary | Create or update the single approved page only; do not modify existing databases, permissions, comments, folders, or views. |
| Validation | Re-fetch the created page and compare its content against the approved source. |
| Rollback | Archive or delete only after a separate explicit approval; otherwise retain as an auditable record. |
| Approval required | Yes — external knowledge-base write is L3. |

## AP-004 — GitHub CI/CD configuration

| Field | Proposed control |
|---|---|
| Objective | Configure required CI/CD secret references and optional release automation for the selected repository. |
| Evidence | Read-only access to `energyessence33-HMK/energyessence-operations` on `main` was verified. |
| Required precondition | User provides or securely configures the exact required credentials, selects the repository and environment, and approves each secret scope. |
| Execution boundary | No branch protection changes, release publication, deployment, workflow trigger, repository visibility change, or collaborator change without separate approval. |
| Validation | Inspect workflow configuration and run only an approved non-production validation path. |
| Rollback | Remove only the specifically approved secret/workflow change, with a documented replacement plan. |
| Approval required | Yes — permission and deployment implications make this L4. |

## AP-005 — Production database alignment and staging verification

| Field | Proposed control |
|---|---|
| Objective | Resolve the conflict between PostgreSQL-formatted production configuration and MySQL2 runtime driver, then validate the chosen architecture in staging. |
| Evidence | `.env.production` reports a PostgreSQL URL protocol while `server/db.ts` uses `drizzle-orm/mysql2`. |
| Required precondition | Owner selects MySQL-compatible or PostgreSQL-compatible production architecture; deployment variables and migrations are reviewed accordingly. |
| Execution boundary | No live deployment, database replacement, data migration, DNS change, or Vercel environment mutation under this packet alone. |
| Validation | Staging health check, migration verification, auth check, dashboard data query, audit-event write/read test, and rollback rehearsal. |
| Rollback | Restore the prior staging environment variables and migration state according to a pre-approved runbook. |
| Approval required | Yes — production and data risk make this L4. |

## AP-006 — Stripe payment enablement

| Field | Proposed control |
|---|---|
| Objective | Enable payment processing only when the product strategy changes from free access. |
| Evidence | The application is currently operating in the user-approved free-access mode. |
| Required precondition | Explicit commercial decision, product/pricing definition, compliance review, production credentials, and post-payment support process. |
| Execution boundary | No customer, payment-intent, subscription, refund, or payout action without a separate transaction-level authorization. |
| Validation | Isolated test-mode integration, webhook signature validation, and reconciliation review. |
| Rollback | Disable payment entry points and revoke integration access if approved rollout criteria are not met. |
| Approval required | Yes — financial operations are L4. |
