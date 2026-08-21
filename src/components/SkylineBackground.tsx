import { useAppStore } from '@/store/useAppStore';
import riyadhSkyline from '@/assets/skyline/riyadh-skyline.jpg';

/**
 * Real Riyadh skyline photo (Kingdom Centre Tower), supplied by the team.
 * Prominent behind the hero, then gently fades to a low ambient opacity
 * that holds for the rest of the site — a slow fade over a real scroll
 * distance rather than a blunt drop right after the hero.
 *
 * The Mamlaka Tower vector emblem lives separately in the Home hero
 * content itself — this photo is the ambient backdrop, not that mark.
 */
export function SkylineBackground() {
  const scrollProgress = useAppStore((s) => s.scrollProgress);
  const t = Math.min(1, scrollProgress / 0.22);
  const opacity = 0.65 - t * 0.45;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-[15] h-full w-full overflow-hidden"
      style={{ opacity, transition: 'opacity 200ms linear' }}
    >
      <img
        src={riyadhSkyline}
        alt=""
        className="absolute bottom-0 h-full w-full object-cover object-bottom"
      />
    </div>
  );
}
