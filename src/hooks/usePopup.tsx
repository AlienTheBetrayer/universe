import { AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useBackgroundBlur } from '../features/backgroundblur/hooks/useBackgroundBlur';

export const usePopup = (
    element: React.ReactNode,
    bg: boolean = true,
    onClose?: () => void
) => {
    const [shown, setShown] = useState<boolean>(false);
    const blur = useBackgroundBlur(() => {
        setShown(false);
        onClose?.();
    });

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
                    onClose?.();
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
                    document.body
                )}
                {bg && blur.render()}
            </>
        );
    };

    return { shown, setShown, render };
};
