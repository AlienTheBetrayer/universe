import { useEffect } from "react"
import { useStellarContext } from "../context/StellarContext";

export const useStellarHover = () => {
    const [state,] = useStellarContext();

    useEffect(() => {
        document.body.style.cursor = state.hovered === -1 ? 'auto' : 'pointer';
    }, [state.hovered]);
}