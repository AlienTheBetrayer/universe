import { useClickOutside } from '../../../../../hooks/useClickOutside';
import { EffectMenuProvider } from '../../../context/EffectMenuContext';
import { useForgeContext } from '../../../context/ForgeContext';
import { ForgeEffect } from './ForgeEffect';
import './ForgeEffects.css';

export const ForgeEffects = () => {
    const [state, dispatch] = useForgeContext();

    const containerRef = useClickOutside<HTMLDivElement>(() => {
        if (state.currentEffectHoveredIdx)
            state.currentEffectHoveredIdx.current = false;
    });

    return (
        <EffectMenuProvider>
            <div
                ref={containerRef}
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
            </div>
        </EffectMenuProvider>
    );
};
