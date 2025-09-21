import './HeadingSection.css';

import { motion } from "motion/react"
import { HomeCanvas } from "../components/HomeCanvas"

export const HeadingSection = () => {
    return (
        <motion.section
        initial={{opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, type: 'spring', stiffness: 200, damping: 200 }}
        className='section-heading'>
            <h1>The beginning of something great</h1>
            <p>more info here...</p>

            <HomeCanvas/>
        </motion.section>
    )
}