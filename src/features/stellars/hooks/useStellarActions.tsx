import { useRef } from "react";
import { useStellarContext } from "../context/StellarContext";
import { useStellarHover } from "./useStellarHover";
import { useStellarPositions } from "./useStellarPositions";
import { usePopup } from "../../../hooks/usePopup";
import { MessageBox } from "../../messagebox/components/MessageBox";

export const useStellarActions = () => {
    const [state, dispatch] = useStellarContext();
    
    // stellar hover
    const hover = useStellarHover();

    // regenerating 
    const positions = useStellarPositions(state.viewport);
    const isGenerating = useRef<boolean>(false);
    
    const regenPositions = () => {
        if(isGenerating.current)
            return;

        dispatch({ type: 'go_back' });
        positions.generate();
        isGenerating.current = true;
        setTimeout(() => { isGenerating.current = false }, 5000);
    }

    // clearing
    const clearMessageBox = usePopup(
    <MessageBox
            title='Are you sure?'
            description={`You're about to <b><u>delete all stellars</u></b> (it will <mark>save</mark> after that)`}
            onInteract={f => { if(f) dispatch({ type: 'clear' }); clearMessageBox.setShown(false) }}/>);

    // refilling
    const refillMessageBox = usePopup(
    <MessageBox
            title='Are you sure?'
            description={`You're about to <mark>restore</mark> all stellars to their initial data (it will <mark>save</mark> after that)`}
            onInteract={f => { if(f) dispatch({ type: 'refill' }); refillMessageBox.setShown(false); positions.generate() }}/>);

    // tutorial 

    return {
        regenPositions,
        hover,
        clearMessageBox, refillMessageBox
    };
}