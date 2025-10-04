import { useCircleGrid } from '../hooks/useCircleGrid';
import './CircleGrid.css';
import { motion } from "motion/react"
import { useCircleGridHotkeys } from '../hooks/useCircleGridHotkeys';
import { CircleGridController } from './CircleGridController';
import { CircleGridNavigation } from './CircleGridNavigation';

interface Props {
    controller?: boolean;
}

export const CircleGrid = ({ controller=true }: Props) => {
    const grid = useCircleGrid();
    const hotkeys = useCircleGridHotkeys(grid);

    return (
        <div className='circle-grid'
        tabIndex={0}
        onPointerOver={() => hotkeys.setFocused(true)}
        onBlur={() => { hotkeys.setFocused(false) } }
        onClick={() => hotkeys.setFocused(true)}>
            { Array.from({ length: 8 }).map((_ ,idx) => (
                <motion.div
                className='circle-grid-element'
                key={idx}
                layout
                style={{ gridRow: grid.row(idx + 1), gridColumn: grid.column(idx + 1)}}
                whileHover={{ scale: 1.1, filter: 'brightness(3)', transition: { type: 'spring', stiffness: 64, damping: 4 } }}
                transition={{ layout: { ease: 'backInOut', duration: (1 + idx / 5) } }}>
                    { idx + 1 }
                </motion.div>   
            ))}

            <CircleGridNavigation data={grid}/>
            
            { controller && <CircleGridController data={grid}/>}
        </div>
    )
}