import { useEffect, useRef, useState } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import './StaggeredBackground.css';

const ElementSize = 128;

export const StaggeredBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const [columns, setColumns] = useState<number>(0);
    const [rows, setRows] = useState<number>(0);

    useEffect(() => {
        const handle = () => {
            if(containerRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                setColumns(containerRect.width / ElementSize);
                setRows(containerRect.height / ElementSize);
            }
        }
        handle();

        window.addEventListener('resize', handle);
        return () => window.removeEventListener('resize', handle);
    }, []);

    useGSAP(() => {
        const timeline = gsap.timeline();

        timeline.fromTo('.staggered-background-element', 
            {
                scale: 0,
                y: () => gsap.utils.random(-300, 300),
                x: () => gsap.utils.random(-300, 300),
                borderRadius: 48,
                rotate: () => gsap.utils.random(0, 360),
                opacity: 0.5,
            },
            {
                delay: 2,
                duration: 1,
                x: 0,
                y: 0,
                rotate: () => gsap.utils.random(0, 360),
                scale: 0.8,
                opacity: 0.05,
                stagger: {
                    each: 0.15,
                    from: 'start'
                }
        }).to('.staggered-background-element', {
            duration: 4,
            rotate: 0,
            scale: 1,
            borderRadius: 8,
            ease: 'back.inOut',
            stagger: {
                each: 0.15,
                from: 'start'
            }
        }, '3');
    }, { scope: containerRef, dependencies: [rows, columns] });
    

    return (
        <div 
        className='staggered-background'
        ref={containerRef}>
            { Array.from({ length: rows * columns }).map((_, idx) => (
                <div 
                style={{ width: `${ElementSize}px`, height: `${ElementSize}px`}}
                className='staggered-background-element'
                key={idx}>

                </div>
            ))}
        </div>
    )
}