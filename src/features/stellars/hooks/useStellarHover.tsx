import { useEffect, useRef } from "react"
import { useStellarContext } from "../context/StellarContext";
import { usePopup } from "../../../hooks/usePopup";
import { StellarHoverPopup } from "../components/StellarHoverPopup";

export const useStellarHover = () => {
    const [state,] = useStellarContext();

    // popup handling
    const ref = useRef<HTMLDivElement>(null);
    const popup = usePopup(<StellarHoverPopup stellar={state.stellars[state.hovered as number]} ref={ref}/>, false);

    useEffect(() => {
        document.body.style.cursor = state.hovered === false ? 'auto' : 'pointer';
        popup.setShown(state.hovered !== false);
    }, [state.hovered]);

    useEffect(() => {
        const handle = (e: PointerEvent) => {
            if(ref.current && popup.shown && state.selected === false) {
                ref.current.style.display = 'flex';
                ref.current.style.left = `${e.clientX}px`;
                ref.current.style.top = `${e.clientY + window.scrollY}px`;
            }
        }

        if(state.selected !== false)
            popup.setShown(false);

        window.addEventListener('pointermove', handle);
        return () => window.removeEventListener('pointermove', handle);
    }, [popup.shown, state.selected]);

    return { render: popup.render };
}