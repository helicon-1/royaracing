export type PillarId = 'economic' | 'social' | 'environmental';

export interface Pillar {
  id: PillarId;
  label: string;
  /** Plain-language definition of what this kind of sustainability means. */
  definition: string;
  /** What Roya specifically does about it. */
  practice: string;
}

export const PILLARS: Pillar[] = [
  {
    id: 'economic',
    label: 'Economic',
    definition:
      'Whether the program can keep running: money spent wisely, and value delivered back to the people who fund it.',
    practice:
      'Roya tracks the value delivered to sponsors, engineers the car to a fixed budget rather than an open one, and plans funding a season ahead so the team never depends on a single source.',
  },
  {
    id: 'social',
    label: 'Social',
    definition:
      'The people side: who the team brings in, teaches, and gives back to — not just who ends up on the roster.',
    practice:
      'A mentoring program for younger students, partnerships with student-led organizations in Riyadh, and philanthropic outreach tied to STEM education.',
  },
  {
    id: 'environmental',
    label: 'Environmental',
    definition:
      'The physical footprint of building a race car: what it is made from, and what happens to what is left over.',
    practice:
      'Deliberate material sourcing, reusing offcuts and failed prints instead of discarding them, and a digital-first pit display instead of printed material.',
  },
];

export interface SocialActivity {
  title: string;
  summary: string;
}

export const SOCIAL_ACTIVITIES: SocialActivity[] = [
  {
    title: 'Mentoring program',
    summary: 'Pairing Roya engineers with younger students exploring STEM Racing.',
  },
  {
    title: 'Student-org partnerships',
    summary: 'Working alongside student-led organizations across Riyadh.',
  },
  {
    title: 'Philanthropic outreach',
    summary: 'STEM-education-linked community outreach.',
  },
];

/** Placeholder — Roya's real point allocation hasn't been supplied yet. */
export const ROYA_ALLOCATION: Record<PillarId, number> = {
  economic: 40,
  social: 35,
  environmental: 25,
};
