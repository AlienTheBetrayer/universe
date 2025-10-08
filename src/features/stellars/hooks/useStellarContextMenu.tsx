import { useEffect, useRef } from "react";
import { usePopup } from "../../../hooks/usePopup";
import { useCursorRef } from "../../../hooks/useCursorRef";
import { StellarContextMenu } from "../components/StellarContextMenu";

export const useStellarContextMenu = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const menuPopup = usePopup(<StellarContextMenu ref={ref}/>, false);
    const cursor =  useCursorRef();

    useEffect(() => {
        if(ref.current && menuPopup.shown) {
            ref.current.style.left = `${cursor.current.x}px`;
            ref.current.style.top = `${cursor.current.y}px`;
        }
    }, [menuPopup.shown]);

    useEffect(() => {
        const handle = (e: KeyboardEvent) => {
            if(e.key == 'Escape')
                menuPopup.setShown(false);
        }

        window.addEventListener('keydown', handle);
        return () => window.removeEventListener('keydown', handle);
    }, []);

    return { popup: menuPopup };
}