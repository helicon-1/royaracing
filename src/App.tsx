import { lazy, Suspense } from 'react';
import { GenerativeBackground } from '@/components/GenerativeBackground';
import { SkylineBackground } from '@/components/SkylineBackground';
import { CursorGlow } from '@/components/CursorGlow';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { Home } from '@/sections/Home';
import { OurStory } from '@/sections/OurStory';
import { Team } from '@/sections/Team';
import { CompetitionTimeline } from '@/sections/CompetitionTimeline';
import { Sustainability } from '@/sections/Sustainability';
import { PaddockTV } from '@/sections/PaddockTV';
import { AbsoluteRoya } from '@/sections/AbsoluteRoya';
import { Events } from '@/sections/Events';
import { Press } from '@/sections/Press';

const BuildYourLivery = lazy(() => import('@/sections/BuildYourLivery'));

function App() {
  useScrollProgress();

  return (
    <>
      <SkylineBackground />
      <GenerativeBackground />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-navy/70 via-navy/55 to-navy/85"
      />
      <CursorGlow />

      <Nav />

      <main>
        <Home />
        <OurStory />
        <Team />
        <CompetitionTimeline />
        <Sustainability />
        <PaddockTV />
        <AbsoluteRoya />
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center px-6 py-32 md:px-10">
              <p className="label-mono text-paper/40">Loading…</p>
            </div>
          }
        >
          <BuildYourLivery />
        </Suspense>
        <Events />
        <Press />
      </main>
      <Footer />
    </>
  );
}

export default App;
