import { useState, type FormEvent } from 'react';
import { Section } from '@/components/Section';
import { RevealText } from '@/components/RevealText';
import { Reveal } from '@/components/Reveal';
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder';
import { TireRating } from '@/components/TireRating';
import { AnimatedLink } from '@/components/ui/animated-link';

const MENTORSHIP_TRACKS = [
  'Marketing Mentorship',
  'Entrepreneurship Mentorship',
  'Project Management Mentorship',
  'Design & Engineering Mentorship',
  'Manufacturing Mentorship',
];

interface PastEvent {
  title: string;
  date: string;
  duration: string;
  description: string;
}

const PAST_EVENTS: PastEvent[] = [
  {
    title: 'Event 1',
    date: 'Date pending',
    duration: 'Recap pending',
    description: 'Details and photos pending — check back after the event is confirmed.',
  },
  {
    title: 'Event 2',
    date: 'Date pending',
    duration: 'Recap pending',
    description: 'Details and photos pending — check back after the event is confirmed.',
  },
  {
    title: 'Event 3',
    date: 'Date pending',
    duration: 'Recap pending',
    description: 'Details and photos pending — check back after the event is confirmed.',
  },
];

function MentorshipPanel() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="border border-paper/10 p-8">
      <p className="label-mono text-[11px] text-cyan">Mentoring Program</p>
      <p className="mt-3 text-2xl font-bold text-paper">Get mentored by the team</p>
      <p className="mt-3 text-paper/70">
        Ongoing — apply anytime. Those who take part receive a certificate of participation, and
        involvement can help toward joining a STEM Racing team next season.
      </p>

      {submitted ? (
        <p className="mt-6 text-paper/80">Thanks — we'll be in touch about the mentoring program.</p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          <div>
            <label htmlFor="mentor-name" className="label-mono text-[11px] text-paper/50">
              Name
            </label>
            <input
              id="mentor-name"
              required
              className="mt-2 w-full border-b border-paper/20 bg-transparent py-2 text-paper outline-none transition-colors focus:border-cyan"
            />
          </div>
          <div>
            <label htmlFor="mentor-contact" className="label-mono text-[11px] text-paper/50">
              Contact (email)
            </label>
            <input
              id="mentor-contact"
              type="email"
              required
              className="mt-2 w-full border-b border-paper/20 bg-transparent py-2 text-paper outline-none transition-colors focus:border-cyan"
            />
          </div>
          <div>
            <label htmlFor="mentor-age" className="label-mono text-[11px] text-paper/50">
              Age / grade
            </label>
            <input
              id="mentor-age"
              required
              placeholder="e.g. 16 / Grade 11"
              className="mt-2 w-full border-b border-paper/20 bg-transparent py-2 text-paper outline-none transition-colors placeholder:text-paper/30 focus:border-cyan"
            />
          </div>
          <div>
            <label htmlFor="mentor-track" className="label-mono text-[11px] text-paper/50">
              Which mentorship track?
            </label>
            <select
              id="mentor-track"
              required
              defaultValue=""
              className="mt-2 w-full border-b border-paper/20 bg-transparent py-2 text-paper outline-none transition-colors focus:border-cyan"
            >
              <option className="bg-navy" value="" disabled>
                Select one
              </option>
              {MENTORSHIP_TRACKS.map((track) => (
                <option key={track} className="bg-navy" value={track}>
                  {track}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="mentor-note" className="label-mono text-[11px] text-paper/50">
              Why do you want to apply?
            </label>
            <textarea
              id="mentor-note"
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
    </div>
  );
}

function EventApplicationPanel() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="border border-paper/10 p-8">
      <p className="label-mono text-[11px] text-cyan">Event Application</p>
      <p className="mt-3 text-2xl font-bold text-paper">Apply to an upcoming event</p>
      <p className="mt-3 text-paper/70">
        No public events are scheduled yet — apply below and we'll reach out when one is
        confirmed.
      </p>

      {submitted ? (
        <p className="mt-6 text-paper/80">Thanks — we'll be in touch when an event is confirmed.</p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          <div>
            <label htmlFor="event-name" className="label-mono text-[11px] text-paper/50">
              Name
            </label>
            <input
              id="event-name"
              required
              className="mt-2 w-full border-b border-paper/20 bg-transparent py-2 text-paper outline-none transition-colors focus:border-cyan"
            />
          </div>
          <div>
            <label htmlFor="event-contact" className="label-mono text-[11px] text-paper/50">
              Contact (email)
            </label>
            <input
              id="event-contact"
              type="email"
              required
              className="mt-2 w-full border-b border-paper/20 bg-transparent py-2 text-paper outline-none transition-colors focus:border-cyan"
            />
          </div>
          <div>
            <label htmlFor="event-age" className="label-mono text-[11px] text-paper/50">
              Age / grade
            </label>
            <input
              id="event-age"
              required
              placeholder="e.g. 16 / Grade 11"
              className="mt-2 w-full border-b border-paper/20 bg-transparent py-2 text-paper outline-none transition-colors placeholder:text-paper/30 focus:border-cyan"
            />
          </div>
          <div>
            <label htmlFor="event-role" className="label-mono text-[11px] text-paper/50">
              Role
            </label>
            <select
              id="event-role"
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
          <div>
            <label htmlFor="event-note" className="label-mono text-[11px] text-paper/50">
              Why do you want to apply?
            </label>
            <textarea
              id="event-note"
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
    </div>
  );
}

function PastEventsList() {
  const [openTitle, setOpenTitle] = useState<string | null>(null);

  return (
    <ul className="divide-y divide-paper/10 border-t border-paper/10">
      {PAST_EVENTS.map((event) => {
        const isOpen = openTitle === event.title;
        return (
          <li key={event.title}>
            <button
              type="button"
              onClick={() => setOpenTitle(isOpen ? null : event.title)}
              aria-expanded={isOpen}
              className={`group flex w-full items-center justify-between gap-6 px-2 py-6 text-left transition-colors duration-300 ${
                isOpen ? 'bg-paper text-navy' : 'hover:bg-paper hover:text-navy'
              }`}
            >
              <span className="flex items-center gap-5">
                <PhotoPlaceholder
                  label=""
                  className="h-12 w-12 shrink-0"
                  accent={isOpen ? 'var(--color-navy)' : 'var(--color-cyan)'}
                />
                <span className="flex flex-col gap-1">
                  <span className="label-mono text-[11px] opacity-50">{event.date}</span>
                  <AnimatedLink className="text-2xl font-semibold transition-transform duration-300 group-hover:translate-x-1 md:text-3xl">
                    {event.title}
                  </AnimatedLink>
                  <span className="text-sm opacity-60">{event.description}</span>
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-4">
                <span className="label-mono text-[11px] opacity-50">{event.duration}</span>
                <span className="label-mono text-[11px] opacity-50">{isOpen ? 'CLOSE' : 'VIEW'}</span>
              </span>
            </button>
            <div
              className={`overflow-hidden transition-[max-height] duration-500 ease-[var(--ease-roya)] ${
                isOpen ? 'max-h-[400px]' : 'max-h-0'
              }`}
            >
              <div className="grid grid-cols-3 gap-3 py-4">
                <PhotoPlaceholder label="Photo pending" className="aspect-square w-full" />
                <PhotoPlaceholder label="Photo pending" className="aspect-square w-full" />
                <PhotoPlaceholder label="Photo pending" className="aspect-square w-full" />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

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

type AppliedForKind = '' | 'mentorship' | 'event';

export function Events() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [rating, setRating] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [commentName, setCommentName] = useState('');
  const [appliedForKind, setAppliedForKind] = useState<AppliedForKind>('');
  const [appliedForValue, setAppliedForValue] = useState('');

  const appliedForOptions = appliedForKind === 'mentorship' ? MENTORSHIP_TRACKS : PAST_EVENTS.map((e) => e.title);

  function onKindChange(kind: AppliedForKind) {
    setAppliedForKind(kind);
    setAppliedForValue('');
  }

  function onCommentSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!commentText.trim() || !appliedForValue || rating === 0) return;
    setComments((prev) => [
      {
        name: sanitize(commentName || 'Anonymous').slice(0, 60),
        appliedFor: appliedForValue,
        rating,
        text: sanitize(commentText),
      },
      ...prev,
    ]);
    setCommentText('');
    setCommentName('');
    setAppliedForKind('');
    setAppliedForValue('');
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

        {/* Get involved — two distinct paths, not one blended flow */}
        <div className="mt-20">
          <p className="label-mono text-cyan">Get Involved</p>
          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            <Reveal>
              <MentorshipPanel />
            </Reveal>
            <Reveal delay={120}>
              <EventApplicationPanel />
            </Reveal>
          </div>
        </div>

        {/* Past events — same visual pattern as the Absolute Roya episode list */}
        <div className="mt-28">
          <p className="label-mono text-cyan">Past Events</p>
          <Reveal as="div" className="mt-8">
            <PastEventsList />
          </Reveal>

          <div className="mt-16">
            <p className="label-mono text-[11px] text-paper/40">Fan wall</p>
            <form onSubmit={onCommentSubmit} className="mt-4 space-y-4 border border-paper/10 p-6">
              <div>
                <TireRating value={rating} onChange={setRating} />
                <p className="label-mono mt-1 text-[10px] text-paper/35">Rated out of 5 tires</p>
              </div>
              <input
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                placeholder="Name"
                maxLength={60}
                className="w-full border-b border-paper/20 bg-transparent py-2 text-paper outline-none transition-colors placeholder:text-paper/30 focus:border-cyan"
              />
              <div>
                <label htmlFor="fan-kind" className="label-mono text-[11px] text-paper/50">
                  What did you attend or apply for?
                </label>
                <select
                  id="fan-kind"
                  value={appliedForKind}
                  onChange={(e) => onKindChange(e.target.value as AppliedForKind)}
                  className="mt-2 w-full border-b border-paper/20 bg-transparent py-2 text-paper outline-none transition-colors focus:border-cyan"
                >
                  <option className="bg-navy" value="">
                    Select one
                  </option>
                  <option className="bg-navy" value="mentorship">
                    Mentorship
                  </option>
                  <option className="bg-navy" value="event">
                    Event
                  </option>
                </select>
              </div>
              {appliedForKind && (
                <div>
                  <label htmlFor="fan-which" className="label-mono text-[11px] text-paper/50">
                    Which {appliedForKind === 'mentorship' ? 'track' : 'event'}?
                  </label>
                  <select
                    id="fan-which"
                    value={appliedForValue}
                    onChange={(e) => setAppliedForValue(e.target.value)}
                    className="mt-2 w-full border-b border-paper/20 bg-transparent py-2 text-paper outline-none transition-colors focus:border-cyan"
                  >
                    <option className="bg-navy" value="">
                      Select one
                    </option>
                    {appliedForOptions.map((option) => (
                      <option key={option} className="bg-navy" value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              )}
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
