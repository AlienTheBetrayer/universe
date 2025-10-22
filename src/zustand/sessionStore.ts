import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface LoadedInterface {
    header: boolean;
}

interface SessionStore {
    loaded: LoadedInterface;

    updateLoaded: (flag: Partial<LoadedInterface>) => void;
}

export const useSessionStore = create<SessionStore>()(
    persist(
        (set) => ({
            loaded: {
                header: false,
            },

            updateLoaded: (newLoaded: Partial<LoadedInterface>) => {
                set((state) => ({
                    ...state,
                    loaded: { ...state.loaded, ...newLoaded },
                }));
            },
        }),
        {
            name: 'app-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
