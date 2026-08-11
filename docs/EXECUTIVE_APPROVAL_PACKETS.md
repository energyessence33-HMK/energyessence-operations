# Executive Approval Packets

## Decision rule

These packets are **proposals, not authorizations**. Each requires explicit confirmation by packet ID before any external change is attempted. No credentials, payment information, personal data, or values visible in uploaded screenshots are copied into this document.

| Packet | Decision | Risk level | Present evidence | Approval outcome required |
|---|---|---:|---|---|
| EA-001 | Rotate exposed Shopify credentials and revoke affected automation tokens | L4 | Multiple uploaded screenshots display provider secret and token material. | Confirm provider-side rotation and revocation. |
| EA-002 | Establish a Printify read-only health adapter | L3 | Provider context supplied; no connector or safe credential is configured. | Approve a server-side, least-privilege credential request after EA-001 is complete. |
| EA-003 | Reauthorize direct Slack operations | L3 | Direct Slack authorization is invalid; no messages were read. | Approve reauthorization only; no message or channel action. |
| EA-004 | Create a Notion executive-audit archive | L3 | Notion workspace identity and writing capability are verified. | Approve creation of one named archive page or database at a user-specified location. |
| EA-005 | Identify the Vercel production target | L3 | Verified Vercel team has no returned project. | Supply or approve linking the intended Vercel project; no deployment, domain, or protection change. |
| EA-006 | Configure GitHub operational secrets and approval environment | L4 | Repository access is verified; workflow now gates deployment and notifications. | Approve exact secret names and protected-environment configuration; no release or deployment. |
| EA-007 | Reconcile Shopify catalog and digital-product delivery metadata | L3 | Aggregate catalog evidence confirms 136 products; the supplied market research presents unverified delivery issues. | Approve a read-only product-sample report first; any record change needs a separate packet. |

## EA-001 — credential containment and rotation

**Objective.** Treat the values exposed in screenshots as compromised. Rotate the corresponding Shopify client secret and automation tokens within the provider dashboard, revoke superseded credentials, and confirm that only intended active integrations remain.

**External effect.** Existing applications, webhooks, CI jobs, or automations that use the revoked values may stop working until updated with newly generated credentials.

**Rollback posture.** Credential rotation is intentionally not reversible. Continuity is achieved through an approved cutover plan: enumerate active consumers, stage replacement values server-side, validate read-only health, then revoke legacy material.

**Verification.** A post-rotation health check must confirm that no secret is present in source control, client bundles, logs, screenshots, or mobile configuration. The new value must be supplied only through secure environment configuration, never through chat or source files.

## EA-002 — Printify read-only health adapter

**Objective.** Add a server-only Printify adapter limited to shop identity, catalog count, and fulfilment health metadata. The mobile client receives summaries only.

**Preconditions.** EA-001 is complete; a new least-privilege Printify token exists; provider scopes are documented; no payout, payment, or customer-data scope is granted.

**External effect.** The adapter reads provider metadata only. It does not create, modify, publish, fulfil, cancel, or delete any Printify resource.

**Verification.** The integration register displays a timestamped health result, bounded latency, and non-sensitive count/summary fields. A failed call must degrade the status without retry loops or user-data exposure.

## EA-003 — Slack reauthorization

**Objective.** Restore the direct Slack connector for future operational alerting.

**Preconditions.** A channel, purpose, retention expectation, recipients, and approval level are named. Default authorization must be limited to the necessary workspace scopes.

**External effect.** Reauthorization changes integration access only. This packet does not send messages, create channels, change profiles, or invite users.

**Verification.** A single read-only identity/health check succeeds. Any notification workflow requires a separate execution packet.

## EA-004 — Notion executive-audit archive

**Objective.** Create one knowledge destination for audit reports, approval records, and immutable references.

**Preconditions.** The user identifies the target parent page or authorizes a new top-level page. The archive schema must distinguish `PLANNED`, `SCAFFOLDED`, `IMPLEMENTED`, `TESTED`, `INTEGRATED`, `STAGING VERIFIED`, `PRODUCTION VERIFIED`, and `BLOCKED`.

**External effect.** One page or database is created. No existing pages, databases, permissions, files, or records are modified.

**Verification.** The created URL, owner, and schema are recorded in the application audit log. Any recurring sync remains disabled pending a separate approval.

## EA-005 — Vercel production target discovery

**Objective.** Resolve the mismatch between the intended deployment target and the verified Vercel team, which currently returns no projects.

**Preconditions.** The user supplies the correct Vercel project URL/slug or confirms a different team. This packet does not create a project.

**External effect.** Read-only target discovery only.

**Verification.** The project, linked repository, current deployment status, domains, and protection posture are read and recorded. Deployment remains a separate L4 approval.

## EA-006 — GitHub operational secret and approval-environment configuration

**Objective.** Configure only the GitHub settings necessary for the already-gated CI workflow to use explicit approvals.

**Preconditions.** EA-001 is complete for any provider token involved; the user confirms required secret names, target environment, reviewers, and domain owner.

**External effect.** Repository secrets and/or protected environment configuration are changed. No code, release, or deployment is created.

**Verification.** A workflow dry-run or manual dispatch validates that missing approval or secret material results in a blocked, observable state rather than an external publish.

## EA-007 — Shopify commerce reconciliation

**Objective.** Produce a read-only, bounded sample report of product configuration, vendor/type naming, sales-channel visibility, and digital-delivery metadata before proposing any normalization.

**Preconditions.** The user selects the target storefront/domain and accepts that current market-research claims are directional until a live read validates them.

**External effect.** None. The first step is read-only.

**Verification.** The report lists each sampled record, observable issue, user-visible impact, evidence source, and a separate rollback-aware packet for every proposed change.
