import { useState } from 'react';

interface Sponsor {
  name: string;
  category: string;
  blurb: string;
}

interface Tier {
  name: string;
  sponsors: Sponsor[];
}

// Placeholder sponsors — fictional names, not real companies or endorsements.
const TIERS: Tier[] = [
  {
    name: 'Vision',
    sponsors: [
      {
        name: 'Falcon Steel Works',
        category: 'Manufacturing',
        blurb: 'Precision fabrication partner for chassis components — placeholder copy.',
      },
    ],
  },
  {
    name: 'Platinum',
    sponsors: [
      {
        name: 'Nomad Coffee Co.',
        category: 'Food & Beverage',
        blurb: 'Fuels early mornings in the workshop — placeholder copy.',
      },
    ],
  },
  {
    name: 'Gold',
    sponsors: [
      {
        name: 'Waypoint Logistics',
        category: 'Logistics',
        blurb: 'Gets the car and crew to the right place, on time — placeholder copy.',
      },
    ],
  },
  {
    name: 'Silver',
    sponsors: [
      {
        name: 'Circuit & Co.',
        category: 'Electronics',
        blurb: 'Sensor and telemetry hardware support — placeholder copy.',
      },
    ],
  },
  {
    name: 'Bronze',
    sponsors: [
      {
        name: 'Riyadh Print House',
        category: 'Print & Signage',
        blurb: 'Pit display and livery print support — placeholder copy.',
      },
    ],
  },
];

export function Sponsors() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div>
      <p className="text-paper/70">Add some of our valued sponsors.</p>
      <div className="mt-8 divide-y divide-paper/10 border-t border-paper/10">
        {TIERS.map((tier) => (
          <div key={tier.name} className="py-6">
            <p className="label-mono text-[11px] text-lime">{tier.name}</p>
            <ul className="mt-3 divide-y divide-paper/5">
              {tier.sponsors.map((sponsor) => {
                const isOpen = open === sponsor.name;
                return (
                  <li key={sponsor.name}>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : sponsor.name)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between py-3 text-left text-lg text-paper/85 transition-colors duration-200 hover:text-lime"
                    >
                      {sponsor.name}
                      <span className="label-mono text-[10px] text-paper/30">
                        {isOpen ? 'CLOSE' : 'VIEW'}
                      </span>
                    </button>
                    <div
                      className={`overflow-hidden transition-[max-height] duration-400 ease-[var(--ease-roya)] ${isOpen ? 'max-h-24' : 'max-h-0'}`}
                    >
                      <p className="label-mono pb-2 text-[10px] text-lime/70">{sponsor.category}</p>
                      <p className="pb-4 text-sm text-paper/55">{sponsor.blurb}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
