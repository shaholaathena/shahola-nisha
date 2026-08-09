# SSL Merchant Acquiring Platform — case study screens

Screens are **gated by an allowlist**. A screen renders as a real image only if its
filename (without extension) is listed in `APPROVED_SCREENS` in BOTH:

- `src/pages/MerchantOnboardingCaseStudyPage.jsx`
- `src/components/ui/MerchantCoverFan.jsx`

Anything not on that allowlist falls back to a neutral wireframe placeholder.

## Disclosure stance

The case study is framed as a **named multi-bank platform**, and the merchant and CRM
apps are publicly published on Google Play. Bank branding and bank names are therefore
intentional, not leaks — the point of the case study is that the same system renders as
each bank.

That does **not** relax the rules below. Branding being fine does not make data fine.

## Before approving a screen, confirm the export has NONE of:

- **a scannable QR code** — a Bangla QR merchant code encodes merchant and acquirer
  identifiers. Replace the matrix with a synthetic or blurred one before approving.
- real merchant, personal, or transaction data — mask account numbers, MSISDNs,
  balances, and names, or use placeholder values
- third-party wallet or partner logos (bKash, Nagad, Rocket, NPSB, …) — these are
  marks the portfolio has no licence to display
- bank hotline / support phone numbers
- internal step or workflow labels that reveal business process (scoring, approval
  routing, settlement rules)

Only once a screen clears all of the above, add its filename to `APPROVED_SCREENS`.

## Known outstanding issues

Allowlisted screens that currently **fail** the rules above. Fix before publishing.

**Unmasked phone numbers — highest priority.** These are full Bangladeshi MSISDNs in the
clear, on a public portfolio.

1. **`ssl-merchant-crm-home.png`** — `01761877127` repeated on all six lead rows. Also
   carries an identifiable face plus the name "Mizanur Rahman" as the signed-in agent.
   Mask the number; swap the avatar and name for a clearly synthetic one.
2. **`ssl-merchant-crm-create-lead-flow-1.png`** — `01913808080` shown unmasked beside a
   name and a "Verified Account" badge. The account number and NID on this screen are
   already masked; the phone number should match them.

**QR matrices.** A Bangla QR merchant code encodes merchant and acquirer identifiers.

3. **`ssl-merchant-qr.png`** — full scannable matrix. Merchant name and TID are obvious
   placeholders ("Merchant Name", `TID123456`), so this is probably a mock — but confirm
   the matrix is synthetic. Also carries NCC and NPSB marks.
4. **`jbl-qr.png`** — full scannable matrix, four third-party wallet marks (NPSB, bKash,
   Rocket, Nagad), and a bank hotline number.

**Real business names.** Publishing these implies they are live merchant clients.

5. **`ssl-merchant-select-store.png`** and **`ssl-merchant-select-counter.png`** — list
   "Kacchi Bhai Express, Karwan Bazar" and "Lazz Pharma Branch 3, Mogbazar".
6. **`jbl-select-store.png`** — same list.

## Vetted clean

Reviewed against the rules above and clear: `ssl-merchant-login`,
`ssl-merchant-crm-login`, `ssl-merchant-crm-create-lead-flow-2` (all empty-state forms),
and `ssl-merchant-qr-amount`. `ssl-merchant-home` masks both the balance and the MSISDN
(`019272XXX12`) — it retains a small NPSB mark and a promo creative with a model.

Not yet reviewed, so deliberately **not** allowlisted: `ssl-merchant-splash`,
`ssl-merchant-crm-splash`, `ssl-merchant-home-no-transactions`, `jbl-crm-home`,
`jbl-crm-login`.

## Filename keys used by the case study

- Brand strip + cover fan (`cs.banks`) — defaults to `<code>-home`, or set `screen` on the
  bank entry to override: `ssl-merchant-home` (SSL, the reference build), `sebl-home`,
  `ncc-home`, `rupali-home`, `jbl-home`, `sdbl-home`. Adding a bank to `cs.banks`
  auto-adds a slot; both the strip and the fan are count-agnostic.
- Merchant "Take a payment" flow (`cs.flow`): `ssl-merchant-home`,
  `ssl-merchant-select-store`, `ssl-merchant-select-counter`, `ssl-merchant-qr-amount`,
  `ssl-merchant-qr`
- CRM "Sign up a shop" flow (`cs.crmFlow`): `ssl-merchant-crm-login`,
  `ssl-merchant-crm-home`, `ssl-merchant-crm-create-lead-flow-1`,
  `ssl-merchant-crm-create-lead-flow-2`, then `crm-5-documents` (not yet exported —
  renders a labelled wireframe until it lands).
- Product cards (`cs.products[].screen`): `ssl-merchant-crm-home`, `ssl-merchant-home`
- Legacy / unused: `flow-1-create-lead` (kept as a fallback), `flow-1-select-store`,
  `flow-3-amount`, `flow-4-scan-pay`, `flow-5-success`, `visual-1-login`,
  `visual-4-transactions`, `jbl-share-qr`, `jbl-enter-amount`

Screens fill a 9 : 19.5 phone frame (`object-cover`, top-aligned), so export full-bleed
screen content (no surrounding canvas padding) for the best fit.
