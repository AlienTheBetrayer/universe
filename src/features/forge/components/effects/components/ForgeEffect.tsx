import { AnimatePresence } from 'motion/react';
import { Button } from '../../../../ui/Button/components/Button';
import type { ForgeReducerAction } from '../../../context/reducer/ForgeReducer';
import type { ForgeData } from '../../../context/types/data';
import './ForgeEffect.css';

import { motion } from 'motion/react';
import type { ForgeEffectData } from '../../../context/types/effects';

interface Props {
    idx: number;
    state: ForgeData;
    effectData: ForgeEffectData | undefined;
    dispatch: React.Dispatch<ForgeReducerAction>;
}

export const ForgeEffect = ({ effectData, idx, state, dispatch }: Props) => {
    return (
        <div
            className={`forge-effect ${
                state.cardDraggingIdx !== false ? 'forge-effect-hover' : ''
            } ${effectData !== undefined ? 'forge-effect-filled' : ''}`}
        >
            <ForgeEffectAwaiting state={state} dispatch={dispatch} idx={idx} />
            <ForgeEffectFilled effectData={effectData} dispatch={dispatch} />
        </div>
    );
};

interface AwaitingProps {
    state: ForgeData;
    dispatch: React.Dispatch<ForgeReducerAction>;
    idx: number;
}

export const ForgeEffectAwaiting = ({
    state,
    dispatch,
    idx,
}: AwaitingProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, display: 'none' }}
            animate={
                state.awaitingActionIdx === false && state.cardDraggingIdx === false
                    ? { opacity: 0, transition: { duration: 0.3 } }
                    : {
                          opacity: [0, 1, 0],
                          display: 'flex',
                          transition: {
                              duration: 1.5,
                              ease: 'easeInOut',
                              repeat: Infinity,
                              delay: idx / 25 + Math.random() / 10,
                          },
                      }
            }
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
            <Button
                className='forge-effect-await'
                onClick={() => {
                    dispatch({
                        type: 'SET_EFFECT_SLOT',
                        effectIdx: idx,
                        card: state.cards.find(
                            (c) => c.idx === state.awaitingActionIdx
                        )!,
                    });
                    dispatch({ type: 'AWAIT_ACTION', cardIdx: false });
                }}
            >
                +
            </Button>
        </motion.div>
    );
};

interface DataProps {
    effectData: ForgeEffectData | undefined;
    dispatch: React.Dispatch<ForgeReducerAction>;
}

export const ForgeEffectFilled = ({ effectData, dispatch }: DataProps) => {
    return (
        <AnimatePresence>
            {effectData && (
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
                        <p>{effectData.card.type}</p>
                        <Button
                            onClick={() => {
                                dispatch({
                                    type: 'REMOVE_EFFECT_SLOT',
                                    cardIdx: effectData.card.idx,
                                });
                            }}
                            className='forge-cancel-button'
                            style={{ marginLeft: 'auto' }}
                        >
                            ✕
                        </Button>
                    </div>
                    <div className='forge-effect-main'></div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
