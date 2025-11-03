import type { RefObject } from 'react';
import { useClickOutside } from '../../../../../hooks/useClickOutside';
import { EffectMenuProvider } from '../../../context/EffectMenuContext';
import { useForgeContext } from '../../../context/ForgeContext';
import { ForgeBonusEffect } from './ForgeBonusEffect';
import { ForgeEffect } from './ForgeEffect';
import './ForgeEffects.css';

interface Props {
    wrapperRef?: RefObject<HTMLDivElement | null>;
}

export const ForgeEffects = ({ wrapperRef }: Props) => {
    const [state, dispatch] = useForgeContext();

    const containerRef = useClickOutside<HTMLDivElement>(() => {
        if (state.currentEffectHoveredIdx)
            state.currentEffectHoveredIdx.current = false;
    });

    return (
        <EffectMenuProvider>
            <div
                ref={(el) => {
                    containerRef.current = el;
                    if (wrapperRef) wrapperRef.current = el;
                }}
                className='forge-effects-container'
                onPointerLeave={() => {
                    if (state.currentEffectHoveredIdx)
                        state.currentEffectHoveredIdx.current = false;
                }}
            >
                <h3>
                    <mark>Effects</mark>
                </h3>

                <div className='forge-effects'>
                    {Array.from({ length: 9 }).map((_, idx) => (
                        <ForgeEffect
                            state={state}
                            dispatch={dispatch}
                            key={idx}
                            idx={idx}
                            effectData={state.effectSlots.find(
                                (e) => e.effectIdx === idx
                            )}
                        />
                    ))}
                </div>

                <ForgeBonusEffect />
            </div>
        </EffectMenuProvider>
    );
};
