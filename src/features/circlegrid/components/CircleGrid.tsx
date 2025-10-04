import { useEffect, useState } from 'react';
import { useCircleGrid } from '../hooks/useCircleGrid';
import './CircleGrid.css';
import { motion } from "motion/react"
import { HotkeyTooltip } from '../../hotkeytooltip/components/HotkeyTooltip';

interface Props {
    controller?: boolean;
}

export const CircleGrid = ({ controller=true }: Props) => {
    const grid = useCircleGrid();
    const [focused, setFocused] = useState<boolean>(false);

    useEffect(() => {
        
    }, [focused]);

    return (
        <div className='circle-grid'
        tabIndex={0}
        onPointerOver={() => setFocused(true)}
        onBlur={() => { setFocused(false) } }
        onClick={() => setFocused(true)}>
            { Array.from({ length: 8 }).map((_ ,idx) => (
                <motion.div
                layout
                style={{ gridRow: grid.row(idx + 1), gridColumn: grid.column(idx + 1)}}
                whileHover={{ scale: 1.1, filter: 'brightness(3)', transition: { type: 'spring', stiffness: 64, damping: 4 } }}
                transition={{ layout: { ease: 'backInOut', duration: (1 + idx / 5) } }}>
                    { idx + 1 }
                </motion.div>                    
            ))}
            { controller && (
                <div style={{ gridRow: 2, gridColumn: 2 }} className='circle-grid-controller'>
                    <button onClick={() => grid.shift()}>shift me</button>
                    <button onClick={() => grid.reverse()}>reverse</button>
                    <HotkeyTooltip className='circle-grid-hotkeys' hotkeys={['→', '←', 'R']}/>
                </div>
            )}
        </div>
    )
}