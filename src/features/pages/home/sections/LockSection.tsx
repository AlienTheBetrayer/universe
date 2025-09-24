import './LockSection.css';
import { useRef } from 'react';
import { LockSectionCanvas } from '../components/LockSectionCanvas';

export const LockSection = () => {
    const scrollRef = useRef<HTMLElement>(null);

    return (
        <section ref={scrollRef} className='sphere-canvas-container'>
            <div className='sphere-canvas-lock'>
                <LockSectionCanvas ref={scrollRef}/>
            </div>
        </section>
    )
}