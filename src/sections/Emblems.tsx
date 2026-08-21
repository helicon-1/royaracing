import { useState } from 'react';
import { Reveal } from '@/components/Reveal';
import sadu from '@/assets/emblems/sadu-asterisk.svg';
import fanajeel from '@/assets/emblems/fanajeel-cup.svg';
import mamlakaTower from '@/assets/emblems/mamlaka-tower.svg';
import vision2030 from '@/assets/emblems/vision-2030.svg';
import bowtie from '@/assets/emblems/bowtie.svg';

interface Emblem {
  id: string;
  name: string;
  src: string;
  meaning: string;
}

const EMBLEMS: Emblem[] = [
  {
    id: 'sadu',
    name: 'Sadu',
    src: sadu,
    meaning:
      'A traditional Najdi weaving pattern — a mark of Saudi craftsmanship, the same care the team puts into building the car by hand.',
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
    id: 'bowtie',
    name: 'Bowtie',
    src: bowtie,
    meaning: 'A small nod to motorsport and mechanical craft, carried as a mark on the site itself.',
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
        <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-10">
          {EMBLEMS.map((emblem, i) => (
            <Reveal key={emblem.id} delay={i * 80}>
              <button
                type="button"
                onClick={() => setSelectedId(selectedId === emblem.id ? null : emblem.id)}
                aria-expanded={selectedId === emblem.id}
                className={`group flex items-center gap-3 transition-colors duration-300 ${
                  selectedId === emblem.id ? 'text-cyan' : 'text-paper/65 hover:text-paper'
                }`}
              >
                <img src={emblem.src} alt="" aria-hidden="true" className="h-7 w-7 shrink-0" />
                <span className="label-mono whitespace-nowrap text-sm">{emblem.name}</span>
              </button>
            </Reveal>
          ))}
        </div>

        <div
          className={`mx-auto max-w-xl overflow-hidden text-center transition-[max-height] duration-500 ease-[var(--ease-roya)] ${
            selected ? 'mt-10 max-h-40' : 'max-h-0'
          }`}
        >
          {selected && <p className="text-paper/70">{selected.meaning}</p>}
        </div>
      </div>
    </div>
  );
}
