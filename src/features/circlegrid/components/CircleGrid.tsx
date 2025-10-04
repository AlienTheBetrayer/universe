import { useCircleGrid } from '../hooks/useCircleGrid';
import './CircleGrid.css';
import { motion } from "motion/react"

export const CircleGrid = () => {
    const grid = useCircleGrid();

    return (
        <>
            <button onClick={() => grid.shift()}>shift me</button>
            <div className='circle-grid'>
                { Array.from({ length: 8 }).map((_ ,idx) => (
                    <motion.div
                    layout
                    style={{ gridRow: grid.row(idx + 1), gridColumn: grid.column(idx + 1)}}>
                        { idx + 1 }
                    </motion.div>                    
                ))}
            </div>
        </>
    )
}