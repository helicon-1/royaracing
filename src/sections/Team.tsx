import { useEffect, useState } from 'react';
import { Section } from '@/components/Section';
import { RevealText } from '@/components/RevealText';
import { Reveal } from '@/components/Reveal';
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder';

interface Member {
  name: string;
  role: string;
}

const MEMBERS: Member[] = [
  { name: 'Ibrahim Alsharkh', role: 'Team Leader & Project Manager' },
  { name: 'Bayan Mashabi', role: 'Head of Enterprise' },
  { name: 'Nourah Alsabhan', role: 'Marketing Director' },
  { name: 'Abdullah Taher', role: 'Strategic Operations Manager' },
  { name: 'Ibrahim Taher', role: 'Design Engineer' },
  { name: 'Reema Alsadoon', role: 'Manufacturing Engineer' },
];

export function Team() {
  const [activeMember, setActiveMember] = useState<Member | null>(null);

  useEffect(() => {
    if (!activeMember) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveMember(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeMember]);

  return (
    <Section id="team" className="relative px-6 py-32 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <p className="label-mono mb-6 text-cyan">02 — Team</p>
        <RevealText
          as="h2"
          text="Six people, one goal."
          className="max-w-2xl text-4xl font-bold leading-[1.05] text-paper md:text-6xl"
        />
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/70">
          Click a member to hear them introduce themselves.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {MEMBERS.map((member, i) => (
            <Reveal key={member.name} delay={i * 70}>
              <button
                type="button"
                onClick={() => setActiveMember(member)}
                className="group w-full text-left transition-transform duration-300 ease-[var(--ease-roya)] hover:-translate-y-1.5"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden shadow-none transition-shadow duration-300 group-hover:shadow-[0_20px_40px_-12px_rgba(11,16,48,0.55)]">
                  <PhotoPlaceholder
                    label={`${member.name.split(' ')[0]} — pose A`}
                    className="absolute inset-0 h-full w-full transition-opacity duration-500 group-hover:opacity-0"
                  />
                  <PhotoPlaceholder
                    label={`${member.name.split(' ')[0]} — pose B`}
                    accent="var(--color-lime)"
                    className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>
                <p className="mt-4 min-h-[1.5em] text-lg font-semibold leading-tight text-paper transition-colors duration-300 group-hover:text-cyan">
                  {member.name}
                </p>
                <p className="label-mono mt-1.5 min-h-[2.4em] text-[11px] leading-snug text-paper/50">
                  {member.role}
                </p>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal delay={MEMBERS.length * 70 + 100}>
          <a
            href="#events"
            className="label-mono mt-16 inline-block text-[11px] text-cyan transition-colors duration-200 hover:text-paper"
          >
            Interested in being mentored by our team? Apply →
          </a>
        </Reveal>
      </div>

      {activeMember && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${activeMember.name} introduction`}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/85 px-6 backdrop-blur-sm"
          onClick={() => setActiveMember(null)}
        >
          <div
            className="w-full max-w-2xl bg-navy p-8 md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-2xl font-bold text-paper">{activeMember.name}</p>
                <p className="label-mono mt-1 text-[11px] text-cyan">{activeMember.role}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveMember(null)}
                aria-label="Close"
                className="label-mono text-paper/50 transition-colors hover:text-paper"
              >
                CLOSE
              </button>
            </div>

            <p className="editorial mt-6 text-paper/60">Full introduction coming soon.</p>

            <div className="mt-6 flex aspect-video w-full items-center justify-center border border-paper/10 bg-ink/40">
              <p className="label-mono text-paper/40">Video coming soon</p>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
