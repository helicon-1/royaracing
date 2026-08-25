import { useState } from 'react';
import { Reveal } from '@/components/Reveal';
import { AnimatedLink } from '@/components/ui/animated-link';
import saudiEmblem from '@/assets/emblems/sadu-asterisk.svg';
import fanajeel from '@/assets/emblems/fanajeel-cup.svg';
import mamlakaTower from '@/assets/emblems/mamlaka-tower.svg';
import vision2030 from '@/assets/emblems/vision-2030.svg';
import sadu from '@/assets/emblems/bowtie.svg';

interface Emblem {
  id: string;
  name: string;
  src: string;
  meaning: string;
}

const EMBLEMS: Emblem[] = [
  {
    id: 'saudi-emblem',
    name: 'Saudi Emblem',
    src: saudiEmblem,
    meaning: "Saudi Arabia's national emblem: crossed swords and a palm tree.",
  },
  {
    id: 'fanajeel',
    name: 'Fanajeel',
    src: fanajeel,
    meaning: 'Traditional Saudi coffee cups, a symbol of hospitality.',
  },
  {
    id: 'mamlaka',
    name: 'Mamlaka Tower',
    src: mamlakaTower,
    meaning: "Riyadh's Kingdom Centre Tower, the city's landmark skyscraper.",
  },
  {
    id: 'vision2030',
    name: 'Vision 2030',
    src: vision2030,
    meaning: "Saudi Arabia's transformation plan, inspiration for our name.",
  },
  {
    id: 'sadu',
    name: 'Sadu',
    src: sadu,
    meaning: 'A traditional Saudi Bedouin weaving pattern.',
  },
];

export function Emblems() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const selected = EMBLEMS.find((e) => e.id === (hoveredId ?? selectedId));

  return (
    <div className="px-6 py-20 md:px-[120px]">
      <div className="mx-auto max-w-[1400px] text-center">
        <div className="text-2xl font-bold text-paper md:text-3xl">
          <AnimatedLink>
            Our emblems <span className="text-paper/45">(click one)</span>
          </AnimatedLink>
        </div>
        <div className="mx-auto mt-3 max-w-xl text-paper/60">
          <AnimatedLink>
            Each mark on this site was chosen on purpose; together they tell a short story
            about who Roya is and where the team comes from.
          </AnimatedLink>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-24 gap-y-14">
          {EMBLEMS.map((emblem, i) => (
            <Reveal key={emblem.id} delay={i * 80}>
              <button
                type="button"
                onClick={() => setSelectedId(selectedId === emblem.id ? null : emblem.id)}
                onMouseEnter={() => setHoveredId(emblem.id)}
                onMouseLeave={() => setHoveredId(null)}
                aria-expanded={selectedId === emblem.id || hoveredId === emblem.id}
                className={`group flex flex-col items-center gap-3 transition-colors duration-300 ${
                  selectedId === emblem.id ? 'text-lime' : 'text-paper/65 hover:text-paper'
                }`}
              >
                <span className="relative inline-flex transition-transform duration-300 group-hover:-translate-y-1">
                  {/* Idle: each mark's own natural/original color, untouched.
                      Hover: crossfades to a flat, uniform lime silhouette —
                      the source SVGs are loaded as <img>, so a hue-rotate
                      filter would shift each mark's own colors unevenly
                      (worse for multi-colored marks). A CSS mask driven by
                      the same image's alpha channel, filled with a solid
                      lime background, gives every emblem the exact same
                      clean lime regardless of its natural coloring. */}
                  <img
                    src={emblem.src}
                    alt=""
                    aria-hidden="true"
                    className="h-20 w-auto shrink-0 transition-opacity duration-300 ease-[var(--ease-roya)] group-hover:opacity-0 md:h-28"
                  />
                  <span
                    aria-hidden="true"
                    style={{
                      // The URL has to be quoted: Vite emits SVG data URIs
                      // with the SVG's own unescaped single quotes still in
                      // them (e.g. viewBox='0 0 100 100'), and an unquoted
                      // CSS url() token can't contain a bare quote — the
                      // whole mask-image declaration was silently invalid
                      // (computed value fell back to `none`), which is why
                      // the Mamlaka Tower's window cutout rendered as solid
                      // on hover: there was no mask at all, just a lime
                      // rectangle sized to the image underneath it.
                      WebkitMaskImage: `url("${emblem.src}")`,
                      maskImage: `url("${emblem.src}")`,
                      WebkitMaskRepeat: 'no-repeat',
                      maskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'center',
                      maskPosition: 'center',
                      WebkitMaskSize: 'contain',
                      maskSize: 'contain',
                      backgroundColor: 'var(--color-lime)',
                    }}
                    className="absolute inset-0 opacity-0 transition-opacity duration-300 ease-[var(--ease-roya)] group-hover:opacity-100"
                  />
                  {/* Hover-only cue that this is clickable — clicking keeps
                      the definition pinned open after the mouse leaves. */}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border border-current bg-navy text-sm leading-none opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  >
                    <span className="-translate-y-px">+</span>
                  </span>
                </span>
                <AnimatedLink color="lime" className="label-mono whitespace-nowrap text-sm">
                  {emblem.name}
                </AnimatedLink>
              </button>
            </Reveal>
          ))}
        </div>

        {/* Fixed height (not min-height) so switching between short and
            long descriptions never shifts the Team section below. The
            meaning itself is forced to a single line — never wraps — with
            an ellipsis as a safety net at narrow widths. */}
        <div className="mx-auto mt-10 flex h-10 max-w-2xl items-center justify-center px-4">
          {selected && (
            <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-paper/70">
              {selected.meaning}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
