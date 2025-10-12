import './HeadingSection.css';

import { AnimatedText } from '../../../animatedtext/components/AnimatedText';
import { motion } from 'motion/react';
import { ListButton } from '../../../ui/ListButton/ListButton';
import { useInteractiveParticlesContext, VectorTypes } from '../../../interactiveparticles/context/InteractiveParticlesContext';

export const HeadingSection = () => {
    const [, setParticlesData] = useInteractiveParticlesContext();

    const handleSelect =  (idx: number) => {
        setParticlesData(prev => ({...prev, vectorType: Object.values(VectorTypes)[idx]}))
    }

    const h1: AnimatedText[] = [
        {
            text: 'Shaping ',
            type: 'regular'
        },
        {
            text: 'vision into reality',
            type: 'mark'
        },
        {
            text: ' through a decade of craft.',
            type: 'regular'
        }
    ];

    const p: AnimatedText[] = [
        {
            text: 'Translating complex ideas into ',
            type: 'regular'
        },
        {
            text: 'coherent systems',
            type: 'highlight'
        },
        {
            text: ' that balance design integrity and technical depth, ',
            type: 'regular'
        },
        {
            text: 'crafting ',
            type: 'regular'
        },
        {
            text: 'meaningful digital experiences ',
            type: 'mark'
        },
        {
            text: 'that evolve with purpose — minimizing noise, mitigating ',
            type: 'regular'
        },
        {
            text: 'fragile execution',
            type: 'error'
        },
        {
            text: ', and driving outcomes rooted in clarity, ',
            type: 'regular'
        },
        {
            text: 'precision',
            type: 'highlight'
        },
        {
            text: ', and measurable value.',
            type: 'regular'
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
                <ListButton className='heading-effects' elements={Object.values(VectorTypes)} onSelected={handleSelect}>
                    Formula: 
                </ListButton>
            </motion.div>
        </section>
    )
}