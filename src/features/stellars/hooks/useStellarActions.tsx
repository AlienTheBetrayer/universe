import { useEffect, useRef } from "react";
import { InitialStellarState, useStellarContext } from "../context/StellarContext";
import { useStellarHover } from "./useStellarHover";
import { useStellarPositions } from "./useStellarPositions";
import { usePopup } from "../../../hooks/usePopup";
import { MessageBox } from "../../messagebox/components/MessageBox";

export const useStellarActions = () => {
    const [state, setState] = useStellarContext();
    
    // stellar hover
    const hover = useStellarHover();

    // regenerating 
    const positions = useStellarPositions();
    const isGenerating = useRef<boolean>(false);
    
    const regenPositions = () => {
        if(isGenerating.current)
            return;

        setState(prev => ({ ...prev, selected: false }));
        positions.generate();
        isGenerating.current = true;
        setTimeout(() => { isGenerating.current = false }, 5000);
    }

    // clearing
    const clearMessageBox = usePopup(
    <MessageBox
            title='Are you sure?'
            description={`You're about to <u>delete ${state.selected === false ? '<b>all</b> stellars' : '<b>this</b> stellar'}</u>`}
            onInteract={f => { 
                if(f) {
                    if(state.selected === false) {
                        setState(prev => ({ ...prev, stellars: [] }));
                    } else {
                        setState(prev => ({ ...prev, 
                            stellars: prev.stellars.filter(stellar => stellar.idx !== state.selected),
                            selected: false
                        }))
                    }
                }
                clearMessageBox.setShown(false);
            }}/>);

    const refillRef = useRef<boolean>(false);

    // refilling
    const refillMessageBox = usePopup(
    <MessageBox
            title='Are you sure?'
            description={`You're about to <mark>restore</mark> all stellars to their initial data`}
            onInteract={f => {
                if(f) {
                    setState(InitialStellarState);
                    refillRef.current = true;
                }
                refillMessageBox.setShown(false);
            }}/>);

            useEffect(() => {
                if(!refillRef.current)
                    return;
                
                positions.generate();
                refillRef.current = false;
            }, [state.stellars]);
            
    // tutorial 
            
    return {
        regenPositions,
        hover,
        clearMessageBox, refillMessageBox
    };
}