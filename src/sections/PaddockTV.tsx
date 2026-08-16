import { useState } from 'react';
import { Section } from '@/components/Section';
import { RevealText } from '@/components/RevealText';

interface Episode {
  code: string;
  title: string;
}

const EPISODES: Episode[] = [
  { code: 'EP.01', title: 'Build Log 01' },
  { code: 'EP.02', title: 'Build Log 02' },
  { code: 'EP.03', title: 'Race Day Debrief' },
];

export function PaddockTV() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <Section id="paddock-tv" className="relative px-6 py-32 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <p className="label-mono mb-6 text-cyan">05 — Paddock TV</p>
        <RevealText
          as="h2"
          text="The build, on camera."
          className="max-w-2xl text-4xl font-bold leading-[1.05] text-paper md:text-6xl"
        />
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/70">
          Roya's build-vlog series — hosted here rather than off-site.
        </p>

        <ul className="mt-16 divide-y divide-paper/10 border-t border-paper/10">
          {EPISODES.map((ep) => {
            const isOpen = open === ep.code;
            return (
              <li key={ep.code}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : ep.code)}
                  aria-expanded={isOpen}
                  className={`group flex w-full items-center justify-between gap-6 px-2 py-6 text-left transition-colors duration-300 ${
                    isOpen ? 'bg-paper text-navy' : 'hover:bg-paper hover:text-navy'
                  }`}
                >
                  <span className="flex items-center gap-6">
                    <span className="label-mono text-[11px] opacity-50">{ep.code}</span>
                    <span className="text-xl font-semibold transition-transform duration-300 group-hover:translate-x-1">
                      {ep.title}
                    </span>
                  </span>
                  <span className="label-mono text-[11px] opacity-50">
                    {isOpen ? 'CLOSE' : 'WATCH'}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-[max-height] duration-500 ease-[var(--ease-roya)] ${
                    isOpen ? 'max-h-[400px]' : 'max-h-0'
                  }`}
                >
                  <div className="flex aspect-video w-full items-center justify-center border border-paper/10 bg-ink/40">
                    <p className="label-mono text-paper/40">Coming soon</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
