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

    const h1: AnimatedText[] = [
        {
            text: 'Redefining ',
            type: 'default'
        },
        {
            text: 'innovation',
            type: 'error',
        },
        {
            text: ' through personal projects',
            type: 'default'
        }
    ]

    const p: AnimatedText[] = [
        {
            text: 'Leveraging technology and design to transform personal initiatives into sophisticated, ',
            type: 'default'
        },
        {
            text: 'forward-thinking solutions',
            type: 'underline'
        },
        {
            text: ', that exemplify creativity, technical excellence, and impactful innovation.',
            type: 'default'
        }
    ];

    return (
        <section className='heading-section container'>
            <AnimatedText as='h1' delay={0.3} text={h1}/>
            <AnimatedText as='p' delay={2.8} text={p}/>

            <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 3.5, duration: 1 }}>
                <ListButton className='heading-effects' elements={Object.values(VectorTypes)} onSelected={handleSelect}/>
            </motion.div>
        </section>
    )
}