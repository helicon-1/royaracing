import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Section } from '@/components/Section';
import { RevealText } from '@/components/RevealText';
import { Reveal } from '@/components/Reveal';
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder';
import { TireRating } from '@/components/TireRating';
import { AnimatedLink } from '@/components/ui/animated-link';
import sanadPlaque from '@/assets/events/sanad-plaque.jpg';
import sanadKidsWorkshop from '@/assets/events/sanad-kids-workshop.jpg';
import sanadTeamTalk from '@/assets/events/sanad-team-talk.jpg';
import sanadGuestbook from '@/assets/events/sanad-guestbook.jpg';
import sanadToteBags from '@/assets/events/sanad-tote-bags.jpg';

const MENTORSHIP_TRACKS = [
  'Marketing Mentorship',
  'Entrepreneurship Mentorship',
  'Project Management Mentorship',
  'Design & Engineering Mentorship',
  'Manufacturing Mentorship',
];

interface PastEvent {
  code: string;
  title: string;
  date: string;
  duration: string;
  description: string;
  /** Real photos, once supplied. Falls back to placeholder squares when absent. */
  photos?: string[];
}

interface UpcomingEvent {
  title: string;
  /** External application form (e.g. Google Forms) — the real submission happens there. */
  formUrl: string;
}

/** No upcoming events confirmed yet — the panel below shows the empty state until this fills in. */
const UPCOMING_EVENTS: UpcomingEvent[] = [];

const PAST_EVENTS: PastEvent[] = [
  {
    code: 'Event 1',
    title: 'Project RoyatNa',
    date: '27 January 2026, with NAF3, at 966 Innovation Hub',
    duration: 'Recap pending',
    description:
      "Roya's first STEM Racing event circuit, held for International Education Day in collaboration with NAF3, a student-led organization. The event moved through three stages: an immersive introduction to Project Management with hands-on activities, followed by Enterprise, then Engineering, each with its own explanation and activity, before closing with a live race. Free for all attendees; 50 students attended, with 25 returning participants.",
  },
  {
    code: 'Event 2',
    title: 'Royaneering with Giddam',
    date: '25 February 2026, with Giddam',
    duration: 'Recap pending',
    description:
      'A live online engineering seminar hosted with Giddam, a World Finals team that placed 9th globally. The session covered what engineering work on a STEM Racing car actually looks like, included a Q&A, and Giddam shared their own experiences as engineers. Free and fully online; 112 YouTube views on the recording.',
  },
  {
    code: 'Event 3',
    title: 'Royaneering with Roya, Round 1',
    date: '28 February 2026, in-person, at a school',
    duration: 'Recap pending',
    description:
      "An in-person engineering experience where students could ask Roya's engineers anything and get real answers, paired with a hands-on Fusion 360 session teaching students to design, model, and refine race car components. Spots were limited, making it an exclusive session. It's also the event that Round 2, the online Fusion 360 follow-up, was created in response to, by popular demand.",
  },
  {
    code: 'Event 4',
    title: 'Royaneering with Roya, Round 2',
    date: '12 March 2026, online',
    duration: 'Recap pending',
    description:
      "Following strong demand after the in-person Round 1 above, Roya hosted a second session, this time online, where the team's own engineers walked students through the process of designing a car in Fusion 360. Free and fully online; 15 participants.",
  },
  {
    code: 'Event 5',
    title: 'Roya X Sanad',
    date: '4 April 2026, with Itqan Attarbiah Schools, Sanad Organization',
    duration: 'Recap pending',
    description:
      'An event for children with cancer, where Roya helped them assemble mini cars from reused, cut wood pieces, and introduced them to what STEM Racing is. 150 attendees, including 50 children with cancer, supported by student volunteers.',
    photos: [sanadKidsWorkshop, sanadTeamTalk, sanadGuestbook, sanadToteBags, sanadPlaque],
  },
  {
    code: 'Event 6',
    title: 'Roya X VOC Debates',
    date: 'Date to be confirmed, at 966 Innovation Hub, with VOC',
    duration: 'Recap pending',
    description: 'An Oxford Union-style debate event, held at 966 Innovation Hub in collaboration with VOC.',
  },
];

function MentorshipPanel() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="flex h-full flex-col rounded-xl border border-paper/15 bg-paper/[0.04] p-8 backdrop-blur-sm">
      <AnimatedLink color="lime" className="label-mono text-sm font-bold text-lime">
        Mentoring Program
      </AnimatedLink>
      <div className="mt-3 text-2xl font-bold text-paper">
        <AnimatedLink color="lime">Get mentored by the team</AnimatedLink>
      </div>
      <p className="mt-3 text-paper/70">
        Ongoing, apply anytime. Those who take part receive a certificate of participation, and
        involvement can help toward joining a STEM Racing team next season.
      </p>

      {submitted ? (
        <p className="mt-6 text-paper/80">Thanks, we'll be in touch about the mentoring program.</p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          <div>
            <label htmlFor="mentor-name" className="label-mono text-[11px] text-paper/50">
              Name
            </label>
            <input
              id="mentor-name"
              required
              className="mt-2 w-full border-b border-paper/20 bg-transparent py-2 text-paper outline-none transition-colors focus:border-lime"
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
              className="mt-2 w-full border-b border-paper/20 bg-transparent py-2 text-paper outline-none transition-colors focus:border-lime"
            />
          </div>
          <div>
            <label htmlFor="mentor-level" className="label-mono text-[11px] text-paper/50">
              Academic level
            </label>
            <select
              id="mentor-level"
              required
              defaultValue=""
              className="mt-2 w-full border-b border-paper/20 bg-transparent py-2 text-paper outline-none transition-colors focus:border-lime"
            >
              <option className="bg-navy text-paper" value="" disabled>
                Select one
              </option>
              <option className="bg-navy text-paper" value="high-school">
                High School
              </option>
              <option className="bg-navy text-paper" value="university">
                University
              </option>
            </select>
          </div>
          <div>
            <label htmlFor="mentor-track" className="label-mono text-[11px] text-paper/50">
              Which mentorship track?
            </label>
            <select
              id="mentor-track"
              required
              defaultValue=""
              className="mt-2 w-full border-b border-paper/20 bg-transparent py-2 text-paper outline-none transition-colors focus:border-lime"
            >
              <option className="bg-navy text-paper" value="" disabled>
                Select one
              </option>
              {MENTORSHIP_TRACKS.map((track) => (
                <option key={track} className="bg-navy text-paper" value={track}>
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
              className="mt-2 w-full resize-none border-b border-paper/20 bg-transparent py-2 text-paper outline-none transition-colors focus:border-lime"
            />
          </div>
          <button
            type="submit"
            className="label-mono mt-2 border border-lime px-6 py-3 text-[11px] text-lime transition-colors duration-300 hover:bg-lime hover:text-navy"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

function RegistryOfInterestPanel() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="flex h-full flex-col rounded-xl border border-paper/15 bg-paper/[0.04] p-8 backdrop-blur-sm">
      <AnimatedLink color="lime" className="label-mono text-sm font-bold text-lime">
        Registry of Interest
      </AnimatedLink>
      <div className="mt-3 text-2xl font-bold text-paper">
        <AnimatedLink color="lime">Stay in the loop</AnimatedLink>
      </div>
      <p className="mt-3 text-paper/70">
        Not tied to any specific event, tell us who you are, and we'll reach out when something's
        scheduled.
      </p>

      {submitted ? (
        <p className="mt-6 text-paper/80">Thanks, we'll be in touch.</p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          <div>
            <label htmlFor="roi-name" className="label-mono text-[11px] text-paper/50">
              Name
            </label>
            <input
              id="roi-name"
              required
              className="mt-2 w-full border-b border-paper/20 bg-transparent py-2 text-paper outline-none transition-colors focus:border-lime"
            />
          </div>
          <div>
            <label htmlFor="roi-email" className="label-mono text-[11px] text-paper/50">
              Email
            </label>
            <input
              id="roi-email"
              type="email"
              required
              className="mt-2 w-full border-b border-paper/20 bg-transparent py-2 text-paper outline-none transition-colors focus:border-lime"
            />
          </div>
          <div>
            <label htmlFor="roi-level" className="label-mono text-[11px] text-paper/50">
              Academic level
            </label>
            <select
              id="roi-level"
              required
              defaultValue=""
              className="mt-2 w-full border-b border-paper/20 bg-transparent py-2 text-paper outline-none transition-colors focus:border-lime"
            >
              <option className="bg-navy text-paper" value="" disabled>
                Select one
              </option>
              <option className="bg-navy text-paper" value="high-school">
                High School
              </option>
              <option className="bg-navy text-paper" value="university">
                University
              </option>
            </select>
          </div>
          <button
            type="submit"
            className="label-mono mt-2 border border-lime px-6 py-3 text-[11px] text-lime transition-colors duration-300 hover:bg-lime hover:text-navy"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

function ApplyToEventPanel() {
  const hasEvents = UPCOMING_EVENTS.length > 0;

  function onSelect(e: ChangeEvent<HTMLSelectElement>) {
    const url = e.target.value;
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="flex h-full flex-col rounded-xl border border-paper/15 bg-paper/[0.04] p-8 backdrop-blur-sm">
      <AnimatedLink color="lime" className="label-mono text-sm font-bold text-lime">
        Event Application
      </AnimatedLink>
      <div className="mt-3 text-2xl font-bold text-paper">
        <AnimatedLink color="lime">
          {hasEvents ? 'Come to one of our upcoming events!' : 'No events scheduled yet'}
        </AnimatedLink>
      </div>

      {hasEvents ? (
        <>
          <p className="mt-3 text-paper/70">
            Pick an event below; you'll be taken to its application form.
          </p>
          <div className="mt-6">
            <label htmlFor="upcoming-event" className="label-mono text-[11px] text-paper/50">
              Which event?
            </label>
            <select
              id="upcoming-event"
              defaultValue=""
              onChange={onSelect}
              className="mt-2 w-full border-b border-paper/20 bg-transparent py-2 text-paper outline-none transition-colors focus:border-lime"
            >
              <option className="bg-navy text-paper" value="" disabled>
                Select one
              </option>
              {UPCOMING_EVENTS.map((ev) => (
                <option key={ev.title} className="bg-navy text-paper" value={ev.formUrl}>
                  {ev.title}
                </option>
              ))}
            </select>
          </div>
        </>
      ) : (
        <p className="mt-3 text-paper/70">
          Sorry, we don't have any upcoming events right now, join our Registry of Interest above
          to hear from us when something's scheduled.
        </p>
      )}
    </div>
  );
}

function PastEventsList() {
  const [openTitle, setOpenTitle] = useState<string | null>(null);
  const [hoveredTitle, setHoveredTitle] = useState<string | null>(null);

  return (
    <ul className="divide-y divide-paper/10 border-t border-paper/10">
      {PAST_EVENTS.map((event) => {
        const isOpen = openTitle === event.title;
        // Hovering looks identical to the open state — same lime box,
        // same navy text — matching Absolute Roya's episode rows.
        const active = isOpen || hoveredTitle === event.title;
        return (
          <li key={event.title}>
            <button
              type="button"
              onClick={() => setOpenTitle(isOpen ? null : event.title)}
              onMouseEnter={() => setHoveredTitle(event.title)}
              onMouseLeave={() => setHoveredTitle(null)}
              aria-expanded={isOpen}
              className={`group flex w-full items-center justify-between gap-6 px-2 py-6 text-left transition-colors duration-300 ${
                active ? 'bg-lime text-navy' : ''
              }`}
            >
              <span className="flex items-center gap-5">
                <PhotoPlaceholder
                  label=""
                  className="h-12 w-12 shrink-0"
                  accent={active ? 'var(--color-navy)' : 'var(--color-lime)'}
                />
                <span className="flex flex-col gap-1">
                  <span className="label-mono text-[11px] opacity-50">{event.code}</span>
                  <AnimatedLink
                    color="lime"
                    accentColor={active ? 'var(--color-navy)' : undefined}
                    showArrow
                    className="text-2xl font-semibold transition-transform duration-300 group-hover:translate-x-1 md:text-3xl"
                  >
                    {event.title}
                  </AnimatedLink>
                  <span className="label-mono text-[11px] opacity-50">{event.date}</span>
                  <span className="text-sm opacity-60">{event.description}</span>
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-4">
                <span className="label-mono text-[11px] opacity-50">{event.duration}</span>
                <span className={`label-mono text-[11px] ${active ? 'text-navy/60' : 'text-lime'}`}>
                  {isOpen ? 'CLOSE' : 'VIEW'}
                </span>
              </span>
            </button>
            <div
              className={`overflow-hidden transition-[max-height] duration-500 ease-[var(--ease-roya)] ${
                isOpen ? 'max-h-[1000px]' : 'max-h-0'
              }`}
            >
              <div className="grid grid-cols-3 gap-3 py-4">
                {event.photos
                  ? event.photos.map((photo, i) => (
                      <img
                        key={photo}
                        src={photo}
                        alt={`${event.title}, photo ${i + 1}`}
                        className="aspect-square w-full object-cover"
                      />
                    ))
                  : [0, 1, 2].map((i) => (
                      <PhotoPlaceholder
                        key={i}
                        label={`Photo pending, ${event.title}`}
                        className="aspect-square w-full"
                      />
                    ))}
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
        <AnimatedLink color="lime" className="label-mono mb-6 text-lime">
          06: Events
        </AnimatedLink>
        <h2 className="max-w-2xl text-4xl font-bold leading-[1.05] text-paper md:text-6xl">
          <AnimatedLink color="lime">
            <RevealText as="span" text="Come see the team." />
          </AnimatedLink>
        </h2>

        {/* Get involved — mentorship stays a distinct path on its own; the
            registry and event-application boxes are a matched pair. */}
        <div className="mt-20">
          <AnimatedLink color="lime" className="label-mono text-lime">
            Get Involved
          </AnimatedLink>
          <div className="mt-8 grid items-stretch gap-10 lg:grid-cols-2">
            <Reveal className="h-full">
              <MentorshipPanel />
            </Reveal>
            <div className="flex h-full flex-col gap-10">
              <Reveal delay={120} className="flex-1">
                <RegistryOfInterestPanel />
              </Reveal>
              <Reveal delay={200} className="flex-1">
                <ApplyToEventPanel />
              </Reveal>
            </div>
          </div>
        </div>

        {/* Past events — same visual pattern as the Absolute Roya episode list */}
        <div className="mt-28">
          <AnimatedLink color="lime" className="label-mono text-lime">
            Past Events
          </AnimatedLink>
          <Reveal as="div" className="mt-8">
            <PastEventsList />
          </Reveal>

          <div className="mt-16">
            <AnimatedLink color="lime" className="label-mono text-lime">
              Fan wall
            </AnimatedLink>
            <p className="mt-2 max-w-lg text-paper/60">
              Attended an event or joined our mentoring program? Rate it and share your thoughts.
            </p>
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
                className="w-full border-b border-paper/20 bg-transparent py-2 text-lg text-paper outline-none transition-colors placeholder:text-paper/30 focus:border-lime"
              />
              <div>
                <label htmlFor="fan-kind" className="label-mono text-[11px] text-paper/50">
                  What did you attend or apply for?
                </label>
                <select
                  id="fan-kind"
                  value={appliedForKind}
                  onChange={(e) => onKindChange(e.target.value as AppliedForKind)}
                  className="mt-2 w-full border-b border-paper/20 bg-transparent py-2 text-paper outline-none transition-colors focus:border-lime"
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
                    className="mt-2 w-full border-b border-paper/20 bg-transparent py-2 text-paper outline-none transition-colors focus:border-lime"
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
                className="w-full resize-none border-b border-paper/20 bg-transparent py-2 text-lg text-paper outline-none transition-colors placeholder:text-paper/30 focus:border-lime"
              />
              <button
                type="submit"
                className="label-mono border border-lime px-6 py-2.5 text-[11px] text-lime transition-colors duration-300 hover:bg-lime hover:text-navy"
              >
                Post
              </button>
            </form>

            {comments.length > 0 && (
              <ul className="mt-6 divide-y divide-paper/10 border-t border-paper/10">
                {comments.map((c, i) => (
                  <li key={i} className="flex items-start justify-between gap-6 py-4">
                    <div>
                      <p className="text-lg font-semibold text-paper/85">{c.name}</p>
                      <p className="label-mono mt-1 text-[10px] text-lime">{c.appliedFor}</p>
                      <p className="mt-1 text-paper/60">{c.text}</p>
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
