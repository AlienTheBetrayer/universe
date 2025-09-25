import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SessionStore {
    loaded: boolean;

    setLoaded: (flag: boolean) => void;
};

export const sessionStore = create<SessionStore>()(
    persist(
        set => ({
        loaded: false,

        setLoaded: (flag: boolean) => {
            set(() => ({ loaded: flag }))
        }
    }),
    {
        name: 'app-storage',
        storage: createJSONStorage(() => sessionStorage)
    })
)