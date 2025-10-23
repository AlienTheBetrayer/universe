import { ForgeEffect } from './ForgeEffect';
import './ForgeEffects.css';

interface Props {}

export const ForgeEffects = () => {
    return (
        <div className='forge-effects-container'>
            <h3>
                <mark>Effects</mark>
            </h3>
            <div className='forge-effects'>
                {Array.from({ length: 9 }).map((_, idx) => (
                    <ForgeEffect key={idx} />
                ))}
            </div>
        </div>
    );
};
