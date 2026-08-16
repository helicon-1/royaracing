/**
 * Placeholder wordmark. roya_logo_.png (the real teal "R"/arrow logomark)
 * was referenced in the brief but never actually landed in this session as
 * an attached file — only an inline chat preview came through twice, which
 * isn't something that can be losslessly saved as a production asset, and
 * the brief is explicit that the real mark should be used exactly, never
 * regenerated. Flagged back; this text wordmark stands in until the real
 * PNG (ideally with a transparent background) is supplied.
 */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-bold tracking-tight ${className}`}>
      <span
        aria-hidden="true"
        className="inline-block h-[0.9em] w-[0.9em] rounded-[2px] bg-cyan"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 35%, 35% 35%, 35% 100%, 0 100%)' }}
      />
      ROYA
    </span>
  );
}
