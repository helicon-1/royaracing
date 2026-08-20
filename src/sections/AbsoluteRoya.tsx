import { useState } from 'react';
import { Section } from '@/components/Section';
import { RevealText } from '@/components/RevealText';

interface Episode {
  code: string;
  title: string;
}

const EPISODES: Episode[] = [
  { code: 'EP.01', title: 'Why Roya' },
  { code: 'EP.02', title: 'Inside the Workshop' },
];

export function AbsoluteRoya() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <Section id="absolute-roya" className="relative px-6 py-24 md:px-10">
      <div className="mx-auto max-w-2xl">
        <p className="label-mono mb-6 text-cyan">06 — Absolute Roya</p>
        <RevealText
          as="h2"
          text="The team's podcast."
          className="text-4xl font-bold leading-[1.05] text-paper md:text-5xl"
        />
        <p className="editorial mt-6 text-xl text-paper/60">
          Off-workshop conversation — what the build looked like from the inside, unscripted.
        </p>

        <ul className="mt-14 divide-y divide-paper/10 border-t border-paper/10">
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
                    {isOpen ? 'CLOSE' : 'NOTES'}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-[max-height] duration-500 ease-[var(--ease-roya)] ${
                    isOpen ? 'max-h-40' : 'max-h-0'
                  }`}
                >
                  <p className="editorial px-2 pb-8 text-paper/60">
                    Show notes coming soon.
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
