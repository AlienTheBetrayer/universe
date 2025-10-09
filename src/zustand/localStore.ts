import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ThemeType = 'dark' | 'light';

interface LocalStore {
    theme: ThemeType;
    tutorialSeen: boolean;

    toggleTheme: () => void;
    toggleTutorialSeen: (flag: boolean) => void;
};  

export const useLocalStore = create<LocalStore>()(
    persist(
        set => ({
            theme: 'dark',
            tutorialSeen: false,

            toggleTheme: () => {
                set(state => ({ ...state, theme: state.theme === 'dark' ? 'light' : 'dark'}));
            },
            toggleTutorialSeen: (flag: boolean) => {
                set(state => ({ ...state, tutorialSeen: flag}))
            }
        }),
        {
            name: 'app-storage',
            storage: createJSONStorage(() => localStorage)
        })
)