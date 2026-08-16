import bowtie from '@/assets/emblems/bowtie.svg';
import { Logo } from './Logo';

const SOCIALS = ['Instagram', 'X', 'LinkedIn', 'YouTube'];

export function Footer() {
  return (
    <footer className="relative border-t border-paper/10 px-6 py-16 md:px-10">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-12">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
          <div>
            <Logo className="text-2xl" />
            <p className="editorial mt-4 max-w-xs text-paper/60">
              Your Vision, Our Roya.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-16 gap-y-8 md:flex md:gap-16">
            <div>
              <p className="label-mono text-[11px] text-paper/40">Contact</p>
              <a
                href="mailto:roya.racing2026@gmail.com"
                className="mt-3 block text-paper/80 transition-colors hover:text-cyan"
              >
                roya.racing2026@gmail.com
              </a>
              <p className="mt-1 text-paper/50">Riyadh, Saudi Arabia</p>
            </div>

            <div>
              <p className="label-mono text-[11px] text-paper/40">Follow</p>
              <ul className="mt-3 space-y-2">
                {SOCIALS.map((s) => (
                  <li key={s}>
                    <span
                      className="text-paper/35"
                      title="Social link to be confirmed"
                    >
                      {s} <span className="label-mono text-[10px]">— TBC</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 border-t border-paper/10 pt-8 md:flex-row md:justify-between">
          <img src={bowtie} alt="" aria-hidden="true" className="h-5 w-5 opacity-60" />
          <p className="label-mono text-[10px] text-paper/35">
            Roya Racing — Saudi STEM Racing, Professional Class — Riyadh, founded November 2025
          </p>
        </div>
      </div>
    </footer>
  );
}
