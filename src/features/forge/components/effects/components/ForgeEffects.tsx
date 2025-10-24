import { useForgeContext } from '../../../context/ForgeContext';
import { ForgeEffect } from './ForgeEffect';
import './ForgeEffects.css';

export const ForgeEffects = () => {
    const [state, dispatch] = useForgeContext();

    return (
        <div className='forge-effects-container'>
            <h3>
                <mark>Effects</mark>
            </h3>
            <div className={`forge-effects ${state.dragging ? 'forge-effects-awaiting' : ''}`}>
                {Array.from({ length: 9 }).map((_, idx) => (
                    <ForgeEffect
                        state={state}
                        dispatch={dispatch}
                        key={idx}
                        cardIdx={state.effectSlots.get(idx)}
                    />
                ))}
            </div>
        </div>
    );
};
