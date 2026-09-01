import easyHealthImg from '../assets/easy-health.jpg';

export const meta = {
  name: 'AN',
  fullName: 'Alimoon Nisha',
  title: 'UX Analyst & UX Engineer',
  tagline: 'Designing banking,\nhealth, and platform\nexperiences.',
  bio: 'I am a UX Analyst and UX Engineer based in Dhaka, Bangladesh. I specialize in problem solving, research, visual design, and prototyping for mobile banking, healthcare, social platforms, and learning products.',
  location: 'Dhaka, Bangladesh',
  availability: 'Currently working as UX Analyst at SSL Wireless',
  linkedin: 'https://www.linkedin.com/in/shahola-nisha/',
  dribbble: 'https://dribbble.com/shahola',
  domains: ['Mobile Banking', 'Health Products', 'Web Applications', 'Product Design'],
}

export const stats = [
  { value: '8+', label: 'Years experience', description: 'UX and product design career' },
  { value: '2020', label: 'SSL Wireless', description: 'UX Analyst since April' },
  { value: '30+', label: 'Client highlights', description: 'Banking, NGO, commerce, and health' },
  
]

export const projects = [
  {
    id: 'bkb-internet',
    title: 'Bangladesh Krishi Bank - Internet Banking',
    company: 'Bangladesh Krishi Bank',
    type: 'dashboard',
    year: '2024',
    tags: ['Internet Banking', 'Web App', 'UI/UX'],
    size: 'large',
    impact: 'Nov-Dec 2024',
    description: 'A web banking interface for account overview, fund transfer, beneficiary management, bill payment, statements, and transaction history.',
    color: '#111111',
    accentColor: '#6b7280',
    image: 'https://shaholanisha.xyz/wp-content/uploads/2026/01/krishi-banner-3.png',
  },
  {
    id: 'bkb-mobile',
    title: 'Bangladesh Krishi Bank - myBKB App',
    company: 'Bangladesh Krishi Bank',
    type: 'mobile',
    year: '2024',
    tags: ['Mobile Banking', 'UI/UX', 'Figma'],
    size: 'medium',
    impact: 'Sep-Nov 2024',
    description: 'A mobile banking experience for managing finances, transferring funds, and paying bills from a smartphone with a simple and intuitive flow.',
    color: '#1a1a1a',
    accentColor: '#9ca3af',
    image: 'https://shaholanisha.xyz/wp-content/uploads/2026/04/krishi-scaled.png',
    link: '/case-study/bkb-mobile',
    caseStudy: {
      title: 'Bangladesh Krishi Bank — myBKB App',
      company: 'Bangladesh Krishi Bank',
      year: '2024',
      role: 'UI/UX Design',
      duration: '2 months',
     
      challenge: 'Make complex banking — fund transfers, beneficiary management, bill payments — feel simple for users ranging from urban professionals to first-time mobile banking users in rural Bangladesh, within Bangladesh Bank regulations.',
      outcome: 'Handoff-ready design covering 30+ flows and 100+ screens — onboarding, transfers, payments, and account management — with a scalable component library for Android & iOS.',
      phases: ['Research', 'User Flow', 'Mobile UI Design', 'Prototype', 'Handoff'],
      metrics: [
        { label: 'Project duration', value: '2 months' },
        { label: 'User flows designed', value: '30+' },
        { label: 'Screens delivered', value: '100+' },
        { label: 'Platform', value: 'Android & iOS' },
      ],
      keyDecisions: [
        {
          title: 'Beneficiary-first transfer architecture',
          description: 'Structured beneficiary system with 5 types — once saved, any transfer becomes a 3-tap process.',
        },
        {
          title: 'One decision per screen',
          description: 'Transfers broken into micro-steps: Who to → How much → Confirm. One question per screen reduces errors.',
        },
        {
          title: 'Layered security without friction',
          description: 'Password and PIN login, with TOTP for high-value transactions. Security matched to risk — Bangladesh Bank compliant.',
        },
        {
          title: 'Pre-login guest dashboard',
          description: 'Non-authenticated users see a preview dashboard — letting first-time users understand value before signup.',
        },
      ],
      flowGroups: [
        { label: 'Authentication', items: ['Splash', 'Login with Password', 'Login with PIN', 'Forgot Password', 'Forgot User ID'] },
        { label: 'Onboarding', items: ['Create Account', 'Guest Dashboard', 'Authenticated Dashboard'] },
        { label: 'Fund Transfers', items: ['Own Account Transfer', 'BKB-to-BKB Transfer', 'Other Bank Transfer', 'NPS Transfer'] },
        { label: 'Beneficiaries', items: ['Manage Beneficiaries', 'Add BKB Beneficiary', 'Add Other Bank Beneficiary', 'Add NPS Beneficiary'] },
        { label: 'Payments & Services', items: ['Mobile Recharge', 'Utility Bill Payment', 'Deposit View', 'Bank Statement'] },
        { label: 'Account & Profile', items: ['My Accounts', 'Add/Delete Account', 'My Profile', 'Set PIN', 'Transaction Limits', 'ATM/Branch Locator', 'Complaint & Helpline'] },
      ],
    }
  },
  {
    id: 'merchant-onboarding',
    title: 'Bangla QR Merchant App',
    company: 'SSL Wireless',
    type: 'mobile',
    year: '2026',
    tags: ['Bangla QR', 'Payments', 'Platform UX', 'Multi-bank White-label', 'Design System', 'Fintech'],
    size: 'medium',
    impact: 'One system, many banks',
    description: 'The merchant app for taking Bangla QR payments, paired with a field CRM that signs shops up — built once as one system each bank ships under its own brand.',
    color: '#151515',
    accentColor: '#9ca3af',
    image: '',
    coverQR: true, // render a single phone showing the Bangla QR pay screen as the card cover
    link: '/case-study/merchant-onboarding',
    caseStudy: {
      title: 'Bangla QR Merchant App',
      subtitle: 'One design system, multiple banks',
      company: 'SSL Wireless',
      year: '2026',
      role: 'UX Designer · Design System Architecture',
      platform: 'iOS & Android',
      tool: 'Figma',

      // ── Hero. The h1 renders `title` above; this is the line under it. ──
      heroSub: 'Bangla QR became Bangladesh’s one payment standard — one code any bank or wallet app can scan. This is the merchant app that takes those payments and the field CRM that signs shops up, built once and shipped by each bank under its own brand.',

      // ── The three-beat summary. This is the whole case study for a skimmer, so
      //    it leads with the user's problem — the multi-bank architecture is the
      //    answer to a business constraint, not the story itself. ──
      // Bangla QR is public, neutral context. Deliberately no mention of
      // regulatory deadlines or enforcement — that framing is internal, it puts
      // client banks in a poor light, and "we were ready" is stronger anyway.
      tldr: [
        { label: 'Problem', text: 'Bangladesh moved to Bangla QR, one interoperable standard any bank or wallet app can scan. That left banks needing merchant acquiring, and building it in-house is a long project.' },
        { label: 'Approach', text: 'Build it once as a finished product instead: a merchant app and a field-sales CRM on one system a bank can ship under its own brand.' },
        { label: 'Result', text: 'SSL took it to market ready. Multiple banks adopted it, each live on Google Play in their own brand.' },
      ],

      overview: 'A ready-made merchant acquiring product SSL Wireless took to banks as Bangladesh moved to Bangla QR. Two apps sit on one design system: a merchant app for accepting QR payments and a field-sales CRM for signing merchants up. Each adopting bank is a variable mode, not a rebuild.',
      overviewSpecs: [
        { label: 'Role', value: 'UX Designer · System architect' },
        { label: 'Scope', value: 'Platform UX · 2 apps · multi-bank' },
        { label: 'Platform', value: 'iOS & Android' },
        { label: 'Team', value: 'PM · Eng · Compliance · QA' },
      ],

      nda: 'Apps are public on Google Play. Screens use masked placeholder data, and internal logic such as verification, settlement, scoring and approvals is deliberately not described.',

      // ── The problem is bank-side, not merchant-side: the customer is the bank.
      //    Keep to the public fact of the Bangla QR standard. No deadlines, no
      //    mandates, no dates, no circular numbers, no naming who was behind. ──
      problem: 'Bangladesh’s payments moved to Bangla QR, a single interoperable standard, so one merchant code can be scanned by any bank or wallet app. For a bank, that meant offering merchant acquiring: a way for shops to take QR payments, and a way to sign those shops up in the first place. Most had neither in place.',
      solution: 'So SSL built it once, not for one bank, but as a finished product any bank could adopt and ship under its own brand. We designed the two apps that make it work, and the system that lets each bank wear them.',
      designChallenge: 'How do you design the merchant experience for Bangla QR — where one code has to work with every bank and wallet — and package it so any bank can adopt and rebrand it without a rebuild?',

      // ── Platform framing: one system, many banks. Deliberately placed AFTER the
      //    product flows — it answers "how does this ship to every bank without
      //    being rebuilt", which only matters once you've seen what ships. ──
      platformScaleIntro: 'This is what made the product adoptable. A bank evaluating it is not buying screens. It is buying the ability to launch, in its own brand, without a build project. So re-branding had to be a mode switch.',
      platformIntro: 'Each bank client is a variable mode over one shared library. Pick one and watch what moves. The answer is nothing except the brand.',
      // Bank clients on the shared engine. `fullName` empty where the official
      // public name still needs confirming — the abbreviation renders alone.
      // `screen` overrides the default `<code>-home` filename lookup.
      banks: [
        { code: 'SSL',    fullName: 'SSL Merchant',   accent: '#2E4A9E', status: 'Reference', screen: 'ssl-merchant-home' },
        { code: 'SEBL',   fullName: 'Southeast Bank', accent: '#9E1B32', status: 'Live' },
        { code: 'NCC',    fullName: 'NCC Bank',       accent: '#1B4B9E', status: 'Live' },
        { code: 'Rupali', fullName: 'Rupali Bank PLC', accent: '#1B7A43', status: 'Live' },
        { code: 'JBL',    fullName: 'Janata Bank PLC', accent: '#00A0DF', status: 'Live' },
        { code: 'SDBL',   fullName: '',               accent: '#2E7D32', status: 'In build' },
      ],

      // ── Two apps, one system ──
      productsIntro: 'An agent signs the merchant up. The merchant gets paid. Two audiences that share nothing except the component library underneath.',
      products: [
        {
          name: 'CRM App',
          role: 'The supply side',
          audience: 'Bank field sales agents',
          job: 'Onboard merchants in the field.',
          detail: 'A rep walks into a shop and leaves with a lead submitted in five steps, then comes back to deploy the QR and photograph it on the counter. Daily and monthly targets update as they go.',
          flows: ['Lead pipeline', 'Create lead', 'QR deployment', 'Targets'],
          screen: 'ssl-merchant-crm-home',
          fallback: 'flow-1-create-lead',
          glow: 'rgba(148,163,184,0.34)',
          play: 'https://play.google.com/store/apps/details?id=com.sslwireless.jblcrm',
        },
        {
          name: 'Merchant App',
          role: 'The demand side',
          audience: 'Shop owners & staff',
          job: 'Accept Bangla QR payments.',
          detail: 'That shop picks its outlet and counter, enters an amount, and presents one interoperable QR any bank or MFS app can scan. Payment lands as a live notification; balance and history stay one tap away.',
          flows: ['Store & counter', 'Enter amount', 'Scan & pay', 'Static & dynamic QR', 'Transactions'],
          screen: 'ssl-merchant-home',
          glow: 'rgba(6,182,212,0.30)',
          play: 'https://play.google.com/store/apps/details?id=com.sslwireless.jblmerchant',
        },
      ],
      // The line that connects the two cards — the handoff between the apps.
      productsHandoff: 'A lead approved in the CRM becomes a merchant who can transact — the bank sends the sign-in details by SMS, and the agent closes the loop by deploying the QR at the counter.',

      // ── Token architecture: the load-bearing idea, in two tiers and one rule ──
      tokenIntro: 'Separate what changes per bank from what never does.',
      tokenTiers: [
        { tier: 'Brand tokens', label: 'Tier 1', description: 'Per-bank raw values: primary, secondary, logo, accent scale. The only layer that differs between banks.' },
        { tier: 'Design tokens', label: 'Tier 2', description: 'Semantic names like surface, text-primary and action-primary. They reference Tier 1. Components only ever bind here.' },
      ],
      tokenRule: 'Never edit a shared value to fix one bank.',
      tokenRuleWhy: 'Per-bank exceptions live in that bank’s own mode. This is the rule that stops one client’s request from quietly breaking every other bank.',

      // ── The three constraints that actually shaped the work. All verifiable:
      //    market context, the delivered screens, and the multi-tenant requirement.
      //    No invented metrics. ──
      frictions: [
        {
          stat: 'QR',
          title: 'Interoperable by design',
          description: 'Riding the National Payment Switch, one merchant code has to be scannable by any affiliated bank or MFS app, so the payment screen could not be built around a single wallet.',
        },
        {
          stat: 'Ready',
          title: 'Adopted, not commissioned',
          description: 'Banks were choosing an existing product, not starting a design project. It had to arrive complete, with every state and edge case already resolved.',
        },
        {
          stat: '1 : N',
          title: 'One build, every bank’s brand',
          description: 'A bank will only adopt a product it can present as its own, so re-branding had to be a configuration step, not a redesign.',
        },
      ],

      // ── The flow. Drives the sticky walkthrough — screen, what it does, why. ──
      flowIntro: 'The merchant path end to end, shown on SSL Merchant, the reference build. The same five screens ship in every bank’s app.',
      flow: [
        {
          file: 'ssl-merchant-home',
          step: 'Home',
          title: 'One screen, one job',
          hint: 'Balance at a glance, hidden by default. Take Payment is the only real button.',
          why: 'Merchants open the app to do one thing. A busy dashboard would bury it.',
        },
        {
          file: 'ssl-merchant-select-store',
          step: 'Store',
          title: 'Which outlet is selling',
          hint: 'Multi-outlet businesses pick the shop making the sale.',
          why: 'Attribution matters to the owner, so it happens up front. Single-shop merchants never see it.',
        },
        {
          file: 'ssl-merchant-select-counter',
          step: 'Counter',
          title: 'Which counter took it',
          hint: 'A sheet over the store list, so the choice keeps its context.',
          why: 'Attribution has to be captured at the moment of sale, because it cannot be reconstructed afterwards. So it belongs before the amount, not after.',
        },
        {
          file: 'ssl-merchant-qr-amount',
          step: 'Amount',
          title: 'Type it, don’t hunt for it',
          hint: 'Big numerals, full-size keypad, chips for the common values.',
          why: 'At a busy counter this has to be fast and hard to get wrong.',
        },
        {
          file: 'ssl-merchant-qr',
          step: 'Pay',
          title: 'One QR, nothing else',
          hint: 'Customer scans with any bank or MFS app. Amount and status stay visible, and the merchant can share or download the code instead of showing it.',
          why: 'Payment is where hesitation costs most, so everything else leaves the screen. The same surface covers both cases: a dynamic code for this sale, a static one to print and leave on the counter.',
        },
      ],

      // ── The CRM side: the field agent's lead flow, same sticky treatment.
      //    `fallback` lets step 1 use the existing export until per-step
      //    screens (crm-2-settlement … crm-5-documents) are added. ──
      crmIntro: 'The agent’s side: sign in, work the pipeline, turn a shop visit into a submitted lead without paper, and finish by getting the QR onto the counter.',
      crmFlow: [
        {
          file: 'ssl-merchant-crm-login',
          step: 'Sign in',
          title: 'Start of a shift',
          hint: 'One sign-in, then straight to the day’s work.',
          why: 'Agents log in once on a personal device in the field, so biometrics and Remember Me carry the weight.',
        },
        {
          file: 'ssl-merchant-crm-home',
          step: 'Pipeline',
          title: 'Where the day stands',
          hint: 'Lead counts by status — Interested, In Review, Reverted — plus daily and monthly target progress and the newest leads first.',
          why: 'A field rep is measured on numbers, so the numbers lead, and achievement updates as the day goes rather than at close. Every recent lead is one tap from resuming.',
        },
        {
          file: 'ssl-merchant-crm-create-lead-flow-1',
          step: 'Check',
          title: 'Is this shop already known?',
          hint: 'Look the merchant up by bank account first. If there is a record, the known details load themselves.',
          why: 'A lookup before any data entry means an already-registered shop is caught in one step instead of at submission, after the whole form is filled — and when it does exist, the agent re-types nothing.',
        },
        {
          file: 'ssl-merchant-crm-create-lead-flow-2',
          step: 'Shop & Lead',
          title: 'Five steps, not one wall',
          hint: 'Shop, settlement, merchant, nominee, documents — five labelled sections, one screen at a time. Step 1 of 5.',
          why: 'A numbered stepper makes the length legible up front, and Save keeps a half-finished lead alive through a bad signal. Documents sit last because photo upload is the heaviest step on a mobile connection — everything before it is already stored if it fails.',
        },
        {
          file: 'crm-5-qr-deployment',
          step: 'Deploy',
          title: 'Get the code onto the counter',
          hint: 'Download the approved merchant’s QR, preview it, then confirm deployment by photographing it in place at the shop.',
          why: 'Approval is not the finish line. A merchant earns nothing until the code is physically on the counter, and a photo taken in situ is the only proof that actually happened. This is also where the CRM hands over to the merchant app.',
        },
      ],

      // ── Three decisions worth defending. Down from eight. ──
      keyDecisions: [
        {
          tag: 'Platform',
          title: 'Each bank is a mode, not a file',
          description: 'One shared library where a bank client is a variable mode over identical screens. This is the decision the whole platform rests on. Everything else follows from it.',
        },
        {
          tag: 'Payments',
          title: 'Amount before QR',
          description: 'We tested QR-first. Amount-first won because it matches how a shopkeeper actually thinks at the counter: price it, then present it.',
        },
        {
          tag: 'Onboarding',
          title: 'Chunked the signup, kept the draft',
          description: 'A KYC-heavy lead form became five labelled steps with save-as-draft, so a bad signal or an interrupted shop visit no longer means starting over.',
        },
      ],

      // ── Design System ──
      systemIntro: 'The system isn’t a supporting artifact here. It is the product.',
      systemPillars: [
        { title: 'One shared library', description: 'Inputs, cards, steppers, and sheets, composed across both apps and every bank skin.' },
        { title: 'Semantic-only binding', description: 'Components reference meaning, never a hex. A rebrand never touches a component.' },
        { title: 'Scales by addition', description: 'The next bank is a new mode and its brand values. Not a new project.' },
      ],
      // Semantic tokens — the values shown resolve differently per bank mode.
      systemTokens: [
        { name: 'Action primary', value: '#151515' },
        { name: 'Surface', value: '#f8fafc' },
        { name: 'Text primary', value: '#0f172a' },
        { name: 'Text muted', value: '#94a3b8' },
        { name: 'Success', value: '#2f9e44' },
        { name: 'Border', value: '#e2e8f0' },
      ],

      // ── Outcome ──
      outcomeIntro: 'SSL took the product to banks ready to launch. Multiple banks adopted it. Each ships it on Google Play under its own name and its own developer account, all running the same system.',
      outcomePoints: [
        'Adopted by multiple bank clients, with more in build, from one shared library.',
        'Each bank publishes under its own Play developer account, not SSL’s — the white-label holds all the way to the store listing.',
        'A bank could launch in its own brand without commissioning a build project.',
        'Merchant registration ships as a guided five-step flow agents complete on a phone, with save-as-draft throughout, and closes with photographed QR deployment at the shop.',
        'Improvements land once and propagate to every bank on the platform.',
      ],

      // ── Key Learnings ──
      learnings: [
        'White-label only works if the system refuses exceptions. The “never edit a shared value” rule was worth more than any single component.',
        'Separating brand tokens from semantic tokens is the whole trick. Bind one component to a hex and the platform quietly stops being a platform.',
        'Designing for the field agent turned out to be as load-bearing as designing for the merchant. The onboarding funnel runs through them.',
      ],

      metrics: [
        { label: 'Standard', value: 'Bangla QR' },
        { label: 'Banks adopted', value: '5+' },
        { label: 'Apps', value: 'Merchant + CRM' },
        { label: 'Shared core', value: '1 system' },
      ],
    }
  },
  {
    id: 'zcommerz',
    title: 'ZCOMMERZ — Online Store Builder',
    company: 'SSL Wireless',
    type: 'dashboard',
    year: '',
    tags: ['E-commerce', 'SaaS Onboarding', 'Web App', 'Payments', 'Designed & Built'],
    size: 'large',
    impact: 'Designed & coded',
    description: 'A build-your-own online store platform for Bangladeshi SMBs — sign up, set up payments and delivery, and launch a payment-ready shop in a single guided flow.',
    color: '#101828',
    accentColor: '#6366f1',
    image: '',
    link: '/case-study/zcommerz',
    caseStudy: {
      title: 'ZCOMMERZ',
      subtitle: 'Onboarding is the product',
      company: 'SSL Wireless',
      year: '[NEEDS: year built]',
      role: 'Lead UX/UI Designer · Front-end build',
      platform: 'Web',
      tool: 'Figma · Bootstrap 5 · JavaScript',

      // ── Hero. The h1 renders `title`; this is the line under it. ──
      heroSub: 'ZCOMMERZ lets a shop owner in Bangladesh build a real online store in minutes — pick a ready-made design, add products one by one or in bulk, and take bKash, cards, and cash on delivery, all without a developer. The whole product turns on one number: how fast someone with no technical skill goes from signing up to a live, selling store.',

      // ── Three-beat summary for a skimmer. ──
      tldr: [
        { label: 'Problem', text: 'A small shop owner who wants to sell online has to stitch together a website, a payment gateway, and a courier — each its own account, its own setup — and then design and stock the site itself. Most never get past step one.' },
        { label: 'Approach', text: 'Collapse the whole thing into one fast path: an OTP sign-up, a guided setup for payments and delivery, a ready-made storefront to pick from, and simple or bulk product upload — with the store URL generated for them.' },
        { label: 'Result', text: 'A shop owner goes from a phone number to a live, selling store in minutes. I designed the flow and built the front-end.' },
      ],

      overview: 'ZCOMMERZ is a self-serve platform that turns a phone number into a live online store in minutes. A merchant signs up with an OTP, moves through a guided setup for identity, delivery and payments, picks a ready-made storefront design, and adds products — one at a time or in bulk — to go live at their own URL. I owned the UX for onboarding, the dashboard, and the store-building flow, and coded the front-end.',
      overviewSpecs: [
        { label: 'Role', value: 'Lead UX/UI · Front-end' },
        { label: 'Scope', value: 'Onboarding · Dashboard · Storefront' },
        { label: 'Platform', value: 'Responsive web' },
        { label: 'Built with', value: 'Figma · Bootstrap 5 · JS' },
      ],

      nda: 'The product is publicly demoable. Screens in this case study use masked placeholder data — phone numbers, emails, and merchant names are synthetic, and payment/settlement identifiers are not shown.',

      // ── The problem is merchant-side: a non-technical seller. ──
      problem: 'Selling online in Bangladesh is not one decision, it is three. A shop owner needs a storefront, a way to take digital payments — bKash, cards, cash on delivery — and a courier to move the goods. Each is a separate signup with its own onboarding, and any one of them stalling means no sale. For a non-technical seller, that gap is where the whole idea dies.',
      solution: 'So ZCOMMERZ makes it one decision. A single sign-up and a guided setup wire up the storefront, the payment rails, and the delivery partners together, so the merchant finishes with a shop that can actually take money — not a to-do list of accounts still to create.',
      designChallenge: 'How do you compress everything it takes to launch an online store — design, payments, KYC, logistics, a product catalogue — into something a non-technical shop owner finishes in minutes, on a phone, without help?',

      // ── The constraints that shaped the work. Verifiable from the product. ──
      frictions: [
        {
          stat: 'Min',
          title: 'A store in minutes, not weeks',
          description: 'Building an online store normally means design, theming, and catalogue setup. Ready-made storefront demos and bulk product upload compress that into a single session.',
        },
        {
          stat: '0',
          title: 'Zero technical setup',
          description: 'The audience is shop owners, not developers. The store URL is auto-generated, gateways connect with a toggle, and nothing asks the merchant to configure infrastructure.',
        },
        {
          stat: 'Trust',
          title: 'Money on the line',
          description: 'A merchant is about to route real payments through this. Bank-grade security and clear settlement framing had to be present from the sign-up screen, not buried in settings.',
        },
      ],

      // ── The onboarding journey — the star of the case study. Drives a
      //    browser-frame walkthrough: screen, what it does, why. ──
      journeyIntro: 'The path from a phone number to a live store. Each screen does one job, and the order is deliberate — identity before logistics before money, so trust is built before anything consequential is asked.',
      journey: [
        {
          file: 'zc-signup',
          step: 'Sign up',
          title: 'Start with a phone number',
          hint: 'One field — a phone number — an OTP, and a three-day free trial. Social proof and “bank-grade security” sit right beside the form.',
          why: 'The lowest-commitment start possible. No password, no billing, no long form. The reassurance is placed where hesitation happens: next to the button.',
        },
        {
          file: 'zc-setup-identity',
          step: 'Identity',
          title: 'Who the store is',
          hint: 'Name, category, logo — and the store URL generates itself from the name as they type.',
          why: 'The auto-generated URL removes the single most technical decision a new seller faces, and makes the store feel real before any of the hard setup begins.',
        },
        {
          file: 'zc-setup-logistics',
          step: 'Delivery',
          title: 'How goods move',
          hint: 'Default delivery rates for inside and outside Dhaka, and courier partners connected in place. Skippable — it can be finished later from the dashboard.',
          why: 'Logistics comes before payments because it is the lighter lift, and letting it be deferred means a merchant is never blocked here on their way to going live.',
        },
        {
          file: 'zc-setup-payments',
          step: 'Payments',
          title: 'How money arrives',
          hint: 'Bangla QR, the SSLCOMMERZ gateway for cards and MFS, and cash on delivery — each a clear opt-in with settlement framing.',
          why: 'This is the consequential step, so it comes once identity and delivery have built momentum. Every rail is a deliberate choice, not a default the merchant discovers later.',
        },
        {
          file: 'zc-setup-plan',
          step: 'Launch',
          title: 'Pick a plan, go live',
          hint: 'Choose a plan and the store publishes. The trial means the plan decision does not block launch.',
          why: 'The commitment ask lands last — after the merchant has already built something and can see what they are paying for.',
        },
      ],

      // ── The store-building flow — the "build in a minute" half. Same
      //    browser-frame walkthrough as the onboarding journey. ──
      buildFlowIntro: 'Onboarding gets the merchant an account with live payment rails. Building the actual storefront is the second half — and the part that has to feel like minutes, not a web project. This is where “like Shopify, but in a minute” has to be true.',
      buildFlow: [
        {
          file: 'zc-dashboard',
          step: 'Dashboard',
          title: 'One place to run the shop',
          hint: 'Orders, products, and store settings in a single view. Building the storefront starts from here.',
          why: 'The merchant lands somewhere that already feels like a running business, not an empty configuration screen.',
        },
        {
          file: 'zc-pick-demo',
          step: 'Pick a demo',
          title: 'Start from a ready-made store',
          hint: 'Choose a demo storefront from the dashboard and the whole site is themed instantly — no page-building from scratch.',
          why: 'Starting from a finished-looking store is what turns weeks of design into a one-click decision. The seller edits, they don’t build.',
        },
        {
          file: 'zc-add-product',
          step: 'Add products',
          title: 'One at a time, or all at once',
          hint: 'Add a single product through a simple form, or bulk-upload an entire catalogue in one go.',
          why: 'A five-item boutique and a five-hundred-item wholesaler have opposite needs. Supporting both means neither is forced into the wrong tool.',
        },
        {
          file: 'zc-storefront',
          step: 'Go live',
          title: 'A real store, in minutes',
          hint: 'Demo picked, products in, payments connected — the storefront is live at the auto-generated URL.',
          why: '“Ready” means a customer can land on it and buy, not that setup is technically complete.',
        },
      ],

      // ── Payments & ecosystem — ties back to the Merchant case study. ──
      paymentsIntro: 'A storefront is only useful if it can take money the way Bangladeshi customers actually pay. ZCOMMERZ wires the merchant into the full local stack in the setup step, so “launch” means “can accept a payment,” not “looks finished.”',
      paymentRails: [
        { name: 'Bangla QR', role: 'Interoperable QR', detail: 'The country’s single QR standard — one code any bank or wallet app can scan. The same rail behind the SSL Merchant platform.' },
        { name: 'SSLCOMMERZ', role: 'Cards & MFS gateway', detail: 'Cards, net banking, and mobile financial services through one gateway integration.' },
        { name: 'Cash on delivery', role: 'Offline settlement', detail: 'Still how much of Bangladesh buys, so it is a first-class option, not an afterthought.' },
        { name: 'Courier partners', role: 'Fulfilment', detail: 'Delivery integrations so the merchant books pickup from the same dashboard that took the order.' },
      ],

      // ── Decisions worth defending. ──
      keyDecisions: [
        {
          tag: 'Store building',
          title: 'Start from a demo, not a blank canvas',
          description: 'A non-technical seller can’t design a store from nothing. Shipping ready-made storefront demos turns store design into pick-and-edit — the decision that makes “a store in minutes” actually true.',
        },
        {
          tag: 'Catalogue',
          title: 'Simple and bulk product upload',
          description: 'A boutique adds a handful of items by hand; a wholesaler has hundreds. Supporting both a simple form and bulk upload means the catalogue step fits either without compromise.',
        },
        {
          tag: 'Onboarding',
          title: 'A wizard, not one long form',
          description: 'Setup could fit on one page — and would be abandoned. Labelled steps make a heavy KYC-and-payments process feel finite, and the store URL is generated so the seller never faces a domain decision.',
        },
      ],

      // ── Designed AND built — the UX-Engineer angle. ──
      buildIntro: 'I did not hand this off as a spec. I designed the flow in Figma and then built the front-end, so the decisions above survived contact with real code instead of being renegotiated in handoff.',
      buildPoints: [
        'Designed the onboarding, dashboard, and storefront in Figma.',
        'Built the responsive front-end in Bootstrap 5 and vanilla JavaScript.',
        'Owned the flow end to end — the shipped product matches the design because the same person made both.',
      ],

      // ── Outcome. Numbers gated until confirmed — nothing invented. ──
      outcomeIntro: 'ZCOMMERZ ships as a live, self-serve product: a shop owner can sign up and stand up a payment-ready store without ever talking to sales.',
      outcomePoints: [
        'A merchant goes from a phone number to a live, selling store in minutes — sign up, set up, pick a demo, add products, go live.',
        'Ready-made storefront demos and simple-or-bulk product upload turn store-building from a web project into a single session.',
        'Payments, delivery, and storefront are wired up together — launch means the store can actually take money.',
        'Designed and front-end-built by one person, so the shipped product holds the design intent.',
        '[NEEDS: real outcome — e.g. merchants onboarded, stores live, or time-to-launch. Replace or delete.]',
      ],

      learnings: [
        'Onboarding was the product, not a preamble to it. The four-step setup was where the hardest and most valuable design decisions lived.',
        'Sequencing is a design tool. Moving the money step behind identity and delivery changed how much trust the merchant had by the time it mattered.',
        'Designing and building it myself kept the intent intact — nothing got lost or quietly simplified in a handoff.',
      ],

      metrics: [
        { label: 'Time to live', value: 'Minutes' },
        { label: 'Storefront', value: 'Ready-made demos' },
        { label: 'Payments', value: 'Bangla QR + SSLCOMMERZ' },
        { label: 'My role', value: 'Design + build' },
      ],
    }
  },
  {
    id: 'basic-bank',
    title: 'Basic Bank - Magpie Financial Services',
    company: 'Basic Bank',
    type: 'mobile',
    year: '2022',
    tags: ['Mobile Banking', 'Financial Services', 'Figma'],
    size: 'medium',
    impact: 'Sep-Oct 2022',
    description: 'A mobile banking solution for Basic Bank customers to manage finances, transfer funds, and pay bills with a user-friendly app experience.',
    color: '#222222',
    accentColor: '#6b7280',
    image: 'https://shaholanisha.xyz/wp-content/uploads/2026/01/magpie.png',
  },
  {
    id: 'ebuddy',
    title: 'eBuddy',
    company: 'SSL Wireless Product',
    type: 'dashboard',
    year: '2024',
    tags: ['Health', 'Web Application', 'Figma'],
    size: 'large',
    impact: 'Healthcare workflow',
    description: 'A platform designed to streamline doctor appointment workflows and prescription management for healthcare professionals.',
    color: '#1f2937',
    accentColor: '#9ca3af',
    image: 'https://shaholanisha.xyz/wp-content/uploads/2026/01/ebuddy.png',
  },
  {
    id: 'willro',
    title: 'Willro',
    company: 'Willro',
    type: 'enterprise',
    year: '2024',
    tags: ['Social Media', 'Reviews', 'Web App'],
    size: 'wide',
    impact: 'Work in progress',
    description: 'A social media platform centered around reviews, helping people share experiences, ratings, and opinions across products, services, and entertainment.',
    color: '#2d2d2d',
    accentColor: '#9ca3af',
    image: 'https://shaholanisha.xyz/wp-content/uploads/2026/02/willro.png',
  },
  {
    id: 'flavours-of-unity',
    title: 'Flavours of Unity',
    company: 'Flavours of Unity',
    type: 'system',
    year: '2024',
    tags: ['Education', 'LMS', 'Mobile & Web'],
    size: 'small',
    impact: 'Legal education',
    description: 'Bangladesh-focused legal education LMS for aspiring lawyers, local businesses, and legal professionals with courses, quizzes, and learning flows.',
    color: '#333333',
    accentColor: '#6b7280',
    image: 'https://shaholanisha.xyz/wp-content/uploads/2026/02/flavours-of-unity.png',
  },
  {
    id: 'easy-health',
    title: "Easy Health: Doctor's Appointments and Prescriptions",
    company: 'SSL Wireless Product',
    type: 'dashboard',
    year: '2024',
    tags: ['Health', 'Web Application', 'Figma'],
    size: 'large',
    impact: 'Healthcare workflow',
    description: 'A platform designed to streamline doctor appointment workflows and prescription management for healthcare professionals.',
    color: '#1f2937',
    accentColor: '#9ca3af',
    image: easyHealthImg,
  },
]

export const process = [
  {
    phase: '01',
    title: 'Research',
    description: 'Understand users, business goals, product context, and existing workflow pain points before deciding the interface direction.',
    icon: 'search',
    duration: 'Discovery',
  },
  {
    phase: '02',
    title: 'Define',
    description: 'Shape requirements into information architecture, user flows, and feature priorities for mobile and web products.',
    icon: 'map',
    duration: 'Planning',
  },
  {
    phase: '03',
    title: 'Design',
    description: 'Create visual systems, screens, components, and interaction patterns that feel clear, accessible, and usable.',
    icon: 'lightbulb',
    duration: 'UI/UX',
  },
  {
    phase: '04',
    title: 'Prototype',
    description: 'Build Figma prototypes that show the real journey, including important states, navigation, and decision points.',
    icon: 'layers',
    duration: 'Figma',
  },
  {
    phase: '05',
    title: 'Validate',
    description: 'Review flows with stakeholders and users, refine confusing moments, and improve clarity before handoff.',
    icon: 'check',
    duration: 'Iteration',
  },
  {
    phase: '06',
    title: 'Handoff',
    description: 'Prepare practical design handoff, assets, component notes, and collaboration support for development teams.',
    icon: 'rocket',
    duration: 'Delivery',
  },
]

export const metrics = [
  {
    value: 7,
    suffix: '+',
    label: 'Years in UX/product design',
    description: 'Experience across mobile banking, healthcare, education, social products, and web applications.',
    trend: 'career experience',
  },
  {
    value: 2020,
    suffix: '',
    label: 'Working with SSL Wireless',
    description: 'Currently working as a UX Analyst at SSL Wireless since April 2020.',
    trend: 'since Apr',
  },
  {
    value: 12,
    suffix: '+',
    label: 'Client and product highlights',
    description: 'Work connected to BKB, Basic Bank, UNDP, BAT, SSLCommerz, Easy Health, Legalized, Willro, and more.',
    trend: 'portfolio clients',
  },
  {
    value: 6,
    suffix: '+',
    label: 'Product categories',
    description: 'Banking, health, education, social media, merchant services, and enterprise workflows.',
    trend: 'cross-domain',
  },
]

export const experience = [
  {
    company: 'SSL Wireless',
    role: 'UX Analyst',
    period: 'Apr 2020 - Present',
    location: 'Dhaka, Bangladesh',
    description: 'Designing and improving digital products across banking, healthcare, merchant services, and platform experiences with a focus on research, visual design, and prototyping.',
    highlights: ['Healthcare', 'Internet Banking', 'Banking Apps', 'SSLCommerz', 'Merchants', 'LMS', 'UNDP', 'BAT'],
  },
  {
    company: 'Streams Tech Ltd.',
    role: 'UI Engineer',
    period: 'Apr 2018 - Apr 2020',
    location: 'Bangladesh',
    description: 'Specialized in problem solving, research, visual design, and prototyping for complex digital experiences.',
    highlights: ['User flows', 'Interactive coded prototypes', 'Product thinking'],
  },
]

