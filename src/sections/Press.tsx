import { Section } from '@/components/Section';
import { RevealText } from '@/components/RevealText';
import fanajeel from '@/assets/emblems/fanajeel-cup.svg';

export function Press() {
  return (
    <Section id="press" className="relative px-6 py-32 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <p className="label-mono mb-6 text-cyan">08 — Press</p>
        <RevealText
          as="h2"
          text="Recognition."
          className="max-w-2xl text-4xl font-bold leading-[1.05] text-paper md:text-6xl"
        />

        <div className="mt-16 flex flex-col items-start gap-8 border border-cyan/30 bg-cyan/[0.05] p-10 md:flex-row md:items-center md:gap-12">
          <img src={fanajeel} alt="" aria-hidden="true" className="h-20 w-auto shrink-0" />
          <div>
            <p className="label-mono text-cyan">2025 — Riyadh</p>
            <h3 className="mt-2 text-3xl font-bold text-paper">CSR Award</h3>
            <p className="mt-3 max-w-xl text-paper/70">
              Roya Racing received the CSR Award in Riyadh in 2025, recognizing the team's
              community-facing work alongside its engineering program.
            </p>
          </div>
        </div>

        <div className="mt-20">
          <p className="label-mono text-[11px] text-paper/40">Coverage</p>
          <div className="mt-6 border-t border-paper/10 py-10 text-center">
            <p className="text-paper/50">No press coverage published yet — check back soon.</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
