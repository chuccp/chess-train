import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Color } from '@qilian/xiangqi';
import type { Level } from '../types';

export type BoardOrientation = 'auto' | 'red';

interface SettingsState {
  preferredColor: Color;
  preferredLevel: Level;
  boardOrientation: BoardOrientation;
  sound: boolean;
  haptics: boolean;
  allowUndo: boolean;
  allowUndoWhenChecked: boolean;
  undoSteps: number;
  setPreferredColor: (color: Color) => void;
  setPreferredLevel: (level: Level) => void;
  setBoardOrientation: (orientation: BoardOrientation) => void;
  setSound: (sound: boolean) => void;
  setHaptics: (haptics: boolean) => void;
  setAllowUndo: (allowUndo: boolean) => void;
  setAllowUndoWhenChecked: (allowUndoWhenChecked: boolean) => void;
  setUndoSteps: (undoSteps: number) => void;
  reset: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      preferredColor: 'r',
      preferredLevel: 2,
      boardOrientation: 'auto',
      sound: true,
      haptics: true,
      allowUndo: true,
      allowUndoWhenChecked: true,
      undoSteps: 10,
      setPreferredColor: (preferredColor) => set({ preferredColor }),
      setPreferredLevel: (preferredLevel) => set({ preferredLevel }),
      setBoardOrientation: (boardOrientation) => set({ boardOrientation }),
      setSound: (sound) => set({ sound }),
      setHaptics: (haptics) => set({ haptics }),
      setAllowUndo: (allowUndo) => set({ allowUndo }),
      setAllowUndoWhenChecked: (allowUndoWhenChecked) => set({ allowUndoWhenChecked }),
      setUndoSteps: (undoSteps) => set({ undoSteps: Math.min(10, Math.max(1, undoSteps)) }),
      reset: () =>
        set({
          preferredColor: 'r',
          preferredLevel: 2,
          boardOrientation: 'auto',
          sound: true,
          haptics: true,
          allowUndo: true,
          allowUndoWhenChecked: true,
          undoSteps: 10,
        }),
    }),
    { name: 'qilian.settings.v1' },
  ),
);
