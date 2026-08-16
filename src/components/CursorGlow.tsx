import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion, useHasFinePointer } from '@/hooks/usePrefersReducedMotion';

/** Soft cursor-following glow. Fine pointers only; off under reduced motion. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const reducedMotion = usePrefersReducedMotion();
  const finePointer = useHasFinePointer();
  const enabled = finePointer && !reducedMotion;

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      pos.current.tx = e.clientX;
      pos.current.ty = e.clientY;
    };
    window.addEventListener('pointermove', onMove);

    let raf: number;
    const tick = () => {
      pos.current.x += (pos.current.tx - pos.current.x) * 0.14;
      pos.current.y += (pos.current.ty - pos.current.y) * 0.14;
      el.style.transform = `translate3d(${pos.current.x - 220}px, ${pos.current.y - 220}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 -z-10 h-[440px] w-[440px] rounded-full opacity-[0.15] blur-3xl"
      style={{
        background:
          'radial-gradient(circle, var(--color-cyan) 0%, transparent 70%)',
      }}
    />
  );
}
