import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/** Eases a numeric value toward `target` every frame — no instant snapping. */
export function useEasedValue(target: number, rate = 0.12): number {
  const [value, setValue] = useState(target);
  const valueRef = useRef(target);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      valueRef.current = target;
      setValue(target);
      return;
    }
    let raf: number;
    const tick = () => {
      const diff = target - valueRef.current;
      if (Math.abs(diff) < 0.0008) {
        valueRef.current = target;
        setValue(target);
        return;
      }
      valueRef.current += diff * rate;
      setValue(valueRef.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, rate, reducedMotion]);

  return value;
}
