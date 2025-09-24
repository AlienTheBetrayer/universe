import './LockSection.css';
import { useRef } from 'react';
import { LockSectionCanvas } from '../components/LockSectionCanvas';

export const LockSection = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={scrollRef} className='sphere-canvas-container'>
            <div className='sphere-canvas-lock'>
                <LockSectionCanvas ref={scrollRef}/>
            </div>
        </div>
    )
}