import './HeadingSection.css';

import { AnimatedText } from '../../animatedtext/components/AnimatedText';
import { HoverCard } from '../../hovercard/components/HoverCard';

import { motion } from 'motion/react';
import { ListButton } from '../../../shared/ListButton/ListButton';

export const HeadingSection = () => {
    return (
        <section className='heading-section container'>
            <div className='heading-section-intro'>
                <AnimatedText as='h1' delay={0.3}>
                    Redefining innovation through personal projects
                </AnimatedText>
                <AnimatedText as='p' speed={8} delay={2.8}>
                    Leveraging technology and design to transform personal initiatives into sophisticated, forward-thinking solutions that exemplify creativity, technical excellence, and impactful innovation.
                </AnimatedText>
                <motion.div
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 3.5, duration: 1 }}>
                    <ListButton className='heading-effects' elements={['Propulsion', 'Repulsion', 'Waves', 'Tangent']}/>
                </motion.div>
            </div>

            <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 4, duration: 1 }}>
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
            </motion.div>
        </section>
    )
}