import { useState } from 'react';
import { Reveal } from '@/components/Reveal';
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
    meaning:
      "Saudi Arabia's national emblem — two crossed swords beneath a palm tree, echoing the same mark carried on the Kingdom's own royal insignia. A direct nod to national identity.",
  },
  {
    id: 'fanajeel',
    name: 'Fanajeel',
    src: fanajeel,
    meaning:
      'Traditional Arabic coffee cups — a symbol of hospitality, poured for sponsors, mentors and visitors at the workshop.',
  },
  {
    id: 'mamlaka',
    name: 'Mamlaka Tower',
    src: mamlakaTower,
    meaning: "Riyadh's Kingdom Centre Tower — the skyline of the city the team calls home.",
  },
  {
    id: 'vision2030',
    name: 'Vision 2030',
    src: vision2030,
    meaning: "Saudi Arabia's national transformation plan — the direct inspiration for the team's name, Roya.",
  },
  {
    id: 'sadu',
    name: 'Sadu',
    src: sadu,
    meaning:
      'A traditional Najdi weaving pattern — a mark of Saudi craftsmanship, the same care the team puts into building the car by hand.',
  },
];

export function Emblems() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = EMBLEMS.find((e) => e.id === selectedId);

  return (
    <div className="px-6 py-20 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <p className="label-mono mb-12 text-center text-[10px] text-paper/35">
          Our emblems — click one
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-20 gap-y-12">
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
                <img src={emblem.src} alt="" aria-hidden="true" className="h-14 w-14 shrink-0 md:h-16 md:w-16" />
                <span className="label-mono whitespace-nowrap text-sm">{emblem.name}</span>
              </button>
            </Reveal>
          ))}
        </div>

        {/* Fixed height (not min-height) so switching between short and
            long descriptions never shifts the Team section below. */}
        <div className="mx-auto mt-10 flex h-24 max-w-xl items-center justify-center text-center">
          {selected && <p className="text-paper/70">{selected.meaning}</p>}
        </div>
      </div>
    </div>
  );
}
