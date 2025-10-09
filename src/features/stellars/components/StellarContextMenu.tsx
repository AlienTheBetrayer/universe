import type React from 'react';
import { useStellarContext, type Stellar } from '../context/StellarContext';
import './StellarContextMenu.css';
import { motion } from "motion/react"
import { useCursorRef } from '../../../hooks/useCursorRef';

import createImg from '../assets/create.svg';
import clearImg from '../assets/clear.svg';
import { useStellarActions } from '../hooks/useStellarActions';
import { useRef } from 'react';

interface Props {
    ref: React.RefObject<HTMLDivElement | null>;
    onInteract?: () => void;
}

export const StellarContextMenu = ({ ref, onInteract }: Props) => {
    const [state, setState] = useStellarContext();
    const cursor = useCursorRef();
    const isHovered = useRef<number | false>(state.hovered);

    const findMax = () => {
        if(state.stellars.length === 0)
            return -1;

        return state.stellars.reduce((acc, val) => {
            return val.idx > acc.idx ? val : acc;
        }).idx;
    }

    const actions = useStellarActions(isHovered.current || 0, () => onInteract?.());

    const handleCreate = () => {
        const stellar: Stellar = {
            idx: findMax() + 1,
            x: (cursor.current.x / window.innerWidth) * state.viewport.width - state.viewport.width / 2,
            y: -(cursor.current.y / window.innerHeight) * state.viewport.height + state.viewport.height / 2,
            content: {
                firstTitle: 'Planet',
                firstDescription: '',
                secondTitle: 'Properties',
                secondDescription: '',
            }
        };

        setState(prev => ({ ...prev, stellars: [ ...prev.stellars, stellar ]}));
    }

    return (
        <motion.div className='stellar-context-menu' ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
            { actions.clearMessageBox.render() }
            <h3>Context menu!</h3>

            <button className='stellar-context-button'
            onClick={handleCreate}>
                <img src={createImg} alt=''/>
                Create
            </button>

            { isHovered.current !== false && (
                <button className='stellar-context-button'
                onClick={() => actions.clearMessageBox.setShown(true) }>
                    <img src={clearImg} alt=''/>
                    Wipe hovered
                </button>
            )}
        </motion.div>
    )
}