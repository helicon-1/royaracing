import { useState, type FormEvent } from 'react';
import { Section } from '@/components/Section';
import { RevealText } from '@/components/RevealText';
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder';
import { TireRating } from '@/components/TireRating';

interface Comment {
  name: string;
  rating: number;
  text: string;
}

const MAX_COMMENT_LEN = 240;

function sanitize(input: string) {
  return input.replace(/<[^>]*>/g, '').slice(0, MAX_COMMENT_LEN);
}

export function Events() {
  const [submitted, setSubmitted] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [rating, setRating] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [commentName, setCommentName] = useState('');

  function onRsvpSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  function onCommentSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!commentText.trim() || rating === 0) return;
    setComments((prev) => [
      { name: sanitize(commentName || 'Anonymous').slice(0, 60), rating, text: sanitize(commentText) },
      ...prev,
    ]);
    setCommentText('');
    setCommentName('');
    setRating(0);
  }

  return (
    <Section id="events" className="relative px-6 py-32 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <p className="label-mono mb-6 text-cyan">07 — Events</p>
        <RevealText
          as="h2"
          text="Come see the team."
          className="max-w-2xl text-4xl font-bold leading-[1.05] text-paper md:text-6xl"
        />

        {/* Upcoming */}
        <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="label-mono text-cyan">Upcoming</p>
            <p className="mt-4 text-paper/50">
              No upcoming public events are announced yet — check back soon.
            </p>
            <p className="mt-6 max-w-md text-paper/70">
              Volunteers, press, and participants get a certificate for their involvement, and
              getting involved can help toward joining a racing team next season.
            </p>
          </div>

          <div className="border border-paper/10 p-8">
            {submitted ? (
              <p className="text-paper/80">
                Thanks — we'll be in touch when the next event is confirmed.
              </p>
            ) : (
              <form onSubmit={onRsvpSubmit} className="space-y-5">
                <p className="label-mono text-[11px] text-paper/40">Get notified / apply to help</p>
                <div>
                  <label htmlFor="rsvp-name" className="label-mono text-[11px] text-paper/50">
                    Name
                  </label>
                  <input
                    id="rsvp-name"
                    required
                    className="mt-2 w-full border-b border-paper/20 bg-transparent py-2 text-paper outline-none transition-colors focus:border-cyan"
                  />
                </div>
                <div>
                  <label htmlFor="rsvp-contact" className="label-mono text-[11px] text-paper/50">
                    Contact (email)
                  </label>
                  <input
                    id="rsvp-contact"
                    type="email"
                    required
                    className="mt-2 w-full border-b border-paper/20 bg-transparent py-2 text-paper outline-none transition-colors focus:border-cyan"
                  />
                </div>
                <div>
                  <label htmlFor="rsvp-role" className="label-mono text-[11px] text-paper/50">
                    Role
                  </label>
                  <select
                    id="rsvp-role"
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
                <button
                  type="submit"
                  className="label-mono mt-2 border border-cyan px-6 py-3 text-[11px] text-cyan transition-colors duration-300 hover:bg-cyan hover:text-navy"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Past */}
        <div className="mt-28">
          <p className="label-mono text-cyan">Past</p>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1fr]">
            <PhotoPlaceholder label="Photo pending — recap" className="aspect-video w-full" />
            <div>
              <h3 className="text-2xl font-bold text-paper">Recap coming soon</h3>
              <p className="mt-3 max-w-md text-paper/70">
                Public results and a full recap will be posted here once available.
              </p>
            </div>
          </div>

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
