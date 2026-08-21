import { Section } from '@/components/Section';
import { RevealText } from '@/components/RevealText';
import { Reveal } from '@/components/Reveal';
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder';

interface Stage {
  label: string;
  month: string;
  status: 'complete' | 'upcoming';
  blurb: string;
}

const STAGES: Stage[] = [
  {
    label: 'Regionals',
    month: 'April',
    status: 'complete',
    blurb: 'Riyadh regional qualifier. Recap and results to be added.',
  },
  {
    label: 'Nationals',
    month: 'June',
    status: 'complete',
    blurb: 'National qualifier. Recap and results to be added.',
  },
  {
    label: 'World Finals',
    month: 'October',
    status: 'upcoming',
    blurb: 'Not yet reached. This is the stage Roya Racing is building toward.',
  },
];

function StageCard({ stage, index }: { stage: Stage; index: number }) {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-ink/60">
      <div className="relative flex-1 p-6 md:p-8">
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 h-full w-2 bg-cyan"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 82%, 45% 100%, 0 100%)' }}
        />
        <div className="pl-5">
          <div className="flex items-start justify-between gap-4">
            <span
              aria-hidden="true"
              className="label-mono select-none text-6xl font-bold leading-none text-paper/10"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span
              className={`label-mono shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-[10px] ${
                stage.status === 'upcoming'
                  ? 'border-paper/25 text-paper/50'
                  : 'border-cyan/50 text-cyan'
              }`}
            >
              {stage.status === 'upcoming' ? 'Upcoming' : 'Complete'}
            </span>
          </div>
          <h3 className="mt-2 text-2xl font-bold leading-[1.05] text-paper">{stage.label}</h3>
          <p className="label-mono mt-2 text-cyan">{stage.month}</p>
          <p className="mt-4 text-sm text-paper/70">{stage.blurb}</p>
        </div>
      </div>
      <PhotoPlaceholder label={`Photo pending — ${stage.label}`} className="aspect-video w-full" />
    </div>
  );
}

export function CompetitionTimeline() {
  return (
    <Section id="timeline" className="relative px-6 py-32 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <p className="label-mono mb-6 text-cyan">03 — Competition Timeline</p>
        <RevealText
          as="h2"
          text="Three stages to the World Finals."
          className="max-w-2xl text-4xl font-bold leading-[1.05] text-paper md:text-6xl"
        />
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/70">
          Regionals, then Nationals, then the World Finals — where Roya is headed next.
        </p>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {STAGES.map((stage, i) => (
            <Reveal key={stage.label} delay={i * 100} className="h-full">
              <StageCard stage={stage} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
