import { useEffect, useRef } from 'react';
import { usePopup } from '../../../hooks/usePopup';
import { StellarHoverPopup } from '../components/StellarHoverPopup';
import { useStellarContext } from '../context/StellarContext';

export const useStellarHover = () => {
    const [state] = useStellarContext();

    // popup handling
    const ref = useRef<HTMLDivElement>(null);
    const popup = usePopup(
        <StellarHoverPopup
            stellar={state.stellars.find((s) => s.idx === state.hoveredIdx)!}
            ref={ref}
        />,
        false,
    );

    useEffect(() => {
        document.body.style.cursor =
            state.hoveredIdx === false ? 'auto' : 'pointer';
        popup.setShown(state.hoveredIdx !== false);
    }, [state.hoveredIdx]);

    useEffect(() => {
        const handle = (e: PointerEvent) => {
            if (ref.current && popup.shown && state.selectedIdx === false) {
                ref.current.style.display = 'flex';
                ref.current.style.left = `${e.clientX}px`;
                ref.current.style.top = `${e.clientY + window.scrollY}px`;
            }
        };

        if (state.selectedIdx !== false) popup.setShown(false);

        window.addEventListener('pointermove', handle);
        return () => window.removeEventListener('pointermove', handle);
    }, [popup.shown, state.selectedIdx]);

    return { render: popup.render };
};
