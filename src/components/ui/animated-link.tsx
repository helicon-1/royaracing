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
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children' | 'color'>;

/**
 * Hover-underline-reveal treatment for title-level text: an accent
 * underline and a small arrow slide in on hover, regardless of what color
 * the wrapped text itself is (so it works equally on an accent-colored
 * link and a white heading). Renders as an <a> when given an href,
 * otherwise as a <span> — so it can decorate non-navigational titles
 * (headings, pillar titles) and text already nested inside a <button>
 * (emblem names, event titles) without producing an anchor-in-button or a
 * link that goes nowhere.
 */
export function AnimatedLink({
  children,
  className,
  href,
  color = 'cyan',
  ...rest
}: AnimatedLinkProps) {
  const accent = ACCENT_COLORS[color];
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
      <span
        aria-hidden="true"
        className="inline-block -translate-x-1 opacity-0 transition-[transform,opacity] duration-300 ease-[var(--ease-roya)] group-hover/link:translate-x-0 group-hover/link:opacity-100"
        style={{ color: accent }}
      >
        →
      </span>
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
