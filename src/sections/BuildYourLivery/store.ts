import { create } from 'zustand';

export type ZoneId = 'nose' | 'sidepod' | 'frontWing' | 'rearWing';
export type Finish = 'matte' | 'gloss' | 'metallic';

export interface ZoneStyle {
  color: string;
  finish: Finish;
}

export const ZONE_LABELS: Record<ZoneId, string> = {
  nose: 'Nose Cone',
  sidepod: 'Sidepod',
  frontWing: 'Front Wing',
  rearWing: 'Rear Wing',
};

export const FINISH_PARAMS: Record<Finish, { roughness: number; metalness: number; clearcoat: number; clearcoatRoughness: number }> = {
  matte: { roughness: 0.85, metalness: 0.05, clearcoat: 0, clearcoatRoughness: 0 },
  gloss: { roughness: 0.15, metalness: 0.15, clearcoat: 1, clearcoatRoughness: 0.08 },
  metallic: { roughness: 0.35, metalness: 1, clearcoat: 0.3, clearcoatRoughness: 0.2 },
};

const DEFAULT_ZONES: Record<ZoneId, ZoneStyle> = {
  nose: { color: '#26b7bd', finish: 'gloss' },
  sidepod: { color: '#283679', finish: 'gloss' },
  frontWing: { color: '#0b1030', finish: 'matte' },
  rearWing: { color: '#0b1030', finish: 'matte' },
};

interface LiveryState {
  zones: Record<ZoneId, ZoneStyle>;
  selectedZone: ZoneId;
  setSelectedZone: (z: ZoneId) => void;
  setZoneColor: (z: ZoneId, color: string) => void;
  setZoneFinish: (z: ZoneId, finish: Finish) => void;
  reset: () => void;
}

export const useLiveryStore = create<LiveryState>((set) => ({
  zones: DEFAULT_ZONES,
  selectedZone: 'nose',
  setSelectedZone: (selectedZone) => set({ selectedZone }),
  setZoneColor: (z, color) =>
    set((s) => ({ zones: { ...s.zones, [z]: { ...s.zones[z], color } } })),
  setZoneFinish: (z, finish) =>
    set((s) => ({ zones: { ...s.zones, [z]: { ...s.zones[z], finish } } })),
  reset: () => set({ zones: DEFAULT_ZONES, selectedZone: 'nose' }),
}));
