import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';

/** Tracks document scroll progress (0..1) into the app store, throttled to rAF. */
export function useScrollProgress() {
  const setScrollProgress = useAppStore((s) => s.setScrollProgress);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setScrollProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
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
  }, [setScrollProgress]);
}
