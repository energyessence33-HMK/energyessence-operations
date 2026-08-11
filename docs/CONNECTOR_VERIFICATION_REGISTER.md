# Connector Verification Register

## Scope and controls

This register records the **2026-08-11** read-only verification pass. It uses the evidence-status vocabulary defined in `MASTER_BLUEPRINT_REFERENCE.md`. No external records were created, changed, published, sent, deleted, deployed, or granted additional permission during this pass. Customer verification is limited to an aggregate count; no personal customer records were retrieved or retained.

| Provider | Evidence status | Verification performed | Observed result | External action state |
|---|---|---|---|---|
| GitHub | INTEGRATED | Read-only repository metadata query | `energyessence33-HMK/energyessence-operations` is accessible, public, and uses `main` as its default branch. | No repository change performed. |
| Shopify | INTEGRATED | Full paginated product-catalog query, latest-order query, and aggregate store query | Store identity: HitMa'KING; primary domain: `hitmaking.co.za`; product count: 131; aggregate customer count: 4; Manus-channel order query returned no orders. | No product, order, customer, inventory, discount, or publishing change performed. |
| Notion | INTEGRATED | Read-only connected-workspace identity and capability query | Connected workspace: Energy Essence’s Space. Read, create, and update capabilities are available; data-source querying is plan-limited. | No page, database, comment, view, file, or workspace change performed. |
| Slack | BLOCKED | Capability discovery | Provider OAuth authorization was expired or invalid. | No message, channel, member, or settings action performed. |
| Canva | BLOCKED | Capability discovery only, after current usage-policy review | Discovery did not return within the bounded verification window. No design, template, folder, or Brand Kit content was accessed. | No Canva content or Brand Kit data accessed. |
| Zapier | BLOCKED | Capability discovery | Discovery did not return within the bounded verification window. | No Zap, action, task, or connected-app workflow was run. |
| Stripe | BLOCKED | Deferred by product policy | Payments remain disabled in the approved free-access mode. | No financial action performed. |

## Reconciliation findings

The Shopify catalog is materially larger than the app’s former mock commerce surface and should be introduced through a read-only Commerce data model before any merchandising changes are proposed. Vendor spelling and product-type naming appear inconsistent in the returned catalog, including variations of `HitMa'KING` and `HitmaKING` and singular/plural product types. This is an operational data-quality observation, not a request to rewrite products. Any normalization proposal must list exact records, storefront impact, search/SEO risk, and rollback posture for approval.

Notion is available for an approval-gated knowledge archive, but the plan limitation on data-source querying should be respected. Slack requires reconnection before it can support operational alerts or CI/CD notifications. Canva and Zapier should remain marked BLOCKED until a bounded capability check succeeds; the app must not render them as connected.

## Next approval boundary

The next permitted step is preparation of a **read-only reconciliation report and proposed synchronization packets**. Each packet must name the target system, intended records, risk level, expected user-visible effect, validation method, rollback reference where applicable, and the human approver. No packet authorizes execution by itself.
