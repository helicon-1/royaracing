import { getDb, isFirebaseConfigured } from '@/lib/firebase';
import type { ZoneStyle, ZoneId } from './store';

export interface LiveryEntry {
  id: string;
  name: string;
  maker: string;
  colors: Record<ZoneId, string>;
  createdAt: number;
}

const MAX_ENTRIES = 24;
const NAME_MAX_LEN = 40;
const LOCAL_KEY = 'roya-livery-wall';

function sanitize(input: string, maxLen: number): string {
  return input.replace(/<[^>]*>/g, '').trim().slice(0, maxLen);
}

export function sanitizeEntryInput(name: string, maker: string) {
  return {
    name: sanitize(name, NAME_MAX_LEN) || 'Untitled livery',
    maker: sanitize(maker, NAME_MAX_LEN) || 'Anonymous',
  };
}

function colorsOf(zones: Record<ZoneId, ZoneStyle>): Record<ZoneId, string> {
  return {
    nose: zones.nose.color,
    sidepod: zones.sidepod.color,
    frontWing: zones.frontWing.color,
    rearWing: zones.rearWing.color,
  };
}

function readLocal(): LiveryEntry[] {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? (JSON.parse(raw) as LiveryEntry[]) : [];
  } catch {
    return [];
  }
}

function writeLocal(entries: LiveryEntry[]) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(entries.slice(0, MAX_ENTRIES)));
}

export async function submitLivery(name: string, maker: string, zones: Record<ZoneId, ZoneStyle>) {
  const clean = sanitizeEntryInput(name, maker);
  const colors = colorsOf(zones);

  if (isFirebaseConfigured) {
    const [db, { addDoc, collection, serverTimestamp }] = await Promise.all([
      getDb(),
      import('firebase/firestore'),
    ]);
    await addDoc(collection(db, 'liveries'), {
      ...clean,
      colors,
      createdAt: serverTimestamp(),
    });
    return;
  }

  const entries = readLocal();
  entries.unshift({
    id: crypto.randomUUID(),
    ...clean,
    colors,
    createdAt: Date.now(),
  });
  writeLocal(entries);
  window.dispatchEvent(new Event('roya-livery-wall-updated'));
}

/** Subscribes to the wall; returns an unsubscribe function. Works against Firestore when configured, localStorage otherwise. */
export function subscribeLiveries(callback: (entries: LiveryEntry[]) => void): () => void {
  if (isFirebaseConfigured) {
    let unsub: (() => void) | null = null;
    let cancelled = false;
    Promise.all([getDb(), import('firebase/firestore')]).then(
      ([db, { collection, query, orderBy, limit, onSnapshot, Timestamp }]) => {
        if (cancelled) return;
        const q = query(collection(db, 'liveries'), orderBy('createdAt', 'desc'), limit(MAX_ENTRIES));
        unsub = onSnapshot(q, (snap) => {
          const entries = snap.docs.map((d) => {
            const data = d.data();
            const createdAt = data.createdAt instanceof Timestamp ? data.createdAt.toMillis() : Date.now();
            return {
              id: d.id,
              name: data.name,
              maker: data.maker,
              colors: data.colors,
              createdAt,
            } as LiveryEntry;
          });
          callback(entries);
        });
      },
    );
    return () => {
      cancelled = true;
      unsub?.();
    };
  }

  const update = () => callback(readLocal());
  update();
  window.addEventListener('roya-livery-wall-updated', update);
  window.addEventListener('storage', update);
  return () => {
    window.removeEventListener('roya-livery-wall-updated', update);
    window.removeEventListener('storage', update);
  };
}
