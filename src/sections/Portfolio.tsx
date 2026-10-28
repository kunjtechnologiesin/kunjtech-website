import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS_DATA, type ProjectItem } from '../data/projects';
import { WHATSAPP_NUMBER, BRAND_NAME } from '../data/siteData';
import { getSectionConfig } from '../config/sectionsConfig';
import { ArrowUpRight, ExternalLink, X, Info } from 'lucide-react';
import { Reveal } from '../components/motion/Reveal';
import { ScrollPreview } from '../components/ScrollPreview';
import { CTA_CONFIG } from '../data/cta';
import { CtaButton } from '../components/CtaButton';

export const Portfolio: React.FC = () => {
  const sectionInfo = getSectionConfig('work');
  const [activeSheetProject, setActiveSheetProject] = useState<ProjectItem | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const WEBSITE_ORDER = [
    'p-hair-city',
    'p-derma-care',
    'p-heritage-palace',
    'p-stone-crusher',
    'p-bakery-system',
  ];
  const websiteProjects = PROJECTS_DATA
    .filter((p) => p.tab === 'websites')
    .sort((a, b) => WEBSITE_ORDER.indexOf(a.id) - WEBSITE_ORDER.indexOf(b.id));
  // Update scroll index dots on horizontal scroll
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const newIndex = Math.round(scrollLeft / (clientWidth * 0.85));
    setActiveIndex(Math.min(Math.max(0, newIndex), websiteProjects.length - 1));
  };

  return (
    <section id="work" className="pt-24 pb-12 md:pt-28 md:pb-24 bg-ink text-paper border-b border-paper/15 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Section Header */}
        <Reveal>
          <div className="mb-8 pb-4 border-b border-paper/15">
            <div className="font-mono text-xs text-vermilion-light uppercase tracking-widest mb-1.5 font-bold">
              [ SECTION {sectionInfo.number} ] • OUR WORK
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div>
                <h2 className="font-display font-black text-[clamp(1.5rem,5.5vw,3.75rem)] uppercase tracking-tight text-paper leading-none">
                  Websites{' '}
                  <span className="font-serif italic font-normal text-vermilion-light lowercase inline">
                    Built to Order.
                  </span>
                </h2>
              </div>
              <p className="font-sans text-paper-dark text-sm sm:text-base max-w-md leading-relaxed">
                Functional working codebases and regional trade concepts designed for maximum conversion.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Horizontal Swipe Carousel (85% card width + scroll-snap + peek) */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 scrollbar-none pb-4 px-0.5 select-none"
          style={{ scrollBehavior: 'smooth' }}
        >
          {websiteProjects.map((project, idx) => (
            <div
              key={project.id}
              className={`w-[85vw] max-w-[340px] sm:w-[360px] flex-shrink-0 snap-center bg-paper/10 border border-paper/20 rounded-lg overflow-hidden flex flex-col justify-between shadow-mobile-soft hover:border-vermilion/60 transition-all duration-300 ${activeIndex === idx ? 'scale-100 opacity-100' : 'scale-[0.97] opacity-90'
                }`}
            >
              <div>
                {/* Mockup / Image Header */}
                <ScrollPreview
                  project={project}
                  isFirst={idx === 0}
                  variant="browser"
                />

                {/* Card Content Area: Label, Name, One-line summary */}
                <div className="p-4 space-y-2 font-sans">
                  {/* Label Badge */}
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${project.kind === 'working-build'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                      {project.kind === 'working-build' ? 'WORKING BUILD' : 'DESIGN CONCEPT'}
                    </span>

                    {/* Details Trigger Button */}
                    <button
                      onClick={() => setActiveSheetProject(project)}
                      className="text-xs font-mono font-bold text-vermilion-light hover:underline flex items-center gap-1 min-h-[44px] px-1"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                  </div>

                  {/* Name */}
                  <h3 className="font-display font-bold text-lg text-paper truncate leading-snug">
                    {project.name}
                  </h3>

                  {/* ONE Line of Text */}
                  <p className="text-xs text-paper-dark line-clamp-1 leading-relaxed">
                    {project.summary}
                  </p>

                </div>
              </div>

              {/* ONE Primary Button */}
              <div className="p-4 pt-1 border-t border-paper/10">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-[44px] flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-paper font-sans font-bold text-xs rounded-badge border border-paper/30 shadow-sm transition-all"
                  >
                    <span>View Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(
                      `Hi ${BRAND_NAME}! I like your ${project.kind === 'working-build' ? 'system' : 'design concept'} "${project.name}" and want to request a site like this.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-[44px] flex items-center justify-center gap-2 bg-vermilion-text hover:bg-vermilion-dark text-paper font-sans font-bold text-xs rounded-badge border border-paper/30 shadow-sm transition-all"
                  >
                    <span>Request a site like this</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex items-center justify-center gap-1.5 mt-2 mb-6">
          {websiteProjects.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-6 bg-vermilion' : 'w-1.5 bg-paper/30'
                }`}
            />
          ))}
        </div>

        {/* End of Portfolio CTA */}
        <Reveal delay={0.2}>
          <div className="flex justify-center mt-6">
            <CtaButton cta={CTA_CONFIG.portfolioEnd} />
          </div>
        </Reveal>

      </div>

      {/* Details Bottom Sheet Drawer */}
      <AnimatePresence>
        {activeSheetProject && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveSheetProject(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Bottom Sheet Modal */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="relative w-full max-w-lg bg-ink text-paper border-t-2 border-vermilion rounded-t-2xl p-6 shadow-2xl z-10 max-h-[85vh] overflow-y-auto font-sans"
            >
              {/* Sheet Header */}
              <div className="flex items-start justify-between pb-4 border-b border-paper/15 mb-4">
                <div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase mb-2 inline-block ${activeSheetProject.kind === 'working-build'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                    {activeSheetProject.kind === 'working-build' ? 'WORKING BUILD' : 'DESIGN CONCEPT'}
                  </span>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-paper">
                    {activeSheetProject.name}
                  </h3>
                </div>

                <button
                  onClick={() => setActiveSheetProject(null)}
                  className="w-9 h-9 rounded-full bg-paper/10 hover:bg-paper/20 flex items-center justify-center text-paper transition-colors flex-shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sheet Body Content */}
              <div className="space-y-4">
                <p className="text-sm text-paper-dark leading-relaxed">
                  {activeSheetProject.summary}
                </p>

                {/* Feature Checklist */}
                <div className="space-y-2 pt-2 border-t border-paper/15">
                  <span className="font-mono text-xs font-bold text-vermilion-light uppercase block">
                    KEY FEATURES & CAPABILITIES:
                  </span>
                  {activeSheetProject.whatItDoes.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-paper">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack if present */}
                {activeSheetProject.tech && activeSheetProject.tech.length > 0 && (
                  <div className="pt-2 border-t border-paper/15">
                    <span className="font-mono text-xs font-bold text-paper-dark uppercase block mb-2">
                      TECHNOLOGY USED:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeSheetProject.tech.map((t, i) => (
                        <span key={i} className="text-[10px] font-mono bg-paper/10 px-2 py-0.5 rounded border border-paper/20 text-paper-dark">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Sheet CTA */}
              <div className="mt-6 pt-4 border-t border-paper/15 space-y-2.5">
                {activeSheetProject.liveUrl && (
                  <a
                    href={activeSheetProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-[44px] flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-paper font-bold text-sm rounded-badge border border-paper/30 transition-all shadow-sm"
                  >
                    <span>Launch Live Website</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(
                    `Hi ${BRAND_NAME}! I reviewed the details for "${activeSheetProject.name}" and want to discuss building a project.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[44px] flex items-center justify-center gap-2 bg-vermilion-text hover:bg-vermilion-dark text-paper font-bold text-sm rounded-badge border border-paper transition-all"
                >
                  <span>Discuss This Project on WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
