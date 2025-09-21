import './HeadingSection.css';

import { motion } from "motion/react"
import { HomeCanvas } from "../components/HomeCanvas"
import { AnimatedText } from '../../animatedtext/components/AnimatedText';

export const HeadingSection = () => {
    return (
        <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, type: 'spring', stiffness: 200, damping: 200 }}
        className='heading-section'>
            <div className='heading-section-intro'>
                <AnimatedText className='heading-animated-text'>
                    Redefining innovation through personal projects
                </AnimatedText>
                <p>Leveraging technology and design to transform personal initiatives into sophisticated, forward-thinking solutions that exemplify creativity, technical excellence, and impactful innovation.</p>
            </div>

            <div className='heading-grid'>
                <div>
                    <h2>Showcasing:</h2>

                    <div className='heading-showcase-grid'>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div>
                    <h2>Showcasing:</h2>

                    <div className='heading-showcase-grid'>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
            <HomeCanvas/>
        </motion.section>
    )
}