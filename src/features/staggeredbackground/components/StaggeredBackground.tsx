import { useEffect, useRef, useState } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import './StaggeredBackground.css';

const ElementSize = 48;

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
        // gsap.to('.staggered-background-element', {
        //     scale: 2,
        //     stagger: {
        //         each: 0.1,
        //         from: 'center'
        //     }
        // });
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