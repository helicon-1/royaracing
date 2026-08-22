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
    meaning: 'Traditional Saudi coffee cups — a symbol of hospitality.',
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
    meaning: "Saudi Arabia's transformation plan — inspiration for our name.",
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
  const selected = EMBLEMS.find((e) => e.id === selectedId);

  return (
    <div className="px-6 py-20 md:px-[120px]">
      <div className="mx-auto max-w-[1400px] text-center">
        <p className="text-2xl font-bold text-paper md:text-3xl">
          Our emblems <span className="text-paper/45">(click one)</span>
        </p>
        <p className="mx-auto mt-3 max-w-xl text-paper/60">
          Each mark on this site was chosen on purpose — together they tell a short story about
          who Roya is and where the team comes from.
        </p>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-24 gap-y-14">
          {EMBLEMS.map((emblem, i) => (
            <Reveal key={emblem.id} delay={i * 80}>
              <button
                type="button"
                onClick={() => setSelectedId(selectedId === emblem.id ? null : emblem.id)}
                aria-expanded={selectedId === emblem.id}
                className={`group flex flex-col items-center gap-3 transition-colors duration-300 ${
                  selectedId === emblem.id ? 'text-cyan' : 'text-paper/65 hover:text-paper'
                }`}
              >
                <span className="relative inline-flex transition-transform duration-300 group-hover:-translate-y-1">
                  <img
                    src={emblem.src}
                    alt=""
                    aria-hidden="true"
                    className="h-20 w-auto shrink-0 md:h-28"
                  />
                  {/* Hover-only cue that this is clickable — the meaning itself
                      still only appears on click, never on hover. */}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border border-current bg-navy text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  >
                    +
                  </span>
                </span>
                <AnimatedLink className="label-mono whitespace-nowrap text-sm">
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
