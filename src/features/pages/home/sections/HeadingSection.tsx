import './HeadingSection.css';

import { AnimatedText } from '../../../animatedtext/components/AnimatedText';
import { AnimatePresence, motion } from 'motion/react';
import { ListButton } from '../../../ui/ListButton/ListButton';
import {
    InteractiveParticlesVectors,
    useInteractiveParticlesContext,
} from '../../../interactiveparticles/context/InteractiveParticlesContext';
import { useTooltips } from '../../../tooltip/hooks/useTooltips';
import { useLocalStore } from '../../../../zustand/localStore';

export const HeadingSection = () => {
    const [context, setContext] = useInteractiveParticlesContext();
    const { theme } = useLocalStore();

    const h1: AnimatedText[] = [
        {
            text: 'Shaping ',
            type: 'regular',
        },
        {
            text: 'vision into reality',
            type: 'mark',
        },
        {
            text: ' through a decade of craft.',
            type: 'regular',
        },
    ];

    const p: AnimatedText[] = [
        {
            text: 'Translating complex ideas into ',
            type: 'regular',
        },
        {
            text: 'coherent systems',
            type: 'highlight',
        },
        {
            text: ' that balance design integrity and technical depth, ',
            type: 'regular',
        },
        {
            text: 'crafting ',
            type: 'regular',
        },
        {
            text: 'meaningful digital experiences ',
            type: 'mark',
        },
        {
            text: 'that evolve with purpose — minimizing noise, mitigating ',
            type: 'regular',
        },
        {
            text: 'fragile execution',
            type: 'error',
        },
        {
            text: ', and driving outcomes rooted in clarity, ',
            type: 'regular',
        },
        {
            text: 'precision',
            type: 'highlight',
        },
        {
            text: ', and measurable value.',
            type: 'regular',
        },
    ];

    const tooltips = useTooltips();

    return (
        <section className='heading-section container'>
            {tooltips.render()}

            <AnimatedText as='h1' delay={0.3} text={h1} />
            <AnimatedText as='p' delay={2.8} text={p} />

            <motion.div
                className='heading-section-menu'
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 3.5, duration: 1 }}
            >
                <ListButton
                    className='heading-effects'
                    elements={[...InteractiveParticlesVectors]}
                    onSelected={(idx) =>
                        setContext((prev) => ({
                            ...prev,
                            vectorType: InteractiveParticlesVectors[idx],
                        }))
                    }
                >
                    Formula:
                </ListButton>

                <AnimatePresence>
                    {theme === 'dark' && (
                        <motion.div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem',
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <p>
                                Bloom{' '}
                                <mark>
                                    <b>Strength</b>
                                </mark>
                            </p>

                            <input
                                className='heading-section-bloom-strength'
                                ref={(el) =>
                                    tooltips.set(
                                        0,
                                        'Set bloom strength',
                                        el,
                                        'down',
                                    )
                                }
                                type='range'
                                aria-label='Bloom Strength'
                                min={0}
                                max={128}
                                value={context.bloomStrength}
                                onChange={(e) =>
                                    setContext((prev) => ({
                                        ...prev,
                                        bloomStrength: Number(e.target.value),
                                    }))
                                }
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
};
