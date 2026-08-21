import { useAppStore } from '@/store/useAppStore';

/**
 * Placeholder Riyadh skyline treatment. The brief calls for real, properly
 * licensed photography here — none was supplied with this build, and an
 * AI-generated image should never be passed off as real photography, so
 * this renders a restrained vector silhouette instead until a real licensed
 * photo is provided. Swap the <svg> below for an <img> once one lands — the
 * opacity/scroll-fade wiring stays the same.
 *
 * The Mamlaka Tower itself lives only in the Home hero (a large, deliberate
 * backdrop there) — deliberately not repeated here, so it doesn't become
 * background wallpaper on every section.
 */
export function SkylineBackground() {
  const scrollProgress = useAppStore((s) => s.scrollProgress);
  const t = Math.min(1, scrollProgress / 0.08);
  const opacity = 0.32 - t * 0.12;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-[15] h-full w-full overflow-hidden"
      style={{ opacity, transition: 'opacity 200ms linear' }}
    >
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMax slice"
        className="absolute bottom-0 h-full w-full"
      >
        <rect x="0" y="600" width="120" height="300" fill="#0b1030" />
        <rect x="130" y="520" width="90" height="380" fill="#0b1030" />
        <rect x="230" y="640" width="70" height="260" fill="#0b1030" />
        <rect x="310" y="560" width="60" height="340" fill="#0b1030" />
        <rect x="470" y="300" width="190" height="600" fill="#0b1030" />
        <rect x="700" y="600" width="50" height="300" fill="#0b1030" />
        <rect x="760" y="660" width="80" height="240" fill="#0b1030" />
        <rect x="850" y="540" width="65" height="360" fill="#0b1030" />
        <rect x="925" y="620" width="55" height="280" fill="#0b1030" />
        <rect x="990" y="580" width="90" height="320" fill="#0b1030" />
        <rect x="1090" y="670" width="70" height="230" fill="#0b1030" />
        <rect x="1170" y="600" width="60" height="300" fill="#0b1030" />
        <rect x="1240" y="640" width="100" height="260" fill="#0b1030" />
        <rect x="1350" y="560" width="55" height="340" fill="#0b1030" />
        <rect x="1415" y="620" width="75" height="280" fill="#0b1030" />
        <rect x="1500" y="660" width="100" height="240" fill="#0b1030" />
      </svg>
    </div>
  );
}
