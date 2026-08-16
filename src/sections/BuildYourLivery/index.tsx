import { lazy, Suspense, useState } from 'react';
import { Section } from '@/components/Section';
import { RevealText } from '@/components/RevealText';
import { Scene } from './Scene';
import { LiveryEditor } from './LiveryEditor';
import { Sponsors } from './Sponsors';
import { FanWall } from './FanWall';
import { useLiveryStore } from './store';

const RaceMode = lazy(() => import('./RaceMode').then((m) => ({ default: m.RaceMode })));

type Tab = 'build' | 'race';

export function BuildYourLivery() {
  const [tab, setTab] = useState<Tab>('build');
  const [resetSignal, setResetSignal] = useState(0);
  const setSelectedZone = useLiveryStore((s) => s.setSelectedZone);
  const resetLivery = useLiveryStore((s) => s.reset);

  return (
    <Section id="livery" className="relative px-6 py-32 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <p className="label-mono mb-6 text-lime">09 — Build Your Livery</p>
        <RevealText
          as="h2"
          text="Design your car. Race it."
          className="max-w-2xl text-4xl font-bold leading-[1.05] text-paper md:text-6xl"
        />
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/70">
          Color the nose cone, sidepods and wings, then take it onto a short track against an
          AI opponent.
        </p>

        <div className="mt-10 flex gap-2">
          <button
            type="button"
            onClick={() => setTab('build')}
            className={`label-mono border px-6 py-2.5 text-[11px] transition-colors duration-200 ${
              tab === 'build' ? 'border-lime bg-lime text-navy' : 'border-paper/20 text-paper/60 hover:text-paper'
            }`}
          >
            Build
          </button>
          <button
            type="button"
            onClick={() => setTab('race')}
            className={`label-mono border px-6 py-2.5 text-[11px] transition-colors duration-200 ${
              tab === 'race' ? 'border-lime bg-lime text-navy' : 'border-paper/20 text-paper/60 hover:text-paper'
            }`}
          >
            Race Mode
          </button>
        </div>

        {tab === 'build' ? (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div className="aspect-[4/3] w-full overflow-hidden border border-paper/10 bg-[#10173d]">
              <Scene onSelectZone={setSelectedZone} resetSignal={resetSignal} />
            </div>
            <LiveryEditor
              onReset={() => {
                resetLivery();
                setResetSignal((n) => n + 1);
              }}
            />
          </div>
        ) : (
          <div className="mt-10">
            <Suspense
              fallback={
                <div className="flex aspect-[16/9] w-full items-center justify-center border border-paper/10 bg-[#10173d]">
                  <p className="label-mono text-paper/40">Loading race mode…</p>
                </div>
              }
            >
              <RaceMode />
            </Suspense>
          </div>
        )}

        <div className="mt-24">
          <p className="label-mono mb-6 text-lime">Fan Livery Wall</p>
          <FanWall />
        </div>

        <div className="mt-24">
          <p className="label-mono mb-6 text-lime">Sponsors</p>
          <Sponsors />
        </div>
      </div>
    </Section>
  );
}

export default BuildYourLivery;
