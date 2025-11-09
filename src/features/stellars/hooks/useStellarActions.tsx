import { useState } from 'react';
import { usePopup } from '../../../hooks/usePopup';
import { MessageBox } from '../../messagebox/components/MessageBox';
import { StellarWaitingPopup } from '../components/StellarWaitingPopup';
import { useStellarContext } from '../context/StellarContext';
import { useStellarHover } from './useStellarHover';

export const useStellarActions = (
    hoveredMenu?: number | false,
    onAction?: () => void,
) => {
    const [state, dispatch] = useStellarContext();

    // stellar hover
    const hover = useStellarHover();

    // clearing
    const clearMessageBox = usePopup(
        <MessageBox
            title='Are you sure?'
            description={`You're about to <u>delete ${
                state.selectedIdx === false
                    ? '<b>all</b> stellars'
                    : '<b>this</b> stellar'
            }</u>`}
            onInteract={(f) => {
                if (f) {
                    if (hoveredMenu !== false && hoveredMenu !== undefined) {
                        dispatch({ type: 'STELLAR_DELETE', idx: hoveredMenu });
                    } else {
                        if (state.selectedIdx === false) {
                            dispatch({ type: 'STELLARS_WIPE' });
                        } else {
                            dispatch({ type: 'STELLAR_DELETE_CURRENT' });
                            dispatch({ type: 'STELLAR_FOCUS', idx: false });
                        }
                    }

                    onAction?.();
                }
                clearMessageBox.setShown(false);
            }}
        />,
    );

    const [waitingPopupText, setWaitingPopupText] = useState<string[]>([
        'Click on an orb you want to move.',
        'then <b>move it</b> (cursor / mobile slide), and click again / <u>Esc</u> to <mark>confirm</mark> the action. ',
    ]);
    const waitingPopup = usePopup(
        <StellarWaitingPopup text={waitingPopupText} />,
        false,
    );

    return {
        hover,
        clearMessageBox,
        waitingPopup,
        setWaitingPopupText,
    };
};
