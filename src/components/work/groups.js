/* ─────────────────────────────────────────────────────────────────────────────
   One category per project, and which three lead.

   Shared because three components need the same answer and a category that
   disagreed with itself between the hero and the section below it would be
   worse than no category at all.

   The labels come from each project's own `tags` in data/portfolio, not from
   taste: Internet Banking / Mobile Banking / Financial Services → Banking;
   Bangla QR / Payments / E-commerce → Payments & commerce; Health → Health;
   Social Media / Education / LMS → Platforms. Retagging a project should move
   it, so the mapping is keyed by id and kept next to that reasoning rather than
   spread across the components that render it.

   FEATURED is the three with a `link`, i.e. the three that have a case study to
   open. It is written out rather than derived so the ORDER is deliberate —
   `projects` is in data order, and the lead row of a portfolio is a choice.

   NOTE: `impact` looked like a subtitle field and is not. Four of nine hold a
   date range ("Nov-Dec 2024") and the rest hold a phrase ("One system, many
   banks"), so nothing can render it as one thing. The subtitle slot uses
   `company`, which is populated and consistent on all nine.
   ───────────────────────────────────────────────────────────────────────────── */
export const CATEGORY = {
  'bkb-internet': 'Banking',
  'bkb-mobile': 'Banking',
  'basic-bank': 'Banking',
  'merchant-onboarding': 'Payments & commerce',
  zcommerz: 'Payments & commerce',
  ebuddy: 'Health',
  'easy-health': 'Health',
  willro: 'Platforms',
  'flavours-of-unity': 'Platforms',
}

export const FEATURED = ['merchant-onboarding', 'zcommerz', 'bkb-mobile']

/* Short product names, for places with no room for a full title.

   The hero trail first labelled its stars with `company` and two of the three
   came out "SSL Wireless" — merchant-onboarding and zcommerz share a client, so
   the label failed at the one job a map pin has. The full `title` does not fit
   either ("ZCOMMERZ — Online Store Builder" at 13px beside a 4px star). These
   are the product names, which are short, and distinct. */
export const SHORT = {
  'merchant-onboarding': 'Bangla QR',
  zcommerz: 'ZCommerz',
  'bkb-mobile': 'myBKB',
  'bkb-internet': 'Krishi Bank web',
  'basic-bank': 'Basic Bank',
  ebuddy: 'eBuddy',
  willro: 'Willro',
  'flavours-of-unity': 'Flavours of Unity',
  'easy-health': 'Easy Health',
}

export const categoryOf = (id) => CATEGORY[id] || 'Product design'
export const shortOf = (id, fallback = '') => SHORT[id] || fallback
