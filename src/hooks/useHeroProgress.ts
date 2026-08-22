import { useEffect, useState } from 'react';

/**
 * 0..1 progress through the hero's own scroll region (200vh), independent
 * of the global page-length-relative scrollProgress — so the hero
 * background fade always completes exactly at the hero's own boundary,
 * regardless of how tall the rest of the page is.
 */
export function useHeroProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const heroHeight = window.innerHeight * 2; // Home's ScrollFlyIn is h-[200vh]
      setProgress(Math.min(1, Math.max(0, window.scrollY / heroHeight)));
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return progress;
}
