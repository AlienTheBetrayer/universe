import './HeadingSection.css';

import { AnimatedText } from '../../../animatedtext/components/AnimatedText';
import { SphereCard } from '../../../spherecard/components/SphereCard';

import { motion } from 'motion/react';
import { ListButton } from '../../../ui/ListButton/ListButton';
import { useParticlesContext, VectorTypes } from '../context/ParticlesContext';

export const HeadingSection = () => {
    return (
        <section className='heading-section container'>
            <Intro/>
            <Grid/>

        </section>
    )
}

const Intro = () => {
    const [, setParticlesData] = useParticlesContext();

    const handleSelect =  (idx: number) => {
        setParticlesData(prev => ({...prev, vectorType: Object.values(VectorTypes)[idx]}))
    }

    return (
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
                <ListButton className='heading-effects' elements={Object.values(VectorTypes)} onSelected={handleSelect}/>
            </motion.div>
        </div>
    )
}

const Grid = () => {
    return (
        <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}>
            <div className='heading-grid'>
                <div>
                    <h2>Showcasing:</h2>

                    <div className='heading-showcase-grid'>
                        <SphereCard title='hi' description='something imporatnt' hoverDescription='somethign even more importantthat you might not have even thought about'/>
                        <SphereCard/>
                        <SphereCard/>
                        <SphereCard/>
                    </div>
                </div>
                <div>
                    <h2>Showcasing:</h2>

                    <div className='heading-showcase-grid'>
                        <SphereCard/>
                        <SphereCard/>
                        <SphereCard/>
                        <SphereCard/>
    
                    </div>
                </div>
            </div>
        </motion.div>
    )
}