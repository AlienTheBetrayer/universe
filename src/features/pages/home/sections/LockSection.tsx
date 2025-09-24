import './LockSection.css';
import { useRef } from 'react';
import { IcosahedronCanvas } from '../components/IcosahedronCanvas';

export const LockSection = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={scrollRef} className='sphere-canvas-container container'>
            <div className='sphere-canvas-lock'>
                <IcosahedronCanvas ref={scrollRef}/>
            </div>
        </div>
    )
}