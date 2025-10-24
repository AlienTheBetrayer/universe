import { AnimatePresence } from 'motion/react';
import { useForgeContext } from '../../../context/ForgeContext';
import './ForgeAwaiting.css';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { Button } from '../../../../ui/Button/components/Button';

export const ForgeAwaiting = () => {
    const [state] = useForgeContext();

    const card = useMemo(() => {
        return state.awaitingActionIdx !== false
            ? state.cards[state.awaitingActionIdx]
            : undefined;
    }, [state.awaitingActionIdx]);
    console.log();
    return (
        <AnimatePresence>
            {state.awaitingActionIdx !== false && card && (
                <motion.div
                    className='forge-awaiting'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className='forge-awaiting-border' />

                    <motion.div
                        className='forge-awaiting-title'
                        initial={{ opacity: 0, y: -200, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        transition={{
                            delay: 0.5,
                            type: 'spring',
                            stiffness: 200,
                            damping: 40,
                        }}
                    >
                        <Button style={{ marginBottom: '2rem' }}>Cancel</Button>
                        <h3>
                            Waiting for the <mark>action...</mark>
                        </h3>
                        <p>
                            you need to choose an <b>effect slot</b>
                        </p>
                        <p>
                            in order to make it work like{' '}
                            <b>
                                <mark>
                                    {card.type[0].toUpperCase() +
                                        card.type.substring(1)}
                                </mark>
                            </b>
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
