import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ThemeType = 'dark' | 'light';

interface LocalStore {
    theme: ThemeType;

    toggleTheme: () => void;
};  

export const useLocalStore = create<LocalStore>()(
    persist(
        set => ({
            theme: 'dark',

            toggleTheme: () => {
                set(state => ({ theme: state.theme === 'dark' ? 'light' : 'dark'}));
            }
        }),
        {
            name: 'app-storage',
            storage: createJSONStorage(() => localStorage)
        })
)