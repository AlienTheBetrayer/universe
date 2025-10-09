import { useEffect, useRef } from "react";
import { usePopup } from "../../../hooks/usePopup";
import { useCursorRef } from "../../../hooks/useCursorRef";
import { StellarContextMenu } from "../components/StellarContextMenu";

export const useStellarContextMenu = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const menuPopup = usePopup(<StellarContextMenu onInteract={() => menuPopup.setShown(false)} ref={ref}/>, false);
    const cursor = useCursorRef();

    useEffect(() => {
        if(ref.current && menuPopup.shown) {
            ref.current.style.left = `${cursor.current.x}px`;
            ref.current.style.top = `${cursor.current.y}px`;
        }
    }, [menuPopup.shown]);

    return { popup: menuPopup };
}