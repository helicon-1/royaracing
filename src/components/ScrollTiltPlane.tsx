import { useEffect, useRef, type ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const EPSILON = 0.01;

/** Subtle scroll-velocity tilt on the content plane, settling back to flat at rest. */
export function ScrollTiltPlane({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;

    let lastY = window.scrollY;
    let velocity = 0;
    let tilt = 0;
    let raf = 0;
    let running = false;

    const tick = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      velocity += (delta - velocity) * 0.25;
      const targetTilt = Math.max(-1.6, Math.min(1.6, velocity * -0.06));
      tilt += (targetTilt - tilt) * 0.08;

      if (Math.abs(tilt) < EPSILON && Math.abs(velocity) < EPSILON && Math.abs(delta) < EPSILON) {
        tilt = 0;
        el.style.transform = '';
        running = false;
        return; // settled — stop writing every frame until scroll resumes
      }

      el.style.transform = `perspective(1400px) rotateX(${tilt}deg)`;
      raf = requestAnimationFrame(tick);
    };

    const ensureRunning = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    ensureRunning();
    window.addEventListener('scroll', ensureRunning, { passive: true });
    return () => {
      window.removeEventListener('scroll', ensureRunning);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  return (
    <div ref={ref} style={{ transformOrigin: 'top center', willChange: 'transform' }}>
      {children}
    </div>
  );
}
