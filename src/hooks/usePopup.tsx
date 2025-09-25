import { useEffect, useState } from "react"
import { useBackgroundBlur } from "../features/backgroundblur/hooks/useBackgroundBlur";
import { createPortal } from "react-dom";
import { AnimatePresence } from "motion/react";

export const usePopup = (element: React.ReactNode) => {
    const [shown, setShown] = useState<boolean>(false);
    const blur = useBackgroundBlur();

    useEffect(() => {
        document.body.style.overflow = shown ? 'hidden' : 'auto';
        blur.setShown(shown);
    }, [shown]);

    const render = () => {
        return (
            <>
                { createPortal(
                    <AnimatePresence>
                        { shown && element }
                    </AnimatePresence>, document.body) }
                { blur.render() }
            </>
        )
    }

    return { shown, setShown, render };
}