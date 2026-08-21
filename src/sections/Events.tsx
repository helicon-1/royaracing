import { useState, type FormEvent } from 'react';
import { Section } from '@/components/Section';
import { RevealText } from '@/components/RevealText';
import { Reveal } from '@/components/Reveal';
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder';
import { TireRating } from '@/components/TireRating';

interface Opening {
  id: string;
  kind: 'event' | 'mentorship';
  label: string;
  meta: string;
}

const OPENINGS: Opening[] = [
  {
    id: 'mentorship',
    kind: 'mentorship',
    label: 'Mentoring Program',
    meta: 'Ongoing — apply anytime',
  },
];

interface Comment {
  name: string;
  appliedFor: string;
  rating: number;
  text: string;
}

const MAX_COMMENT_LEN = 240;

function sanitize(input: string) {
  return input.replace(/<[^>]*>/g, '').slice(0, MAX_COMMENT_LEN);
}

export function Events() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [rating, setRating] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [commentName, setCommentName] = useState('');
  const [appliedFor, setAppliedFor] = useState('');

  const selected = OPENINGS.find((o) => o.id === selectedId);

  function onSelect(id: string) {
    setSelectedId(id);
    setSubmitted(false);
  }

  function onApplySubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  function onCommentSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!commentText.trim() || !appliedFor.trim() || rating === 0) return;
    setComments((prev) => [
      {
        name: sanitize(commentName || 'Anonymous').slice(0, 60),
        appliedFor: sanitize(appliedFor).slice(0, 60),
        rating,
        text: sanitize(commentText),
      },
      ...prev,
    ]);
    setCommentText('');
    setCommentName('');
    setAppliedFor('');
    setRating(0);
  }

  return (
    <Section id="events" className="relative px-6 py-32 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <p className="label-mono mb-6 text-cyan">06 — Events</p>
        <RevealText
          as="h2"
          text="Come see the team."
          className="max-w-2xl text-4xl font-bold leading-[1.05] text-paper md:text-6xl"
        />

        {/* Get involved */}
        <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <p className="label-mono text-cyan">Get involved</p>
            <p className="mt-4 max-w-md text-paper/70">
              Public events, the mentoring program — every open way to get involved with Roya
              lives in one list. Pick one to apply.
            </p>
            <ul className="mt-8 divide-y divide-paper/10 border-t border-paper/10">
              {OPENINGS.map((opening) => (
                <li key={opening.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(opening.id)}
                    aria-pressed={selectedId === opening.id}
                    className={`flex w-full items-center justify-between gap-4 py-4 text-left transition-colors duration-200 ${
                      selectedId === opening.id ? 'text-cyan' : 'text-paper/85 hover:text-paper'
                    }`}
                  >
                    <span>
                      <span className="block">{opening.label}</span>
                      <span className="label-mono block text-[11px] text-paper/40">{opening.meta}</span>
                    </span>
                    <span aria-hidden="true" className="label-mono text-[11px]">
                      {selectedId === opening.id ? 'Selected' : 'Select →'}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-md text-sm text-paper/50">
              Volunteers, press, and participants get a certificate for their involvement, and
              getting involved can help toward joining a racing team next season.
            </p>
          </Reveal>

          <Reveal delay={120} className="border border-paper/10 p-8">
            {!selected ? (
              <p className="text-paper/50">Select an opening from the list to apply.</p>
            ) : submitted ? (
              <p className="text-paper/80">
                Thanks — we'll be in touch about {selected.label.toLowerCase()}.
              </p>
            ) : (
              <form key={selected.id} onSubmit={onApplySubmit} className="space-y-5">
                <p className="label-mono text-[11px] text-paper/40">
                  Applying to <span className="text-cyan">{selected.label}</span>
                </p>
                <div>
                  <label htmlFor="apply-name" className="label-mono text-[11px] text-paper/50">
                    Name
                  </label>
                  <input
                    id="apply-name"
                    required
                    className="mt-2 w-full border-b border-paper/20 bg-transparent py-2 text-paper outline-none transition-colors focus:border-cyan"
                  />
                </div>
                <div>
                  <label htmlFor="apply-contact" className="label-mono text-[11px] text-paper/50">
                    Contact (email)
                  </label>
                  <input
                    id="apply-contact"
                    type="email"
                    required
                    className="mt-2 w-full border-b border-paper/20 bg-transparent py-2 text-paper outline-none transition-colors focus:border-cyan"
                  />
                </div>
                {selected.kind === 'event' && (
                  <div>
                    <label htmlFor="apply-role" className="label-mono text-[11px] text-paper/50">
                      Role
                    </label>
                    <select
                      id="apply-role"
                      required
                      className="mt-2 w-full border-b border-paper/20 bg-transparent py-2 text-paper outline-none transition-colors focus:border-cyan"
                    >
                      <option className="bg-navy" value="">
                        Select one
                      </option>
                      <option className="bg-navy" value="participant">
                        Participant
                      </option>
                      <option className="bg-navy" value="volunteer">
                        Volunteer
                      </option>
                      <option className="bg-navy" value="press">
                        Press
                      </option>
                    </select>
                  </div>
                )}
                <div>
                  <label htmlFor="apply-note" className="label-mono text-[11px] text-paper/50">
                    Why do you want to apply?
                  </label>
                  <textarea
                    id="apply-note"
                    required
                    rows={3}
                    className="mt-2 w-full resize-none border-b border-paper/20 bg-transparent py-2 text-paper outline-none transition-colors focus:border-cyan"
                  />
                </div>
                <button
                  type="submit"
                  className="label-mono mt-2 border border-cyan px-6 py-3 text-[11px] text-cyan transition-colors duration-300 hover:bg-cyan hover:text-navy"
                >
                  Submit
                </button>
              </form>
            )}
          </Reveal>
        </div>

        {/* Past */}
        <div className="mt-28">
          <p className="label-mono text-cyan">Past</p>
          <Reveal as="div" className="mt-8 grid items-stretch gap-10 lg:grid-cols-[1fr_1fr]">
            <PhotoPlaceholder label="Photo pending — recap" className="h-full min-h-64 w-full" />
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-paper">Recap coming soon</h3>
              <p className="mt-3 max-w-md text-paper/70">
                Public results and a full recap will be posted here once available.
              </p>
            </div>
          </Reveal>

          <div className="mt-16">
            <p className="label-mono text-[11px] text-paper/40">Fan wall</p>
            <form onSubmit={onCommentSubmit} className="mt-4 space-y-4 border border-paper/10 p-6">
              <TireRating value={rating} onChange={setRating} />
              <input
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                placeholder="Name"
                maxLength={60}
                className="w-full border-b border-paper/20 bg-transparent py-2 text-paper outline-none transition-colors placeholder:text-paper/30 focus:border-cyan"
              />
              <input
                value={appliedFor}
                onChange={(e) => setAppliedFor(e.target.value)}
                placeholder="What did you attend or apply for? (e.g. Mentoring Program, Riyadh Regionals)"
                maxLength={60}
                className="w-full border-b border-paper/20 bg-transparent py-2 text-paper outline-none transition-colors placeholder:text-paper/30 focus:border-cyan"
              />
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="What did you think?"
                maxLength={MAX_COMMENT_LEN}
                rows={3}
                className="w-full resize-none border-b border-paper/20 bg-transparent py-2 text-paper outline-none transition-colors placeholder:text-paper/30 focus:border-cyan"
              />
              <button
                type="submit"
                className="label-mono border border-cyan px-6 py-2.5 text-[11px] text-cyan transition-colors duration-300 hover:bg-cyan hover:text-navy"
              >
                Post
              </button>
            </form>

            {comments.length > 0 && (
              <ul className="mt-6 divide-y divide-paper/10 border-t border-paper/10">
                {comments.map((c, i) => (
                  <li key={i} className="flex items-start justify-between gap-6 py-4">
                    <div>
                      <p className="text-paper/85">{c.name}</p>
                      <p className="label-mono mt-1 text-[10px] text-cyan">{c.appliedFor}</p>
                      <p className="mt-1 text-sm text-paper/60">{c.text}</p>
                    </div>
                    <TireRating value={c.rating} readOnly />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
