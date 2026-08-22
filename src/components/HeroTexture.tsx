import { useHeroProgress } from '@/hooks/useHeroProgress';
import { GenerativeBackground } from '@/components/GenerativeBackground';

/**
 * The same animated navy noise texture used sitewide (GenerativeBackground),
 * layered a second time directly over the hero's skyline photo — that photo
 * sits at higher opacity there than elsewhere, which otherwise mostly hides
 * it. Hero-only: fades smoothly to fully invisible by the end of the
 * hero's own scroll region, same as the skyline photo.
 */
export function HeroTexture() {
  const heroProgress = useHeroProgress();
  const opacity = 1 - heroProgress;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-[12] h-full w-full"
      style={{ opacity, mixBlendMode: 'overlay', transition: 'opacity 150ms linear' }}
    >
      <GenerativeBackground className="h-full w-full" />
    </div>
  );
}
