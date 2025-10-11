import { useRef } from 'react';
import './Paint.css';
import { usePaintCanvas } from '../hooks/usePaintCanvas';
import { PaintUI } from './PaintUI';

export const Paint = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const drawing = usePaintCanvas(canvasRef, containerRef);

    return (
        <div ref={containerRef} className='paint-container'>
            <canvas ref={canvasRef}

            onMouseDown={drawing.start}
            onMouseMove={drawing.proceed}
            onMouseUp={drawing.stop}
            onMouseLeave={drawing.stop}

            onTouchStart={drawing.start}
            onTouchMove={drawing.proceed}
            onTouchEnd={drawing.stop}>

            </canvas>

            <PaintUI controller={drawing}/>
        </div>
    )
}