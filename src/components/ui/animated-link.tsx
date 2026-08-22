import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type AnimatedLinkProps = {
  children: ReactNode;
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'>;

/**
 * Hover-underline-reveal treatment for title-level text (cyan, hardcoded).
 * Renders as an <a> when given an href, otherwise as a <span> — so it can
 * decorate non-navigational titles (sponsor names, pillar titles) and text
 * already nested inside a <button> (emblem names, event titles) without
 * producing an anchor-in-button or a link that goes nowhere.
 */
export function AnimatedLink({ children, className, href, ...rest }: AnimatedLinkProps) {
  const linkClassName = cn('group/link relative inline-block w-fit text-cyan', className);
  const underline = (
    <span
      aria-hidden="true"
      className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-[var(--ease-roya)] group-hover/link:scale-x-100"
    />
  );

  if (href) {
    return (
      <a href={href} className={linkClassName} {...rest}>
        {children}
        {underline}
      </a>
    );
  }

  return (
    <span className={linkClassName} {...rest}>
      {children}
      {underline}
    </span>
  );
}
