import { immer } from '@/middlewares/immer';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const initialTheme = {
  currentMode: 'light',
  light: {
    fg: 'black',
    bg: 'white',
  },
  dark: {
    fg: 'white',
    bg: 'black',
  },
};

/* 
*Ramda JS
store
devtools
immer
persist
create
=> customHook
*/

export const useStore = create(
  persist(
    immer(
      devtools((set) => ({
        theme: initialTheme,

        changeLightTheme: () =>
          set(
            (state) => {
              state.theme.currentMode = 'light';
            },
            false,
            'theme/changeLight'
          ),
        changeDarkTheme: () =>
          set(
            (state) => {
              state.theme.currentMode = 'dark';
            },
            false,
            'theme/changeDark'
          ),
        switchMode: () =>
          set(
            (state) => {
              const mode = state.theme.currentMode;
              state.theme.currentMode = mode.includes('light')
                ? 'dark'
                : 'light';
            },
            false,
            'theme/switchMode'
          ),
        resetTheme: () =>
          set(
            () => ({
              theme: initialTheme,
            }),
            false,
            'theme/reset'
          ),
      }))
    ),
    {
      name: 'appStore',
    }
  )
);
