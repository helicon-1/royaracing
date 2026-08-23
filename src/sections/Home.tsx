import { Section } from '@/components/Section';
import { ScrollFlyIn } from '@/components/ui/hero-section-3';
import { AnimatedLink } from '@/components/ui/animated-link';
import royaCar from '@/assets/hero/roya-car-placeholder.svg';

export function Home() {
  return (
    <Section id="home" className="w-full">
      <ScrollFlyIn imageUrl={royaCar} imageAlt="Roya Racing car">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <AnimatedLink
            color="cyan"
            className="font-heading text-md justify-center font-semibold uppercase tracking-widest text-paper"
          >
            Welcome to Roya Racing
          </AnimatedLink>
          <h1 className="mt-2 text-6xl font-bold leading-tight text-cyan md:text-8xl">
            Your Vision
            <br />
            Our Roya
          </h1>
          <p className="font-heading mt-4 text-sm font-normal text-paper/60 md:text-base">
            A Saudi STEM Racing team, built in Riyadh — aiming to become the first Saudi team to
            reach the World Finals podium.
          </p>
        </div>
      </ScrollFlyIn>
    </Section>
  );
}
