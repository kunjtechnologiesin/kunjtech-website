
import { useState, useEffect } from 'react';
import { useLenis } from './hooks/useLenis';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { lazy, Suspense } from 'react';

const loaders = {
  Portfolio: () => import('./sections/Portfolio').then((m) => ({ default: m.Portfolio })),
  Services: () => import('./sections/Services').then((m) => ({ default: m.Services })),
  WhatYouGet: () => import('./sections/WhatYouGet').then((m) => ({ default: m.WhatYouGet })),
  Process: () => import('./sections/Process').then((m) => ({ default: m.Process })),
  About: () => import('./sections/About').then((m) => ({ default: m.About })),
  Pricing: () => import('./sections/Pricing').then((m) => ({ default: m.Pricing })),
  FAQ: () => import('./sections/FAQ').then((m) => ({ default: m.FAQ })),
  ClientDeliverables: () => import('./sections/ClientDeliverables').then((m) => ({ default: m.ClientDeliverables })),
  Footer: () => import('./sections/Footer').then((m) => ({ default: m.Footer })),
  Extras: () => import('./sections/Extras'),
  FloatingActions: () => import('./components/FloatingActions').then((m) => ({ default: m.FloatingActions })),
};
const Portfolio = lazy(loaders.Portfolio);
const Services = lazy(loaders.Services);
const WhatYouGet = lazy(loaders.WhatYouGet);
const Process = lazy(loaders.Process);
const About = lazy(loaders.About);
const Pricing = lazy(loaders.Pricing);
const FAQ = lazy(loaders.FAQ);
const ClientDeliverables = lazy(loaders.ClientDeliverables);
const Footer = lazy(loaders.Footer);
const FloatingActions = lazy(loaders.FloatingActions);
const IntroVideo = lazy(() => loaders.Extras().then((m) => ({ default: m.IntroVideo })));
const Testimonials = lazy(() => loaders.Extras().then((m) => ({ default: m.Testimonials })));
const Policies = lazy(() => loaders.Extras().then((m) => ({ default: m.Policies })));

export function App() {
  const [activeId, setActiveId] = useState<string>('');

  // Enable Lenis smooth momentum scrolling
  useLenis();

  useEffect(() => {
    const warm = () => Object.values(loaders).forEach((load) => load());
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(warm);
    else setTimeout(warm, 2500);
  }, []);

  useEffect(() => {
    const sectionIds = [
      '#hero',
      '#work',
      '#services',
      '#included',
      '#process',
      '#about',
      '#pricing',
      '#faq',
      '#contact',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-40% 0px -55% 0px',
      }
    );

    sectionIds.forEach((selector) => {
      const el = document.querySelector(selector);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink font-sans selection:bg-vermilion selection:text-paper relative">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-ink focus:text-paper focus:px-4 focus:py-2">Skip to content</a>
      <Navbar activeSectionId={activeId} />

      <main id="main">
        <Hero />
        <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
          <IntroVideo />
          <Portfolio />
          <Services />
          <WhatYouGet />
          <Process />
          <About />
          <Testimonials />
          <Pricing />

          <FAQ />
          <ClientDeliverables />
          <Policies />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
        <FloatingActions />
      </Suspense>
    </div>
  );
}

export default App;
