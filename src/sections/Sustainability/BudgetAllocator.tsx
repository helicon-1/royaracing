import { useMemo, useState } from 'react';
import { useEasedValue } from '@/hooks/useEasedValue';
import { PILLARS, ROYA_ALLOCATION, type PillarId } from './data';

const STEP = 5;
const START: Record<PillarId, number> = { economic: 35, social: 30, environmental: 35 };

function Bar({ pct, eased = true }: { pct: number; eased?: boolean }) {
  const value = useEasedValue(pct, eased ? 0.1 : 1);
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-paper/10">
      <div className="h-full rounded-full bg-lime" style={{ width: `${value}%` }} />
    </div>
  );
}

export function BudgetAllocator() {
  const [allocation, setAllocation] = useState<Record<PillarId, number>>(START);
  const [compared, setCompared] = useState(false);
  const total = allocation.economic + allocation.social + allocation.environmental;
  const remaining = 100 - total;

  function adjust(id: PillarId, delta: number) {
    setAllocation((prev) => {
      const next = prev[id] + delta;
      if (next < 0) return prev;
      if (delta > 0 && remaining < delta) return prev; // hard cap at 100
      return { ...prev, [id]: next };
    });
  }

  const note = useMemo(() => {
    const userTop = (Object.keys(allocation) as PillarId[]).reduce((a, b) =>
      allocation[a] >= allocation[b] ? a : b,
    );
    const royaTop = (Object.keys(ROYA_ALLOCATION) as PillarId[]).reduce((a, b) =>
      ROYA_ALLOCATION[a] >= ROYA_ALLOCATION[b] ? a : b,
    );
    const label = (id: PillarId) => PILLARS.find((p) => p.id === id)!.label;
    if (userTop === royaTop) {
      return `You and Roya both lead with ${label(userTop)}, not a right answer, just where the emphasis lands today.`;
    }
    return `You lead with ${label(userTop)}; Roya's split leans toward ${label(royaTop)}. Neither is "correct"; different programs weigh these differently.`;
  }, [allocation]);

  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="flex items-baseline justify-between">
          <p className="label-mono text-[11px] text-paper/50">Distribute 100 points across the three pillars</p>
          <p className="label-mono text-[11px] text-lime">{remaining} remaining</p>
        </div>

        <div className="mt-6 space-y-6">
          {PILLARS.map((pillar) => (
            <div key={pillar.id}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-paper/80">{pillar.label}</span>
                <span className="label-mono text-paper/50">{allocation[pillar.id]}</span>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => adjust(pillar.id, -STEP)}
                  disabled={allocation[pillar.id] <= 0}
                  aria-label={`Decrease ${pillar.label}`}
                  className="flex h-7 w-7 shrink-0 items-center justify-center border border-paper/20 text-paper/70 transition-colors duration-200 hover:border-lime hover:text-lime disabled:opacity-30"
                >
                  −
                </button>
                <Bar pct={allocation[pillar.id]} />
                <button
                  type="button"
                  onClick={() => adjust(pillar.id, STEP)}
                  disabled={remaining < STEP}
                  aria-label={`Increase ${pillar.label}`}
                  className="flex h-7 w-7 shrink-0 items-center justify-center border border-paper/20 text-paper/70 transition-colors duration-200 hover:border-lime hover:text-lime disabled:opacity-30"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-paper/10 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
        {!compared ? (
          <div className="flex h-full flex-col justify-center">
            <p className="text-paper/70">See how your split compares to Roya's own.</p>
            <button
              type="button"
              onClick={() => setCompared(true)}
              className="label-mono mt-6 w-fit border border-lime px-6 py-3 text-[11px] text-lime transition-colors duration-300 hover:bg-lime hover:text-navy"
            >
              Compare with Roya
            </button>
          </div>
        ) : (
          <div>
            <p className="label-mono text-[11px] text-paper/50">
              You vs. Roya <span className="text-paper/30">, Roya's real point allocation across the three pillars</span>
            </p>
            <div className="mt-4 space-y-5">
              {PILLARS.map((pillar) => (
                <div key={pillar.id}>
                  <p className="label-mono text-[11px] text-paper/70">{pillar.label}</p>
                  <div className="mt-2 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="label-mono w-11 shrink-0 text-[10px] text-cyan">You</span>
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-paper/10">
                        <div
                          className="h-full rounded-full bg-cyan"
                          style={{ width: `${allocation[pillar.id]}%` }}
                        />
                      </div>
                      <span className="label-mono w-9 shrink-0 text-right text-[10px] text-cyan">
                        {allocation[pillar.id]}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="label-mono w-11 shrink-0 text-[10px] text-lime">Roya</span>
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-paper/10">
                        <div
                          className="h-full rounded-full bg-lime"
                          style={{ width: `${ROYA_ALLOCATION[pillar.id]}%` }}
                        />
                      </div>
                      <span className="label-mono w-9 shrink-0 text-right text-[10px] text-lime">
                        {ROYA_ALLOCATION[pillar.id]}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="editorial mt-6 text-paper/70">{note}</p>
          </div>
        )}
      </div>
    </div>
  );
}
