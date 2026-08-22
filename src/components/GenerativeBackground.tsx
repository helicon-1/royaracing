import { useEffect, useRef } from 'react';
import { warpedNoise } from '@/lib/noise';
import { COLORS, SECTION_ACCENT, hexToHsv, hsvToRgbString } from '@/lib/theme';
import { useAppStore } from '@/store/useAppStore';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

// Rendered small and upscaled with smoothing for a soft, out-of-focus look.
// Cost per frame stays cheap because the noise field is only ever computed
// at this resolution, regardless of the viewport's real size.
const FIELD_W = 96;
const FIELD_H = 64;

export function GenerativeBackground({
  className = 'pointer-events-none fixed inset-0 -z-20 h-full w-full',
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const smallCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);
  const reducedMotion = usePrefersReducedMotion();
  const currentHueRef = useRef<[number, number, number]>(hexToHsv(COLORS.navy));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const small = document.createElement('canvas');
    small.width = FIELD_W;
    small.height = FIELD_H;
    smallCanvasRef.current = small;
    const sctxNullable = small.getContext('2d');
    if (!sctxNullable) return;
    const sctx: CanvasRenderingContext2D = sctxNullable;
    const ctx2d: CanvasRenderingContext2D = ctx;
    const imageData = sctx.createImageData(FIELD_W, FIELD_H);

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    }
    resize();
    window.addEventListener('resize', resize);

    let t = 0;
    let lastTime = performance.now();

    function frame(now: number) {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      if (!reducedMotion) {
        t += dt * 0.05;
      }

      const { activeSection, scrollProgress } = useAppStore.getState();
      const targetHex = SECTION_ACCENT[activeSection] ?? COLORS.cyan;
      const targetHsv = hexToHsv(targetHex);
      const cur = currentHueRef.current;
      // Ease current color toward the active section's accent (HSV, short-arc hue)
      const easeAmt = reducedMotion ? 1 : 0.02;
      let dh = targetHsv[0] - cur[0];
      dh = ((dh + 180) % 360 + 360) % 360 - 180;
      cur[0] = (cur[0] + dh * easeAmt + 360) % 360;
      cur[1] += (targetHsv[1] - cur[1]) * easeAmt;
      cur[2] += (targetHsv[2] - cur[2]) * easeAmt;

      const scrollShift = scrollProgress * 3.2;

      for (let y = 0; y < FIELD_H; y++) {
        for (let x = 0; x < FIELD_W; x++) {
          const nx = x / FIELD_W;
          const ny = y / FIELD_H;
          const n = warpedNoise(nx * 2.2 + t, ny * 2.2 + scrollShift, 0.7);
          const v = (n + 1) / 2; // 0..1
          const brightness = 0.06 + v * 0.16;
          const [r, g, b] = hsvComponents(cur[0], cur[1] * 0.85, brightness);
          const idx = (y * FIELD_W + x) * 4;
          imageData.data[idx] = r;
          imageData.data[idx + 1] = g;
          imageData.data[idx + 2] = b;
          imageData.data[idx + 3] = 255;
        }
      }
      sctx.putImageData(imageData, 0, 0);

      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx2d.imageSmoothingEnabled = true;
      ctx2d.imageSmoothingQuality = 'high';
      ctx2d.filter = 'blur(2px)';
      ctx2d.drawImage(small, 0, 0, width, height);
      ctx2d.filter = 'none';

      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [reducedMotion]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}

function hsvComponents(h: number, s: number, v: number): [number, number, number] {
  const rgbString = hsvToRgbString(h, s, v);
  const match = rgbString.match(/\d+/g);
  if (!match) return [0, 0, 0];
  return [Number(match[0]), Number(match[1]), Number(match[2])];
}
