import { AnimatePresence } from 'motion/react';
import { Button } from '../../../../ui/Button/components/Button';
import type { ForgeReducerAction } from '../../../context/reducer/ForgeReducer';
import type { ForgeData } from '../../../context/types/data';
import './ForgeEffect.css';

import { motion } from 'motion/react';

interface Props {
    cardIdx: number | undefined;
    state: ForgeData;
    dispatch: React.Dispatch<ForgeReducerAction>;
}

export const ForgeEffect = ({ cardIdx, state, dispatch }: Props) => {
    return (
        <div
            className={`forge-effect ${
                state.dragging ? 'forge-effect-hover' : ''
            }`}
        >
            <AnimatePresence>
                {cardIdx !== undefined && (
                    <motion.div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                        }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{
                            type: 'spring',
                            stiffness: 200,
                            damping: 25,
                        }}
                    >
                        <div className='forge-effect-topline'>
                            <Button
                                onClick={() => {
                                    dispatch({
                                        type: 'REMOVE_EFFECT_SLOT',
                                        cardIdx: cardIdx,
                                    });
                                }}
                                className='forge-cancel-button'
                                style={{ marginLeft: 'auto' }}
                            >
                                ✕
                            </Button>
                        </div>
                        <div className='forge-effect-main'>
                            <h3>{state.cards[cardIdx].type}</h3>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
