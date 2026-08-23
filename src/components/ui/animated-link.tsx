import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type AnimatedLinkColor = 'cyan' | 'lime' | 'white';

const ACCENT_COLORS: Record<AnimatedLinkColor, string> = {
  cyan: 'var(--color-cyan)',
  lime: 'var(--color-lime)',
  white: '#ffffff',
};

type AnimatedLinkProps = {
  children: ReactNode;
  className?: string;
  /** Which accent the underline/arrow render in — each section has one lead color. */
  color?: AnimatedLinkColor;
  /**
   * Escape hatch for Sustainability's pillar colors (blue/lime/green), the
   * one section exempt from the cyan/lime/white lead-accent system — any
   * CSS color value, overrides `color` when set.
   */
  accentColor?: string;
  /**
   * Show the sliding arrow — reserve this for text that's genuinely
   * clickable (a real onClick or href). Purely decorative titles/subtitles
   * get the underline only, since an arrow implies "click this" and
   * showing one on non-interactive text misleads visitors into clicking
   * something that does nothing.
   */
  showArrow?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children' | 'color'>;

/**
 * Hover-underline-reveal treatment for title-level text: an accent
 * underline (always) and a small arrow (only when showArrow is true)
 * slide in on hover, regardless of what color the wrapped text itself is
 * (so it works equally on an accent-colored link and a white heading).
 * Renders as an <a> when given an href, otherwise as a <span> — so it can
 * decorate non-navigational titles (headings, pillar titles) and text
 * already nested inside a <button> (emblem names, event titles) without
 * producing an anchor-in-button or a link that goes nowhere.
 */
export function AnimatedLink({
  children,
  className,
  href,
  color = 'cyan',
  accentColor,
  showArrow = false,
  ...rest
}: AnimatedLinkProps) {
  const accent = accentColor ?? ACCENT_COLORS[color];
  const wrapperClassName = cn('group/link relative inline-flex w-fit items-center gap-1.5', className);
  const content = (
    <>
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 transition-transform duration-300 ease-[var(--ease-roya)] group-hover/link:scale-x-100"
          style={{ backgroundColor: accent }}
        />
      </span>
      {showArrow && (
        <span
          aria-hidden="true"
          className="inline-block -translate-x-1 opacity-0 transition-[transform,opacity] duration-300 ease-[var(--ease-roya)] group-hover/link:translate-x-0 group-hover/link:opacity-100"
          style={{ color: accent }}
        >
          →
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={wrapperClassName} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <span className={wrapperClassName} {...rest}>
      {content}
    </span>
  );
}
