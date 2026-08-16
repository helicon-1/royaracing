import { useState } from 'react';
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder';
import { SOCIAL_ACTIVITIES } from './data';
import type { PillarId } from './data';

const ECONOMIC_POINTS = [
  'Sponsor value delivered — tracked and reported back to partners, not just collected.',
  'Cost-efficient engineering — the car is designed to a fixed budget, not an open one.',
  'Financial sustainability — funding planned a season ahead, not sponsor to sponsor.',
];

const ENVIRONMENTAL_POINTS = [
  'Material sourcing chosen deliberately, not by default.',
  'Manufacturing waste reduced and reused — offcuts and failed prints go back into the process, not the bin.',
  'A digital-first pit display in place of printed material.',
];

function ListDetail({ points }: { points: string[] }) {
  return (
    <ul className="divide-y divide-paper/10 border-t border-paper/10">
      {points.map((point) => (
        <li key={point} className="py-4 text-paper/75">
          {point}
        </li>
      ))}
    </ul>
  );
}

function SocialDetail() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div>
      <div className="border border-green/30 bg-green/[0.06] p-6">
        <p className="text-paper/85">
          Roya runs a mentoring program pairing team engineers with younger students exploring
          STEM Racing.
        </p>
        <p className="mt-2 text-sm text-paper/55">
          Mentors and mentees receive certificates of participation, and involvement can help
          toward joining a racing team next season.
        </p>
        <a
          href="mailto:roya.racing2026@gmail.com?subject=Mentoring%20Program%20Application"
          className="label-mono mt-4 inline-block text-[11px] text-green transition-colors duration-200 hover:text-paper"
        >
          Apply to the mentoring program →
        </a>
      </div>

      <ul className="mt-6 divide-y divide-paper/10 border-t border-paper/10">
        {SOCIAL_ACTIVITIES.map((activity) => {
          const isOpen = open === activity.title;
          return (
            <li key={activity.title}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : activity.title)}
                aria-expanded={isOpen}
                className="group flex w-full items-center justify-between gap-4 py-4 text-left transition-colors duration-200 hover:text-green"
              >
                <span>
                  <span className="block text-paper/85 group-hover:text-green">{activity.title}</span>
                  <span className="block text-sm text-paper/50">{activity.summary}</span>
                </span>
                <span
                  className={`label-mono shrink-0 text-lg text-paper/40 transition-transform duration-300 group-hover:text-green ${isOpen ? 'rotate-45' : ''}`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-[max-height] duration-500 ease-[var(--ease-roya)] ${isOpen ? 'max-h-64' : 'max-h-0'}`}
              >
                <PhotoPlaceholder label={`Photo pending — ${activity.title}`} className="mb-6 aspect-video w-full" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function DetailPanel({ id }: { id: PillarId }) {
  if (id === 'economic') return <ListDetail points={ECONOMIC_POINTS} />;
  if (id === 'environmental') return <ListDetail points={ENVIRONMENTAL_POINTS} />;
  return <SocialDetail />;
}
