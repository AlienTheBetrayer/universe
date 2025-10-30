import { AnimatePresence } from 'motion/react';
import { Button } from '../../../../ui/Button/components/Button';
import type { ForgeReducerAction } from '../../../context/reducer/ForgeReducer';
import './ForgeEffect.css';

import { motion } from 'motion/react';
import { useRef } from 'react';
import { useTooltips } from '../../../../tooltip/hooks/useTooltips';
import { useEffectMenuContext } from '../../../context/EffectMenuContext';
import type { ForgeData } from '../../../context/types/forge/data';
import {
    ForgeWorldEffects,
    type ForgeEffectData,
} from '../../../context/types/forge/effects';
import { ForgeEffectMenu } from './ForgeEffectMenu';

interface Props {
    idx: number;
    state: ForgeData;
    dispatch: React.Dispatch<ForgeReducerAction>;
    effectData: ForgeEffectData | undefined;
}

export const ForgeEffect = ({ effectData, idx, state, dispatch }: Props) => {
    return (
        <div
            onPointerEnter={() => {
                if (state.currentEffectHoveredIdx)
                    state.currentEffectHoveredIdx.current = idx;
            }}
            onPointerDown={() => {
                if (state.currentEffectHoveredIdx)
                    state.currentEffectHoveredIdx.current = idx;
            }}
            className={`forge-effect 
            ${state.cardDraggingIdx !== false ? 'forge-effect-hover' : ''} 
            ${effectData !== undefined ? 'forge-effect-filled' : ''}
            ${effectData?.enabled === false ? 'forge-effect-disabled' : ''}`}
        >
            <ForgeEffectAwaiting state={state} dispatch={dispatch} idx={idx} />
            <ForgeEffectFilled effectData={effectData} dispatch={dispatch} />
            <AnimatePresence>
                {effectData === undefined &&
                    state.cardDraggingIdx === false &&
                    state.awaitingActionIdx === false && (
                        <ForgeEffectEmpty
                            state={state}
                            dispatch={dispatch}
                            idx={idx}
                        />
                    )}
            </AnimatePresence>
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
                state.awaitingActionIdx === false &&
                state.cardDraggingIdx === false
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

interface FilledProps {
    effectData: ForgeEffectData | undefined;
    dispatch: React.Dispatch<ForgeReducerAction>;
}

export const ForgeEffectFilled = ({ effectData, dispatch }: FilledProps) => {
    const tooltips = useTooltips();

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
                    animate={{
                        opacity: effectData.enabled ? 1 : 0.3,
                        scale: 1,
                    }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 25,
                    }}
                >
                    {tooltips.render()}

                    <div className='forge-effect-topline'>
                        <Button
                            ref={(el) =>
                                tooltips.set(
                                    0,
                                    '<mark>Toggle</mark> effect',
                                    el,
                                    'up'
                                )
                            }
                            style={{
                                padding: '0.3rem',
                                minWidth: 'fit-content',
                                minHeight: 'fit-content',
                                pointerEvents: 'all',
                            }}
                            onClick={() =>
                                dispatch({
                                    type: 'TOGGLE_EFFECT',
                                    effectIdx: effectData.effectIdx,
                                })
                            }
                        >
                            <img
                                src={effectData.card.image}
                                className={`${
                                    effectData.card.inverted
                                        ? 'forge-image-inverted'
                                        : ''
                                }`}
                                style={{
                                    width: '1.2rem',
                                    height: '1.2rem',
                                }}
                            />
                        </Button>
                        <p className='forge-effect-topline-title'>
                            {effectData.card.title}
                        </p>
                        <Button
                            ref={(el) =>
                                tooltips.set(
                                    1,
                                    '<u>Delete</u> effect',
                                    el,
                                    'up'
                                )
                            }
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
                    <div className='forge-effect-main'>
                        <p>{ForgeWorldEffects[effectData.card.type].name}</p>
                        <div className='forge-effect-main-emoji'>
                            {ForgeWorldEffects[effectData.card.type].emoji}
                        </div>
                        <input
                            style={{ width: '100%' }}
                            type='range'
                            value={
                                effectData.strength ??
                                ForgeWorldEffects[effectData.card.type].strength
                                    .min
                            }
                            step={0.01}
                            max={
                                ForgeWorldEffects[effectData.card.type].strength
                                    .max
                            }
                            min={
                                ForgeWorldEffects[effectData.card.type].strength
                                    .min
                            }
                            onChange={(e) =>
                                dispatch({
                                    type: 'ADJUST_EFFECT_STRENGTH',
                                    effectIdx: effectData.effectIdx,
                                    strength: Number(e.target.value),
                                })
                            }
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

interface EmptyProps {
    state: ForgeData;
    dispatch: React.Dispatch<ForgeReducerAction>;
    idx: number;
}

export const ForgeEffectEmpty = ({ state, dispatch, idx }: EmptyProps) => {
    const [menuState, setMenuState] = useEffectMenuContext();
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
        <motion.div
            className='forge-effect-empty'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
        >
            <Button
                ref={buttonRef}
                className='forge-effect-empty-button'
                onClick={() =>
                    setMenuState((prev) => ({
                        ...prev,
                        menuIdx: prev.menuIdx === idx ? false : idx,
                    }))
                }
            >
                Add an <mark>effect</mark>
            </Button>

            <AnimatePresence>
                {menuState.menuIdx === idx && (
                    <ForgeEffectMenu
                        buttonRef={buttonRef}
                        onSelect={() => {
                            setMenuState((prev) => ({
                                ...prev,
                                menuIdx: false,
                            }));
                        }}
                        state={state}
                        dispatch={dispatch}
                        idx={idx}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};
