import { COLORS } from '@/lib/theme';

export type PillarId = 'economic' | 'social' | 'environmental';

// Client-specified colors, one per pillar. Economic uses the palette's
// existing --color-blue rather than the client's raw navy hex: that navy is
// the exact same color as the page background, so it would be invisible as
// a card accent. Blue is the closest already-legible relative in the same
// family.
export const PILLAR_TINTS: Record<PillarId, string> = {
  economic: COLORS.blue,
  social: '#d2d831',
  environmental: '#71ba43',
};

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
    definition: 'Spending money wisely: thinking a purchase through before making it, every time.',
    practice:
      'Roya engineers the car to a fixed budget rather than an open one, weighs cost against value before every purchase, and tracks spending closely so nothing goes to waste.',
  },
  {
    id: 'social',
    label: 'Social',
    definition:
      "Social sustainability is about the people a program touches beyond its own roster, who it brings in, teaches, and gives back to.",
    practice:
      'A mentoring program for younger students, partnerships with student-led organizations in Riyadh, and philanthropic outreach tied to STEM education.',
  },
  {
    id: 'environmental',
    label: 'Environmental',
    definition:
      "Environmental sustainability covers the physical footprint of everything a program does: materials, waste, energy, and what happens to it all afterward. It's broad, not just one or two fixed rules.",
    practice:
      'Deliberate material sourcing, reused offcuts and failed prints, a digital-first pit display, and weighing energy and travel choices for events and testing, among other things.',
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
