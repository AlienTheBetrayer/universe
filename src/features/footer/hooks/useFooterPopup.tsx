import { useEffect, useLayoutEffect, useState } from "react"
import { createPortal } from "react-dom";
import { FooterPopup } from "../components/FooterPopup";

interface FooterPopup {
    idx: number;
    shown: boolean;
}

interface FooterPopupOffset {
    idx: number;
    left: number;
    top: number;
}

export const useFooterPopup = (refs: React.RefObject<(HTMLDivElement | null)[]>) => {
    const [popupsShown, setPopupsShown] = useState<FooterPopup[]>([]);
    const [offsets, setOffsets] = useState<FooterPopupOffset[]>([]);

    // fill our array once all the refs are loaded
    useLayoutEffect(() => {
        const arr: FooterPopup[] = [];
        for(let i = 0; i < refs.current.length; ++i)
            arr.push({ idx: i, shown: false });
        setPopupsShown(arr);
    }, [refs]);

    // on resize change
    useEffect(() => {
        const handle = () => {
            const newOffsets: FooterPopupOffset[] = [];

            refs.current.forEach((ref, idx) => {
                const rect = ref?.getBoundingClientRect();
                if(rect)
                newOffsets.push({ idx: idx, left: rect.left, top: rect.top + window.scrollY});
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
            popupsShown.map(popup => (
                popup.shown && (
                    createPortal(<FooterPopup left={offsets[popup.idx].left} top={offsets[popup.idx].top}/>, document.body)
                )
            ))
        )
    }

    // function to update the visibility of a given popup
    const update = (idx: number, shown: boolean) => {
        setPopupsShown(prev => prev.map(val => val.idx === idx ? { idx: val.idx, shown: shown } : val));
    }

    return { update, render };
}