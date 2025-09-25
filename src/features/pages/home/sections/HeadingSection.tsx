import './HeadingSection.css';

import { AnimatedText } from '../../../animatedtext/components/AnimatedText';
import { motion } from 'motion/react';
import { ListButton } from '../../../ui/ListButton/ListButton';
import { useHeadingContext, VectorTypes } from '../context/HeadingContext';

export const HeadingSection = () => {
    const [, setParticlesData] = useHeadingContext();

    const handleSelect =  (idx: number) => {
        setParticlesData(prev => ({...prev, vectorType: Object.values(VectorTypes)[idx]}))
    }

    return (
        <section className='heading-section container'>
            <AnimatedText as='h1' speed={1} delay={0.3}>
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
        </section>
    )
}