import { Section } from '@/components/Section';
import { RevealText } from '@/components/RevealText';
import { Reveal } from '@/components/Reveal';
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder';
import vision2030 from '@/assets/emblems/vision-2030.svg';

export function OurStory() {
  return (
    <Section id="story" className="relative px-6 py-32 md:px-10">
      <div className="mx-auto grid max-w-[1400px] items-stretch gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col">
          <p className="label-mono mb-6 text-cyan">01 — Our Story</p>
          <RevealText
            as="h2"
            text="A name chosen on purpose."
            className="text-4xl font-bold leading-[1.05] text-paper md:text-6xl"
          />

          <div className="mt-10 space-y-6 text-lg leading-relaxed text-paper/75">
            <p>
              Roya Racing is Saudi Arabia's entry in STEM Racing — known internationally as
              F1 in Schools — a competition where student teams design, manufacture and race
              miniature CO₂-powered Formula 1 cars, and are judged on engineering, project
              management, and how they present and fund their work. The team competes in the
              Professional Class, was founded in Riyadh in November 2025, and is built around
              a single goal: to become the first Saudi team to reach the STEM Racing World
              Finals podium.
            </p>
            <p>
              <span className="editorial text-cyan">"Roya"</span> (رؤية) is Arabic for{' '}
              <span className="text-paper">vision</span>. The team took the name deliberately —
              a direct nod to Saudi Vision 2030, the Kingdom's own long-term plan to diversify
              and modernize. Where Vision 2030 sets a national horizon, Roya applies that same
              ambition at team scale: building engineering capability, developing young talent,
              and representing Riyadh on a world stage.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <img src={vision2030} alt="Saudi Vision 2030" className="h-12 w-auto shrink-0" />
              <p className="label-mono text-[11px] text-paper/40">
                Saudi Vision 2030 — the national plan Roya's name is a direct nod to
              </p>
            </div>
          </div>
        </div>

        <Reveal className="flex flex-col gap-6">
          <PhotoPlaceholder label="Photo pending — workshop" className="flex-[1.2] w-full" />
          <PhotoPlaceholder
            label="Photo pending — team at work"
            className="flex-1 w-2/3 self-end"
            accent="var(--color-navy-light)"
          />
        </Reveal>
      </div>
    </Section>
  );
}
