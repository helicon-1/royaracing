import bowtie from '@/assets/emblems/bowtie.svg';
import fanajeel from '@/assets/emblems/fanajeel-cup.svg';
import mamlakaTower from '@/assets/emblems/mamlaka-tower.svg';
import saudiEmblem from '@/assets/emblems/sadu-asterisk.svg';
import vision2030 from '@/assets/emblems/vision-2030.svg';
import { Logo } from './Logo';
import { AnimatedLink } from './ui/animated-link';

const SOCIALS = ['Instagram', 'X', 'LinkedIn', 'YouTube'];

const FOOTER_EMBLEMS = [
  { name: 'Sadu', src: bowtie },
  { name: 'Fanajeel', src: fanajeel },
  { name: 'Mamlaka Tower', src: mamlakaTower },
  { name: 'Saudi Emblem', src: saudiEmblem },
  { name: 'Vision 2030', src: vision2030 },
];

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
              <AnimatedLink className="label-mono text-[11px] text-paper/40">Contact</AnimatedLink>
              <a
                href="mailto:roya.racing2026@gmail.com"
                className="mt-3 block text-paper/80 transition-colors hover:text-cyan"
              >
                roya.racing2026@gmail.com
              </a>
              <p className="mt-1 text-paper/50">Riyadh, Saudi Arabia</p>
            </div>

            <div>
              <AnimatedLink className="label-mono text-[11px] text-paper/40">Follow</AnimatedLink>
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
          <div className="flex items-center gap-5">
            {FOOTER_EMBLEMS.map((emblem) => (
              <img
                key={emblem.name}
                src={emblem.src}
                alt=""
                aria-hidden="true"
                className="h-9 w-9 opacity-60"
              />
            ))}
          </div>
          <p className="label-mono text-[10px] text-paper/35">
            Roya Racing — Saudi STEM Racing, Professional Class — Riyadh, founded November 2025
          </p>
        </div>
      </div>
    </footer>
  );
}
