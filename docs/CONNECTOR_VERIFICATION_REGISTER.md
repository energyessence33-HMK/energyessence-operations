# Connector Verification Register

## Scope and controls

This register records the **2026-08-11** read-only verification pass. It uses the evidence-status vocabulary defined in `MASTER_BLUEPRINT_REFERENCE.md`. No external records were created, changed, published, sent, deleted, deployed, or granted additional permission during this pass. Customer verification is limited to an aggregate count; no personal customer records were retrieved or retained.

| Provider | Evidence status | Verification performed | Observed result | External action state |
|---|---|---|---|---|
| GitHub | INTEGRATED | Fresh read-only repository metadata query | `energyessence33-HMK/energyessence-operations` is accessible, public, and uses `main` as its default branch. | No repository change performed. |
| Shopify | INTEGRATED | Fresh aggregate store query | Store identity: HitMa'KING; product count: 136; aggregate customer count: 4. | No product, order, customer, inventory, discount, or publishing change performed. |
| Notion | INTEGRATED | Fresh read-only workspace identity and capability query | Connected workspace: Energy Essence’s Space. Read, create, and update capabilities are available; data-source querying is plan-limited and meeting-note query requires a plan upgrade. | No page, database, comment, view, file, or workspace change performed. |
| Slack | BLOCKED | Direct capability discovery and Zapier action inventory | Direct provider OAuth is expired or invalid. A Zapier Slack connection and action schemas are present, but no messages were retrieved to avoid unnecessary content access. | No message, channel, member, or settings action performed. |
| Canva | TESTED | Read-only capability discovery | Discovery succeeded. No design, template, folder, asset, or Brand Kit content was accessed. | No Canva content or Brand Kit data accessed. |
| Zapier | TESTED | Read-only enabled-action inventory | Connected action inventories exist for GitHub, Notion, Slack, and Shopify. | No Zap, action, task, or connected-app workflow was run. |
| Stripe | BLOCKED | Deferred by product policy | Payments remain disabled in the approved free-access mode. | No financial action performed. |
| Vercel | BLOCKED | Read-only team and project inventory query | Team access succeeded; the verified team returned no projects. | No deployment, domain, protection, or billing action performed. |
| Printify | BLOCKED | Confidential screenshot evidence only | No usable connector or rotated server-side credential is configured for safe verification. | No Printify shop, catalog, order, fulfilment, or payout data accessed. |

## Reconciliation findings

The Shopify catalog is materially larger than the app’s former mock commerce surface and should be introduced through a read-only Commerce data model before any merchandising changes are proposed. Vendor spelling and product-type naming appear inconsistent in the returned catalog, including variations of `HitMa'KING` and `HitmaKING` and singular/plural product types. This is an operational data-quality observation, not a request to rewrite products. Any normalization proposal must list exact records, storefront impact, search/SEO risk, and rollback posture for approval.

Notion is available for an approval-gated knowledge archive, but the plan limitation on data-source querying should be respected. Slack requires direct reconnection before it can support canonical operational alerts or CI/CD notifications. Canva and Zapier have passed capability discovery, but neither has been used to access content or run an automation; the app must render this distinction honestly. Vercel has no verified project target, and Printify requires a rotated least-privilege credential before any API health check.

## Next approval boundary

The next permitted step is preparation of a **read-only reconciliation report and proposed synchronization packets**. Each packet must name the target system, intended records, risk level, expected user-visible effect, validation method, rollback reference where applicable, and the human approver. No packet authorizes execution by itself.
