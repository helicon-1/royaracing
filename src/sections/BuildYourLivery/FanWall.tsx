import { useEffect, useState, type FormEvent } from 'react';
import { useLiveryStore, type ZoneId } from './store';
import { submitLivery, subscribeLiveries, type LiveryEntry } from './liveryWallApi';
import { isFirebaseConfigured } from '@/lib/firebase';

const ZONE_ORDER: ZoneId[] = ['nose', 'sidepod', 'frontWing', 'rearWing'];

function Swatch({ colors }: { colors: Record<ZoneId, string> }) {
  return (
    <div className="flex h-10 w-full overflow-hidden rounded-sm">
      {ZONE_ORDER.map((z) => (
        <div key={z} className="flex-1" style={{ background: colors[z] }} />
      ))}
    </div>
  );
}

function formatDate(ms: number) {
  return new Date(ms).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export function FanWall() {
  const zones = useLiveryStore((s) => s.zones);
  const [entries, setEntries] = useState<LiveryEntry[]>([]);
  const [name, setName] = useState('');
  const [maker, setMaker] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [active, setActive] = useState<LiveryEntry | null>(null);

  useEffect(() => subscribeLiveries(setEntries), []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    try {
      await submitLivery(name, maker, zones);
      setName('');
      setMaker('');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      {!isFirebaseConfigured && (
        <p className="label-mono mb-6 text-[10px] text-paper/35">
          Firebase project not connected yet — the wall persists locally in this browser until
          real credentials are supplied.
        </p>
      )}

      <form onSubmit={onSubmit} className="flex flex-col gap-3 border border-paper/10 p-6 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="livery-name" className="label-mono text-[11px] text-paper/50">
            Name your car
          </label>
          <input
            id="livery-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={40}
            required
            className="mt-2 w-full border-b border-paper/20 bg-transparent py-2 text-paper outline-none transition-colors focus:border-lime"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="livery-maker" className="label-mono text-[11px] text-paper/50">
            Your name
          </label>
          <input
            id="livery-maker"
            value={maker}
            onChange={(e) => setMaker(e.target.value)}
            maxLength={40}
            className="mt-2 w-full border-b border-paper/20 bg-transparent py-2 text-paper outline-none transition-colors focus:border-lime"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="label-mono border border-lime px-6 py-2.5 text-[11px] text-lime transition-colors duration-300 hover:bg-lime hover:text-navy disabled:opacity-50"
        >
          {submitting ? 'Adding…' : 'Add to wall'}
        </button>
      </form>

      {entries.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {entries.map((entry) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => setActive(entry)}
              className="group text-left"
            >
              <Swatch colors={entry.colors} />
              <p className="mt-2 truncate text-sm text-paper/80 group-hover:text-lime">{entry.name}</p>
            </button>
          ))}
        </div>
      )}

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/85 px-6 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div className="w-full max-w-sm bg-navy p-8" onClick={(e) => e.stopPropagation()}>
            <Swatch colors={active.colors} />
            <p className="mt-4 text-xl font-bold text-paper">{active.name}</p>
            <p className="label-mono mt-1 text-[11px] text-paper/50">
              by {active.maker} — {formatDate(active.createdAt)}
            </p>
            <button
              type="button"
              onClick={() => setActive(null)}
              className="label-mono mt-6 text-[11px] text-paper/50 hover:text-paper"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
