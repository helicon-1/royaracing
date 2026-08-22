import { Section } from '@/components/Section';
import { RevealText } from '@/components/RevealText';
import { Reveal } from '@/components/Reveal';
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder';

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
            <Reveal delay={100}>
              <p>
                Roya Racing is a Saudi team competing in STEM Racing — formerly known as F1 in
                Schools. Student teams design, build and race miniature CO₂-powered cars, judged
                as much on the business side — enterprise, marketing, and project management —
                as on the engineering itself. Founded in Riyadh in November 2025, the goal is
                simple: be the first Saudi team on the World Finals podium.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <p>
                <span className="editorial text-cyan">"Roya"</span> (رؤية) is Arabic for{' '}
                <span className="text-paper">vision</span> — a direct nod to Saudi Vision 2030.
                The mission: build real engineering and business skill, develop young talent, and
                put Roya Racing on the world stage.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal>
          <PhotoPlaceholder label="Photo pending — workshop" className="h-full min-h-96 w-full" />
        </Reveal>
      </div>
    </Section>
  );
}
