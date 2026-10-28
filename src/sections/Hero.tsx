import React from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { HERO_DATA } from '../data/siteData';
import {
  HERO_DESKTOP_IMAGE,
  HERO_DESKTOP_ALT,
  HERO_MOBILE_IMAGE,
  HERO_MOBILE_ALT,
  HERO_DESKTOP_PROJECT_ID,
  HERO_MOBILE_PROJECT_ID,
} from '../data/config';
import { PROJECTS_DATA } from '../data/projects';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { Reveal } from '../components/motion/Reveal';
import { Magnetic } from '../components/motion/Magnetic';
import { CTA_CONFIG } from '../data/cta';
import { CtaButton } from '../components/CtaButton';

const Words: React.FC<{
  text: string;
  delay?: number;
  step?: number;
  className?: string;
}> = ({
  text,
  delay = 0,
  step = 0.12,
  className = "inline-block",
}) => {
    const shouldReduceMotion = useReducedMotion();
    const words = text.split(/\s+/).filter(Boolean);

    return (
      <>
        {words.map((word, i) => (
          <React.Fragment key={i}>
            <span className="inline-block overflow-hidden pb-1 -mb-1 align-bottom">
              <motion.span
                initial={shouldReduceMotion ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: shouldReduceMotion ? 0 : delay + i * step,
                }}
                className={className}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 ? ' ' : ''}
          </React.Fragment>
        ))}
      </>
    );
  };

export const Hero: React.FC = () => {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 20 };
  const mouseX = useSpring(rawX, springConfig);
  const mouseY = useSpring(rawY, springConfig);

  // Parallax transforms directly bound to motion values (no setState on mousemove)
  const desktopX = useTransform(mouseX, [-20, 20], [-8, 8]);
  const desktopY = useTransform(mouseY, [-20, 20], [-8, 8]);
  const phoneX = useTransform(mouseX, [-20, 20], [10, -10]);
  const phoneY = useTransform(mouseY, [-20, 20], [10, -10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    rawX.set((clientX / innerWidth - 0.5) * 20);
    rawY.set((clientY / innerHeight - 0.5) * 20);
  };

  // Find linked projects to dynamically resolve live hostnames and URLs
  const desktopProject = PROJECTS_DATA.find((p) => p.id === HERO_DESKTOP_PROJECT_ID) || PROJECTS_DATA[2];
  const mobileProject = PROJECTS_DATA.find((p) => p.id === HERO_MOBILE_PROJECT_ID) || PROJECTS_DATA[0];

  const desktopHostname = desktopProject?.liveUrl
    ? new URL(desktopProject.liveUrl).hostname
    : 'baker-web-app-zeta.vercel.app';
  const mobileHostname = mobileProject?.liveUrl
    ? new URL(mobileProject.liveUrl).hostname
    : 'hair-salon-web-ruddy.vercel.app';



  return (
    <>
      <section
        id="hero"
        onMouseMove={handleMouseMove}
        className="relative overflow-hidden bg-grain flex flex-col"
        style={{ minHeight: '100svh' }}
      >
        {/* ═══ MOBILE HERO (< md) ═══ */}
        <div className="md:hidden flex flex-col flex-1 pt-32 pb-6 px-5">
          {/* Tagline */}
          <Reveal delay={0.05}>
            <div className="font-mono text-[12px] text-vermilion-text uppercase tracking-widest font-bold mt-2">
              {HERO_DATA.badgeText}
            </div>
          </Reveal>

          {/* Headline — clamp to fit without overflow */}
          <div className="mt-4">
            <h1 className="font-display font-black text-[clamp(1.85rem,7.5vw,2.75rem)] text-ink leading-[0.98] tracking-tight uppercase">
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                  className="block"
                >
                  <Words text={HERO_DATA.headlineMain} delay={0.1} />
                </motion.span>
              </div>

              <div className="overflow-hidden pb-1">
                <motion.span
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                  className="block"
                >
                  <span className="relative inline-block font-serif italic font-normal text-vermilion-text lowercase">
                    <Words text={HERO_DATA.headlineAccent} delay={0.6} />
                    <svg
                      className="absolute left-0 -bottom-1.5 w-full h-2.5 text-vermilion-text pointer-events-none"
                      viewBox="0 0 200 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <motion.path
                        d="M3 9C50 3 150 3 197 9"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 1.1 }}
                      />
                    </svg>
                  </span>
                </motion.span>
              </div>
            </h1>
          </div>

          {/* Subline with hero reveal */}
          <p className="text-base font-sans text-ink-muted leading-[1.6] mt-5 max-w-[340px]">
            <Words text={HERO_DATA.subheading} delay={0.8} step={0.035} />{' '}
            <span className="font-hindi italic text-vermilion-text font-semibold inline-block" lang="hi">
              <Words
                text={HERO_DATA.subheadingHindi}
                delay={0.8 + HERO_DATA.subheading.split(/\s+/).filter(Boolean).length * 0.035}
                step={0.07}
              />
            </span>
          </p>


          {/* ── Mobile Visual Composition ── */}
          <div className="relative mt-6 mb-3 w-full max-w-[340px] mx-auto hero-preview-pause">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              className="relative w-full animate-hero-float"
            >
              {/* Back Layer: Browser Frame 100% width */}
              <div className="w-full bg-white border-2 border-ink rounded-xl overflow-hidden shadow-mobile-soft">
                {/* Browser Bar */}
                <div className="bg-ink text-paper px-3 py-1.5 flex items-center justify-between border-b-2 border-ink text-[10px] font-mono select-none">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500 inline-block" />
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                  </div>
                  <span className="truncate text-paper-dark text-[10px] font-mono font-bold max-w-[150px]">
                    {desktopHostname}
                  </span>
                  <span className="text-[9px] text-emerald-400 bg-emerald-500/20 border border-emerald-500/30 px-1.5 py-0.5 rounded font-bold">
                    LIVE DEMO
                  </span>
                </div>

                {/* 16:10 Viewport */}
                <div className="w-full aspect-[16/10] overflow-hidden relative bg-black/10 [container-type:size]">
                  <img
                    src="/hero/desktop-v3-sm.webp"
                    srcSet="/hero/desktop-v3-sm.webp 680w, /hero/desktop-v3.webp 1080w"
                    sizes="(max-width: 768px) 340px, 530px"
                    alt={HERO_DESKTOP_ALT}
                    width={680}
                    height={1360}
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-auto block select-none pointer-events-none animate-hero-scroll-desktop"
                  />
                </div>
              </div>

              {/* Front Layer: Phone Frame 38% width overlapping bottom-right corner */}
              <div className="absolute -bottom-4 right-1 w-[38%] max-w-[130px] bg-slate-950 text-paper border-2 border-slate-700 rounded-2xl p-1 shadow-2xl z-20">
                <div className="w-8 h-1 bg-slate-800 rounded-full mx-auto mb-1" />
                <div className="w-full aspect-[9/18] rounded-xl overflow-hidden relative bg-slate-900 [container-type:size]">
                  <img
                    src="/hero/mobile-v2-sm.webp"
                    srcSet="/hero/mobile-v2-sm.webp 240w, /hero/mobile-v2.webp 380w"
                    sizes="130px"
                    alt={HERO_MOBILE_ALT}
                    width={240}
                    height={1275}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto block select-none pointer-events-none animate-hero-scroll-mobile"
                  />
                </div>
              </div>
            </motion.div>

            {/* Mono Caption under visual */}
            <div className="mt-6 pt-1 flex items-center justify-between font-mono text-[10px] text-ink-muted">
              <span className="flex items-center gap-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse flex-shrink-0" />
                <span className="truncate">5 live demo websites</span>
              </span>
              <a
                href="#work"
                className="font-bold text-vermilion-text hover:underline flex items-center gap-0.5 flex-shrink-0 ml-2"
              >
                <span>View projects</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            <div className="flex flex-col gap-3 mt-5 pr-[3px]">
              <CtaButton cta={CTA_CONFIG.heroPrimary} className="w-full !min-h-[52px]" />
              <CtaButton
                cta={CTA_CONFIG.heroSecondary}
                icon={<ArrowDown className="w-4 h-4" />}
                className="w-full !min-h-[52px] bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* ═══ DESKTOP HERO (md+) ═══ */}
        <div className="hidden md:flex md:flex-1 md:items-center">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10 w-full pt-28 pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

              {/* Left Headline & Actions */}
              <div className="lg:col-span-7 space-y-5">
                <Reveal delay={0.1}>
                  <div className="flex flex-wrap items-center gap-3">
                    <motion.span
                      initial={{ scale: 0, rotate: -10 }}
                      animate={{ scale: 1, rotate: -1.5 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                      className="stamp-badge bg-vermilion-text text-paper"
                    >
                      {HERO_DATA.badgeText}
                    </motion.span>
                    <span className="font-mono text-xs text-ink-muted uppercase tracking-wider flex items-center gap-1.5 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                      REPLIES WITHIN 1 HOUR ON WHATSAPP
                    </span>
                  </div>
                </Reveal>

                {/* Single H1 with line by line clip mask reveal */}
                <h1 className="font-display font-black text-[clamp(2.25rem,min(5.4vw,9vh),4.5rem)] text-ink leading-[0.98] tracking-tight uppercase space-y-1.5 overflow-hidden">
                  <div className="overflow-hidden">
                    <motion.span
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                      className="block"
                    >
                      <Words text={HERO_DATA.headlineMain} delay={0.1} />
                    </motion.span>
                  </div>

                  <div className="overflow-hidden pb-1">
                    <motion.span
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                      className="block"
                    >
                      <span className="relative inline-block font-serif italic font-normal text-vermilion-text lowercase">
                        <Words text={HERO_DATA.headlineAccent} delay={0.6} />
                        <svg
                          className="absolute left-0 -bottom-2 w-full h-3 text-vermilion-text pointer-events-none"
                          viewBox="0 0 200 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <motion.path
                            d="M3 9C50 3 150 3 197 9"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 1.1 }}
                          />
                        </svg>
                      </span>
                    </motion.span>
                  </div>
                </h1>

                {/* Subline with hero reveal */}
                <p className="text-base sm:text-lg md:text-xl font-sans text-ink-muted max-w-2xl leading-relaxed">
                  <Words text={HERO_DATA.subheading} delay={0.85} step={0.035} />{' '}
                  <span className="font-hindi italic text-vermilion-text font-semibold inline-block" lang="hi">
                    <Words
                      text={HERO_DATA.subheadingHindi}
                      delay={0.85 + HERO_DATA.subheading.split(/\s+/).filter(Boolean).length * 0.035}
                      step={0.07}
                    />
                  </span>
                </p>


              </div>

              {/* Right Hero Visual: Real Live Screenshots */}
              <div className="lg:col-span-5 relative mt-6 lg:mt-0">
                <div className="relative w-full max-w-[530px] xl:max-w-[570px] mx-auto lg:mr-auto lg:ml-0 hero-preview-pause">
                  <motion.div
                    style={{
                      x: desktopX,
                      y: desktopY,
                    }}
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                    className="relative w-full animate-hero-float"
                  >
                    {/* Back Layer: Browser Frame (86% width so phone on right stays safely inside container) */}
                    <div className="w-[86%] bg-white border-2 border-ink rounded-xl overflow-hidden shadow-lift -rotate-1 hover:rotate-0 transition-transform duration-300">
                      {/* Browser Bar */}
                      <div className="bg-ink text-paper px-3.5 py-2 flex items-center justify-between border-b-2 border-ink text-xs font-mono select-none">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
                        </div>
                        <span className="truncate text-paper-dark text-xs font-mono font-bold max-w-[190px]">
                          {desktopHostname}
                        </span>
                        <span className="text-[10px] text-emerald-400 bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                          LIVE DEMO
                        </span>
                      </div>

                      {/* 16:10 Viewport with Continuous Smooth Scroll */}
                      <div className="w-full aspect-[16/10] overflow-hidden relative bg-black/10 [container-type:size]">
                        <img
                          src={HERO_DESKTOP_IMAGE}
                          srcSet="/hero/desktop-v3-sm.webp 680w, /hero/desktop-v3.webp 1080w"
                          sizes="(max-width: 768px) 340px, 530px"
                          alt={HERO_DESKTOP_ALT}
                          width={1080}
                          height={2160}
                          fetchPriority="high"
                          decoding="async"
                          className="w-full h-auto block select-none pointer-events-none animate-hero-scroll-desktop"
                        />
                      </div>
                    </div>

                    {/* Front Layer: Phone Frame (overlapping bottom-right, well inside container bounds) */}
                    <motion.div
                      style={{ x: phoneX, y: phoneY }}
                      initial={{ opacity: 0, y: 60, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                      className="absolute -bottom-5 right-0 sm:right-2 w-[165px] sm:w-[180px] lg:w-[190px] bg-slate-950 text-paper border-2 border-slate-700 rounded-[22px] p-1.5 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-300 z-20"
                    >
                      {/* Notch */}
                      <div className="w-10 h-1.5 bg-slate-800 rounded-full mx-auto mb-1 flex-shrink-0" />

                      {/* Screen Viewport with Continuous Smooth Scroll (11s offset) */}
                      <div className="w-full aspect-[9/18] rounded-[14px] overflow-hidden relative bg-slate-900 flex flex-col [container-type:size]">
                        {/* Status bar */}
                        <div className="h-5 bg-black/80 px-2 flex items-center justify-between text-[8px] font-mono text-paper-dark border-b border-white/10 select-none z-10 flex-shrink-0">
                          <span className="truncate max-w-[80px] opacity-75">{mobileHostname}</span>
                          <span className="text-emerald-400 font-bold">LIVE DEMO</span>
                        </div>

                        {/* Scrolling Image */}
                        <div className="flex-1 overflow-hidden relative [container-type:size]">
                          <img
                            src={HERO_MOBILE_IMAGE}
                            srcSet="/hero/mobile-v2-sm.webp 240w, /hero/mobile-v2.webp 380w"
                            sizes="190px"
                            alt={HERO_MOBILE_ALT}
                            width={380}
                            height={2019}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-auto block select-none pointer-events-none animate-hero-scroll-mobile"
                          />
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Under Visual: Live Demos caption and link */}
                  <div className="mt-7 pt-1 flex items-center justify-between font-mono text-xs text-ink-muted">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                      <span>5 live demo websites</span>
                    </span>
                    <a
                      href="#work"
                      className="font-bold text-vermilion-text hover:underline flex items-center gap-1 transition-colors"
                    >
                      <span>View projects</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <Magnetic strength={0.25}>
                      <CtaButton cta={CTA_CONFIG.heroPrimary} />
                    </Magnetic>
                    <Magnetic strength={0.25}>
                      <CtaButton cta={CTA_CONFIG.heroSecondary} showIcon={false} />
                    </Magnetic>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>


      </section>


    </>
  );
};
