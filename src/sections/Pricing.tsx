import React, { useRef, useEffect, useState } from 'react';
import { getSectionConfig } from '../config/sectionsConfig';
import { Check, Sparkles, X, Globe, Server, Info } from 'lucide-react';
import { Reveal } from '../components/motion/Reveal';
import { type CtaConfig, CTA_CONFIG } from '../data/cta';
import { CtaButton } from '../components/CtaButton';
import { BRAND_NAME } from '../data/config';
import { RollingPrice } from '../components/RollingPrice';

/* ─────────────────────────────────────────────
   EDIT PRICES AND FEATURES HERE
   ───────────────────────────────────────────── */

type SiteType = 'static' | 'dynamic';

interface Plan {
  name: string;
  price: string;
  priceNote: string;
  idealFor: string;
  pages: string;
  seo: string;
  delivery?: string;
  recommended?: boolean;
  features: string[];
  excluded?: string[];
}

const PLANS: Record<SiteType, Plan[]> = {
  static: [
    {
      name: 'Basic',
      price: '₹9,999',
      priceNote: 'fixed price · one-time',
      idealFor: 'Small shops and service providers who need a clean web presence.',
      pages: '1–3 pages',
      seo: 'None',
      features: [
        '1–3 custom designed pages',
        'Mobile-first responsive layout',
        'One-tap Call & WhatsApp buttons',
        'Google Maps pin & location setup',
        'Photo gallery 1-3',
      ],
      excluded: [

        'Enquiry / quotation form',
        'SEO setup',

      ],

    },
    {
      name: 'Standard',
      price: '₹14,999',
      priceNote: 'fixed price · one-time',
      idealFor: 'Growing businesses with products, services and a photo gallery.',
      pages: '4–7 pages',
      seo: 'Basic',
      recommended: true,
      features: [
        '4–7 custom designed pages',
        'Product / service catalogue',
        'Photo gallery',
        'Enquiry / quotation request form',
        'Google Business profile setup',
        'Basic SEO: titles, descriptions, sitemap, speed tuning',


      ],
    },
    {
      name: 'Premium',
      price: 'From ₹19,999',
      priceNote: 'final quote after discussion',
      idealFor: 'Established businesses wanting a full-featured digital presence.',
      pages: '8+ pages',
      seo: 'Advanced',
      features: [
        '8+ pages, fully custom design',
        'Interactive tools (calculators, comparisons)',
        'Multi-location / branch listings',
        'PDF downloads & lead tracking (analytics)',
        'Advanced SEO: keyword research, schema, Search Console',

        'Priority support',
      ],
    },
  ],
  dynamic: [
    {
      name: 'Basic',
      price: '₹19,999',
      priceNote: 'fixed price · one-time',
      idealFor: 'Businesses that want to update their own content without a developer.',
      pages: '1–3 pages',
      seo: 'None',
      features: [
        '1–3 pages with a simple admin panel',
        'Edit text, photos and prices yourself',
        'Enquiries saved in a database',
        'Secure admin login',


      ],

    },
    {
      name: 'Standard',
      price: '₹25,999',
      priceNote: 'fixed price · one-time',
      idealFor: 'Businesses taking bookings, enquiries or managing a catalogue online.',
      pages: '4–7 pages',
      seo: 'Basic',
      recommended: true,
      features: [
        '4–7 pages with a full admin dashboard',
        'Catalogue / listings you can add and edit',
        'Online booking or enquiry management',
        'Email / WhatsApp notifications',
        'Basic SEO: titles, descriptions, sitemap, speed tuning',


      ],
    },
    {
      name: 'Premium',
      price: 'From ₹39,999',
      priceNote: 'final quote after discussion',
      idealFor: 'Online stores, ordering systems and custom business apps.',
      pages: '8+ pages',
      seo: 'Advanced',
      features: [
        'Online ordering or e-commerce with payments',
        'Customer accounts & order tracking',
        'Admin dashboard with reports',
        'Custom features built for your workflow',
        'Advanced SEO: keyword research, schema, Search Console',

        'Priority support',
      ],
    },
  ],
};

const RUNNING_COSTS = [
  {
    icon: Globe,
    title: 'Domain name',
    desc: 'Your web address (like yourbusiness.com). I register it in your name and connect it to your website.',
    rows: [{ label: 'Renewal after year 1', hint: 'typical for .in / .com', value: '₹600 – ₹1,500+ / year' }],
    note: 'You own the domain, and I tell you the renewal date in advance. Price can be higher for other extensions or premium names, and I confirm it with you before booking.',
  },
  {
    icon: Server,
    title: 'Hosting',
    desc: 'The server that keeps your website online, fast and secure (with SSL / https).',
    rows: [
      { label: 'Static websites', hint: 'renewal', value: '₹0 – ₹3,000 / year' },
      { label: 'Dynamic websites', hint: 'database + admin', value: '₹3,000 – ₹8,000 / year' },
    ],
    note: '',
  },
];

type BillingCycle = 'monthly' | 'yearly';

const BILLING_OPTIONS: { id: BillingCycle; label: string; per: string; months: number; badge?: string }[] = [
  { id: 'monthly', label: 'Monthly', per: 'month', months: 1 },
  { id: 'yearly', label: 'Yearly', per: 'year', months: 12, badge: '2 months free' },
];

const toNum = (s: string) => Number(s.replace(/[^\d]/g, ''));
const formatINR = (n: number) => `₹${n.toLocaleString('en-IN')}`;

// Price for a single small edit when the client has no Care plan
const ONE_OFF_EDIT_PRICE = '₹499';

const MAINTENANCE: {
  name: string;
  prices: Record<BillingCycle, string>;
  points: string[];
  yearlyBonus: string;
  featured?: boolean;
}[] = [
    {
      name: 'Care Basic',
      prices: { monthly: '₹499', yearly: '₹4,990' },
      points: ['Uptime monitoring', 'Monthly backup', 'Up to 2 small content edits / month'],
      yearlyBonus: '1 bonus content edit / month (yearly only)',
    },
    {
      name: 'Care Plus',
      prices: { monthly: '₹999', yearly: '₹9,990' },
      featured: true,
      points: ['Everything in Care Basic', 'Up to 5 content edits / month', 'Monthly speed & SEO check'],
      yearlyBonus: '2 bonus content edits / month (yearly only)',
    },
    {
      name: 'Care Pro',
      prices: { monthly: '₹1,999', yearly: '₹19,990' },
      points: ['Everything in Care Plus', 'Up to 10 edits / month', 'Priority replies on WhatsApp'],
      yearlyBonus: '3 bonus content edits / month (yearly only)',
    },
  ];

/* ───────── component ───────── */

export const Pricing: React.FC = () => {
  const sectionInfo = getSectionConfig('pricing');
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [siteType, setSiteType] = useState<SiteType>('static');
  const [selected, setSelected] = useState<string>('Standard');
  const [selectedCare, setSelectedCare] = useState<string>('Care Plus');
  const [billing, setBilling] = useState<BillingCycle>('yearly');

  // Care plans: swipe row on mobile, kept in sync with the Basic / Plus / Pro tabs
  const careScrollRef = useRef<HTMLDivElement>(null);
  const careCardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const careTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const careFirstRun = useRef(true);

  const scrollToCare = (name: string, smooth = true) => {
    const container = careScrollRef.current;
    const card = careCardRefs.current[name];
    if (!container || !card || container.scrollWidth <= container.clientWidth) return;
    container.scrollTo({
      left: card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2,
      behavior: smooth ? 'smooth' : 'auto',
    });
  };

  const handleCareScroll = () => {
    if (careTimer.current) clearTimeout(careTimer.current);
    careTimer.current = setTimeout(() => {
      const container = careScrollRef.current;
      if (!container || container.scrollWidth <= container.clientWidth) return;
      const centre = container.scrollLeft + container.clientWidth / 2;
      let closest = selectedCare;
      let min = Infinity;
      MAINTENANCE.forEach((m) => {
        const el = careCardRefs.current[m.name];
        if (!el) return;
        const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - centre);
        if (d < min) {
          min = d;
          closest = m.name;
        }
      });
      if (closest !== selectedCare) setSelectedCare(closest);
    }, 120);
  };

  // Whenever the selected care plan changes (tab tap, card tap or swipe), centre its card
  useEffect(() => {
    scrollToCare(selectedCare, !careFirstRun.current);
    careFirstRun.current = false;
  }, [selectedCare]);

  const plans = PLANS[siteType];

  // Mobile only: centre a plan card in the swipe row (does nothing on desktop grid)
  const scrollToPlan = (name: string, smooth = true) => {
    const container = scrollRef.current;
    const card = cardRefs.current[name];
    if (!container || !card || container.scrollWidth <= container.clientWidth) return;
    container.scrollTo({
      left: card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2,
      behavior: smooth ? 'smooth' : 'auto',
    });
  };

  // Start on the recommended plan
  useEffect(() => {
    scrollToPlan('Standard', false);
  }, []);

  // Mobile only: when the swipe settles, highlight the plan that is in the middle
  const handleScroll = () => {
    if (scrollTimer.current) clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      const container = scrollRef.current;
      if (!container || container.scrollWidth <= container.clientWidth) return;
      const centre = container.scrollLeft + container.clientWidth / 2;
      let closest = selected;
      let min = Infinity;
      plans.forEach((p) => {
        const el = cardRefs.current[p.name];
        if (!el) return;
        const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - centre);
        if (d < min) {
          min = d;
          closest = p.name;
        }
      });
      if (closest !== selected) setSelected(closest);
    }, 120);
  };

  // "₹10,000 – ₹15,000" -> "from ₹10k"
  const startPrice = (price: string) => price;

  const buildCta = (plan: Plan): CtaConfig => {
    const label = `${plan.name} ${siteType} website plan (${plan.price})`;
    return {
      id: `cta-pricing-${siteType}-${plan.name.toLowerCase()}`,
      label: `Start with ${plan.name}`,
      style: 'outline',
      destination: '#contact',
      prefillMessage: `I am interested in the ${label}.`,
      whatsappMessage: `Hi ${BRAND_NAME}! I am interested in the ${label}.`,
    };
  };

  return (
    <section id="pricing" className="pt-24 pb-10 md:pt-28 md:pb-14 bg-grain border-b border-ink/15 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Section Header with integrated Static / Dynamic Toggle on desktop */}
        <Reveal>
          <div className="mb-6 md:mb-5 pb-3 border-b border-ink/15 flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <div className="font-mono text-xs text-vermilion-text uppercase tracking-widest mb-1 font-bold">
                [ SECTION {sectionInfo.number} ] • PRICING
              </div>
              <h2 className="font-display font-black text-[clamp(1.5rem,5.5vw,2.75rem)] uppercase tracking-tight text-ink leading-none">
                Simple{' '}
                <span className="font-serif italic font-normal text-vermilion-text lowercase inline">
                  pricing.
                </span>
              </h2>
            </div>

            {/* Toggle + 1-Year Included Pill — integrated right next to header */}
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5 sm:gap-3 w-full md:w-auto">
              <div
                className="inline-flex rounded-full border border-ink/20 bg-card p-1 shadow-mobile-soft"
                role="tablist"
                aria-label="Website type"
              >
                {(['static', 'dynamic'] as SiteType[]).map((t) => (
                  <button
                    key={t}
                    role="tab"
                    aria-selected={siteType === t}
                    onClick={() => setSiteType(t)}
                    className={`px-3.5 sm:px-4 py-1.5 rounded-full font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-colors min-h-[44px] ${siteType === t ? 'bg-ink text-paper shadow-sm' : 'text-ink hover:bg-ink/10'
                      }`}
                  >
                    {t === 'static' ? 'Static Website' : 'Dynamic Website'}
                  </button>
                ))}
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-card px-3 py-1.5 font-mono text-[11px] text-ink shadow-sm">
                <span className="font-bold text-ink-muted">1-yr included:</span>
                <span className="flex items-center gap-1 font-bold text-vermilion-text">
                  <Check className="w-3.5 h-3.5 text-vermilion-text" strokeWidth={2.5} /> Domain, Hosting, Support
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Subtitle explaining the current choice */}
        <p className="font-sans text-xs sm:text-sm text-ink-muted text-center md:text-left mb-3">
          {siteType === 'static'
            ? 'Fast, simple sites. You ask me whenever you want a change.'
            : 'Admin panel + database. Update content, take bookings.'}
        </p>

        {/* Mobile plan switcher: shows all 3 plans at a glance, tap to jump */}
        <div
          className="md:hidden mb-3 grid grid-cols-3 gap-1.5 rounded-2xl border border-ink/15 bg-card p-1.5"
          role="tablist"
          aria-label="Choose a plan"
        >
          {plans.map((p) => (
            <button
              key={p.name}
              role="tab"
              aria-selected={selected === p.name}
              onClick={() => {
                setSelected(p.name);
                scrollToPlan(p.name);
              }}
              className={`rounded-xl px-2 py-2 text-center transition-colors min-h-[48px] ${selected === p.name ? 'bg-ink text-paper' : 'text-ink'}`}
            >
              <span className="block font-display font-bold text-sm leading-tight">{p.name}</span>
              <span className={`block font-mono text-[10px] leading-tight mt-0.5 ${selected === p.name ? 'text-paper/70' : 'text-ink-muted'}`}>
                {startPrice(p.price)}
              </span>
            </button>
          ))}
        </div>

        {/* Plans: swipe row on mobile (next card peeks in), 3-column grid on desktop */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="relative flex overflow-x-auto snap-x snap-mandatory gap-3.5 sm:gap-4 scrollbar-none pt-5 pb-6 -mx-5 px-5 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:pt-3 md:pb-1 items-stretch"
        >
          {plans.map((plan) => {
            const isSelected = selected === plan.name;

            const stats: [string, string][] = [['Pages', plan.pages], ['SEO', plan.seo]];
            if (plan.delivery) stats.push(['Delivery', plan.delivery]);

            // "₹10,000 – ₹15,000" -> big "₹10,000" + smaller "– ₹15,000"; "From ₹20,000" -> small "From" + big price
            const isFrom = /^from/i.test(plan.price);
            const amounts = plan.price.replace(/^from\s*/i, '').split(/\s*[–-]\s*/);
            const mainPrice = amounts[0];
            const upTo = amounts[1];

            return (
              <div
                key={plan.name}
                ref={(el) => {
                  cardRefs.current[plan.name] = el;
                }}
                onClick={() => {
                  setSelected(plan.name);
                  scrollToPlan(plan.name);
                }}
                className={`w-[82%] sm:w-[85%] md:w-auto flex-shrink-0 snap-center md:flex-shrink relative flex flex-col rounded-3xl transition-all duration-500 cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-vermilion/40 ${isSelected
                  ? 'bg-white border border-ink/15 shadow-[0_8px_30px_-12px_rgba(17,17,16,0.18)] md:bg-gradient-to-b md:from-white md:to-card md:border-vermilion-text/40 md:ring-1 md:ring-vermilion-text/30 md:shadow-[0_30px_60px_-30px_rgba(194,47,23,0.45)] md:-translate-y-2 z-20'
                  : 'bg-card/90 border border-ink/10 shadow-mobile-soft hover:-translate-y-1 hover:border-ink/25 hover:shadow-[0_24px_48px_-28px_rgba(17,17,16,0.3)] z-10'
                  }`}
              >
                {/* Accent line on the selected card */}
                <div
                  className={`hidden md:block absolute inset-x-8 top-0 h-[3px] rounded-b-full bg-gradient-to-r from-vermilion via-vermilion-text to-vermilion-light transition-opacity duration-500 ${isSelected ? 'opacity-100' : 'opacity-0'}`}
                />

                {(plan.recommended || isSelected) && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 whitespace-nowrap rounded-full bg-vermilion-text px-3.5 py-1 font-mono text-[10px] font-extrabold tracking-wider text-paper shadow-md pointer-events-none">
                    <Sparkles className="w-3 h-3 fill-current" />
                    <span>{plan.recommended ? 'RECOMMENDED' : 'YOUR CHOICE'}</span>
                  </div>
                )}

                {/* Header: name, who it is for, price, quick facts */}
                <div className="px-5 pt-6 pb-3 sm:px-6 md:px-5 md:pt-3 md:pb-1.5">
                  <h3 className="font-display font-black text-xl md:text-lg tracking-tight text-ink">{plan.name}</h3>
                  <p className="mt-1 font-sans text-sm md:text-xs leading-snug text-ink-muted md:min-h-[22px]">
                    {plan.idealFor}
                  </p>

                  <div className="mt-4 md:mt-1.5 flex flex-wrap items-baseline gap-x-1.5">
                    {isFrom && (
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink-muted">From</span>
                    )}
                    <RollingPrice
                      value={mainPrice}
                      className="font-display font-black text-[2.5rem] sm:text-[2.75rem] md:text-[1.8rem] leading-none tracking-tight text-ink md:text-vermilion-text"
                    />
                    {upTo && (
                      <span className="inline-flex font-display font-bold text-sm text-ink-muted">
                        <span className="mr-1">–</span>
                        <RollingPrice value={upTo} stagger={50} />
                      </span>
                    )}
                  </div>
                  <div className="mt-1.5 font-sans text-sm md:mt-0.5 md:font-mono md:text-[9.5px] text-ink-muted">{plan.priceNote}</div>

                  <dl className={`mt-5 md:mt-1.5 grid divide-x divide-ink/10 rounded-xl border border-ink/10 bg-white/60 ${plan.delivery ? 'grid-cols-3' : 'grid-cols-2'}`}>
                    {stats.map(([label, value]) => (
                      <div key={label} className="px-3.5 py-2.5 md:px-2.5 md:py-1">
                        <dt className="font-mono text-[10px] md:text-[8.5px] uppercase tracking-wider text-ink-muted">{label}</dt>
                        <dd className="mt-0.5 font-display font-bold text-sm md:text-xs text-ink">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Features + CTA */}
                <div className="flex-1 flex flex-col justify-between px-5 pb-5 sm:px-6 md:px-5 md:pb-2.5">
                  <div className="border-t border-ink/10 pt-5 md:pt-1.5">
                    <p className="mb-3 md:mb-1.5 font-mono text-[11px] md:text-[8.5px] uppercase tracking-[0.18em] text-ink-muted">What is included</p>
                    <ul className="space-y-3 md:space-y-0.5">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <Check
                            className={`mt-1 w-4 h-4 md:mt-0.5 md:w-3 md:h-3 flex-shrink-0 ${isSelected ? 'text-vermilion-text' : 'text-ink/60'}`}
                            strokeWidth={2.5}
                          />
                          <span className="font-sans text-sm md:text-xs leading-snug text-ink/80">{feature}</span>
                        </li>
                      ))}
                      {plan.excluded?.map((item) => (
                        <li key={item} className="flex items-start gap-2 opacity-60">
                          <X className="mt-1 w-4 h-4 md:mt-0.5 md:w-3 md:h-3 flex-shrink-0 text-ink/60" strokeWidth={2.5} />
                          <span className="font-sans text-sm md:text-xs leading-snug text-ink/80 line-through">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 md:pt-1.5">
                    <CtaButton
                      cta={buildCta(plan)}
                      variant={isSelected ? 'primary' : 'outline'}
                      className="w-full justify-center min-h-[52px] md:min-h-[32px] py-3 md:py-1 text-base md:text-xs"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Consultation & Transparent Pricing Note — Full width matching the 3 cards grid */}
        <div className="mt-6 w-full rounded-2xl border border-ink/10 bg-card p-5 sm:px-5 sm:py-3 shadow-mobile-soft">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <p className="font-display font-bold text-base text-ink">
                Not sure which plan fits your business?
              </p>
              <p className="mt-1 font-sans text-sm text-ink-muted">
                Tell me about your business and goals — I’ll recommend the exact right plan.
              </p>
            </div>
            <CtaButton cta={CTA_CONFIG.heroPrimary} className="w-full sm:w-auto justify-center whitespace-nowrap shrink-0 min-h-[48px] sm:min-h-[34px] py-2.5 sm:py-1.5 text-sm" />
          </div>

          <div className="mt-4 pt-4 sm:mt-2.5 sm:pt-2.5 border-t border-ink/10 flex flex-col md:flex-row md:items-center justify-between gap-2.5 text-center sm:text-left">
            <div className="hidden md:flex items-center justify-center sm:justify-start gap-2 font-mono text-[11px] text-ink-muted shrink-0 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-vermilion-text shrink-0" />
              <span>
                Static from <strong className="font-bold text-ink">₹9,999</strong> · Dynamic from <strong className="font-bold text-ink">₹19,999</strong>
              </span>
            </div>
            <div className="flex items-center justify-center sm:justify-start md:justify-end gap-1.5 font-sans text-[11px] text-ink-muted/80">
              <Info className="w-3.5 h-3.5 text-ink-muted/70 shrink-0" />
              <span>Final price depends on scope. Payment gateways &amp; third-party APIs billed at actuals.</span>
            </div>
          </div>
        </div>

        {/* Domain, hosting & maintenance */}
        <div id="domain-hosting" className="mt-10 md:mt-20">
          <div className="mb-6 pb-3 border-b border-ink/15">
            <div className="font-mono text-xs text-vermilion-text uppercase tracking-widest mb-1.5 font-bold">
              [ DOMAIN, HOSTING & MAINTENANCE ]
            </div>
            <h3 className="font-display font-black text-[clamp(1.4rem,4.5vw,2.25rem)] uppercase tracking-tight text-ink leading-none">
              What it costs to <span className="font-serif italic font-normal text-vermilion-text lowercase">keep it running.</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {RUNNING_COSTS.map(({ icon: Icon, title, desc, rows, note }) => (
              <div key={title} className="group relative overflow-hidden rounded-3xl border border-ink/10 bg-gradient-to-b from-white to-card p-4 sm:p-7 shadow-[0_24px_50px_-30px_rgba(17,17,16,0.35)] transition-all duration-500 hover:-translate-y-1 hover:border-vermilion-text/30">
                <div className="absolute inset-x-8 top-0 h-[3px] rounded-b-full bg-gradient-to-r from-vermilion via-vermilion-text to-vermilion-light" />
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-vermilion to-vermilion-text text-paper shadow-md">
                      <Icon className="w-5 h-5" />
                    </span>
                    <h4 className="font-display font-black text-lg sm:text-xl whitespace-nowrap tracking-tight text-ink">{title}</h4>
                  </div>
                  <span className="whitespace-nowrap rounded-full border border-vermilion-text/30 bg-vermilion-text/5 px-2.5 py-0.5 sm:px-3 sm:py-1 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-vermilion-text">
                    Year 1 included
                  </span>
                </div>

                <p className="mt-3 font-sans text-sm leading-relaxed text-ink-muted">{desc}</p>

                <dl className="mt-3 sm:mt-5 divide-y divide-ink/10 rounded-xl border border-ink/10 bg-white/60">
                  {rows.map((r) => (
                    <div key={r.label} className="flex flex-row items-center justify-between gap-3 px-3 py-2.5 sm:px-4 sm:py-3 sm:items-baseline sm:gap-4">
                      <dt className="font-sans text-sm text-ink-muted">
                        {r.label}
                        <span className="block font-mono text-[10px] uppercase tracking-wider text-ink-muted/70">{r.hint}</span>
                      </dt>
                      <dd className="font-display font-bold text-sm sm:text-lg text-ink text-right">{r.value}</dd>
                    </div>
                  ))}
                </dl>

                {note && (
                  <p className="mt-3 flex items-start gap-2 font-sans text-xs sm:text-sm text-ink-muted">
                    <Check className="mt-0.5 w-4 h-4 flex-shrink-0 text-vermilion-text" strokeWidth={2.5} />
                    <span>{note}</span>
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* ───── Care plans ───── */}
          <div className="mt-10 md:mt-16 text-center">
            <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-vermilion-text">
              Optional care plans
            </div>


            <div className="mt-5 flex justify-center">
              <div
                className="inline-flex rounded-full border border-ink/20 bg-card p-1 shadow-mobile-soft"
                role="tablist"
                aria-label="Billing period"
              >
                {BILLING_OPTIONS.map((o) => (
                  <button
                    key={o.id}
                    role="tab"
                    aria-selected={billing === o.id}
                    onClick={() => setBilling(o.id)}
                    className={`flex items-center gap-1.5 px-3.5 sm:px-5 py-2 rounded-full font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-colors min-h-[44px] ${billing === o.id ? 'bg-ink text-paper shadow-sm' : 'text-ink hover:bg-ink/10'
                      }`}
                  >
                    {o.label}
                    {o.badge && (
                      <span
                        className={`hidden sm:inline rounded-full px-2 py-0.5 text-[9px] tracking-wide ${billing === o.id ? 'bg-vermilion-text text-paper' : 'bg-vermilion-text/10 text-vermilion-text'
                          }`}
                      >
                        {o.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-3 font-sans text-xs text-ink-muted">
              {billing === 'yearly'
                ? 'Best value: pay for 10 months, get 12, plus bonus edits.'
                : 'Billed monthly, 3-month minimum. Switch to yearly and get 2 months free.'}
            </p>

            <div
              className="mt-5 inline-flex rounded-full border border-ink/20 bg-card p-1 sm:hidden"
              role="tablist"
              aria-label="Care plan"
            >
              {MAINTENANCE.map((m) => (
                <button
                  key={m.name}
                  role="tab"
                  aria-selected={selectedCare === m.name}
                  onClick={() => setSelectedCare(m.name)}
                  className={`min-h-[38px] rounded-full px-5 py-2 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors ${selectedCare === m.name ? 'bg-vermilion-text text-paper' : 'text-ink'
                    }`}
                >
                  {m.name.replace('Care ', '')}
                </button>
              ))}
            </div>
          </div>

          <div
            ref={careScrollRef}
            onScroll={handleCareScroll}
            className="relative mt-8 sm:mt-9 flex overflow-x-auto snap-x snap-mandatory gap-3.5 sm:gap-4 scrollbar-none pt-5 pb-6 -mx-5 px-5 sm:-mx-6 sm:px-6 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:pt-0 sm:pb-0 items-stretch"
          >
            {MAINTENANCE.map((m) => {
              const cycle = BILLING_OPTIONS.find((o) => o.id === billing)!;
              const amount = m.prices[billing];
              const fullPrice = toNum(m.prices.monthly) * cycle.months;
              const saving = fullPrice - toNum(amount);
              const perMonth = Math.round(toNum(amount) / cycle.months);
              const isActive = selectedCare === m.name;
              return (
                <div
                  key={m.name}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  ref={(el) => { careCardRefs.current[m.name] = el; }}
                  onClick={() => {
                    setSelectedCare(m.name);
                    scrollToCare(m.name);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedCare(m.name);
                      scrollToCare(m.name);
                    }
                  }}
                  className={`w-[82%] sm:w-auto flex-shrink-0 snap-center sm:flex-shrink relative flex flex-col rounded-3xl border bg-gradient-to-b from-white to-card p-5 sm:p-7 cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-vermilion/40 transition-all duration-300 ${isActive
                    ? 'border-vermilion-text/40 ring-1 ring-vermilion-text/30 shadow-[0_30px_60px_-30px_rgba(194,47,23,0.45)]'
                    : 'border-ink/10 shadow-mobile-soft hover:border-ink/25'
                    }`}
                >
                  {isActive && (
                    <div className="absolute inset-x-8 top-0 h-[3px] rounded-b-full bg-gradient-to-r from-vermilion via-vermilion-text to-vermilion-light" />
                  )}
                  {m.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 whitespace-nowrap rounded-full bg-vermilion-text px-3.5 py-1 font-mono text-[10px] font-extrabold tracking-wider text-paper shadow-md pointer-events-none">
                      <Sparkles className="w-3 h-3 fill-current" />
                      <span>MOST POPULAR</span>
                    </div>
                  )}

                  <h4 className={`font-mono text-xs font-bold uppercase tracking-[0.18em] ${isActive ? 'text-vermilion-text' : 'text-ink-muted'}`}>
                    {m.name}
                  </h4>

                  <div className="mt-3 flex items-baseline gap-1.5">
                    <RollingPrice
                      value={amount}
                      className="font-display font-black text-[2rem] sm:text-[2.4rem] leading-none tracking-tight text-vermilion-text"
                    />
                    <span className="font-mono text-xs text-ink-muted">/ {cycle.per}</span>
                  </div>

                  <div className="mt-2 min-h-[32px] font-mono text-[11px] leading-snug text-ink-muted">
                    {billing === 'monthly' ? (
                      <>
                        <span className="block">Billed monthly</span>
                        <span className="block">3-month minimum commitment</span>
                      </>
                    ) : (
                      <>
                        <span className="block">
                          <span className="line-through">{formatINR(fullPrice)}</span>{' '}
                          <span className="font-bold text-vermilion-text">Save {formatINR(saving)}</span>
                        </span>
                        <span className="block">≈ {formatINR(perMonth)} / month</span>
                      </>
                    )}
                  </div>

                  <ul className="mt-4 sm:mt-5 flex-1 space-y-2.5 sm:space-y-3 border-t border-ink/10 pt-4 sm:pt-5 font-sans text-sm text-ink/80">
                    {(billing === 'yearly' ? [...m.points, m.yearlyBonus] : m.points).map((pt) => (
                      <li key={pt} className="flex items-start gap-3">
                        <Check className="mt-0.5 w-4 h-4 flex-shrink-0 text-vermilion-text" strokeWidth={2.5} />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* No plan option */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-6 rounded-2xl border border-ink/10 bg-card px-5 py-4 text-center sm:text-left shadow-mobile-soft">
            <p className="font-display font-bold text-sm sm:text-base text-ink">Don&apos;t need a plan right now?</p>
            <p className="font-sans text-xs sm:text-sm text-ink-muted">
              One-off changes start from <strong className="font-bold text-ink">{ONE_OFF_EDIT_PRICE} per edit</strong>, depending
              on the work involved.
            </p>
          </div>

          {/* Terms */}
          <p className="mx-auto mt-4 max-w-3xl text-center font-sans text-[11px] leading-relaxed text-ink-muted/80">
            Monthly care plans have a minimum commitment of 3 months (no month-to-month cancellation). Yearly plans are paid upfront. Unused edits do not carry over.
          </p>
        </div>

      </div>
    </section>
  );
};