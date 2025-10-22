import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { GithubContextInitialData } from '../features/github/context/initial/githubData';
import type { GithubData } from '../features/github/context/types/data';

type TutorialSeenVariant = 'stellar' | 'contact' | 'forge';
type ThemeType = 'dark' | 'light';

interface LocalStore {
    theme: ThemeType;
    tutorialSeen: {
        stellar: boolean;
        contact: boolean;
        forge: boolean;
    };
    githubData: GithubData;

    setGithubData: (newData: GithubData) => void;
    toggleTheme: () => void;
    toggleTutorialSeen: (flag: boolean, type: TutorialSeenVariant) => void;
}

export const useLocalStore = create<LocalStore>()(
    persist(
        (set) => ({
            // initial values
            theme: 'dark',
            tutorialSeen: {
                stellar: false,
                contact: false,
                forge: false,
            },
            githubData: GithubContextInitialData,

            // functions
            setGithubData: (newData: GithubData) => {
                set((state) => ({ ...state, githubData: newData }));
            },

            toggleTheme: () => {
                set((state) => ({
                    ...state,
                    theme: state.theme === 'dark' ? 'light' : 'dark',
                }));
            },

            toggleTutorialSeen: (flag: boolean, type: TutorialSeenVariant) => {
                switch (type) {
                    case 'stellar':
                        set((state) => ({
                            ...state,
                            tutorialSeen: {
                                ...state.tutorialSeen,
                                stellar: flag,
                            },
                        }));
                        break;
                    case 'contact':
                        set((state) => ({
                            ...state,
                            tutorialSeen: {
                                ...state.tutorialSeen,
                                contact: flag,
                            },
                        }));
                        break;
                    case 'forge':
                        set((state) => ({
                            ...state,
                            tutorialSeen: {
                                ...state.tutorialSeen,
                                forge: flag,
                            },
                        }));
                        break;
                }
            },
        }),
        {
            name: 'app-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
