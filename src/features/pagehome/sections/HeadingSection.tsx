import './HeadingSection.css';

import { motion } from "motion/react"
import { AnimatedText } from '../../animatedtext/components/AnimatedText';
import { HoverCard } from '../../hovercard/components/HoverCard';

export const HeadingSection = () => {
    return (
        <motion.section
        transition={{ delay: 0.5, duration: 1, type: 'spring', stiffness: 200, damping: 200 }}
        className='heading-section'>
            <div className='heading-section-intro'>
                <AnimatedText as='h1' delay={0.3}>
                    Redefining innovation through personal projects
                </AnimatedText>
                <br/>
                <br/>
                <AnimatedText as='p' speed={8} delay={2.8}>
                    Leveraging technology and design to transform personal initiatives into sophisticated, forward-thinking solutions that exemplify creativity, technical excellence, and impactful innovation.
                </AnimatedText>
            </div>

            <div className='heading-grid'>
                <div>
                    <h2>Showcasing:</h2>

                    <div className='heading-showcase-grid'>
                        <HoverCard/>
                        <HoverCard/>
                        <HoverCard/>
                        <HoverCard/>
                    </div>
                </div>
                <div>
                    <h2>Showcasing:</h2>

                    <div className='heading-showcase-grid'>
                        <HoverCard/>
                        <HoverCard/>
                        <HoverCard/>
                        <HoverCard/>
                    </div>
                </div>
            </div>
        </motion.section>
    )
}