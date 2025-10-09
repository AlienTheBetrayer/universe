import { useRef } from "react";
import { useStellarContext } from "../context/StellarContext";
import { useStellarHover } from "./useStellarHover";
import { useStellarPositions } from "./useStellarPositions";
import { usePopup } from "../../../hooks/usePopup";
import { MessageBox } from "../../messagebox/components/MessageBox";

export const useStellarActions = (contextSelected?: number, onAction?: () => void) => {
    const [state, setState] = useStellarContext();
    
    // stellar hover
    const hover = useStellarHover();

    // regenerating 
    const positions = useStellarPositions();
    const isGenerating = useRef<boolean>(false);
    
    const regenPositions = () => {
        if(isGenerating.current)
            return;

        positions.generate();
        isGenerating.current = true;
        setTimeout(() => { isGenerating.current = false }, 5000);
    }

    // clearing
    const clearMessageBox = usePopup(
    <MessageBox
            title='Are you sure?'
            description={`You're about to <u>delete ${state.selected === false && contextSelected === undefined ? '<b>all</b> stellars' : '<b>this</b> stellar'}</u>`}
            onInteract={f => { 
                if(f) {
                    if(state.selected === false && contextSelected === undefined) {
                        setState(prev => ({ ...prev, stellars: [] }));
                    } else {
                        setState(prev => ({ ...prev, 
                            stellars: prev.stellars.filter(stellar => stellar.idx !== (contextSelected ?? state.selected)),
                            selected: false
                        }))
                    }
                    onAction?.();
                }
                clearMessageBox.setShown(false);
            }}/>);

            
    return {
        regenPositions,
        hover,
        clearMessageBox
    };
}