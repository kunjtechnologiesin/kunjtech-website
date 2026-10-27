import {
  BRAND_NAME,
  BRAND_SHORT,
  BRAND_INITIALS,
  TAGLINE,
  LEGAL_NAME,
  FOUNDER_NAME,
  FOUNDER_ROLE,
  BRAND_LOCATION,
  PHONE_NUMBER,
  WHATSAPP_NUMBER,
  WHATSAPP_MESSAGE,
  EMAIL,
  DOMAIN,
  BRAND_LOGO,
  BRAND_LOGO_MARK,
  BRAND_LOGO_WHITE,
  SOCIAL_LINKS,
  CURRENT_YEAR,
} from './config';

export {
  BRAND_NAME,
  BRAND_SHORT,
  BRAND_INITIALS,
  TAGLINE,
  LEGAL_NAME,
  FOUNDER_NAME,
  FOUNDER_ROLE,
  BRAND_LOCATION,
  PHONE_NUMBER,
  WHATSAPP_NUMBER,
  WHATSAPP_MESSAGE,
  EMAIL,
  DOMAIN,
  BRAND_LOGO,
  BRAND_LOGO_MARK,
  BRAND_LOGO_WHITE,
  SOCIAL_LINKS,
  CURRENT_YEAR,
};


export const NAV_LINKS = [
  { name: "Home", href: "#hero" },
  { name: "Our Work", href: "#work" },
  { name: "Services", href: "#services" },
  { name: "What You Get", href: "#included" },
  { name: "Process", href: "#process" },
  { name: "About", href: "#about" },
  { name: "Pricing", href: "#pricing" },
  { name: "Contact", href: "#contact" },
];

export const WHAT_YOU_GET_DATA = [
  {
    num: "01",
    title: "Custom Design, Not a Template",
    desc: "A website designed around your business — your products, your colours, your photos. Not a copy-paste template.",
    features: ["Custom Layout & Colours", "Your Brand Identity", "Photo & Video Gallery"]
  },
  {
    num: "02",
    title: "Fast on Every Phone",
    desc: "Built lightweight so it opens quickly on any phone, tablet or laptop, even with a weak network signal.",
    features: ["Optimized Images", "Lightweight Code", "Touch-Optimized Controls"]
  },
  {
    num: "03",
    title: "One-Tap Calls & WhatsApp",
    desc: "Customers tap one button to call you or message you on WhatsApp. No complicated forms.",
    features: ["One-Tap WhatsApp Button", "Click-to-Call Header", "Quotation Request Form"]
  },
  {
    num: "04",
    title: "Found on Google",
    desc: "When someone searches your trade in your city, your site shows up. We handle the technical setup.",
    features: ["Google Maps Directions", "Search Engine Listing", "Business Hours & Address"]
  },
  {
    num: "05",
    title: "You Talk to the Builder",
    desc: "No middlemen, no jargon. You talk directly with the person writing your code and designing your pages.",
    features: ["Direct Developer Access", "Domain & Hosting Help", "Post-Launch Support"]
  }
];

export const HERO_DATA = {
  headlineMain: "Your Business Deserves a",
  headlineAccent: "Professional Website.",
  subheading: "Kunj Technologies is a website designer and developer for local businesses in Akola and across Maharashtra, creating business websites, online catalogues and mobile apps. They look great on phones, load fast, and help customers contact you.",
  subheadingHindi: "आपका बिज़नेस, आपकी वेबसाइट।",
  trustLine: "Built as practice builds & design concepts.",
  badgeText: "WEBSITE DESIGNER & DEVELOPER IN AKOLA",
  // // CHANGED: Replaced Construction Dealers and Manufacturers with Hair Salons and Dermatology Clinics
  marqueeItems: [
    "HAIR SALONS & ACADEMIES",
    "DERMATOLOGY & LASER CLINICS",
    "BAKERIES & FOOD ORDERING",
    "HOTELS & BANQUETS",
    "STONE CRUSHERS & QUARRIES",
    "GYMS & FITNESS APPS",
    "RETAIL & POS SYSTEMS",
  ]
};


export interface ThemeObject {
  bg: string;
  title: string;
  body: string;
  muted: string;
  accent: string;
  tagBg: string;
  tagText: string;
  tagBorder: string;
  divider: string;
}

export const MERGED_SERVICES_DATA = [
  {
    id: "01",
    title: "Basic Business Websites",
    tagline: "Starting from ₹9,999 • For local shops & service providers",
    description: "Clean, fast websites for small shops and local services. Let customers find your address and call or WhatsApp you directly.",
    priceInfo: "Starting from ₹9,999",
    theme: {
      bg: "#E9E2D3",
      title: "#111110",
      body: "#2B2925",
      muted: "#5B564C",
      accent: "#FF4B2B",
      tagBg: "rgba(17,17,16,0.06)",
      tagText: "#111110",
      tagBorder: "#111110",
      divider: "rgba(17,17,16,0.15)"
    },
    deliverables: [
      "Custom layout & phone-first design",
      "Store hours, address & Google Maps pin",
      "One-tap call and WhatsApp buttons"
    ]
  },
  {
    id: "02",
    title: "Quote & Enquiry Websites",
    tagline: "Custom Quote • For contractors, dealers & suppliers",
    description: "Multi-page websites for businesses that need quote request forms, product specification sheets, and project galleries.",
    priceInfo: "Custom Quote",
    theme: {
      bg: "#18181B",
      title: "#FFFFFF",
      body: "#E4E4E7",
      muted: "#A1A1AA",
      accent: "#D97706",
      tagBg: "rgba(217,119,6,0.15)",
      tagText: "#D97706",
      tagBorder: "#D97706",
      divider: "rgba(255,255,255,0.2)"
    },
    deliverables: [
      "Full product & service catalog",
      "Custom quotation request forms",
      "PDF specification downloads"
    ]
  },
  {
    id: "03",
    title: "Online Ordering Websites",
    tagline: "Custom Quote • For bakeries, cafes & food outlets",
    description: "Complete digital storefronts with online ordering, digital menus, secure checkout, coupon codes, and live tracking.",
    priceInfo: "Custom Quote",
    theme: {
      bg: "#3A1F1C",
      title: "#FFF8F0",
      body: "#E8D9CC",
      muted: "#BFA999",
      accent: "#F5C400",
      tagBg: "rgba(255,255,255,0.08)",
      tagText: "#FFF8F0",
      tagBorder: "#FFF8F0",
      divider: "rgba(255,255,255,0.25)"
    },
    deliverables: [
      "Online menu & cart checkout",
      "Coupon code & discount setup",
      "Live order status & admin panel"
    ]
  },
  {
    id: "04",
    title: "Business Management Apps",
    tagline: "Custom Quote • Mobile & web apps for gyms, retail & operations",
    description: "Custom management software for gyms, grocery stores, and businesses. Features QR attendance, POS billing, and reports.",
    priceInfo: "Custom Quote",
    theme: {
      bg: "#0F3D2E",
      title: "#FFFFFF",
      body: "#E0F2FE",
      muted: "#A7F3D0",
      accent: "#34D399",
      tagBg: "rgba(52,211,153,0.15)",
      tagText: "#34D399",
      tagBorder: "#34D399",
      divider: "rgba(255,255,255,0.2)"
    },
    deliverables: [
      "Role-based access (Admin, Staff, Member)",
      "POS billing & inventory control",
      "QR attendance & PDF reports"
    ]
  }
];

export const PORTFOLIO_DATA = {
  // // CHANGED: Updated category list with Healthcare and Salon & Lifestyle
  categories: ["All", "Healthcare", "Salon & Lifestyle", "Restaurant", "Industrial", "Business"],
  projects: [
    {
      id: "p1",
      title: "The Hidden Bakers & Admin System",
      category: "Bakery & Food Ordering",
      isDemo: false,
      tag: "WORKING BUILD",
      description: "Online artisan bakery store with customer checkout, admin inventory management, and live order tracking.",
      clientLocation: "Akola, Maharashtra",
      layout: "menu" as const,
      theme: {
        bg: "#FFF8F0",
        title: "#3D1E16",
        body: "#4A2920",
        muted: "#7A5247",
        accent: "#E05A47",
        tagBg: "rgba(224,90,71,0.12)",
        tagText: "#E05A47",
        tagBorder: "#E05A47",
        divider: "rgba(61,30,22,0.15)"
      },
      badgeText: "WORKING BUILD • ARTISAN BAKERY",
      previewText: "Artisanal Breads, Celebration Cakes & Online Ordering",
      highlights: ["Online Ordering", "Admin System", "Live Tracking"],
      url: "baker-web-app-zeta.vercel.app"
    },
    // // NEW: Hair City Salon & Academy replacing Apex Building Supplies
    {
      id: "p2",
      title: "Hair City Salon & Academy",
      category: "Salon & Lifestyle",
      isDemo: false,
      tag: "WORKING BUILD",
      description: "Editorial salon & academy website with service lookbooks, syllabus guide, and WhatsApp booking.",
      clientLocation: "Akola, Maharashtra",
      layout: "catalog" as const,
      theme: {
        bg: "#FBF9F5",
        title: "#181513",
        body: "#423B36",
        muted: "#6A635B",
        accent: "#A46843",
        tagBg: "rgba(164,104,67,0.12)",
        tagText: "#A46843",
        tagBorder: "#A46843",
        divider: "rgba(24,21,19,0.15)"
      },
      badgeText: "EDITORIAL SALON & ACADEMY",
      previewText: "Precision Haircuts, Dimensional Colour & Academy Training",
      highlights: ["Bespoke Lookbook", "Academy Syllabus", "Direct WhatsApp Booking"],
      url: "hair-salon-web-ruddy.vercel.app"
    },
    {
      id: "p3",
      title: "Kalyan Stone Crushing Industry",
      category: "Industrial",
      isDemo: true,
      tag: "WORKING BUILD",
      description: "Industrial website for quarry operators. Crushing capacity, sieve sizes, and dispatch fleet.",
      clientLocation: "Kota, Rajasthan",
      layout: "dashboard" as const,
      theme: {
        bg: "#292524",
        title: "#FFFFFF",
        body: "#E7E5E4",
        muted: "#A8A29E",
        accent: "#EAB308",
        tagBg: "rgba(234,179,8,0.15)",
        tagText: "#EAB308",
        tagBorder: "#EAB308",
        divider: "rgba(255,255,255,0.2)"
      },
      badgeText: "DEMO INDUSTRIAL QUARRY SETUP",
      previewText: "Blue Metal Aggregate, GSB, Dust & M-Sand",
      highlights: ["Sieve Chart", "Lab Reports", "Weighbridge"],
      url: "stone-crusher-web-gamma.vercel.app"
    },
    {
      id: "p4",
      title: "Grand Heritage Lawns & Banquets",
      category: "Lifestyle",
      isDemo: true,
      tag: "WORKING BUILD",
      description: "Venue & luxury hotel concept with room booking, wedding galleries, and banquet calculator.",
      clientLocation: "Udaipur, Rajasthan",
      layout: "hero-image" as const,
      theme: {
        bg: "#064E3B",
        title: "#FFFFFF",
        body: "#ECFDF5",
        muted: "#A7F3D0",
        accent: "#34D399",
        tagBg: "rgba(52,211,153,0.15)",
        tagText: "#34D399",
        tagBorder: "#34D399",
        divider: "rgba(255,255,255,0.2)"
      },
      badgeText: "HERITAGE LAKEFRONT PROPERTY",
      previewText: "Wedding Lawns & Royal Palace Suites",
      highlights: ["360° Lawn View", "Wedding Packages", "Guest Info"],
      url: "wedding-venue-web.vercel.app"
    },
    // // NEW: Derma Care Skin & Laser Clinic replacing Precision Engineering & OEM Parts
    {
      id: "p5",
      title: "Derma Care Skin & Laser Clinic",
      category: "Healthcare",
      isDemo: false,
      tag: "WORKING BUILD",
      description: "Boutique dermatological practice website with interactive concern selector, treatment protocols, and consultation booking.",
      clientLocation: "Akola, Maharashtra",
      layout: "specs" as const,
      theme: {
        bg: "#FAF7F2",
        title: "#1F3A33",
        body: "#2A2A28",
        muted: "#5E5E58",
        accent: "#B08D57",
        tagBg: "rgba(31,58,51,0.12)",
        tagText: "#1F3A33",
        tagBorder: "#B08D57",
        divider: "rgba(31,58,51,0.15)"
      },
      badgeText: "EVIDENCE-LED DERMATOLOGY",
      previewText: "Clinical Skin, Hair PRP & Q-Switched Laser Aesthetics",
      highlights: ["Concern Selector", "5.0★ Google Proof", "Online Booking"],
      url: "derma-web-gules.vercel.app"
    },
    {
      id: "p6",
      title: "Shree Ram Coaching Institute",
      category: "Business",
      isDemo: true,
      tag: "DEMO CONCEPT",
      description: "Institute website with course breakdowns, topper lists, and downloadable notes.",
      clientLocation: "Indore, Madhya Pradesh",
      layout: "academic" as const,
      theme: {
        bg: "#312E81",
        title: "#FFFFFF",
        body: "#EEF2FF",
        muted: "#A5B4FC",
        accent: "#818CF8",
        tagBg: "rgba(129,140,248,0.15)",
        tagText: "#818CF8",
        tagBorder: "#818CF8",
        divider: "rgba(255,255,255,0.2)"
      },
      badgeText: "JEE & NEET FOUNDATION BATCHES",
      previewText: "Classroom Learning & Results Showcase",
      highlights: ["Batch Timetable", "Scholarship Test", "Parent Helpdesk"],
      url: "ram-coaching.demo"
    }
  ]
};

export const PROCESS_DATA = [
  {
    step: "01",
    title: "Tell Us About Your Business",
    desc: "What do you sell? Who are your customers? Share photos, brochures, or just tell us over WhatsApp."
  },
  {
    step: "02",
    title: "We Plan the Pages",
    desc: "We decide which pages you need, where buttons go, and how your products are shown."
  },
  {
    step: "03",
    title: "Design & Build",
    desc: "We write the code, pick the fonts, set up colours, and make it look sharp on every screen."
  },
  {
    step: "04",
    title: "You Review, We Fix",
    desc: "Check the live site on your phone and laptop. Tell us what to change — we fix it."
  },
  {
    step: "05",
    title: "Launch Day",
    desc: "We connect your domain, put you on Google, and hand over everything. Your site is live."
  }
];

export const PRICING_DATA = {
  startingNotice: "Websites starting from ₹9,999.",
  plans: [
    {
      name: "Starter",
      idealFor: "For small local businesses needing a clean 1–3 page web presence.",
      highlighted: false,
      features: [
        "1–3 Custom Designed Pages",
        "Mobile-First Responsive Layout",
        "One-Tap Call & WhatsApp Buttons",
        "Google Maps Pin & Location Setup",
        "1-Year Domain & Hosting Setup"
      ]
    },
    {
      name: "Business",
      idealFor: "For growing businesses needing product catalogs, galleries & enquiry forms.",
      highlighted: true,
      badge: "RECOMMENDED",
      features: [
        "5–8 Custom Designed Pages",
        "Full Product & Service Catalog",
        "High-Resolution Photo Gallery",
        "Custom Quotation Request Form",
        "Google Maps & Search Setup"
      ]
    },
    {
      name: "Premium",
      idealFor: "For established businesses wanting a full-featured digital presence.",
      highlighted: false,
      features: [
        "Multi-Page Enterprise Site",
        "Custom Interactive Calculators",
        "Multi-Location Branch Listings",
        "PDF Spec Downloads & Lead Tracking",
        "Priority Post-Launch Support"
      ]
    }
  ]
};

export const ABOUT_DATA = {
  name: "Darshan Jogi",
  role: "Developer & Studio Owner",
  location: "India",
  bioParagraph1: "I'm Darshan — I build websites for shop owners, factory operators, and small businesses. I focus on making sites that actually bring in customers.",
  bioParagraph2: "You shouldn't have to pay an agency ₹2 lakh or settle for a broken template. I do everything myself — from design to code. In addition to custom websites, I also build mobile apps and online ordering systems.",
  values: [
    "You talk directly with the person building your site",
    "We understand your business before we start designing",
    "Clear timelines and straightforward updates",
    "Post-launch support whenever you need it"
  ]
};

export const FAQ_DATA = [
  {
    q: "How much does a website cost?",
    a: "It depends on how many pages and features you need.Static websites start from ₹9,999 and dynamic websites (with an admin panel) start from ₹24,999. We'll give you a clear quote after a quick chat."
  },
  {
    q: "How long does it take?",
    a: "Most business websites are ready within a few days, depending on the content and features you need."
  },
  {
    q: "Will it work on mobile?",
    a: "Yes. Every website is built mobile-first — it works perfectly on phones, tablets, and desktops."
  },
  {
    q: "Can you redesign my existing website?",
    a: "Absolutely. As a website designer in Akola, we can take your old site and rebuild it from scratch with a modern design and faster loading."
  },
  {
    q: "How do customers reach me through the site?",
    a: "We add one-tap WhatsApp, phone call, and enquiry form buttons. Customers reach you directly — no middlemen."
  }
];

export const MOCKUP_SITES = PORTFOLIO_DATA.projects;
