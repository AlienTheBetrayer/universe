import { useEffect, useLayoutEffect, useState } from "react"
import { createPortal } from "react-dom";
import { FooterPopup } from "../components/FooterPopup";
import { AnimatePresence } from "motion/react";

interface FooterPopup {
    idx: number;
    shown: boolean;
    text: string;
}

export interface FooterPopupOffset {
    idx: number;
    left: number;
    top: number;
    width: number;
}

export const useFooterPopups = (refs: React.RefObject<(HTMLDivElement | null)[]>) => {
    const [popupsShown, setPopupsShown] = useState<FooterPopup[]>([]);
    const [offsets, setOffsets] = useState<FooterPopupOffset[]>([]);

    // fill our array once all the refs are loaded
    useLayoutEffect(() => {
        const arr: FooterPopup[] = [];
        for(let i = 0; i < refs.current.length; ++i)
            arr.push({ idx: i, shown: false, text: '' });
        setPopupsShown(arr);
    }, [refs]);

    // on resize change
    useEffect(() => {
        const handle = () => {
            const newOffsets: FooterPopupOffset[] = [];

            refs.current.forEach((ref, idx) => {
                const rect = ref?.getBoundingClientRect();
                if(rect)
                    newOffsets.push({ idx: idx, left: rect.left, top: rect.top + window.scrollY, width: rect.width });
            });

            setOffsets(newOffsets);
        }

        handle();

        window.addEventListener('resize', handle);
        return () => window.removeEventListener('resize', handle);
    }, [refs]);

    // functions that are meant to be used
    // actual rendering of all the popups
    const render = () => {
        return (
            createPortal(
                <AnimatePresence>
                    {
                        popupsShown.map((popup, idx) => (
                            popup.shown && (
                                <FooterPopup key={idx} offset={offsets[idx]} text={popup.text}/>
                            )
                        ))
                    }
                </AnimatePresence>
                , document.body)
        )
    }

    // function to update the visibility of a given popup
    const update = (idx: number, shown: boolean, text?: string) => {
        setPopupsShown(prev => prev.map(val => val.idx === idx ? { idx: val.idx, shown: shown, text: text ?? '' } : val));
    }

    return { update, render };
}