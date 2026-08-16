import { useLiveryStore, ZONE_LABELS, type Finish, type ZoneId } from './store';

const ZONES: ZoneId[] = ['nose', 'sidepod', 'frontWing', 'rearWing'];
const FINISHES: Finish[] = ['matte', 'gloss', 'metallic'];

// Team swatches — brand palette, excluding green (reserved for Sustainability only)
const TEAM_SWATCHES = ['#26b7bd', '#283679', '#d2d831', '#2f87c8', '#0b1030', '#f4f4f1'];

export function LiveryEditor({ onReset }: { onReset: () => void }) {
  const { zones, selectedZone, setSelectedZone, setZoneColor, setZoneFinish } = useLiveryStore();
  const current = zones[selectedZone];

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {ZONES.map((z) => (
          <button
            key={z}
            type="button"
            onClick={() => setSelectedZone(z)}
            className={`label-mono border px-4 py-2 text-[11px] transition-colors duration-200 ${
              selectedZone === z
                ? 'border-lime bg-lime text-navy'
                : 'border-paper/20 text-paper/60 hover:border-paper/50 hover:text-paper'
            }`}
          >
            {ZONE_LABELS[z]}
          </button>
        ))}
      </div>

      <div className="mt-8">
        <p className="label-mono text-[11px] text-paper/40">Color</p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          {TEAM_SWATCHES.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setZoneColor(selectedZone, color)}
              aria-label={`Set ${ZONE_LABELS[selectedZone]} color to ${color}`}
              className={`h-9 w-9 rounded-full border-2 transition-transform duration-200 hover:scale-110 ${
                current.color.toLowerCase() === color ? 'border-lime' : 'border-paper/20'
              }`}
              style={{ background: color }}
            />
          ))}
          <label className="relative h-9 w-9 cursor-pointer overflow-hidden rounded-full border-2 border-dashed border-paper/30 transition-transform duration-200 hover:scale-110">
            <input
              type="color"
              value={current.color}
              onChange={(e) => setZoneColor(selectedZone, e.target.value)}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              aria-label="Custom color picker"
            />
            <span
              className="pointer-events-none absolute inset-0"
              style={{ background: current.color }}
            />
          </label>
        </div>
      </div>

      <div className="mt-8">
        <p className="label-mono text-[11px] text-paper/40">Finish</p>
        <div className="mt-3 flex gap-2">
          {FINISHES.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setZoneFinish(selectedZone, f)}
              className={`label-mono flex-1 border px-4 py-2.5 text-[11px] capitalize transition-colors duration-200 ${
                current.finish === f
                  ? 'border-lime bg-lime text-navy'
                  : 'border-paper/20 text-paper/60 hover:border-paper/50 hover:text-paper'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="label-mono mt-10 border border-paper/20 px-6 py-2.5 text-[11px] text-paper/60 transition-colors duration-200 hover:border-paper/50 hover:text-paper"
      >
        Reset
      </button>
    </div>
  );
}
