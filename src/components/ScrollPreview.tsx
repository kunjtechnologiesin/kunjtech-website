import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { ProjectItem } from '../data/projects';
import { Smartphone, Globe } from 'lucide-react';

interface ScrollPreviewProps {
  project: ProjectItem;
  variant?: "browser" | "phone";
}

export const ScrollPreview: React.FC<ScrollPreviewProps> = ({
  project,
  variant = "browser"
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const [scrollDistance, setScrollDistance] = useState(0);
  const [scrollDuration, setScrollDuration] = useState(6);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(hover: none), (pointer: coarse)').matches;
  });
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [autoScrollProgress, setAutoScrollProgress] = useState(0); // 0 = top, 1 = bottom
  const [isAutoScrollingBack, setIsAutoScrollingBack] = useState(false);

  // Parse hostname only for browser bar (no fake domains, no https://, no trailing slash)
  const hostname = React.useMemo(() => {
    if (!project.liveUrl) return '';
    try {
      const url = new URL(project.liveUrl);
      return url.hostname;
    } catch {
      return project.liveUrl.replace(/^https?:\/\//, '').split('/')[0];
    }
  }, [project.liveUrl]);

  // Sync prefers-reduced-motion and touch capability changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    const touchQuery = window.matchMedia('(hover: none), (pointer: coarse)');
    const handleTouchChange = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
    touchQuery.addEventListener('change', handleTouchChange);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      touchQuery.removeEventListener('change', handleTouchChange);
    };
  }, []);

  // Measure real rendered heights with ResizeObserver
  const updateMeasurements = useCallback(() => {
    if (!frameRef.current || !imgRef.current) return;
    const frameH = frameRef.current.clientHeight;
    const imgH = imgRef.current.clientHeight;
    const distance = Math.max(0, imgH - frameH);

    setScrollDistance(distance);
    // Duration proportional to distance: ~1s per 350px, clamped [4s, 12s]
    const calculatedDuration = distance / 350;
    const duration = Math.min(12, Math.max(4, Math.round(calculatedDuration * 10) / 10));
    setScrollDuration(duration);
  }, []);

  useEffect(() => {
    if (!project.previewImage) return;

    const ro = new ResizeObserver(() => {
      updateMeasurements();
    });

    if (frameRef.current) ro.observe(frameRef.current);
    if (imgRef.current) ro.observe(imgRef.current);

    return () => ro.disconnect();
  }, [project.previewImage, updateMeasurements]);

  // IntersectionObserver for touch devices to auto-play when in view
  useEffect(() => {
    if (!containerRef.current || !project.previewImage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.35 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [project.previewImage]);

  // Auto-play scroll cycle on touch devices when in view (and reduced motion is false)
  useEffect(() => {
    const shouldAutoScroll = isTouchDevice && isInView && !reducedMotion && scrollDistance > 0;
    if (!shouldAutoScroll) {
      return;
    }

    let active = true;
    let timerId: ReturnType<typeof setTimeout>;

    const runScrollDown = () => {
      if (!active) return;
      setIsAutoScrollingBack(false);
      setAutoScrollProgress(1); // scroll to bottom

      // Wait scroll duration + 1s pause at bottom
      timerId = setTimeout(() => {
        if (!active) return;
        setIsAutoScrollingBack(true);
        setAutoScrollProgress(0); // scroll back to top in 0.8s

        // Wait 0.8s return + 1.2s pause at top
        timerId = setTimeout(() => {
          if (!active) return;
          runScrollDown();
        }, 2000);
      }, scrollDuration * 1000 + 1000);
    };

    // Initial brief delay before starting auto-scroll
    timerId = setTimeout(runScrollDown, 1200);

    return () => {
      active = false;
      clearTimeout(timerId);
    };
  }, [isTouchDevice, isInView, reducedMotion, scrollDistance, scrollDuration]);

  // Derive active progress based on touch view states
  const activeProgress = (isTouchDevice && isInView && !reducedMotion && scrollDistance > 0)
    ? autoScrollProgress
    : 0;

  // Compute current translateY and transition style
  const translateY = React.useMemo(() => {
    if (reducedMotion || scrollDistance <= 0) return 0;

    if (isTouchDevice) {
      return activeProgress * scrollDistance;
    }

    return isHovered ? scrollDistance : 0;
  }, [reducedMotion, scrollDistance, isTouchDevice, activeProgress, isHovered]);

  const transitionStyle = React.useMemo(() => {
    if (reducedMotion || scrollDistance <= 0) return 'none';

    if (isTouchDevice) {
      if (isAutoScrollingBack) {
        return 'transform 0.8s ease-out';
      }
      return activeProgress === 1
        ? `transform ${scrollDuration}s ease-in-out`
        : 'transform 0.8s ease-out';
    }

    return isHovered
      ? `transform ${scrollDuration}s ease-in-out`
      : 'transform 0.8s ease-out';
  }, [reducedMotion, scrollDistance, isTouchDevice, isAutoScrollingBack, activeProgress, scrollDuration, isHovered]);

  /* ──────── PHONE VARIANT (APPS) ──────── */
  if (variant === "phone") {
    return (
      <div
        ref={containerRef}
        onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
        onMouseLeave={() => !isTouchDevice && setIsHovered(false)}
        className="w-full aspect-[16/10] bg-gradient-to-b from-paper/10 to-paper/5 flex items-center justify-center p-3 relative overflow-hidden rounded-t-lg border-b border-paper/15 select-none"
      >
        {/* Phone Chassis */}
        <div className="w-[126px] sm:w-[136px] h-[178px] sm:h-[192px] bg-slate-950 border-2 border-slate-700 rounded-[22px] shadow-2xl p-1.5 flex flex-col relative group">
          {/* Speaker Notch */}
          <div className="w-10 h-1.5 bg-slate-800 rounded-full mx-auto mb-1.5 flex-shrink-0 relative z-20" />

          {/* Screen Viewport */}
          <div
            ref={frameRef}
            className="flex-1 rounded-[14px] overflow-hidden relative bg-slate-900"
          >
            {project.previewImage ? (
              <img
                ref={imgRef}
                src={project.previewImage}
                srcSet={project.previewImage.endsWith('.webp') ? `${project.previewImage.replace(/\.webp$/, '-sm.webp')} 600w, ${project.previewImage} 1080w` : undefined}
                sizes="140px"
                alt={project.previewAlt || `${project.name} mobile screenshot`}
                width={project.previewWidth || 390}
                height={project.previewHeight || 844}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                onLoad={updateMeasurements}
                className="w-full h-auto block select-none pointer-events-none"
                style={{
                  transform: `translate3d(0, -${translateY}px, 0)`,
                  transition: transitionStyle,
                  willChange: 'transform'
                }}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 p-2 text-center bg-slate-900/90 text-paper-dark">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                  <Smartphone className="w-3.5 h-3.5 opacity-70" />
                </div>
                <span className="font-mono text-[9px] font-medium leading-tight text-paper/90">
                  Preview coming soon
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ──────── BROWSER VARIANT (WEBSITES) ──────── */
  return (
    <div
      ref={containerRef}
      onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
      onMouseLeave={() => !isTouchDevice && setIsHovered(false)}
      className="w-full bg-ink/90 relative overflow-hidden rounded-t-lg border-b border-paper/15 select-none flex flex-col group"
    >
      {/* Top Browser Bar */}
      <div className="h-7 bg-black/75 px-3 flex items-center justify-between border-b border-white/10 text-[11px] font-mono text-paper-dark relative z-10 select-none">
        {/* Three dots */}
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
        </div>

        {/* Real Hostname only (no fake domains) */}
        {hostname ? (
          <span className="opacity-75 truncate max-w-[170px] sm:max-w-[200px] text-[10px] tracking-tight text-paper-dark">
            {hostname}
          </span>
        ) : (
          <span className="opacity-30 text-[10px] tracking-widest">
            —
          </span>
        )}

        {/* Green LIVE badge ONLY if project has a working liveUrl */}
        {project.liveUrl ? (
          <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/15 px-1.5 py-0.5 rounded border border-emerald-500/30">
            LIVE
          </span>
        ) : (
          <span className="w-8" />
        )}
      </div>

      {/* Fixed 16:10 Viewport Area */}
      <div
        ref={frameRef}
        className="w-full aspect-[16/10] overflow-hidden relative bg-black/40"
      >
        {project.previewImage ? (
          <img
            ref={imgRef}
            src={project.previewImage}
            srcSet={project.previewImage.endsWith('.webp') ? `${project.previewImage.replace(/\.webp$/, '-sm.webp')} 600w, ${project.previewImage} 1080w` : undefined}
            sizes="(max-width: 640px) 340px, 380px"
            alt={project.previewAlt || `${project.name} live website screenshot`}
            width={project.previewWidth || 1080}
            height={project.previewHeight || 675}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            onLoad={updateMeasurements}
            className={`w-full ${scrollDistance > 0 ? 'h-auto' : 'h-full object-cover object-top'} block select-none pointer-events-none origin-top-left group-hover:scale-105 transition-transform duration-500`}
            style={
              scrollDistance > 0
                ? {
                  width: project.previewCrop === "text" ? '178.57%' : '100%',
                  maxWidth: project.previewCrop === "text" ? 'none' : '100%',
                  height: 'auto',
                  objectPosition: 'top',
                  transform: `translate3d(0, -${translateY}px, 0)`,
                  transition: transitionStyle,
                  willChange: 'transform'
                }
                : undefined
            }
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4 text-center bg-paper/5 text-paper-dark">
            <div className="w-8 h-8 rounded-full bg-paper/10 flex items-center justify-center">
              <Globe className="w-4 h-4 opacity-70" />
            </div>
            <span className="font-mono text-xs font-medium tracking-wide text-paper/90">
              Preview coming soon
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
