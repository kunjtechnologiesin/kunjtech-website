import React from 'react';
import { getSectionConfig } from '../config/sectionsConfig';
import { Reveal } from '../components/motion/Reveal';

interface ChecklistGroup {
  heading: string;
  items: string[];
}

const CHECKLIST_GROUPS: ChecklistGroup[] = [
  {
    heading: "Design & Brand Identity",
    items: [
      "Custom layout designed for your trade",
      "Colors and fonts match your brand",
      "High quality photo & video gallery",
      "Mobile first responsive page structure"
    ]
  },
  {
    heading: "Speed & Direct Contact",
    items: [
      "Fast loading on every phone",
      "One tap WhatsApp & call buttons",
      "Instant quotation request form",
      "Touch optimized controls on mobile"
    ]
  },
  {
    heading: "Google Listing & Builder Support",
    items: [
      "Google Maps directions & location pin",
      "Search engine listing technical setup",
      "Direct talk with developer building site",
      "Domain setup & 1 year support"
    ]
  }
];

export const WhatYouGet: React.FC = () => {
  const sectionInfo = getSectionConfig('included');

  return (
    <section id="included" className="pt-24 pb-12 md:pt-28 md:pb-14 bg-paper border-b border-ink/15 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Compact Section Header */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-6 pb-4 border-b border-ink/15 gap-4">
            <div>
              <div className="font-mono text-xs text-vermilion-text uppercase tracking-widest mb-1.5 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-vermilion-text inline-block" />
                [ SECTION {sectionInfo.number} ] • WHAT YOU GET
              </div>
              <h2 className="font-display font-black text-[clamp(1.5rem,5.5vw,3.5rem)] uppercase tracking-tight text-ink leading-tight">
                Everything{' '}
                <span className="font-serif italic font-normal text-vermilion-text lowercase inline">
                  included.
                </span>
              </h2>
            </div>

            <p className="font-sans text-ink-muted text-sm sm:text-base max-w-sm leading-relaxed">
              Every website comes standard with these essential features. No hidden extras.
            </p>
          </div>
        </Reveal>

        {/* 3 Short Groups with 2-Column Checklist Grids */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-4 md:mb-0">
          {CHECKLIST_GROUPS.map((group, gIdx) => (
            <Reveal key={gIdx} delay={gIdx * 0.08} className="h-full">
              <div className="h-full bg-card border border-ink/15 rounded-lg p-5 sm:p-6 shadow-mobile-soft">
                {/* Small Group Heading */}
                <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-vermilion-text mb-4 pb-2 border-b border-ink/10 flex items-center gap-2">
                  <span>[{String(gIdx + 1).padStart(2, '0')}]</span>
                  <span>{group.heading}</span>
                </h3>

                {/* Compact 2-Column Checklist Grid */}
                <div className="grid grid-cols-1 gap-3">
                  {group.items.map((itemText, iIdx) => (
                    <div key={iIdx} className="flex items-start gap-2.5">
                      {/* Icon-less tick */}
                      <span className="font-mono text-base font-black text-vermilion-text leading-none mt-0.5 select-none">
                        ✓
                      </span>
                      <span className="font-sans text-sm font-medium text-ink leading-snug">
                        {itemText}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
