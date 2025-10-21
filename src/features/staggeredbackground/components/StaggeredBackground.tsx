import { useRef } from 'react';
import {
    ElementSize,
    useStaggeredBackground,
} from '../hooks/useStaggeredBackground';
import './StaggeredBackground.css';

export const StaggeredBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const controller = useStaggeredBackground(containerRef);

    return (
        <div className='staggered-background' ref={containerRef}>
            {Array.from({ length: controller.rows * controller.columns }).map(
                (_, idx) => (
                    <div
                        style={{
                            width: `${ElementSize}px`,
                            height: `${ElementSize}px`,
                        }}
                        className='staggered-background-element'
                        key={idx}
                    ></div>
                ),
            )}
        </div>
    );
};
