import { useEffect, useRef } from 'react';

export interface KeyState {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
}

const CONTROL_KEYS = new Set([
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'w',
  'a',
  's',
  'd',
  'W',
  'A',
  'S',
  'D',
]);

/** WASD/arrow key state for race mode. preventDefault stops arrow keys from scrolling the page. */
export function useKeyControls(active: boolean) {
  const state = useRef<KeyState>({ up: false, down: false, left: false, right: false });

  useEffect(() => {
    if (!active) return;

    const set = (key: string, value: boolean) => {
      switch (key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          state.current.up = value;
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          state.current.down = value;
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          state.current.left = value;
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          state.current.right = value;
          break;
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (CONTROL_KEYS.has(e.key)) {
        e.preventDefault();
        set(e.key, true);
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (CONTROL_KEYS.has(e.key)) {
        e.preventDefault();
        set(e.key, false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      state.current = { up: false, down: false, left: false, right: false };
    };
  }, [active]);

  return state;
}
