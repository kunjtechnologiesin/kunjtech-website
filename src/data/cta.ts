/**
 * CANONICAL CALL TO ACTION (CTA) MAP
 * Single source of truth for all CTA labels, destinations, and messages
 * 
 * Rules:
 * - Only Navbar and Hero share the wording "Get Your Website"
 * - All other CTAs have unique wording describing what happens next
 * - Red button = primary action
 * - Outline button = secondary action
 * - Text link = tertiary action
 */

import { WHATSAPP_NUMBER, BRAND_NAME } from './config';

export type CtaStyle = 'primary' | 'outline' | 'link';
export type CtaDestination = '#contact' | '#work' | 'whatsapp' | 'submit';

export interface CtaConfig {
  id: string;
  label: string;
  style: CtaStyle;
  destination: CtaDestination;
  prefillMessage?: string;
  whatsappMessage?: string;
}

export const CTA_CONFIG = {
  navbar: {
    id: 'cta-navbar',
    label: 'Get Your Website',
    style: 'primary',
    destination: '#contact',
    whatsappMessage: `Hi ${BRAND_NAME}! I saw your website and want to discuss getting a website for my business.`,
  },

  heroPrimary: {
    id: 'cta-hero-primary',
    label: 'Chat on WhatsApp',
    style: 'primary',
    destination: 'whatsapp',
    whatsappMessage: `Hi ${BRAND_NAME}! I want to get a professional website for my business.`,
  },

  heroSecondary: {
    id: 'cta-hero-secondary',
    label: 'View Our Work',
    style: 'outline',
    destination: '#work',
  },

  portfolioEnd: {
    id: 'cta-portfolio-end',
    label: 'Like what you see? Get a free homepage preview',
    style: 'primary',
    destination: '#contact',
    prefillMessage: 'I reviewed your live portfolio projects and want to request a free homepage preview for my business.',
    whatsappMessage: `Hi ${BRAND_NAME}! I reviewed your portfolio work and want to request a free homepage preview.`,
  },

  servicesTertiary: {
    id: 'cta-services-tertiary',
    label: 'Not sure which fits? Tell us about your business →',
    style: 'link',
    destination: '#contact',
    prefillMessage: "I'm reviewing your services and want guidance on which option best fits my business requirements.",
    whatsappMessage: `Hi ${BRAND_NAME}! I'm looking at your services list and want guidance on which option fits my business.`,
  },

  processTertiary: {
    id: 'cta-process-tertiary',
    label: 'Start with step 1 on WhatsApp →',
    style: 'link',
    destination: 'whatsapp',
    whatsappMessage: `Hi ${BRAND_NAME}! I'm ready to start with step 1 (discovery and requirements) for my business website.`,
  },

  aboutTertiary: {
    id: 'cta-about-tertiary',
    label: 'Message us on WhatsApp →',
    style: 'link',
    destination: 'whatsapp',
    whatsappMessage: `Hi Kunj Technologies! I saw your about note and would like to talk directly about a website project.`,
  },

  contactSubmit: {
    id: 'cta-contact-submit',
    label: 'Send on WhatsApp',
    style: 'primary',
    destination: 'submit',
  },
} as const satisfies Record<string, CtaConfig>;

/**
 * Helper to generate pre-filled WhatsApp URLs
 */
export function getWhatsAppUrl(message?: string): string {
  const cleanPhone = WHATSAPP_NUMBER.replace(/[^0-9]/g, '');
  const text = message || `Hi ${BRAND_NAME}! I saw your website and would like to discuss a project.`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

/**
 * Smoothly scroll to #contact (offset by header height) and focus first field
 */
export function triggerFormCta(prefillMessage?: string): void {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // On mobile touch devices, primary CTAs open WhatsApp directly with prefilled context
  if (isMobile) {
    const waUrl = getWhatsAppUrl(prefillMessage);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    return;
  }

  // On desktop, scroll smoothly to #contact offset by header height
  const contactEl = document.getElementById('contact');
  if (contactEl) {
    const lenis = (window as any).__lenis;
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.start();
      lenis.targetScroll = NaN;
      lenis.scrollTo(contactEl, { offset: 0, force: true });
    } else {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Pre-fill form if message provided
  if (prefillMessage && typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('prefill-contact-form', {
        detail: { message: prefillMessage },
      })
    );
  }

  // Focus the first field (Name)
  setTimeout(() => {
    const nameInput = document.getElementById('input-name') as HTMLInputElement | null;
    nameInput?.focus();
  }, 450);
}
