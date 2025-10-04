import { useCircleGrid } from '../hooks/useCircleGrid';
import './CircleGrid.css';
import { motion } from "motion/react"
import { HotkeyTooltip } from '../../hotkeytooltip/components/HotkeyTooltip';

import randomImg from '../assets/random.svg';
import reverseImg from '../assets/reverse.svg';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { useCircleGridHotkeys } from '../hooks/useCircleGridHotkeys';

interface Props {
    controller?: boolean;
}

export const CircleGrid = ({ controller=true }: Props) => {
    const grid = useCircleGrid();
    const hotkeys = useCircleGridHotkeys(grid);
    const isMobile = useMediaQuery(768);

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
            { controller && (
                <div style={{ gridRow: 2, gridColumn: 2 }} className='circle-grid-controller'>
                    <h3>Controller</h3>

                    <button className='circle-grid-button-left'
                    onClick={() => grid.unshift()}>
                        ←
                    </button>

                    <button className='circle-grid-button-right'
                    onClick={() => grid.shift()}>
                        →
                    </button>

                    <div className='circle-grid-bottom-bar'>
                        <button onClick={() => grid.reverse()}>
                            <img src={reverseImg} alt=''/>
                            { !isMobile && (
                                <span>
                                    Flip
                                </span>
                            )}
                        </button>

                        <button onClick={() => grid.random()}>
                            <img src={randomImg} alt=''/>
                            { !isMobile && (
                                <span>
                                    Random
                                </span>
                            )}
                        </button>
                    </div>

                    <HotkeyTooltip className='circle-grid-hotkeys' hotkeys={['→', '←', 'F', 'R']}/>
                </div>
            )}
        </div>
    )
}