import { motion } from 'motion/react';
import type React from 'react';
import { useCursorRef } from '../../../hooks/useCursorRef';
import { useStellarContext } from '../context/StellarContext';
import './StellarContextMenu.css';

import clearImg from '../assets/clear.svg';
import createImg from '../assets/create.svg';
import { useStellarActions } from '../hooks/useStellarActions';
import { useRef } from 'react';

interface Props {
    ref: React.RefObject<HTMLDivElement | null>;
    onInteract?: () => void;
}

export const StellarContextMenu = ({ ref, onInteract }: Props) => {
    const [state, dispatch] = useStellarContext();
    const isHovering = useRef<number | false>(state.hoveredIdx);
    const cursor = useCursorRef();

    const actions = useStellarActions(isHovering.current, () => onInteract?.());

    return (
        <motion.div
            className='stellar-context-menu'
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {actions.clearMessageBox.render()}
            <h3>Planet menu</h3>

            <button
                className='stellar-context-button'
                onClick={() =>
                    dispatch({
                        type: 'STELLAR_CREATE_AT_CURSOR',
                        cursorX: cursor.current.x,
                        cursorY: cursor.current.y,
                    })
                }
            >
                <img src={createImg} alt='' />
                Create
            </button>

            {isHovering.current !== false && (
                <button
                    className='stellar-context-button'
                    onClick={() => actions.clearMessageBox.setShown(true)}
                >
                    <img src={clearImg} alt='' />
                    Wipe hovered
                </button>
            )}
        </motion.div>
    );
};
