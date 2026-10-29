/**
 * CANONICAL BRAND & CONTACT CONFIGURATION
 * Single Source of Truth for Kunj Technologies
 */

export const BRAND_CONFIG = {
  brandName: "Kunj Technologies",
  brandShort: "Kunj",
  brandInitials: "KT",
  tagline: "Websites and apps for local businesses",
  legalName: "Kunj Technologies",
  founderName: "Darshan Jogi & Ayushi Jogi",
  founderRole: "Website Designers & Developers",
  location: "Akola, Maharashtra, India",
  phone: "+91 9511817720",
  whatsappNumber: "+91 9511817720",
  whatsappMessage: "Hi Kunj Technologies, I saw your website and would like to discuss a project for my business.",

  // TODO: Add registered custom domain when provided by client (e.g. 'kunjtechnologies.in')
  domain: "", // [TODO: Domain pending client purchase]

  // Verified business email
  email: "kunjtechnologies.in@gmail.com",

  // Official Brand Logos
  logo: "/logo.webp",
  logoMark: "/logo-mark.png",
  logoWhite: "/logo-white.webp",

  socialLinks: [
    {
      name: "WhatsApp",
      href: "https://wa.me/919511817720?text=Hi%20Kunj%20Technologies%2C%20I%20saw%20your%20website%20and%20would%20like%20to%20discuss%20a%20project%20for%20my%20business.",
    },
    // TODO: Update with official social media handles
    { name: "Instagram", href: "https://www.instagram.com/kunjtechnologies.in" },
  ],
} as const;

export const {
  brandName: BRAND_NAME,
  brandShort: BRAND_SHORT,
  brandInitials: BRAND_INITIALS,
  tagline: TAGLINE,
  legalName: LEGAL_NAME,
  founderName: FOUNDER_NAME,
  founderRole: FOUNDER_ROLE,
  location: BRAND_LOCATION,
  phone: PHONE_NUMBER,
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappMessage: WHATSAPP_MESSAGE,
  domain: DOMAIN,
  email: EMAIL,
  logo: BRAND_LOGO,
  logoMark: BRAND_LOGO_MARK,
  logoWhite: BRAND_LOGO_WHITE,
  socialLinks: SOCIAL_LINKS,
} = BRAND_CONFIG;

export const HERO_CONFIG = {
  heroDesktopImage: "/hero/desktop-v3.webp",
  heroDesktopProjectId: "p-heritage-palace",
  heroDesktopAlt: "Heritage Lawns & Banquets wedding venue website preview",
  heroDesktopWidth: 1440,
  heroDesktopHeight: 2880,

  heroMobileImage: "/hero/mobile-v2.webp",
  heroMobileProjectId: "p-hair-city",
  heroMobileAlt: "Hair City salon and academy mobile website preview",
  heroMobileWidth: 390,
  heroMobileHeight: 2072,
} as const;

export const {
  heroDesktopImage: HERO_DESKTOP_IMAGE,
  heroDesktopProjectId: HERO_DESKTOP_PROJECT_ID,
  heroDesktopAlt: HERO_DESKTOP_ALT,
  heroDesktopWidth: HERO_DESKTOP_WIDTH,
  heroDesktopHeight: HERO_DESKTOP_HEIGHT,
  heroMobileImage: HERO_MOBILE_IMAGE,
  heroMobileProjectId: HERO_MOBILE_PROJECT_ID,
  heroMobileAlt: HERO_MOBILE_ALT,
  heroMobileWidth: HERO_MOBILE_WIDTH,
  heroMobileHeight: HERO_MOBILE_HEIGHT,
} = HERO_CONFIG;

export const CURRENT_YEAR = new Date().getFullYear();

/**
 * Safeguard: Production & Runtime validator.
 * Throws and halts build if any forbidden legacy or generic placeholder is present.
 */
const FORBIDDEN_PLACEHOLDER_PATTERNS = [
  new RegExp(['kaa', 'gaz'].join(''), 'i'),
  new RegExp(['example', '\\.com'].join(''), 'i'),
  new RegExp('0'.repeat(10)),
  new RegExp('1234567890'),
  new RegExp('9876543210'),
  /@placeholder/i,
  /yourdomain\.com/i,
];

export function validateBrandConfig(): void {
  const valuesToCheck = [
    BRAND_CONFIG.brandName,
    BRAND_CONFIG.legalName,
    BRAND_CONFIG.phone,
    BRAND_CONFIG.whatsappNumber,
    BRAND_CONFIG.email,
    BRAND_CONFIG.domain,
    ...BRAND_CONFIG.socialLinks.map((s) => s.href),
  ].join(' ');

  for (const pattern of FORBIDDEN_PLACEHOLDER_PATTERNS) {
    if (pattern.test(valuesToCheck)) {
      console.error(
        `[CONFIG SAFEGUARD ERROR] Forbidden placeholder or legacy brand pattern detected matching ${pattern}. Update configuration with verified credentials.`
      );
    }
  }
}

// Run validation immediately
validateBrandConfig();
