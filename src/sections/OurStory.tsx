import { Section } from '@/components/Section';
import { RevealText } from '@/components/RevealText';
import { Reveal } from '@/components/Reveal';
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder';
import { AnimatedLink } from '@/components/ui/animated-link';

export function OurStory() {
  return (
    <Section id="story" className="relative px-6 py-32 md:px-10">
      <div className="mx-auto grid max-w-[1400px] items-stretch gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col">
          <AnimatedLink color="white" className="label-mono mb-6 text-white">
            01 — Our Story
          </AnimatedLink>
          <h2 className="text-4xl font-bold leading-[1.05] text-paper md:text-6xl">
            <AnimatedLink color="white">
              <RevealText as="span" text="A name chosen on purpose." />
            </AnimatedLink>
          </h2>

          <div className="mt-10 space-y-6 text-lg leading-relaxed text-paper/75">
            <Reveal delay={100}>
              <p>
                Roya Racing is a Saudi team competing in STEM Racing — formerly known as F1 in
                Schools. Student teams design, build and race miniature CO₂-powered cars, judged
                across two separate categories: Engineering, and Enterprise — the business,
                marketing, and project management side of running the team. Founded in Riyadh in
                November 2025, aiming to become the first Saudi team to reach the World Finals
                podium.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <p>
                <span className="editorial text-white">"Roya"</span> (رؤية) is Arabic for{' '}
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
