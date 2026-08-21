import { GenerativeBackground } from '@/components/GenerativeBackground';
import { SkylineBackground } from '@/components/SkylineBackground';
import { CursorGlow } from '@/components/CursorGlow';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { Home } from '@/sections/Home';
import { Sponsors } from '@/sections/Sponsors';
import { OurStory } from '@/sections/OurStory';
import { Emblems } from '@/sections/Emblems';
import { Team } from '@/sections/Team';
import { CompetitionTimeline } from '@/sections/CompetitionTimeline';
import { Sustainability } from '@/sections/Sustainability';
import { AbsoluteRoya } from '@/sections/AbsoluteRoya';
import { Events } from '@/sections/Events';

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
        <Sponsors />
        <OurStory />
        <Emblems />
        <Team />
        <CompetitionTimeline />
        <Sustainability />
        <AbsoluteRoya />
        <Events />
      </main>
      <Footer />
    </>
  );
}

export default App;
