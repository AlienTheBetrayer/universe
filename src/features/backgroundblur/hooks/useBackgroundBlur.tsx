import { useEffect, useState } from "react"
import { createPortal } from "react-dom";
import { BackgroundBlur } from "../components/BackgroundBlur";

import { AnimatePresence } from "motion/react";

export const useBackgroundBlur = (zIndex: number) => {
    const [shown, setShown] = useState<boolean>(false);

    useEffect(() => {
        document.body.style.overflow = shown ? 'hidden' : 'auto';
    }, [shown]);

    const Presence = (shown: boolean) => {
        return (
            <AnimatePresence>
                { shown && <BackgroundBlur zIndex={zIndex}/> }
            </AnimatePresence>
        )
    }

    const render = () => {
        return (
            createPortal(Presence(shown), document.body)
        )
    }

    return { setShown, render };
}