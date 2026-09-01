# ZCOMMERZ — case study screens

ZCOMMERZ is a **web app** (online-store builder for SMBs), so screens are browser
captures rendered in a browser-window frame — not a phone frame.

Screens are **gated by an allowlist**. A screen renders as a real image only if its
filename (without extension) is listed in `APPROVED_SCREENS` in:

- `src/pages/ZCommerzCaseStudyPage.jsx`

Anything not on that allowlist falls back to a neutral wireframe placeholder, so an
un-exported or un-vetted screen never blocks the build — it just shows a labelled
wireframe until its export lands and is approved.

## Before approving a screen, confirm the export has NONE of:

- **real phone numbers** — the setup demo shows `018291711234` in the clear. Mask every
  Bangladeshi MSISDN or replace with an obvious placeholder (`01XXXXXXXXX`).
- real email addresses, names, NID, or account/settlement numbers — mask or use
  placeholder values (`[PLACEHOLDER]`).
- a **scannable Bangla QR matrix** — a merchant QR encodes merchant + acquirer
  identifiers. Use a synthetic/blurred matrix.
- third-party wallet or partner logos the portfolio has no licence to display
  (bKash, Nagad, Rocket, Pathao, eCourier marks) — keep generic or mask.
- real merchant / business names that would imply a live client.
- support hotline numbers.

Only once a screen clears all of the above, add its filename to `APPROVED_SCREENS`.

## Screens to export (filename → what it is)

Export full-bleed browser content (the page, no OS chrome). Desktop width is ideal for
the setup wizard; a mobile-width capture also works since the frame is responsive.

**Onboarding journey (the core of the case study):**

- `zc-signup` — Create Account: phone number → OTP, "3-day free trial" (mask the number)
- `zc-setup-identity` — Setup step 1 of 4: Business Identity (name, category, auto store URL, logo)
- `zc-setup-logistics` — Setup step 2 of 4: Delivery & Logistics (Dhaka/outside rates, couriers)
- `zc-setup-payments` — Setup step 3 of 4: Payments & Settlement (Bangla QR, SSLCOMMERZ, COD)
- `zc-setup-plan` — Setup step 4 of 4: Launch Plan (pick plan, go live)

**Build the store (the "in a minute" flow — also core):**

- `zc-dashboard` — the merchant dashboard (orders, products, store settings)
- `zc-pick-demo` — choosing a ready-made storefront demo/theme from the dashboard
- `zc-add-product` — the simple single-product add form
- `zc-storefront` — the live customer-facing shop the merchant publishes

**Supporting (nice to have):**

- `zc-bulk-upload` — the bulk product-upload screen (if you want it called out separately)
- `zc-login` — the returning-merchant login

Filenames are matched exactly (lowercase, no extension in the allowlist). PNG or JPG.
