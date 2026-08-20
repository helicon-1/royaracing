import { useState } from 'react';
import { Section } from '@/components/Section';
import { RevealText } from '@/components/RevealText';

interface Episode {
  code: string;
  title: string;
}

const PODCAST_EPISODES: Episode[] = [
  { code: 'EP.01', title: 'Why Roya' },
  { code: 'EP.02', title: 'Inside the Workshop' },
];

const VLOG_EPISODES: Episode[] = [
  { code: 'EP.01', title: 'Build Log 01' },
  { code: 'EP.02', title: 'Build Log 02' },
  { code: 'EP.03', title: 'Race Day Debrief' },
];

function EpisodeGroup({
  label,
  episodes,
  openCode,
  toggleLabel,
  onToggle,
}: {
  label: string;
  episodes: Episode[];
  openCode: string | null;
  toggleLabel: string;
  onToggle: (code: string | null) => void;
}) {
  return (
    <div>
      <p className="label-mono mb-4 text-[11px] text-paper/40">{label}</p>
      <ul className="divide-y divide-paper/10 border-t border-paper/10">
        {episodes.map((ep) => {
          const isOpen = openCode === ep.code;
          return (
            <li key={ep.code}>
              <button
                type="button"
                onClick={() => onToggle(isOpen ? null : ep.code)}
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
                  {isOpen ? 'CLOSE' : toggleLabel}
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
  );
}

export function AbsoluteRoya() {
  const [openPodcast, setOpenPodcast] = useState<string | null>(null);
  const [openVlog, setOpenVlog] = useState<string | null>(null);

  return (
    <Section id="absolute-roya" className="relative px-6 py-32 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <p className="label-mono mb-6 text-cyan">05 — Absolute Roya</p>
        <RevealText
          as="h2"
          text="The podcast and the build vlogs."
          className="max-w-2xl text-4xl font-bold leading-[1.05] text-paper md:text-6xl"
        />
        <p className="editorial mt-6 max-w-xl text-xl text-paper/60">
          Off-workshop conversation, and the build itself on camera — both hosted here rather
          than off-site.
        </p>

        <div className="mt-16 grid gap-x-16 gap-y-16 lg:grid-cols-2">
          <EpisodeGroup
            label="Podcast"
            episodes={PODCAST_EPISODES}
            openCode={openPodcast}
            toggleLabel="NOTES"
            onToggle={setOpenPodcast}
          />
          <EpisodeGroup
            label="Behind the scenes"
            episodes={VLOG_EPISODES}
            openCode={openVlog}
            toggleLabel="WATCH"
            onToggle={setOpenVlog}
          />
        </div>
      </div>
    </Section>
  );
}
