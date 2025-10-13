import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type TutorialSeenVariant = 'stellar' | 'contact' | 'forge';
type ThemeType = 'dark' | 'light';

interface LocalStore {
    theme: ThemeType;
    tutorialSeen: {
        stellar: boolean;
        contact: boolean;
        forge: boolean;
    }

    toggleTheme: () => void;
    toggleTutorialSeen: (flag: boolean, type: TutorialSeenVariant) => void;
};  

export const useLocalStore = create<LocalStore>()(
    persist(
        set => ({
            theme: 'dark',
            tutorialSeen: {
                stellar: false,
                contact: false,
                forge: false
            },

            toggleTheme: () => {
                set(state => ({ ...state, theme: state.theme === 'dark' ? 'light' : 'dark'}));
            },

            toggleTutorialSeen: (flag: boolean, type: TutorialSeenVariant) => {
                switch(type) {
                    case 'stellar':
                        set(state => ({ ...state, tutorialSeen: { ...state.tutorialSeen, stellar: flag } }));
                    break;
                    case 'contact':
                        set(state => ({ ...state, tutorialSeen: { ...state.tutorialSeen, contact: flag } }));
                    break;
                    case 'forge':
                        set(state => ({ ...state, tutorialSeen: { ...state.tutorialSeen, forge: flag } }));
                    break;
                }
            }
        }),
        {
            name: 'app-storage',
            storage: createJSONStorage(() => localStorage)
        })
)