import { useState } from 'react';
import { Section } from '@/components/Section';
import { RevealText } from '@/components/RevealText';
import { Reveal } from '@/components/Reveal';
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder';
import { AnimatedLink } from '@/components/ui/animated-link';

interface Episode {
  code: string;
  title: string;
  duration: string;
}

const PODCAST_EPISODES: Episode[] = [
  { code: 'EP.01', title: 'Why Roya', duration: '18:24' },
  { code: 'EP.02', title: 'Inside the Workshop', duration: '22:07' },
];

const VLOG_EPISODES: Episode[] = [
  { code: 'EP.01', title: 'Build Log 01', duration: '6:12' },
  { code: 'EP.02', title: 'Build Log 02', duration: '7:45' },
  { code: 'EP.03', title: 'Race Day Debrief', duration: '9:30' },
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
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);

  return (
    <div>
      <AnimatedLink color="lime" className="label-mono mb-4 text-[11px] text-paper/40">
        {label}
      </AnimatedLink>
      <ul className="divide-y divide-paper/10 border-t border-paper/10">
        {episodes.map((ep) => {
          const isOpen = openCode === ep.code;
          // Hovering looks identical to the open state — same lime box,
          // same navy text — not just a preview on the way to it.
          const active = isOpen || hoveredCode === ep.code;
          return (
            <li key={ep.code}>
              <button
                type="button"
                onClick={() => onToggle(isOpen ? null : ep.code)}
                onMouseEnter={() => setHoveredCode(ep.code)}
                onMouseLeave={() => setHoveredCode(null)}
                aria-expanded={isOpen}
                className={`group flex w-full items-center justify-between gap-6 px-2 py-6 text-left transition-colors duration-300 ${
                  active ? 'bg-lime text-navy' : ''
                }`}
              >
                <span className="flex items-center gap-5">
                  <PhotoPlaceholder
                    label=""
                    className="h-12 w-12 shrink-0"
                    accent={active ? 'var(--color-navy)' : 'var(--color-lime)'}
                  />
                  <span className="flex flex-col gap-1">
                    <span className="label-mono text-[11px] opacity-50">{ep.code}</span>
                    <AnimatedLink
                      color="lime"
                      accentColor={active ? 'var(--color-navy)' : undefined}
                      showArrow
                      className="text-xl font-semibold transition-transform duration-300 group-hover:translate-x-1"
                    >
                      {ep.title}
                    </AnimatedLink>
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-4">
                  <span className="label-mono text-[11px] opacity-50">{ep.duration}</span>
                  <span className="label-mono text-[11px] opacity-50">
                    {isOpen ? 'CLOSE' : toggleLabel}
                  </span>
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
        <AnimatedLink color="lime" className="label-mono mb-6 text-lime">
          04: Absolute Roya
        </AnimatedLink>
        <h2 className="max-w-2xl text-4xl font-bold leading-[1.05] text-paper md:text-6xl">
          <AnimatedLink color="lime">
            <RevealText as="span" text="The podcast and the build vlogs." />
          </AnimatedLink>
        </h2>
        <p className="editorial mt-6 max-w-xl text-xl text-paper/60">
          Off-workshop conversation, and the build itself on camera, both hosted here rather
          than off-site.
        </p>

        <div className="mt-16 grid gap-x-16 gap-y-16 lg:grid-cols-2">
          <Reveal>
            <EpisodeGroup
              label="Podcast"
              episodes={PODCAST_EPISODES}
              openCode={openPodcast}
              toggleLabel="NOTES"
              onToggle={setOpenPodcast}
            />
          </Reveal>
          <Reveal delay={120}>
            <EpisodeGroup
              label="Behind the scenes"
              episodes={VLOG_EPISODES}
              openCode={openVlog}
              toggleLabel="WATCH"
              onToggle={setOpenVlog}
            />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
