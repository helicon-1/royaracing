import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type AnimatedLinkProps = {
  children: ReactNode;
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'>;

/**
 * Hover-underline-reveal treatment for title-level text: a cyan underline
 * and a small cyan arrow slide in on hover, regardless of what color the
 * wrapped text itself is (so it works equally on a cyan link and a white
 * heading). Renders as an <a> when given an href, otherwise as a <span> —
 * so it can decorate non-navigational titles (headings, pillar titles) and
 * text already nested inside a <button> (emblem names, event titles)
 * without producing an anchor-in-button or a link that goes nowhere.
 */
export function AnimatedLink({ children, className, href, ...rest }: AnimatedLinkProps) {
  const wrapperClassName = cn('group/link relative inline-flex w-fit items-center gap-1.5', className);
  const content = (
    <>
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-cyan transition-transform duration-300 ease-[var(--ease-roya)] group-hover/link:scale-x-100"
        />
      </span>
      <span
        aria-hidden="true"
        className="inline-block -translate-x-1 text-cyan opacity-0 transition-[transform,opacity] duration-300 ease-[var(--ease-roya)] group-hover/link:translate-x-0 group-hover/link:opacity-100"
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
