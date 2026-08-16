/** Fan rating as clickable tire icons (1–4), not a dropdown. */
export function TireRating({
  value,
  onChange,
  readOnly = false,
}: {
  value: number;
  onChange?: (v: number) => void;
  readOnly?: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5" role={readOnly ? undefined : 'radiogroup'} aria-label="Rating out of 4 tires">
      {[1, 2, 3, 4].map((n) => (
        <button
          key={n}
          type="button"
          disabled={readOnly}
          role={readOnly ? undefined : 'radio'}
          aria-checked={value >= n}
          aria-label={`${n} tire${n > 1 ? 's' : ''}`}
          onClick={() => onChange?.(n)}
          className={`transition-transform duration-200 ${readOnly ? '' : 'hover:scale-110'}`}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <circle
              cx="12"
              cy="12"
              r="9"
              fill={value >= n ? 'var(--color-cyan)' : 'none'}
              stroke={value >= n ? 'var(--color-cyan)' : 'var(--color-slate)'}
              strokeWidth="2"
            />
            <circle cx="12" cy="12" r="3" fill={value >= n ? 'var(--color-navy)' : 'var(--color-slate)'} />
            {[0, 90, 180, 270].map((deg) => (
              <rect
                key={deg}
                x="11.2"
                y="3.2"
                width="1.6"
                height="3.2"
                fill={value >= n ? 'var(--color-navy)' : 'var(--color-slate)'}
                transform={`rotate(${deg} 12 12)`}
              />
            ))}
          </svg>
        </button>
      ))}
    </div>
  );
}
