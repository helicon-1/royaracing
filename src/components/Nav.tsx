import { useState } from 'react';
import { Logo } from './Logo';
import { useAppStore } from '@/store/useAppStore';
import type { SectionId } from '@/lib/theme';

const LINKS: { id: SectionId; label: string }[] = [
  { id: 'story', label: 'Our Story' },
  { id: 'team', label: 'Team' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'sustainability', label: 'Sustainability' },
  { id: 'absolute-roya', label: 'Absolute Roya' },
  { id: 'events', label: 'Events' },
];

export function Nav() {
  const activeSection = useAppStore((s) => s.activeSection);
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        <a
          href="#home"
          className="text-paper transition-opacity duration-300 hover:opacity-80"
          onClick={() => setOpen(false)}
        >
          <Logo />
        </a>

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-7 label-mono text-[11px] text-paper/70">
            {LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`relative py-1 transition-colors duration-300 hover:text-paper ${
                    activeSection === link.id ? 'text-cyan' : ''
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-cyan transition-all duration-300 ${
                      activeSection === link.id ? 'w-full' : 'w-0'
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span
            className={`block h-px w-6 bg-paper transition-transform duration-300 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`}
          />
          <span
            className={`block h-px w-6 bg-paper transition-transform duration-300 ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`}
          />
        </button>
      </div>

      <div
        className={`overflow-hidden bg-navy/95 backdrop-blur-md transition-[max-height] duration-500 ease-[var(--ease-roya)] lg:hidden ${
          open ? 'max-h-[560px]' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col gap-1 px-6 pb-8">
          {LINKS.map((link) => (
            <li key={link.id} className="border-b border-paper/10">
              <a
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className={`block py-3 label-mono text-sm transition-colors duration-300 ${
                  activeSection === link.id ? 'text-cyan' : 'text-paper/70'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
