import React, { useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion, useInView, useReducedMotion } from 'framer-motion';
import { Check, Gift, MapPin, MessageCircle, Package, Phone, ShoppingBag, Star } from 'lucide-react';
import { PROCESS_DATA } from '../data/siteData';
import { getSectionConfig } from '../config/sectionsConfig';
import { Reveal } from '../components/motion/Reveal';
import { CTA_CONFIG } from '../data/cta';
import { CtaButton } from '../components/CtaButton';

const STEP_MS = 5000; // time each step stays on screen

/* ───────── Scenes shown in the browser window ───────── */

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.35 },
});

/* Step 1: WhatsApp-style chat */
const ChatVisual = () => (
  <div className="flex h-full flex-col">
    <div className="flex items-center gap-2 border-b border-ink/10 px-4 py-2">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-vermilion-text font-display text-xs font-black text-paper">
        K
      </span>
      <div>
        <div className="font-sans text-xs font-bold leading-tight text-ink">Kunj Technologies</div>
        <div className="font-mono text-[10px] leading-tight text-emerald-700">online</div>
      </div>
    </div>

    <div className="flex flex-1 flex-col justify-end gap-2.5 px-4 py-3">
      <motion.div
        {...rise(0.15)}
        className="ml-auto max-w-[78%] rounded-2xl rounded-br-sm bg-vermilion-text px-3.5 py-2 text-xs text-paper sm:text-sm"
      >
        Hi! I need a website for my shop.
      </motion.div>
      <motion.div
        {...rise(0.9)}
        className="max-w-[78%] rounded-2xl rounded-bl-sm bg-paper-dark px-3.5 py-2 text-xs text-ink sm:text-sm"
      >
        Sure! Send your photos and details.
      </motion.div>
      <motion.div
        {...rise(1.7)}
        className="ml-auto flex gap-1.5 rounded-2xl rounded-br-sm bg-vermilion-text p-1.5"
      >
        {[Package, ShoppingBag, Gift].map((Icon, i) => (
          <span key={i} className="flex h-11 w-11 items-center justify-center rounded-lg bg-paper/25 text-paper">
            <Icon className="h-5 w-5" />
          </span>
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="flex w-14 gap-1 rounded-2xl rounded-bl-sm bg-paper-dark px-3 py-2.5"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-ink/50"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </motion.div>
    </div>

    <div className="border-t border-ink/10 px-4 py-2">
      <div className="rounded-full border border-ink/15 bg-card px-3 py-1.5 font-mono text-[10px] text-ink-muted">
        Type a message…
      </div>
    </div>
  </div>
);

/* Step 2: labelled wireframe of the pages */
const WireBox: React.FC<{ label: string; className?: string; delay: number }> = ({ label, className = '', delay }) => (
  <motion.div
    {...rise(delay)}
    className={`flex items-center justify-center rounded border border-dashed border-ink/35 px-2 text-center font-mono text-[10px] uppercase tracking-wider text-ink-muted ${className}`}
  >
    {label}
  </motion.div>
);

const PlanVisual = () => (
  <div className="flex h-full flex-col gap-2 p-4">
    <WireBox label="Header · logo + menu" className="h-9" delay={0.1} />
    <WireBox label="Hero · headline + WhatsApp & call buttons" className="flex-1" delay={0.3} />
    <div className="grid grid-cols-3 gap-2">
      {['Product 1', 'Product 2', 'Product 3'].map((p, i) => (
        <WireBox key={p} label={p} className="h-14" delay={0.5 + i * 0.12} />
      ))}
    </div>
    <WireBox label="Footer · map pin + contact" className="h-7" delay={0.9} />
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="font-mono text-[10px] text-ink-muted">Pages:</span>
      {['Home', 'Products', 'Gallery', 'Contact'].map((p, i) => (
        <motion.span
          key={p}
          {...rise(1.2 + i * 0.12)}
          className="rounded-full border border-ink/25 px-2 py-0.5 font-mono text-[10px] text-ink"
        >
          {p}
        </motion.span>
      ))}
    </div>
  </div>
);

/* Steps 3 and 4: a real-looking finished mini website */
const LiveSite: React.FC<{ growLogo?: boolean; children?: React.ReactNode }> = ({ growLogo, children }) => (
  <div className="flex h-full flex-col gap-2 p-4">
    <motion.div
      {...rise(0.1)}
      className="flex items-center justify-between rounded border border-ink/15 bg-card px-3 py-1.5"
    >
      <motion.div
        className="flex origin-left items-center gap-1.5"
        initial={{ scale: 1 }}
        animate={{ scale: growLogo ? 1.35 : 1 }}
        transition={{ delay: growLogo ? 2.4 : 0, type: 'spring', stiffness: 200, damping: 14 }}
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-vermilion-text font-display text-[10px] font-black text-paper">
          Y
        </span>
        <span className="font-display text-xs font-black text-ink">Your Shop</span>
      </motion.div>
      <div className="hidden gap-3 font-sans text-[11px] text-ink-muted sm:flex">
        <span>Home</span>
        <span>Products</span>
        <span>Gallery</span>
        <span>Contact</span>
      </div>
    </motion.div>

    <motion.div
      {...rise(0.3)}
      className="flex flex-1 flex-col justify-center gap-2.5 rounded bg-vermilion-text px-4 py-3"
    >
      <div className="font-display text-lg font-black leading-tight text-paper sm:text-xl">
        Everything your customers need, in one place
      </div>
      <div className="flex gap-2">
        <span className="inline-flex items-center gap-1 rounded bg-paper px-2.5 py-1 font-sans text-[11px] font-bold text-ink">
          <MessageCircle className="h-3 w-3" /> WhatsApp us
        </span>
        <span className="inline-flex items-center gap-1 rounded border border-paper/60 px-2.5 py-1 font-sans text-[11px] font-bold text-paper">
          <Phone className="h-3 w-3" /> Call now
        </span>
      </div>
    </motion.div>

    <div className="grid grid-cols-3 gap-2">
      {[
        { name: 'Product one', Icon: Package },
        { name: 'Product two', Icon: ShoppingBag },
        { name: 'Product three', Icon: Gift },
      ].map(({ name, Icon }, i) => (
        <motion.div
          key={name}
          {...rise(0.5 + i * 0.12)}
          className="overflow-hidden rounded border border-ink/15 bg-card"
        >
          <div className="flex h-9 items-center justify-center bg-vermilion-text/10 text-vermilion-text">
            <Icon className="h-4 w-4" />
          </div>
          <div className="px-2 py-1.5">
            <div className="font-sans text-[11px] font-bold leading-tight text-ink">{name}</div>
            <div className="font-mono text-[10px] text-vermilion-text">₹499</div>
          </div>
        </motion.div>
      ))}
    </div>

    <motion.div {...rise(0.9)} className="flex items-center justify-between gap-2">
      <span className="flex items-center gap-1.5 font-mono text-[10px] text-ink-muted">
        <MapPin className="h-3 w-3 text-vermilion-text" /> Main Road, Your City · Open 9am – 8pm
      </span>
      {children}
    </motion.div>
  </div>
);

const BuildVisual = () => (
  <LiveSite>
    <span className="flex items-center gap-1.5">
      {['bg-vermilion-text', 'bg-ink', 'bg-paper-dark'].map((c, i) => (
        <motion.span
          key={c}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.3 + i * 0.12, type: 'spring' }}
          className={`h-3.5 w-3.5 rounded-full border border-ink/20 ${c}`}
        />
      ))}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
        className="ml-0.5 font-display text-sm font-black text-ink"
      >
        Aa
      </motion.span>
    </span>
  </LiveSite>
);

const ReviewVisual = () => (
  <div className="relative h-full">
    <LiveSite growLogo />
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: [0, 1, 1, 0], scale: [0.85, 1, 1, 1] }}
      transition={{ delay: 0.8, duration: 2.4, times: [0, 0.1, 0.85, 1] }}
      className="absolute left-6 top-16 rounded-lg rounded-tl-none border-2 border-ink bg-paper px-3 py-1.5 text-[11px] font-medium text-ink shadow-stamp sm:text-xs"
    >
      “Make the logo bigger”
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3.2 }}
      className="absolute left-6 top-16 flex items-center gap-1.5 rounded-full border-2 border-ink bg-paper px-3 py-1 font-mono text-[11px] font-bold text-ink shadow-stamp"
    >
      <Check className="h-3.5 w-3.5 text-emerald-600" strokeWidth={3} /> Fixed
    </motion.div>
  </div>
);

/* Step 5: live site and Google listing */
const LaunchVisual = () => (
  <div className="grid h-full items-center gap-4 px-6 sm:grid-cols-2">
    <div className="flex flex-col gap-3">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="inline-flex items-center gap-2 self-start rounded-full bg-emerald-500/15 px-3 py-1 font-mono text-[11px] font-bold text-emerald-700"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        LIVE
      </motion.div>
      <motion.div {...rise(0.2)} className="font-display text-2xl font-black tracking-tight text-ink">
        yourbusiness.com
      </motion.div>
      {['Domain connected', 'Listed on Google', 'Everything handed over'].map((t, i) => (
        <motion.div
          key={t}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + i * 0.25 }}
          className="flex items-center gap-2 text-sm text-ink"
        >
          <Check className="h-4 w-4 text-vermilion-text" strokeWidth={3} /> {t}
        </motion.div>
      ))}
    </div>

    <motion.div
      {...rise(1.4)}
      className="hidden rounded-lg border border-ink/15 bg-card p-3 shadow-mobile-soft sm:block"
    >
      <div className="font-mono text-[10px] text-ink-muted">yourbusiness.com</div>
      <div className="font-sans text-sm font-bold leading-snug text-blue-700">Your Shop — Best in Your City</div>
      <div className="mt-1 flex items-center gap-0.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
        ))}
        <span className="ml-1 font-mono text-[10px] text-ink-muted">4.9 · Open now</span>
      </div>
      <div className="mt-1 font-sans text-[11px] leading-snug text-ink-muted">
        Products, gallery and contact details. Call or WhatsApp in one tap.
      </div>
    </motion.div>
  </div>
);

const VISUALS = [ChatVisual, PlanVisual, BuildVisual, ReviewVisual, LaunchVisual];
const URLS = [
  'whatsapp — your chat',
  'planning your pages…',
  'building your site…',
  'preview — your feedback',
  'yourbusiness.com',
];

/* ───────── Section ───────── */

export const Process: React.FC = () => {
  const sectionInfo = getSectionConfig('process');
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  // becomes true the first time the steps come into view, and stays true afterwards
  const started = useInView(wrapRef, { once: true, margin: '-20% 0px -20% 0px' });

  const next = () => setActive((a) => (a + 1) % PROCESS_DATA.length);
  const Visual = VISUALS[active];

  return (
    <MotionConfig reducedMotion="user">
      <section id="process" className="relative overflow-hidden border-b border-ink/15 bg-paper pt-24 pb-12 md:pt-28 md:pb-14">
        <style>{`@keyframes processFill{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">

          {/* Section Header */}
          <Reveal>
            <div className="mb-8 border-b border-ink/15 pb-5 md:mb-6 md:pb-4">
              <div className="mb-1.5 font-mono text-xs font-bold uppercase tracking-widest text-vermilion-text">
                [ SECTION {sectionInfo.number} ] • HOW IT WORKS
              </div>
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <h2 className="font-display text-[clamp(1.5rem,5.5vw,3.5rem)] font-black uppercase leading-none tracking-tight text-ink">
                  Five Simple{' '}
                  <span className="font-serif font-normal lowercase italic text-vermilion-text inline">
                    steps.
                  </span>
                </h2>
                <p className="max-w-sm font-sans text-sm leading-relaxed text-ink-muted sm:text-base">
                  From WhatsApp chat to live website. No complex agency process.
                </p>
              </div>
            </div>
          </Reveal>

          <div ref={wrapRef} className="grid items-stretch gap-5 md:h-[380px] md:grid-cols-12 md:gap-8">
            {/* Step list */}
            <div role="tablist" aria-label="Process steps" className="flex min-h-[390px] flex-col gap-2 md:col-span-5 md:min-h-0">
              {PROCESS_DATA.map((item, i) => {
                const isActive = i === active;
                const done = i < active;
                return (
                  <button
                    key={item.step}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(i)}
                    className={`relative overflow-hidden rounded-lg border-2 px-4 py-3 text-left outline-none transition-all focus-visible:ring-4 focus-visible:ring-vermilion/40 ${isActive ? 'border-ink bg-card shadow-stamp' : 'border-transparent hover:bg-card/70'
                      }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 font-mono text-[11px] font-bold transition-colors ${isActive
                          ? 'border-vermilion-text bg-vermilion-text text-paper'
                          : done
                            ? 'border-ink bg-ink text-paper'
                            : 'border-ink/40 text-ink'
                          }`}
                      >
                        {done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : item.step}
                      </span>
                      <span className="font-display text-base font-bold text-ink">{item.title}</span>
                    </span>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.span
                          key="desc"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="block overflow-hidden pl-10 pt-1.5 font-sans text-xs leading-relaxed text-ink-muted sm:text-sm"
                        >
                          {item.desc}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* Progress bar: fills over STEP_MS, then moves to the next step */}
                    {isActive && !reduce && (
                      <span className="absolute inset-x-0 bottom-0 block h-1 bg-ink/10">
                        <span
                          key={active}
                          onAnimationEnd={next}
                          className="block h-full origin-left bg-vermilion-text"
                          style={{
                            animation: `processFill ${STEP_MS}ms linear forwards`,
                            animationPlayState: started ? 'running' : 'paused',
                          }}
                        />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Browser window */}
            <div className="md:col-span-7">
              <div className="flex h-[300px] flex-col overflow-hidden rounded-xl border-2 border-ink bg-card shadow-stamp md:h-full md:min-h-[320px]">
                <div className="flex items-center gap-1.5 border-b border-ink/15 bg-paper-dark px-3 py-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-vermilion-text" />
                  <span className="h-2.5 w-2.5 rounded-full bg-ink/30" />
                  <span className="h-2.5 w-2.5 rounded-full bg-ink/30" />
                  <div className="ml-2 min-w-0 flex-1 truncate rounded bg-card px-2 py-0.5 font-mono text-[10px] text-ink-muted">
                    {URLS[active]}
                  </div>
                  <span className="font-mono text-[10px] text-ink-muted">
                    {PROCESS_DATA[active].step} / {String(PROCESS_DATA.length).padStart(2, '0')}
                  </span>
                </div>
                <div className="relative flex-1" aria-live="polite">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0"
                    >
                      <Visual />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Tertiary Action */}
          <Reveal delay={0.2}>
            <div className="mt-6 flex items-center justify-start md:mt-8">
              <CtaButton cta={CTA_CONFIG.processTertiary} className="inline-block py-2.5" />
            </div>
          </Reveal>
        </div>
      </section>
    </MotionConfig>
  );
};