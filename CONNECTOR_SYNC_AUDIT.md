# Connector Synchronization Audit

## Operating rule

An enabled connector is **not** treated as synchronized until a safe, read-only verification confirms that its authorization, minimum required scope, and target workspace or project are available. Credentials, tokens, and webhook secrets must remain in secure connector storage or deployment secrets; they must never be committed to this repository or embedded in the mobile bundle.

## Integration inventory

| Integration | Current connector state | Required purpose in this project | Verification evidence required |
|---|---|---|---|
| GitHub | Enabled | Source publication, CI/CD, repository governance | `gh auth status`, remote inspection, repository access |
| Slack | Enabled | Deployment and operational notifications | Tool discovery plus safe workspace/channel read |
| Notion | Enabled | Operating documentation and project status synchronization | Tool discovery plus safe page/database read |
| Canva | Enabled | Explicit Canva-only design workflows | Tool discovery and authenticated design access |
| Vercel | Enabled | Web deployment and domain operations | Tool discovery and safe project read |
| Shopify | Enabled | Storefront, product, order, inventory operations | Schema inspection and safe store read |
| Stripe | Enabled | Optional payment processing only when activated | Secret configuration and test-mode status |
| Supabase | Enabled | Optional production data platform | Project list and least-privilege project access |
| Cloudflare | Enabled | Optional DNS, SSL, and edge routing | Account/zone read before any mutation |
| Kling | Enabled | Video-generation capability | Server-side credential validation only |

## Synchronization policy

GitHub, Slack, Notion, Canva, Vercel, Shopify, Stripe, Supabase, and Cloudflare require explicit verification. Read-only checks are permitted during this audit. Any action that posts a message, creates a page, changes DNS, deploys, updates a store, creates a charge, or changes connector configuration requires separate confirmation at the point of action.

## Current known limitation

The Canva connector is enabled, but an earlier MCP tool-discovery request stalled. It remains **unverified**, and no Canva sync or design operation is claimed until a successful connector response is observed.

## Verification findings — 11 August 2026

| Integration | Evidence | Verified status | Required next action |
|---|---|---|---|
| GitHub | `gh auth status` confirmed the `energyessence33-HMK` account; `energyessence33-HMK/kingdom-executor-mobile` is accessible, private, and uses `main` | Authentication and repository access verified; local project origin is still the managed sandbox remote, not GitHub | Compare histories, add GitHub as a secondary remote, then push only after conflict review |
| Slack | MCP tool discovery returned an OAuth authorization-expired/invalid error | Not synchronized | Reauthorize Slack in connector settings, then run a safe channel read before enabling notifications |
| Notion | MCP tool discovery returned a 4xx initialization error indicating an incompatible or legacy transport | Not synchronized | Reconnect or update the Notion connector, then run a safe page/database read |
| Canva | Connector is enabled; prior MCP discovery stalled without a usable response | Unverified | Reauthorize or repair the Canva connection, then run tool discovery before any design workflow |
