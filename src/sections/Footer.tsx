import React from 'react';
import { BRAND_NAME, BRAND_LOGO_WHITE, TAGLINE, NAV_LINKS, MERGED_SERVICES_DATA, WHATSAPP_NUMBER, WHATSAPP_MESSAGE, EMAIL, SOCIAL_LINKS, CURRENT_YEAR } from '../data/siteData';
import { PhoneCall, Mail, ArrowUpRight } from 'lucide-react';
import { Reveal } from '../components/motion/Reveal';

export const Footer: React.FC = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <footer className="bg-ink text-paper pt-10 pb-8 font-sans border-t-2 border-ink relative overflow-hidden select-none">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Short Footer Grid: Brand Line, 2-Column Links, Contact & Social */}
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-paper/15">

            {/* Brand Line - Official white lettering for dark footer */}
            <div className="lg:col-span-4 space-y-4">
              <a href="#" className="inline-block group" aria-label={BRAND_NAME}>
                <img
                  src={BRAND_LOGO_WHITE}
                  alt={BRAND_NAME}
                  width={140}
                  height={133}
                  className="h-20 sm:h-24 md:h-28 w-auto object-contain group-hover:scale-105 transition-transform"
                />
              </a>

              <p className="font-sans text-xs sm:text-sm text-paper-dark leading-relaxed max-w-xs">
                {TAGLINE}. Fast, mobile-first websites and applications designed to build trust and get business enquiries.
              </p>

              <div className="pt-1 font-mono text-xs text-vermilion-light">
                📍 AKOLA, MAHARASHTRA, INDIA
              </div>
            </div>

            {/* 2-Column Links Section */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-6">

              {/* Navigation Links Column */}
              <div>
                <h3 className="font-mono text-xs uppercase text-vermilion-light font-bold tracking-wider mb-3">
                  [ NAVIGATION ]
                </h3>
                <ul className="space-y-1.5 text-xs sm:text-sm">
                  {NAV_LINKS.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className="text-paper-dark hover:text-vermilion-light transition-colors">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services 1-Column List (All 4 Items) */}
              <div>
                <h3 className="font-mono text-xs uppercase text-vermilion-light font-bold tracking-wider mb-3">
                  [ SERVICES ]
                </h3>
                <ul className="space-y-2 text-xs text-paper-dark">
                  {MERGED_SERVICES_DATA.map((service) => (
                    <li key={service.id}>
                      <a href="#services" className="hover:text-vermilion-light transition-colors block leading-snug">
                        {service.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Contact & Social Links */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="font-mono text-xs uppercase text-vermilion-light font-bold tracking-wider mb-3">
                [ CONNECT ]
              </h3>
              <div className="space-y-2 text-xs sm:text-sm">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-paper-dark hover:text-vermilion-light transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-vermilion-light flex-shrink-0" />
                  <span>{WHATSAPP_NUMBER}</span>
                </a>

                {EMAIL ? (
                  <a
                    href={`mailto:${EMAIL}`}
                    className="flex items-center gap-2 text-paper-dark hover:text-vermilion-light transition-colors text-xs"
                  >
                    <Mail className="w-3.5 h-3.5 text-vermilion-light flex-shrink-0" />
                    <span>{EMAIL}</span>
                  </a>
                ) : (
                  <div className="flex items-center gap-2 text-paper-dark/70 text-xs font-mono">
                    <Mail className="w-3.5 h-3.5 text-vermilion-light flex-shrink-0" />
                    <span>Email: [TODO: Pending Client Email]</span>
                  </div>
                )}

                <div className="pt-3 border-t border-paper/10 flex items-center gap-4 font-mono text-xs">
                  {SOCIAL_LINKS.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-paper-dark hover:text-vermilion-light transition-colors"
                    >
                      <span>{s.name}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </Reveal>

        {/* Giant Wordmark: KUNJ with TECHNOLOGIES below, scaling with clamp() to prevent any overflow */}
        <div className="py-6 sm:py-8 border-b border-paper/15 text-center overflow-hidden select-none">
          <div className="font-display font-black text-[clamp(2.75rem,14vw,8.5rem)] leading-none uppercase tracking-tighter text-paper/10 flex justify-center hover:text-vermilion/30 transition-colors">
            KUNJ
          </div>
          <div className="font-mono font-bold text-[clamp(0.75rem,3.2vw,1.75rem)] uppercase tracking-[0.28em] sm:tracking-[0.38em] text-paper/60 mt-1 sm:mt-2 text-center">
            TECHNOLOGIES
          </div>
        </div>

        {/* Dynamic Copyright Notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[11px] text-paper-dark">
          <p>
            © {CURRENT_YEAR} {BRAND_NAME}. All rights reserved. ·{' '}
            <a href="#policies" className="underline hover:text-vermilion-light">Privacy & Terms</a>
          </p>
          <p className="flex items-center gap-1.5">
            <span>Designed and built by {BRAND_NAME}</span>
            <span className="text-vermilion">✦</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
