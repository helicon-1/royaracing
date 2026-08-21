import { Section } from '@/components/Section';
import { ScrollFlyIn } from '@/components/ui/hero-section-3';
import royaCar from '@/assets/hero/roya-car-placeholder.svg';

export function Home() {
  return (
    <Section id="home" className="w-full bg-navy">
      <ScrollFlyIn imageUrl={royaCar} imageAlt="Roya Racing car">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="font-heading text-md font-semibold uppercase tracking-widest text-paper">
            Welcome to Roya Racing
          </p>
          <h1 className="mt-2 text-5xl font-bold leading-tight text-cyan md:text-7xl">
            Your Vision, Our Roya
          </h1>
        </div>
      </ScrollFlyIn>
    </Section>
  );
}
