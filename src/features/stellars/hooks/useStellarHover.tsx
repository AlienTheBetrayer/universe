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
    const popup = usePopup(
    <StellarHoverPopup content={state.stellars[state.hovered]?.content.first} ref={ref}/>
    , false);

    useEffect(() => {
        if(ref.current) {
            ref.current.style.left = `${cursor.current.x}px`;
            ref.current.style.top = `${cursor.current.y}px`;
        }
    }, [popup.shown]);

    return { render: popup.render };
}