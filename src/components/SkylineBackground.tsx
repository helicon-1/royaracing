import { useHeroProgress } from '@/hooks/useHeroProgress';
import riyadhSkyline from '@/assets/skyline/riyadh-skyline.jpg';

/**
 * Real Riyadh skyline photo (Kingdom Centre Tower), supplied by the team.
 * Hero-only: visible while scrolling through the hero, smoothly fading to
 * fully invisible by the time the hero's own 200vh scroll region ends —
 * it does not linger as ambient background on the rest of the site.
 */
export function SkylineBackground() {
  const heroProgress = useHeroProgress();
  const opacity = 0.45 * (1 - heroProgress);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-[15] h-full w-full overflow-hidden"
      style={{ opacity, transition: 'opacity 150ms linear' }}
    >
      <img
        src={riyadhSkyline}
        alt=""
        className="absolute bottom-0 h-full w-full object-cover object-bottom"
      />
    </div>
  );
}
