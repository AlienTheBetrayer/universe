import { useRef } from 'react';
import { CircleGrid } from '../../../circlegrid/components/CircleGrid';
import './ShiftingSection.css';
import { useInView } from 'motion/react';
import { RevealingContainer } from '../../../revealingcontainer/components/RevealingContainer';

export const ShiftingSection = () => {
    const ref = useRef<HTMLElement>(null);
    const isVisible = useInView(ref, { once: true });

    return (
        <RevealingContainer>
            <section ref={ref} className='shifting-section container'>
                <h2>
                    Shifting <mark>capabilities</mark>
                </h2>

                {isVisible && (
                    <div className='shifting-section-grid'>
                        <CircleGrid />
                    </div>
                )}
            </section>
        </RevealingContainer>
    );
};
