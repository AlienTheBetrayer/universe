import './CircleGrid.css';
import { motion } from "motion/react"

export const CircleGrid = () => {
    return (
        <div className='circle-grid'>
                <motion.div layout style={{  }}>1</motion.div>
                <motion.div layout style={{}} >2</motion.div>
                <motion.div layout>3</motion.div>
                <motion.div layout>4</motion.div>
                <motion.div layout>5</motion.div>
                <motion.div layout>6</motion.div>
                <motion.div layout>7</motion.div>
                <motion.div layout>8</motion.div>
                <motion.div layout>9</motion.div>
        </div>
    )
}