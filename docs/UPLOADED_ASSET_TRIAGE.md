# Uploaded Asset Triage — Secure Integration Boundary

## Decision

The supplied Thought2Ponder PDFs and Energy Essence landing-page source are approved as **content and design references** for Kingdom Executor. The uploaded Printify and Shopify screenshots are approved only as **confidential operational-security evidence**. Their visible personal, financial, authentication, and account data must not be copied into source control, application assets, client storage, server logs, analytics, documentation examples, or user interfaces.

## Asset register

| Asset | Intended in-app treatment | Provenance label | Handling rule |
|---|---|---|---|
| *The 5-Minute Threshold Practice* | Thought2Ponder resource card and guided practice | Creator-authored contemplative reflection; Scripture citation and interpretation are distinct | Display only an attributed synopsis and launch/open control; do not reproduce the full PDF in source. |
| *Gates of Pearl — Deep Edition* | Featured long-form resource | Creator-authored contemplative reflection; incorporates biblical imagery and personal interpretation | Catalog once only; the two supplied PDFs are byte-identical duplicates. |
| *The Sanctuary Ritual: Reflection Candle Guide* | Reflection-practice resource | Creator-authored practice guide | Separate practical candle-safety information from interpretive prompts. |
| *Reflection Practice Bundle Quick-Start Guide* | Setup resource | Creator-authored product companion | Present as a bundle onboarding resource. |
| *Reflection Circle Welcome Kit* | Membership/onboarding resource | Creator-authored community material | Mark membership scope accurately; no inferred subscription entitlement. |
| *Daily Wisdom Cards Practice Guide* | Practice resource | Creator-authored reflection-card companion | Present as a guide for three practice modes; no therapeutic claim. |
| *Purpose Discovery Workbook* | Guided self-reflection resource | Creator-authored workbook | Label as personal reflection, not diagnosis, counseling, or professional advice. |
| Energy Essence landing source | Brand-system and information-architecture reference | Supplied marketing source; commercial and health claims are unverified | Reuse visual rhythm and structure only after claim-safe rewriting. |
| Printify account screenshot | Printify provider context | Confidential operational evidence | Never embed, render, retain, or reuse account, payout, personal, or address data. |
| Shopify developer screenshots | Shopify provider context and credential-exposure evidence | Confidential security evidence | Never embed or transmit values. Treat visible client secret and automation token as compromised until rotated/revoked. |

## Claim boundary for Energy Essence

The supplied landing source contains statements about health outcomes, scientific support, manufacturing, testing, ingredients, guarantees, customer verification, and refunds. These statements are **not verified by the uploaded source alone**. Kingdom Executor will not repeat them as facts or recommendations. The product experience may safely adopt the source’s restrained visual system and its three-part planning metaphor—Reset, Rebalance, Recharge—provided all health, safety, efficacy, price, guarantee, testimonial, and manufacturing claims are omitted until independently substantiated and legally reviewed.

## Content classification policy

Each Thought2Ponder resource entry will identify its content type visibly:

| Classification | Meaning in Kingdom Executor |
|---|---|
| Scripture | A clearly cited biblical passage or reference. |
| Interpretation | Creator-authored reflection on or application of a cited source. |
| Guided practice | A personal reflection or journaling exercise, not clinical care or a guaranteed outcome. |
| Technical fact | A claim that requires credible, externally verifiable evidence before it is presented as fact. |
| AI inference | A generated suggestion that must show uncertainty, source context, and human-review status. |

## Credential and personal-data containment

The user-provided screenshots appear to expose information that would permit account access or contain personal and financial data. No value from those screenshots will be used. The safe operational response is provider-side rotation/revocation followed by storage of newly issued credentials only in the appropriate server-side secret manager. The app will expose provider connection state, scope, evidence status, and an approval boundary—not credentials, payout details, addresses, or account identifiers.

## Reference status

This register is a governance document. It is not a license to reproduce, distribute, or host the supplied PDFs. The application will open an approved publisher-controlled destination or an authorized in-app delivery route only after the owner confirms the intended distribution policy.
