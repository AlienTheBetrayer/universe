import { useState } from 'react';
import { useTimeout } from '../../../hooks/useTimeout';
import { useSessionStore } from '../../../zustand/sessionStore';

export const useHeaderAnimation = () => {
    const { loaded, updateLoaded } = useSessionStore();
    const [justified, setJustified] = useState<boolean>(loaded.header);

    useTimeout(() => {
        if (!loaded.header) updateLoaded({ header: true });
    }, 4100);

    useTimeout(() => {
        setJustified(true);
    }, 5600);

    return { loaded, justified };
};
