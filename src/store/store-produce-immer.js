import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const initialTheme = {
  currentTheme: 'light',
  light: {
    fg: '#000',
    bg: '#fff',
  },
  dark: {
    fg: '#fff',
    bg: '#000',
  },
  auth: {
    isAuth: false,
    user: null,
    token: '',
  },
  sideMenu: false,
};

export const useStore = create(
  devtools((set, get) => ({
    theme: initialTheme,

    changeTheme: (themeName) =>
      set(
        (state) => ({
          theme: {
            ...state,
            currentTheme: themeName,
          },
        }),
        false,
        'theme/changeTheme'
      ),

    resetTheme: () =>
      set(
        () => ({
          theme: initialTheme,
        }),
        false,
        'theme/resetTheme'
      ),

    switchMode: () =>
      set(
        (state) => ({
          theme: {
            ...state.theme,
            currentMode: state.theme.currentMode.includes('light')
              ? 'dark'
              : 'light',
          },
        }),
        false,
        'theme/switchMode'
      ),

    getCurrentTheme: () => {
      const { theme } = get();
      return theme[theme.currentTheme];
    },
  }))
);
