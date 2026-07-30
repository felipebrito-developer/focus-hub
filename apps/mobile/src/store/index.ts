import { atom } from 'jotai';

// Example atom for global state
export const appReadyAtom = atom(false);
export const userPreferencesAtom = atom({
  theme: 'light',
  minimalistMode: true,
});
