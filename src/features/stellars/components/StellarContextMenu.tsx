import type React from 'react';
import { useStellarContext, type Stellar } from '../context/StellarContext';
import './StellarContextMenu.css';
import { motion } from "motion/react"
import { useCursorRef } from '../../../hooks/useCursorRef';

interface Props {
    ref: React.RefObject<HTMLDivElement | null>;
}

export const StellarContextMenu = ({ ref }: Props) => {
    const [state, dispatch] = useStellarContext();
    const cursor = useCursorRef();

    const findMax = () => {
        return state.stellars.reduce((acc, val) => {
            return val.idx > acc.idx ? val : acc;
        });
    }

    const handleCreate = () => {
        const stellar: Stellar = {
            idx: findMax().idx + 1,
            x: (cursor.current.x / window.innerWidth) * state.viewport.width - state.viewport.width / 2,
            y: -(cursor.current.y / window.innerHeight) * state.viewport.height + state.viewport.height / 2,
            content: {
                first: {
                    title: 'hi',
                    description: []
                },
                second: {
                    title: 'properties',
                    description: []
                }
            }
        };

        dispatch({ type: 'create', stellar: stellar });
    }

    return (
        <motion.div className='stellar-context-menu' ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
            <h3>Context menu!</h3>
            <button className='stellar-create-stellar-button'
            onClick={handleCreate}>
                Create
            </button>
        </motion.div>
    )
}