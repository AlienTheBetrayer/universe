import { forwardRef } from 'react';
import './IntroSection.css';

export const IntroSection = forwardRef<HTMLElement>(({}, ref) => {
    
    return (
        <section className='intro-section container' ref={ref}>

        </section>
    )
});