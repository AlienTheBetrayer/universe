import { useEffect, useRef } from "react"
import { useStellarContext } from "../context/StellarContext";
import { usePopup } from "../../../hooks/usePopup";
import { StellarHoverPopup } from "../components/StellarHoverPopup";
import { useCursorRef } from "../../../hooks/useCursorRef";

export const useStellarHover = () => {
    const [state,] = useStellarContext();

    useEffect(() => {
        document.body.style.cursor = state.hovered === -1 ? 'auto' : 'pointer';
        popup.setShown(state.hovered !== -1);
    }, [state.hovered]);

    // popup handling
    const cursor = useCursorRef();
    const ref = useRef<HTMLDivElement>(null);
    const popup = usePopup(<StellarHoverPopup stellar={state.stellars[state.hovered]} ref={ref}/>, false);

    useEffect(() => {
        if(ref.current && popup.shown && state.selected === -1) {
            ref.current.style.display = 'flex';
            ref.current.style.left = `${cursor.current.x}px`;
            ref.current.style.top = `${cursor.current.y}px`;
        }

        if(state.selected !== -1)
            popup.setShown(false);
    }, [popup.shown, state.selected]);

    return { render: popup.render };
}