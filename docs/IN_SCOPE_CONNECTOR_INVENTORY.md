# In-Scope Connector Inventory

## Operating rule

Enabled does not mean authorized for use. Kingdom Executor verifies and invokes a connector only when it has a concrete role in the product, an identified data boundary, and an approval path for any external change.

| Provider | Product role | Current evidence | Permitted next step | External boundary |
|---|---|---|---|---|
| Shopify | Catalog and commerce operations | **INTEGRATED** — aggregate store check: HitMa'KING, 136 products, four aggregate customers. | Read-only scoped product validation. | Any product, inventory, price, fulfilment, customer, discount, or publishing change is L3/L4. |
| Printify | Print-on-demand provider context | **BLOCKED** — no safe connector credential. | Approved least-privilege health adapter only after credential rotation. | No shop, catalogue, fulfilment, order, or payout action. |
| GitHub | Code governance and release evidence | **INTEGRATED** — selected operations repository is accessible on `main`. | Read-only workflow/status inspection. | Repository writes, secrets, releases, and branch-protection changes require approval. |
| Notion | Knowledge archive | **INTEGRATED** — workspace identity and tool availability verified. | Proposal of an audit archive page/database. | Page, database, comment, file, and schema writes require approval. |
| Slack | Operations communications | **BLOCKED** — direct connector authorization invalid; a Zapier Slack connection exists but no messages were read. | Provider reauthorization, then a read-only health check. | Messages, reminders, channels, profile changes, and invitations require approval. |
| Canva | Brand and design workflows | **TESTED** — capability discovery only. | Read-only search for named user-approved design assets. | Creation, editing, export, sharing, comments, and Brand Kit changes require approval. |
| Zapier | Cross-system automation catalog | **TESTED** — connected actions exist for GitHub, Notion, Slack, and Shopify. | Draft a named workflow specification with explicit inputs, outputs, owner, approval level, and rollback posture. | Enabling actions, changing connections, code actions, or executing workflows requires approval. |
| Vercel | Deployment and project status | **BLOCKED** — team verified, no project returned. | Identify or link the intended Vercel project. | Deployments, domains, protection settings, and purchases require approval. |
| Stripe | Payments | **BLOCKED BY POLICY** — free-access model remains active. | None unless commercial mode changes by explicit decision. | Any customer, payment, subscription, refund, or balance action requires approval. |

## Connected but not currently in scope

Cloudflare, Gmail, Google Workspace, HubSpot, Instagram, Agent Opus, HeyGen, Wireflow, and other account-enabled services were intentionally not queried in this pass. They are not required to validate the core Kingdom Executor architecture and may expose customer, mailbox, account, social, or billing data. A concrete product need and a separate least-privilege verification scope are required before they enter the registry.
