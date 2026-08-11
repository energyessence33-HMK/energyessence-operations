# Thought2Ponder Social Approval Packets

## Operating rule

The registered TikTok and Instagram handles are **destinations**, not proof of linked account access. Each permission and external effect has a separate approval boundary. No account linkage, publishing, analytics retrieval, messaging, profile edit, follow, comment, or advertising action is performed by this document.

| Packet | Destination | Risk level | Scope | External effect | Preconditions |
|---|---|---:|---|---|---|
| TS-001 | Instagram `@thought2ponder06` | L3 | OAuth linkage and read-only identity check | Grants provider connection access; retrieves profile identity only. | Owner completes connection; account handle matches. |
| TS-002 | TikTok `@thought2ponder` | L3 | Enable/link an approved TikTok connector and read-only identity check | Changes connector status; retrieves account identity only. | Owner selects the intended TikTok provider and completes authorization. |
| TS-003 | Either destination | L3 | Publish one named content item | A single post/reel/video becomes public. | Exact asset URL, caption, alt text, platform, handle, and removal plan are approved. |
| TS-004 | Either destination | L3 | Read bounded post insights | Retrieves performance metrics for named posts only. | Account linkage is verified; metric window and post IDs are defined. |
| TS-005 | Either destination | L4 | Inbox, comments, profile, audience, or permission changes | May expose personal data or modify account state. | Separate business purpose, minimum scope, retention policy, and owner approval. |

## TS-001 — Instagram identity linkage

**Objective.** Connect the Instagram Business account and perform one read-only identity verification, limited to proving that the linked account is the intended Thought2Ponder destination.

**Non-goals.** This packet does not retrieve posts, followers, comments, messages, audience data, insights, media, or profile-edit capability. It does not publish content.

**Verification.** The integration register is updated only with a handle match, timestamp, and evidence status. No provider access token, user identifier, or profile payload is recorded in the mobile app or project documents.

## TS-002 — TikTok identity linkage

**Objective.** Enable or add an approved TikTok provider connection, then verify the account identity for `@thought2ponder` through the narrowest read-only operation.

**Non-goals.** This packet does not create advertising campaigns, read analytics, access direct messages, publish, or modify the profile.

**Verification.** The connector inventory records its active provider, minimum scopes, verification timestamp, and a non-sensitive identity-match result.

## TS-003 — single-content publication

**Objective.** Publish one specifically approved content item after the relevant identity connection is verified.

**Required approval payload.** Platform, handle, content reference, public media URL, caption, accessibility text, proposed time, intended audience, objective, and removal plan must be provided together. Each approved destination counts as one external action.

**Verification.** Record publication time, public URL or provider result reference, content hash, approval ID, and any failure without recording credentials or unnecessary audience information.

## TS-004 and TS-005 — data and high-impact access

Insights access is limited to named posts and a bounded time window. Inbox, comments, audience, profile, advertising, and permission-related scopes are treated as L4 because they can expose personal data or change the account’s external state. They remain disabled pending a separate, explicit approval.
