import { Section } from '@/components/Section';
import { RevealText } from '@/components/RevealText';
import sadu from '@/assets/emblems/sadu-asterisk.svg';

export function Home() {
  return (
    <Section
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-end px-6 pb-20 pt-40 md:px-10 md:pb-28"
    >
      <img
        src={sadu}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-28 h-16 w-16 opacity-40 md:right-10 md:h-24 md:w-24"
      />

      <div className="max-w-4xl">
        <p className="label-mono mb-6 text-cyan">Saudi STEM Racing — Professional Class — Riyadh</p>

        <RevealText
          as="h1"
          text="Roya Racing"
          className="text-[13vw] font-bold leading-[0.95] text-paper md:text-[7.5rem]"
        />

        <p className="editorial mt-8 max-w-xl text-2xl text-cyan md:text-3xl">
          Your Vision, Our Roya
        </p>

        <p className="mt-8 max-w-xl text-balance text-base leading-relaxed text-paper/70 md:text-lg">
          Roya — Arabic for <span className="text-paper">vision</span> — is Saudi Arabia's
          entry in STEM Racing (F1 in Schools), a global competition where student teams
          design, engineer and race miniature CO₂-powered F1 cars. Founded in Riyadh in
          November 2025, Roya Racing's mission is to become the first Saudi team to reach
          the STEM Racing World Finals podium — a direct expression of Saudi Vision 2030.
        </p>
      </div>

      <a
        href="#story"
        className="group mt-16 inline-flex w-fit items-center gap-3 label-mono text-paper/50 transition-colors duration-300 hover:text-cyan"
      >
        Scroll to begin
        <span className="block h-8 w-px bg-current transition-transform duration-300 group-hover:translate-y-1" />
      </a>
    </Section>
  );
}
