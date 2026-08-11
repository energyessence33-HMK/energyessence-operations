# Four-Domain Integration Plan

## Locked domain map

| Domain | Operating role | In-app destination |
|---|---|---|
| `essencepulse.store` | Unified kingdom hub for alignment, strategy, and execution | Essence Pulse card in Ecosystems |
| `hitmaking.store` | Global premium marketplace for faith-led jewelry and apparel | HitmaKING Global card in Ecosystems |
| `hitmaking.co.za` | South African storefront and regional fulfillment path | HitmaKING South Africa card in Ecosystems |
| `thought2ponder.store` | Reflection, journaling, and spiritual identity practice | Thought2Ponder card in Ecosystems |

## Implementation completed

The canonical registry lives in `lib/domains/domain-config.ts`. It is the single source of truth for domain IDs, public URLs, role descriptions, calls to action, theme accents, tags, and visual asset URLs. The Ecosystems screen now renders the four domains through a `FlatList`, supports active-domain selection, exposes accessible external links, and uses the generated unified ecosystem, marketplace, reflection, and Essence Pulse artwork.

## Data-flow rules

The app treats the mobile experience as the control plane and the four domains as external destinations. Domain links are opened through the platform linking layer; the app does not silently scrape, proxy, or mutate third-party storefront data. Any future synchronization should use explicit, authenticated APIs or webhooks with least-privilege credentials, server-side secret storage, signed webhook validation, idempotency keys, audit logs, and bounded retries.

## Brand alignment

All four domains share a midnight-black foundation with sapphire authority, restrained gold abundance, electric-turquoise elevation, and soft white clarity. The brands remain distinct by function rather than by disconnected visual systems: Essence Pulse leads with pulse and alignment; HitmaKING leads with material quality and sovereignty; Thought2Ponder leads with quiet reflection and identity.

## Canva connector posture

The Canva connector is enabled in the current session, but its MCP tool discovery did not return within the available execution window. No Canva operation is represented as completed. The current visual assets were generated through Manus's image generation route and are referenced by their lifecycle-safe asset URLs. When the Canva connector is responsive, use it only for explicit Canva workflows, request only necessary scopes, and keep Canva-sourced Brand Kit or template data inside Canva in accordance with the Canva MCP usage policy.

## Production controls still required

Before claiming all integrations are live, configure and verify the actual domain DNS records, SSL certificates, Vercel project domains, production API credentials, Shopify or storefront APIs if cross-domain commerce sync is required, Stripe only if paid plans are activated, SendGrid only if outbound email is enabled, Slack webhook destinations, Notion workspace/database IDs, and GitHub repository secrets. Do not place any of those credentials in the mobile bundle or source-controlled files.
