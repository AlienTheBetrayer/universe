import './LockSection.css';
import { useRef } from 'react';
import { LockCanvas } from '../components/LockCanvas';

export const LockSection = () => {
    const scrollRef = useRef<HTMLElement>(null);

    return (
        <section ref={scrollRef} className='sphere-canvas-container'>
            <div className='sphere-canvas-lock'>
                <LockCanvas ref={scrollRef}/>
            </div>
        </section>
    )
}