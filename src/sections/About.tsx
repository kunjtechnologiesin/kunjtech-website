import React from 'react';
import { getSectionConfig } from '../config/sectionsConfig';
import { Check } from 'lucide-react';
import { Reveal } from '../components/motion/Reveal';
import { CTA_CONFIG } from '../data/cta';
import { CtaButton } from '../components/CtaButton';

export const About: React.FC = () => {
  const sectionInfo = getSectionConfig('about');

  return (
    <section id="about" className="pt-24 pb-12 md:py-24 bg-paper border-b border-ink/15 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Section Header */}
        <Reveal>
          <div className="mb-8 pb-4 border-b border-ink/15">
            <div className="font-mono text-xs text-vermilion-text uppercase tracking-widest mb-1.5 font-bold">
              [ SECTION {sectionInfo.number} ] • ABOUT
            </div>
            <h2 className="font-display font-black text-[clamp(1.4rem,5vw,3.75rem)] uppercase tracking-tight text-ink leading-none">
              Direct Communication.{' '}
              <span className="font-serif italic font-normal text-vermilion-text lowercase inline">
                no middleman.
              </span>
            </h2>
          </div>
        </Reveal>

        <div className="space-y-6 sm:space-y-8">

          {/* 3-Line Intro */}
          <Reveal delay={0.1}>
            <div className="bg-card border border-ink/15 rounded-lg p-5 sm:p-6 shadow-mobile-soft">
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="font-display font-bold text-lg sm:text-xl text-ink">
                  Darshan Jogi & Ayushi Jogi
                </span>
                <span className="font-mono text-[10px] text-emerald-700 font-bold uppercase bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                  ● REPLIES WITHIN 1 HOUR
                </span>
              </div>
              <p className="font-sans text-base sm:text-lg text-ink leading-relaxed font-medium">
                We’re Darshan and Ayushi, website developers in Akola — we build custom websites and apps for shop owners, manufacturers, and local businesses. We handle everything directly from code to Google setup, so you never deal with sales reps or middleman agencies.
              </p>
            </div>
          </Reveal>

          {/* 3 Short Principles as Simple Rows */}
          <Reveal delay={0.3}>
            <div className="bg-card border border-ink/15 rounded-lg p-5 sm:p-6 shadow-mobile-soft space-y-3">
              <h3 className="font-mono text-xs uppercase font-bold text-vermilion-text tracking-wider mb-2">
                [ WORKING PRINCIPLES ]
              </h3>

              <div className="space-y-2.5">
                {[
                  "Talk directly to the developers who write your code",
                  "Clear scope, straightforward pricing and no hidden fees",
                  "Quick WhatsApp updates and reliable post-launch support"
                ].map((principle, idx) => (
                  <div key={idx} className="flex items-start gap-3 py-1.5 border-b border-ink/10 last:border-b-0">
                    <span className="w-5 h-5 rounded-full bg-emerald-700/15 text-emerald-800 font-bold flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">
                      <Check className="w-3 h-3" />
                    </span>
                    <span className="font-sans text-sm sm:text-base font-semibold text-ink leading-snug">
                      {principle}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Direct WhatsApp Text Link */}
          <Reveal delay={0.4}>
            <div className="pt-2">
              <CtaButton cta={CTA_CONFIG.aboutTertiary} className="inline-block py-2.5" />
            </div>
          </Reveal>

        </div>

      </div>
    </section>
  );
};
