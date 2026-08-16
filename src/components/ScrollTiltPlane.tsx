import { useEffect, useRef, type ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

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
    let raf: number;

    const tick = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      velocity += (delta - velocity) * 0.25;
      const targetTilt = Math.max(-1.6, Math.min(1.6, velocity * -0.06));
      tilt += (targetTilt - tilt) * 0.08;
      el.style.transform = `perspective(1400px) rotateX(${tilt}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  return (
    <div ref={ref} style={{ transformOrigin: 'top center', willChange: 'transform' }}>
      {children}
    </div>
  );
}
