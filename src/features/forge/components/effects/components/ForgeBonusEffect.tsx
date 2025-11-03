import { useForgeContext } from '../../../context/ForgeContext';
import './ForgeBonusEffect.css';

import { motion } from 'motion/react';

export const ForgeBonusEffect = () => {
    const [state] = useForgeContext();

    return (
        <div
            className='forge-bonus-effect'
            style={{
                borderColor: `hsl(224, ${state.effectSlots.length * 10}%, 50%)`,
            }}
        >
            <motion.span
                className='forge-bonus-effect-not-ready'
                key={state.effectSlots.length}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                style={{
                    color: `hsl(224, ${state.effectSlots.length * 10}%, 50%)`,
                }}
            >
                {state.effectSlots.length} / 9
            </motion.span>
            <span
                className='forge-bonus-effect-question'
                style={{
                    color: `hsla(224, ${
                        state.effectSlots.length * 10
                    }%, 30%, 0.2)`,
                }}
            >
                ?
            </span>
        </div>
    );
};
