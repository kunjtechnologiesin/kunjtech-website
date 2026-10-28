import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND_NAME, BRAND_LOGO, BRAND_LOGO_WHITE, NAV_LINKS } from '../data/siteData';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Magnetic } from './motion/Magnetic';
import { triggerFormCta, CTA_CONFIG } from '../data/cta';

export const Navbar: React.FC<{ activeSectionId?: string }> = ({ activeSectionId }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const lastScrollY = useRef(0);
  const isNavigatingRef = useRef(false);
  const navTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 40);

      if (isNavigatingRef.current) {
        lastScrollY.current = currentScrollY;
        setIsVisible(true);
        return;
      }

      const delta = currentScrollY - lastScrollY.current;
      if (Math.abs(delta) < 8) return; // ignore tiny jitter

      if (delta > 0 && currentScrollY > 120) {
        setIsVisible(false);
      } else if (delta < 0 || currentScrollY <= 120) {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    const cancelNavLock = () => {
      if (isNavigatingRef.current) {
        isNavigatingRef.current = false;
        lastScrollY.current = window.scrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', cancelNavLock, { passive: true });
    window.addEventListener('touchstart', cancelNavLock, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', cancelNavLock);
      window.removeEventListener('touchstart', cancelNavLock);
      if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    };
  }, []);

  // Lock body scroll cleanly when menu is open without breaking document flow
  const openMenu = useCallback(() => {
    document.body.classList.add('menu-open');
    const lenis = (window as any).__lenis;
    if (lenis && typeof lenis.stop === 'function') {
      lenis.stop();
    }
    setMobileMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    document.body.classList.remove('menu-open');
    const lenis = (window as any).__lenis;
    if (lenis && typeof lenis.start === 'function') {
      lenis.start();
    }
    setMobileMenuOpen(false);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    // 1. Close mobile menu cleanly if open
    closeMenu();

    // Lock header visibility during smooth scroll so destination heading is never hidden
    isNavigatingRef.current = true;
    setIsVisible(true);
    if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    navTimeoutRef.current = window.setTimeout(() => {
      isNavigatingRef.current = false;
      lastScrollY.current = window.scrollY;
    }, 1400);

    // 2. Identify target
    if (href === '#' || href === '#hero') {
      requestAnimationFrame(() => {
        const lenis = (window as any).__lenis;
        if (lenis && typeof lenis.scrollTo === 'function') {
          lenis.start();
          lenis.targetScroll = NaN;
          lenis.scrollTo(0, {
            offset: 0,
            force: true,
            onComplete: () => {
              isNavigatingRef.current = false;
              lastScrollY.current = window.scrollY;
            },
          });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        window.history.pushState(null, '', '#');
      });
      return;
    }

    const targetElement = document.querySelector(href);
    if (!targetElement) return;

    // 3. Scroll to target section cleanly; CSS scroll-margin-top provides exact responsive header offset
    requestAnimationFrame(() => {
      const lenis = (window as any).__lenis;
      if (lenis && typeof lenis.scrollTo === 'function') {
        lenis.start();
        // Reset targetScroll so tapping the same link repeatedly always triggers a scroll
        lenis.targetScroll = NaN;
        lenis.scrollTo(targetElement, {
          offset: 0,
          force: true,
          onComplete: () => {
            isNavigatingRef.current = false;
            lastScrollY.current = window.scrollY;
          },
        });
      } else {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      window.history.pushState(null, '', href);
    });
  };

  // Close on Esc
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [mobileMenuOpen, closeMenu]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${isVisible ? 'translate-y-0' : '-translate-y-full'
          } ${isScrolled ? 'py-3 bg-paper/90 backdrop-blur-md border-b border-ink/10 shadow-sm' : 'py-3 md:py-5 bg-transparent'
          }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">

            {/* Brand Logo - Official black lettering for light header */}
            <a
              href="#"
              onClick={(e) => handleNavClick(e, '#')}
              className="flex items-center shrink-0 group py-1 -ml-5 sm:ml-0"
              aria-label={BRAND_NAME}
            >
              <img
                src={mobileMenuOpen ? BRAND_LOGO_WHITE : BRAND_LOGO}
                alt={BRAND_NAME}
                width={160}
                height={114}
                fetchPriority="high"
                decoding="async"
                className={`w-auto object-contain shrink-0 group-hover:scale-105 transition-all duration-300 ${isScrolled ? 'h-14 sm:h-14 md:h-16' : 'h-[72px] sm:h-20 md:h-[84px] lg:h-[92px]'
                  }`}
              />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7 font-sans text-sm font-semibold text-ink whitespace-nowrap">
              {NAV_LINKS.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSectionId === sectionId;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative py-1 group transition-colors ${isActive ? 'text-vermilion-text font-bold' : 'hover:text-vermilion-text'
                      }`}
                  >
                    {link.name}
                    <span
                      className={`absolute left-0 bottom-0 h-[2px] bg-vermilion-text transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                    />
                  </a>
                );
              })}
            </nav>

            {/* Right Button & Mobile Menu Toggle */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="hidden sm:block">
                <Magnetic strength={0.25}>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      triggerFormCta(CTA_CONFIG.navbar.whatsappMessage);
                    }}
                    className="inline-flex items-center gap-2 bg-vermilion-text hover:bg-vermilion-dark text-paper font-sans font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-badge border-2 border-ink shadow-stamp hover:shadow-stamp-hover hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all whitespace-nowrap cursor-pointer"
                  >
                    <span>Get Your Website</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </Magnetic>
              </div>

              {/* Mobile hamburger — 44×44px touch target */}
              <button
                onClick={() => (mobileMenuOpen ? closeMenu() : openMenu())}
                className={`lg:hidden min-h-[44px] min-w-[44px] p-2.5 border rounded-badge transition-colors flex items-center justify-center ${mobileMenuOpen
                  ? 'bg-paper/10 border-paper/30 text-paper'
                  : 'bg-paper-dark/60 border-ink/20 text-ink active:bg-ink active:text-paper'
                  }`}
                aria-label="Toggle Menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            data-lenis-prevent
            className="fixed inset-0 z-40 bg-ink text-paper pt-28 pb-20 px-5 flex flex-col justify-between lg:hidden font-sans overflow-y-auto overscroll-contain"
          >
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[12px] text-vermilion-light tracking-widest uppercase font-bold mb-2">
                [ NAVIGATION ]
              </span>
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 + idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display font-bold text-[clamp(1.25rem,5vw,1.75rem)] uppercase tracking-tight text-paper active:text-vermilion flex items-center justify-between border-b border-paper/10 py-3.5 min-h-[48px]"
                >
                  <span>{link.name}</span>
                  <span className="font-mono text-sm text-paper/90 font-normal">0{idx + 1}</span>
                </motion.a>
              ))}
            </div>

            <div className="pt-4 border-t border-paper/10 mt-auto text-center font-mono text-[11px] text-paper/90 tracking-wider">
              DIRECT FOUNDER CONTACT
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};