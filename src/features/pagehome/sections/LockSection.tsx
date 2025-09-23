import './LockSection.css';
import { useRef } from 'react';
import { SphereCanvas } from '../components/SphereCanvas';

export const LockSection = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={scrollRef} className='sphere-canvas-container'>
            <div className='sphere-canvas-lock'>
                <SphereCanvas ref={scrollRef}/>
            </div>
        </div>
    )
}