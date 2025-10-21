import { useEffect, useState } from 'react';
import { useBackgroundBlur } from '../features/backgroundblur/hooks/useBackgroundBlur';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'motion/react';

export const usePopup = (element: React.ReactNode, bg: boolean = true) => {
    const [shown, setShown] = useState<boolean>(false);
    const blur = useBackgroundBlur(() => setShown(false));

    useEffect(() => {
        if (bg) {
            document.body.style.overflow = shown ? 'hidden' : 'auto';
            blur.setShown(shown);
        }
    }, [shown]);

    useEffect(() => {
        const handle = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'Escape':
                    setShown(false);
                    break;
            }
        };

        window.addEventListener('keydown', handle);
        return () => window.removeEventListener('keydown', handle);
    }, []);

    const render = () => {
        return (
            <>
                {createPortal(
                    <AnimatePresence>{shown && element}</AnimatePresence>,
                    document.body,
                )}
                {bg && blur.render()}
            </>
        );
    };

    return { shown, setShown, render };
};
