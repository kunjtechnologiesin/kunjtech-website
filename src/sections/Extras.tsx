import React from 'react';
import { ChevronDown } from 'lucide-react';

/* ─────────────────────────────────────────────
   EDIT THESE VALUES (only real information!)
   ───────────────────────────────────────────── */

// Add real testimonials only. While this list is empty, the section stays hidden.
// Example item:
// { quote: "Short real quote.", name: "Client Name", business: "Business Name" }
export const TESTIMONIALS: { quote: string; name: string; business: string }[] = [];

// Path to a short intro video inside /public (example: "/intro.mp4"). Empty = hidden.
export const INTRO_VIDEO_SRC = '';

// Your Google Business / Google reviews link. Empty = hidden.
export const GOOGLE_REVIEW_LINK = '';

// Confirm these match what you really offer
export const PRICE_TEXT = 'From ₹9,999';
export const TIMELINE_TEXT = 'Live in 1–3 weeks';

/* One line per demo, shown on each portfolio card. Keys = project ids. */


/* ───────── 1. Price + timeline strip (place right after Hero) ───────── */
export const TrustStrip: React.FC = () => (
    <div className="bg-paper-dark/50 border-b border-ink/15">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center font-mono text-xs sm:text-sm text-ink">
            <div><span className="text-vermilion-text font-bold">{PRICE_TEXT}</span> · clear pricing, no hidden fees</div>
            <div><span className="text-vermilion-text font-bold">{TIMELINE_TEXT}</span> · from first call to launch</div>
            <div><span className="text-vermilion-text font-bold">WhatsApp support</span> · talk directly to the developer</div>
        </div>
    </div>
);

/* ───────── 2. Testimonials ───────── */
export const Testimonials: React.FC = () => {
    if (TESTIMONIALS.length === 0) return null;
    return (
        <section id="testimonials" className="py-12 md:py-20 bg-paper border-b border-ink/15">
            <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
                <div className="font-mono text-xs text-vermilion-text uppercase tracking-widest mb-2 font-bold">
                    [ CLIENT WORDS ]
                </div>
                <h2 className="font-display font-black text-[clamp(1.75rem,6vw,3rem)] uppercase tracking-tight text-ink mb-8">
                    What clients say
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {TESTIMONIALS.map((t, i) => (
                        <figure key={i} className="bg-card border border-ink/15 rounded-lg p-5 sm:p-6">
                            <blockquote className="font-sans text-base text-ink leading-relaxed">“{t.quote}”</blockquote>
                            <figcaption className="mt-4 font-mono text-xs text-ink-muted">
                                <strong className="text-ink">{t.name}</strong> · {t.business}
                            </figcaption>
                        </figure>
                    ))}
                </div>
                {GOOGLE_REVIEW_LINK && (
                    <a
                        href={GOOGLE_REVIEW_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-6 font-sans font-bold text-sm text-vermilion-text underline underline-offset-4"
                    >
                        Read our Google reviews →
                    </a>
                )}
            </div>
        </section>
    );
};

/* ───────── 3. What happens after launch (place after Pricing) ───────── */
const AFTER_LAUNCH = [
    { title: 'Domain & hosting', text: 'Set up for you. Included for the first year; renewal cost is told upfront.' },
    { title: 'Support', text: '1 year of support on WhatsApp for fixes and small updates.' },
    { title: 'Ownership', text: 'Your content and your business details stay yours.' },
    { title: 'Google setup', text: 'Google Business profile and Maps pin set up so customers can find you.' },
];

export const AfterLaunch: React.FC = () => (
    <section id="after-launch" className="py-12 md:py-20 bg-paper border-b border-ink/15">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="font-mono text-xs text-vermilion-text uppercase tracking-widest mb-2 font-bold">
                [ AFTER LAUNCH ]
            </div>
            <h2 className="font-display font-black text-[clamp(1.75rem,6vw,3rem)] uppercase tracking-tight text-ink mb-8">
                No surprises <span className="font-serif italic font-normal text-vermilion-text lowercase">after launch.</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {AFTER_LAUNCH.map((item) => (
                    <div key={item.title} className="bg-card border border-ink/15 rounded-lg p-5">
                        <h3 className="font-display font-bold text-lg text-ink">{item.title}</h3>
                        <p className="font-sans text-sm text-ink-muted mt-1 leading-relaxed">{item.text}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

/* ───────── 4. Intro video (hidden until INTRO_VIDEO_SRC is set) ───────── */
export const IntroVideo: React.FC = () => {
    if (!INTRO_VIDEO_SRC) return null;
    return (
        <section id="intro-video" className="py-12 md:py-20 bg-paper-dark/40 border-b border-ink/15">
            <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
                <h2 className="font-display font-black text-[clamp(1.5rem,5vw,2.5rem)] uppercase tracking-tight text-ink mb-6">
                    Meet your developer
                </h2>
                <video
                    src={INTRO_VIDEO_SRC}
                    controls
                    preload="metadata"
                    playsInline
                    className="w-full rounded-lg border border-ink/15"
                />
            </div>
        </section>
    );
};
/* ───────── 5. Privacy & Terms (place just above Footer) ───────── */
const POLICY_DATE = 'October 26, 2026';
const SITE_URL = 'https://kunjtechnologies.in';
const CONTACT_EMAIL = 'kunjtechnologies.in@gmail.com';
const CONTACT_PHONE_DISPLAY = '+91 9511817720';
const CONTACT_PHONE_LINK = 'tel:+919511817720';

type PolicySection = { title: string; text?: string; list?: string[] };

const PRIVACY: PolicySection[] = [
    {
        title: 'Who we are',
        text: 'Kunj Technologies is a web and mobile app development business in Akola, Maharashtra, India. Grievance contact: Darshan Jogi.',
    },
    {
        title: 'What we collect',
        text: 'When you contact us by form, email, call or WhatsApp, we may collect:',
        list: [
            'Your name, phone number and email',
            'Your business name and type',
            'Details of your project or enquiry',
            'Basic technical data (IP address, browser, pages visited), collected by our hosting provider',
        ],
    },
    {
        title: 'Please do not send',
        text: 'Passwords, card details or government ID numbers. If a project needs access to an account, we will agree on a safe way to share it.',
    },
    {
        title: 'How we use it',
        text: 'To reply to enquiries, send quotes, build and support your project, send invoices, keep the website secure, and meet legal and tax requirements. We never sell your information. We send promotional messages only with your consent.',
    },
    {
        title: 'Who we share it with',
        text: 'Only where needed: our hosting provider (for example Vercel), email and messaging tools, accountants or lawyers, and authorities if the law requires. Some providers may store data outside India.',
    },
    {
        title: 'How long we keep it',
        text: 'Enquiry details are generally deleted within 12 months if no project follows. Client and invoice records are kept as long as Indian tax and accounting law requires.',
    },
    {
        title: 'Your rights',
        text: `Subject to applicable law, including the Digital Personal Data Protection Act, 2023, you can ask us to show, correct or delete your data, withdraw consent, or make a complaint. Email ${CONTACT_EMAIL} with the subject "Privacy Request". We may need to verify your identity first.`,
    },
    {
        title: 'Security, children and changes',
        text: 'We use reasonable safeguards such as HTTPS and limited access, but no system is 100% secure. Our services are for businesses and adults, not for people under 18. We may update this policy, and the latest version will always be on this page.',
    },
];

const TERMS: PolicySection[] = [
    {
        title: 'About these terms',
        text: 'These terms cover use of this website and our web and app development services. Each project also has a written quote or agreement ("Project Agreement"). If it conflicts with these terms, the Project Agreement applies to that project.',
    },
    {
        title: 'Using this website',
        text: 'Please use the site lawfully. Do not attempt to hack or disrupt it, scrape or copy our content without permission, or send spam or harmful code. We may block access if these terms are broken.',
    },
    {
        title: 'Pricing and payments',
        list: [
            'Prices are in Indian Rupees (INR). GST is added where required.',
            'Advance, milestone and final payment amounts and due dates are stated in your quote or invoice.',
            'Work starts after the advance is received. We may pause work on overdue payments.',
            'Refunds depend on the work already done, costs already incurred, and applicable law.',
            'Third-party costs (domain renewal, paid plugins, app store fees, SMS or email services) are paid by you unless the quote says otherwise.',
        ],
    },
    {
        title: 'What we need from you',
        text: 'Accurate content, images, logos and timely feedback. Delays on your side can move the delivery date. You confirm you have the right to use everything you give us.',
    },
    {
        title: 'Revisions and extra work',
        text: 'The number of revision rounds is stated in your quote. New pages, new features or redesigns outside the agreed scope are quoted and billed separately.',
    },
    {
        title: 'Ownership',
        text: 'You keep ownership of your content. After full payment, you own the final custom design and code made for your project. We keep our own tools, templates and know-how, and third-party or open-source parts stay under their own licences. Until full payment, we may withhold delivery. We may show the finished project in our portfolio unless you tell us in writing not to.',
    },
    {
        title: 'Hosting and support',
        text: 'Domain and hosting setup, plus 1 year of WhatsApp support for fixes and small updates, are provided as described in the "After launch" section of this website. New features, redesigns and support beyond that period are charged separately. Care Plan monthly content edits cover text changes, image swaps, and minor adjustments. They do not roll over to subsequent months, nor do they include building new pages, custom feature development, or full-scale graphic design work.',
    },
    {
        title: 'No guarantee of results',
        text: 'We build with care, but we cannot promise rankings, traffic, enquiries or sales. We are not responsible for outages, fee changes or policy changes of third-party services.',
    },
    {
        title: 'Liability',
        text: 'To the extent allowed by law, we are not liable for indirect losses such as lost profit or business. Our total liability for a project is limited to the amount you paid for that project. Nothing here limits rights that cannot legally be limited.',
    },
    {
        title: 'Cancellation',
        text: 'You can cancel in writing at any time and pay for work completed and costs already incurred. We may end a project if payment or essential information is not provided after notice, or if these terms are seriously broken.',
    },
    {
        title: 'Law and disputes',
        text: 'These terms are governed by the laws of India. We will first try to settle disputes by discussion; if that fails, the courts at Akola, Maharashtra will handle them.',
    },
];

const PolicyBody: React.FC<{ intro: string; sections: PolicySection[] }> = ({ intro, sections }) => (
    <div
        data-lenis-prevent
        className="border-t border-ink/10 px-5 pb-6 pt-5 md:max-h-[560px] md:overflow-y-auto md:overscroll-contain pr-3 md:dropdown-scroll text-ink space-y-4"
    >
        <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">{intro}</p>
        {sections.map((s, i) => (
            <div key={s.title} className="space-y-1.5">
                <h3 className="font-display font-bold text-sm text-ink uppercase tracking-tight">
                    {i + 1}. {s.title}
                </h3>
                {s.text && <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">{s.text}</p>}
                {s.list && (
                    <ul className="text-xs sm:text-sm text-ink-muted space-y-1 list-disc pl-4">
                        {s.list.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                )}
            </div>
        ))}
        <div className="pt-3 border-t border-ink/10 text-xs sm:text-sm text-ink-muted leading-relaxed">
            Questions? Contact Darshan Jogi, Kunj Technologies, Akola, Maharashtra, India ·{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-vermilion-text underline">{CONTACT_EMAIL}</a> ·{' '}
            <a href={CONTACT_PHONE_LINK} className="text-vermilion-text underline">{CONTACT_PHONE_DISPLAY}</a>
        </div>
    </div>
);

const PolicyAccordion: React.FC<{ label: string; intro: string; sections: PolicySection[] }> = ({ label, intro, sections }) => (
    <details
        className="group bg-card border border-ink/15 rounded-xl shadow-mobile-soft open:border-ink/30 transition-colors"
    >
        <summary className="flex min-h-[58px] cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-display font-bold text-base text-ink select-none [&::-webkit-details-marker]:hidden">
            <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-vermilion-text" />
                <span>{label}</span>
            </div>
            <ChevronDown className="w-5 h-5 text-vermilion-text transition-transform duration-300 group-open:rotate-180" />
        </summary>
        <PolicyBody intro={intro} sections={sections} />
    </details>
);

export const Policies: React.FC = () => (
    <section id="policies" className="py-10 md:py-14 bg-paper border-b border-ink/15">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                    <div className="font-mono text-xs text-vermilion-text uppercase tracking-widest font-bold mb-1">
                        [ LEGAL & TRANSPARENCY ]
                    </div>
                    <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-ink">
                        Privacy Policy &amp; Terms of Service
                    </h2>
                </div>
                <div className="font-mono text-xs text-ink-muted">Last updated: {POLICY_DATE}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start font-sans">
                <PolicyAccordion
                    label="Privacy Policy"
                    intro={`This policy explains what personal information Kunj Technologies collects through ${SITE_URL} and when you contact us, and how we use it. By using the website you agree to this policy.`}
                    sections={PRIVACY}
                />
                <PolicyAccordion
                    label="Terms of Service"
                    intro="By using this website or hiring Kunj Technologies, you agree to these terms. If you do not agree, please do not use the website or our services."
                    sections={TERMS}
                />
            </div>
        </div>
    </section>
);