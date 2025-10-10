import { useCircleGrid } from '../hooks/useCircleGrid';
import './CircleGrid.css';
import { motion } from "motion/react"
import { useCircleGridHotkeys } from '../hooks/useCircleGridHotkeys';
import { CircleGridController } from './CircleGridController';
import { CircleGridNavigation } from './CircleGridNavigation';
import { useTooltips } from '../../tooltip/hooks/useTooltips';

interface Props {
    controller?: boolean;
}

export const CircleGrid = ({ controller=true }: Props) => {
    const grid = useCircleGrid();
    const hotkeys = useCircleGridHotkeys(grid);

    const tooltips = useTooltips();

    return (
        <div className='circle-grid'
        tabIndex={0}
        onPointerOver={() => hotkeys.setFocused(true)}
        onBlur={() => { hotkeys.setFocused(false) } }
        onClick={() => hotkeys.setFocused(true)}>
            { Array.from({ length: 8 }).map((_ ,idx) => (
                <motion.div
                className={`circle-grid-element ${idx === grid.coloredIdx ? 'circle-grid-element-selected' : ''}`}
                key={idx}
                layout
                style={{ 
                    gridRow: grid.row(idx + 1), gridColumn: grid.column(idx + 1),
                }}
                transition={{ 
                    layout: { ease: 'backInOut', duration: (1 + idx / 5) },
                }}>
                    <button className={`circle-grid-main-button ${idx === grid.coloredIdx ? 'circle-grid-main-button-selected' : ''}`}
                    ref={el => tooltips.set(idx, 'Paint / Select this element', el, 'up')}
                    onClick={() => grid.setColoredIdx(idx)}>
                        { idx + 1 }
                    </button>

                    <div className={`circle-grid-dots ${idx === grid.coloredIdx ? 'circle-grid-dots-selected' : ''}`}/>
                </motion.div>   
            ))}

            <CircleGridNavigation data={grid}/>
            
            { controller && <CircleGridController data={grid}/>}

            { tooltips.render() }
        </div>
    )
}