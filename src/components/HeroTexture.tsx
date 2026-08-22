import { useAppStore } from '@/store/useAppStore';
import { GenerativeBackground } from '@/components/GenerativeBackground';

/**
 * The same animated navy noise texture used sitewide (GenerativeBackground),
 * layered a second time directly over the hero's skyline photo — that photo
 * sits at higher opacity there than elsewhere, which otherwise mostly hides
 * the texture underneath it. Instant on/off with scroll, matching the
 * skyline photo's own fade behavior.
 */
export function HeroTexture() {
  const scrollProgress = useAppStore((s) => s.scrollProgress);
  const opacity = scrollProgress > 0 ? 0 : 1;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-[12] h-full w-full"
      style={{ opacity, mixBlendMode: 'overlay' }}
    >
      <GenerativeBackground className="h-full w-full" />
    </div>
  );
}
