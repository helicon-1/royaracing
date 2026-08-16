/**
 * Honest stand-in for real photography that hasn't been supplied yet.
 * Never fabricate a photo here — an AI-generated image passed off as a
 * real team/event photo would violate the brief directly. This renders a
 * clearly-labeled empty state instead; swap for a real <img> per spot.
 */
export function PhotoPlaceholder({
  label = 'Photo pending',
  className = '',
  accent = 'var(--color-cyan)',
}: {
  label?: string;
  className?: string;
  accent?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-ink/40 ${className}`}
      style={{
        backgroundImage: `repeating-linear-gradient(135deg, ${accent}14 0px, ${accent}14 1px, transparent 1px, transparent 14px)`,
      }}
    >
      <div className="absolute inset-0 border border-paper/10" />
      <p className="label-mono text-[10px] text-paper/40">{label}</p>
    </div>
  );
}
