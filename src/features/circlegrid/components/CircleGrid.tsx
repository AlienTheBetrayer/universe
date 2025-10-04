import { useCircleGrid } from '../hooks/useCircleGrid';
import './CircleGrid.css';
import { motion } from "motion/react"
import { useCircleGridHotkeys } from '../hooks/useCircleGridHotkeys';
import { CircleGridController } from './CircleGridController';
import { CircleGridNavigation } from './CircleGridNavigation';
import { cssVariable } from '../../../utils/cssVariable';

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
                style={{ 
                    gridRow: grid.row(idx + 1), gridColumn: grid.column(idx + 1),
                    borderWidth: idx === grid.coloredIdx ? 0 : 2,
                    borderColor: idx === grid.coloredIdx ? '#00000000' : cssVariable('--background-6'),
                }}
                animate={{
                    background: `linear-gradient(317deg, 
                        ${idx === grid.coloredIdx ? '#0b0b41' : '#00000000'}, 
                        ${idx === grid.coloredIdx ? '#4141c9' : '#00000000'}`,
                }}
                transition={{ 
                    layout: { ease: 'backInOut', duration: (1 + idx / 5) },
                }}>
                    <button className={`circle-grid-main-button ${idx === grid.coloredIdx ? 'circle-grid-main-button-selected' : ''}`} onClick={() => grid.setColoredIdx(idx)}>
                        { idx + 1 }
                    </button>

                    <div className='circle-grid-dots' 
                    style={{
                        backgroundImage: idx === grid.coloredIdx ? `radial-gradient(#fff 1px, transparent 0)` :
                        `radial-gradient(${cssVariable('--background-5')} 1px, transparent 0)`
                     }}/>
                </motion.div>   
            ))}

            <CircleGridNavigation data={grid}/>
            
            { controller && <CircleGridController data={grid}/>}
        </div>
    )
}