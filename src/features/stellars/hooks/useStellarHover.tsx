import { useEffect, useRef } from "react"
import { useStellarContext } from "../context/StellarContext";
import { usePopup } from "../../../hooks/usePopup";
import { StellarHoverPopup } from "../components/StellarHoverPopup";
import { useCursorRef } from "../../../hooks/useCursorRef";

export const useStellarHover = () => {
    const [state,] = useStellarContext();

    useEffect(() => {
        document.body.style.cursor = state.hovered === false ? 'auto' : 'pointer';
        popup.setShown(state.hovered !== false);
    }, [state.hovered]);

    // popup handling
    const cursor = useCursorRef();
    const ref = useRef<HTMLDivElement>(null);
    const popup = usePopup(<StellarHoverPopup stellar={state.stellars[state.hovered as number]} ref={ref}/>, false);

    useEffect(() => {
        if(ref.current && popup.shown && state.selected === false) {
            ref.current.style.display = 'flex';
            ref.current.style.left = `${cursor.current.x}px`;
            ref.current.style.top = `${cursor.current.y + window.scrollY}px`;
        }

        if(state.selected !== false)
            popup.setShown(false);
    }, [popup.shown, state.selected]);

    return { render: popup.render };
}