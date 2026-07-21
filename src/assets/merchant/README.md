# Merchant onboarding screens

Drop exported screen images here and they appear automatically in the
Merchant Onboarding case study (no code change needed).

Export the frames from Figma (select frame → Export → PNG/JPG @2x) from the
**SEBL / NCC / SDBL / Rupali / JBL Merchant** pages, then name the files
exactly as below (`.png`, `.jpg`, `.jpeg`, or `.webp`):

## Bank home screens — Multi-Bank section + cover
- `sebl-home`
- `ncc-home`
- `sdbl-home`
- `rupali-home`
- `jbl-home`
- `cover` (optional — cover hero; falls back to `sebl-home`)

## Flow spotlight — Take a Payment (pick one representative bank)
- `flow-1-select-store` — Select store / counter
- `flow-2-home` — Merchant home (falls back to `sebl-home`)
- `flow-3-amount` — Enter amount
- `flow-4-scan-pay` — Scan & pay (Bangla QR)
- `flow-5-success` — Payment success

## Visual design row
- `visual-1-login` — Splash / login
- `visual-2-home` — Merchant home (falls back to `sebl-home`)
- `visual-3-scan-pay` — Scan & pay
- `visual-4-transactions` — Transaction list

Any name not provided keeps its dashed "Screen TBD" placeholder.
Screens fill a 9 : 19.5 phone frame (`object-cover`, top-aligned), so export
full-bleed screen content (no surrounding canvas padding) for the best fit.
