import { useState } from 'react';
import { useTimeout } from '../../../hooks/useTimeout';
import { useSessionStore } from '../../../zustand/sessionStore';

export const useHeaderAnimation = () => {
    const { loaded, updateLoaded } = useSessionStore();
    const [justified, setJustified] = useState<boolean>(false);

    useTimeout(() => {
        if (!loaded.header) updateLoaded({ header: true });
    }, 4100);

    useTimeout(
        () => {
            setJustified(loaded.header);
        },
        1500,
        [loaded.header]
    );

    return { loaded, justified };
};
