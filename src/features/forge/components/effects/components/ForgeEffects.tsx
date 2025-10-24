import { EffectMenuProvider } from '../../../context/EffectMenuContext';
import { useForgeContext } from '../../../context/ForgeContext';
import { ForgeEffect } from './ForgeEffect';
import './ForgeEffects.css';

export const ForgeEffects = () => {
    const [state, dispatch] = useForgeContext();

    return (
        <EffectMenuProvider>
            <div
                className='forge-effects-container'
                onPointerLeave={() =>
                    dispatch({ type: 'SELECT_EFFECT', effectIdx: false })
                }
                onPointerDown={() => {
                    dispatch({ type: 'SELECT_EFFECT', effectIdx: false })
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
