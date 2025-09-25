import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeType = 'dark' | 'light';

interface AppState {
    theme: ThemeType;

    toggleTheme: () => void;
};  

export const appStore = create<AppState>()(
    persist(
        set => ({
            theme: 'dark',

            toggleTheme: () => {
                set(state => ({ theme: state.theme === 'dark' ? 'light' : 'dark'}));
            }
        }),
        {
            name: 'app-storage'
        })
)