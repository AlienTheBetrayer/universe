import { useForgeContext } from '../../../context/ForgeContext';
import { ForgeEffect } from './ForgeEffect';
import './ForgeEffects.css';

interface Props {}

export const ForgeEffects = () => {
    const [, dispatch] = useForgeContext();

    return (
        <div className='forge-effects-container'>
            <h3>
                <mark>Effects</mark>
            </h3>
            <div className='forge-effects'>
                {Array.from({ length: 9 }).map((_, idx) => (
                    <ForgeEffect
                        key={idx}
                        ref={(el) =>
                            dispatch({
                                type: 'SET_EFFECT_REF',
                                idx: idx,
                                element: el === null ? null : el,
                            })
                        }
                    />
                ))}
            </div>
        </div>
    );
};
