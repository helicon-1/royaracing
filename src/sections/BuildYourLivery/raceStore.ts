import { create } from 'zustand';

export type RaceStatus = 'idle' | 'countdown' | 'racing' | 'finished';

interface RaceState {
  status: RaceStatus;
  totalLaps: number;
  playerLap: number;
  aiLap: number;
  elapsedMs: number;
  position: 1 | 2;
  winner: 'player' | 'ai' | null;
  start: () => void;
  tick: (ms: number) => void;
  setLaps: (playerLap: number, aiLap: number) => void;
  setPosition: (position: 1 | 2) => void;
  finish: (winner: 'player' | 'ai') => void;
  reset: () => void;
}

export const useRaceStore = create<RaceState>((set) => ({
  status: 'idle',
  totalLaps: 3,
  playerLap: 1,
  aiLap: 1,
  elapsedMs: 0,
  position: 2,
  winner: null,
  start: () => set({ status: 'countdown' }),
  tick: (elapsedMs) => set({ elapsedMs }),
  setLaps: (playerLap, aiLap) => set({ playerLap, aiLap }),
  setPosition: (position) => set({ position }),
  finish: (winner) => set({ status: 'finished', winner }),
  reset: () =>
    set({ status: 'idle', playerLap: 1, aiLap: 1, elapsedMs: 0, position: 2, winner: null }),
}));
