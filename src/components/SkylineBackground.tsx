import { useAppStore } from '@/store/useAppStore';
import riyadhSkyline from '@/assets/skyline/riyadh-skyline.jpg';

/**
 * Real Riyadh skyline photo (Kingdom Centre Tower), supplied by the team.
 * Full opacity at the very top of the hero, then drops instantly to a low
 * ambient opacity the moment the page scrolls at all — no eased fade.
 *
 * The Mamlaka Tower vector emblem lives separately in the Home hero
 * content itself — this photo is the ambient backdrop, not that mark.
 */
export function SkylineBackground() {
  const scrollProgress = useAppStore((s) => s.scrollProgress);
  const opacity = scrollProgress > 0 ? 0.2 : 0.65;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-[15] h-full w-full overflow-hidden"
      style={{ opacity }}
    >
      <img
        src={riyadhSkyline}
        alt=""
        className="absolute bottom-0 h-full w-full object-cover object-bottom"
      />
    </div>
  );
}
