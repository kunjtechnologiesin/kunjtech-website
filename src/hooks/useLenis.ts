import { useEffect } from 'react';

export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const start = () =>
      import('lenis').then(({ default: Lenis }) => {
        if (cancelled) return;
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          anchors: { offset: 0 },
        });
        (window as any).__lenis = lenis;

        let id: number;
        const raf = (time: number) => {
          lenis.raf(time);
          id = requestAnimationFrame(raf);
        };
        id = requestAnimationFrame(raf);

        cleanup = () => {
          cancelAnimationFrame(id);
          lenis.destroy();
          delete (window as any).__lenis;
        };
      });

    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(() => { start(); });
    else setTimeout(start, 1500);

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);
}