import type { FirebaseOptions } from 'firebase/app';
import type { Firestore } from 'firebase/firestore';

/**
 * Real Firestore config is read from env vars. None were supplied for this
 * build (no Firebase project was provided) — `isFirebaseConfigured` is
 * false until VITE_FIREBASE_* vars are set, and the Fan Livery Wall falls
 * back to localStorage so the feature still works end-to-end in the
 * meantime. Swap in real project credentials and the Firestore path
 * activates automatically — no other code changes needed.
 *
 * The Firebase SDK itself is only fetched (dynamic import) when configured,
 * so unconfigured builds don't ship it to visitors at all.
 */
const config: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Boolean(config.apiKey && config.projectId);

let dbPromise: Promise<Firestore> | null = null;

export function getDb(): Promise<Firestore> {
  if (!isFirebaseConfigured) return Promise.reject(new Error('Firebase not configured'));
  if (!dbPromise) {
    dbPromise = Promise.all([import('firebase/app'), import('firebase/firestore')]).then(
      ([{ initializeApp }, { getFirestore }]) => getFirestore(initializeApp(config)),
    );
  }
  return dbPromise;
}
