import { create } from 'zustand';
import type { SectionId } from '@/lib/theme';

interface AppState {
  activeSection: SectionId;
  setActiveSection: (id: SectionId) => void;
  scrollProgress: number; // 0..1 across the whole document
  setScrollProgress: (p: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeSection: 'home',
  setActiveSection: (id) => set({ activeSection: id }),
  scrollProgress: 0,
  setScrollProgress: (p) => set({ scrollProgress: p }),
}));
