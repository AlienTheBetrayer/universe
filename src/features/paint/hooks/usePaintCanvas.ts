import React, { useEffect, useRef, useState, type RefObject } from "react";
import { cssVariable } from "../../../utils/cssVariable";
import { useLocalStore } from "../../../zustand/localStore";
import { usePaintContext } from "../context/PaintContext";

interface Vector2 {
    x: number;
    y: number;
}

interface Brush {
    lineCap: CanvasLineCap;
    lineColor: string;
    lineWidth: number;
}

interface Path { 
    lines: Vector2[]; 
    brush: Brush;
}


type EventType = React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>;

export const usePaintCanvas = (canvasRef: RefObject<HTMLCanvasElement | null>, containerRef: RefObject<HTMLDivElement | null>) => {
    const getPos = (e: EventType) => {
        if(!canvasRef.current)
            return { x: -1, y: -1 };
        
        const rect = canvasRef.current.getBoundingClientRect();
        const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
        const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;
        return { x, y };
    };

    const localStore = useLocalStore();
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const [context, ] = usePaintContext();

    // drawing states
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [currentPath, setCurrentPath] = useState<Path | null>(null); // causing lots of rerenders
    const [paths, setPaths] = useState<Path[]>([]);

    // theme syncing
    useEffect(() => {
        redraw();
    }, [localStore.theme]);

    // resize handling
    useEffect(() => {
        const handle = () => {
            if(canvasRef.current && containerRef.current) {
                canvasRef.current.width = containerRef.current.clientWidth;
                canvasRef.current.height = containerRef.current.clientHeight;
                ctxRef.current = canvasRef.current.getContext('2d');
            }
            redraw();
        }

        handle();

        window.addEventListener('resize', handle);
        return () => window.removeEventListener('resize', handle);
    }, [paths]); 

    useEffect(() => {
       if(ctxRef.current) {
            ctxRef.current.lineWidth = currentPath?.brush.lineWidth!;
            ctxRef.current.lineCap = currentPath?.brush.lineCap!;
            ctxRef.current.strokeStyle = currentPath?.brush.lineColor === 'theme' ? cssVariable('--foreground-last') : currentPath?.brush.lineColor!;
            ctxRef.current.fillStyle = currentPath?.brush.lineColor === 'theme' ? cssVariable('--foreground-last') : currentPath?.brush.lineColor!;
        }
    }, [currentPath?.brush]);
    
    // user functions
    const start = (e: EventType) => {
        setIsDrawing(true);
        setCurrentPath({
            lines: [getPos(e)],
            brush: { // get this from ui settings
                lineCap: 'round',
                lineWidth: 1,
                lineColor: context.selectedColor
            }
        });
    }

    const proceed = (e: EventType) => {
        if (!isDrawing)
            return;

        if(canvasRef.current && ctxRef.current) {
            const pos = getPos(e);
            setCurrentPath(prev => ({ ...prev!, lines: [...prev!.lines, pos] }));

            const last = currentPath?.lines.at(-1);
            if(last) {
                ctxRef.current.beginPath();
                ctxRef.current.moveTo(last.x, last.y);
                ctxRef.current.lineTo(pos.x, pos.y);
                ctxRef.current.stroke();
            }
        }
    }


    const stop = () => {
        if(!isDrawing)
            return;

        setCurrentPath(null);
        setPaths(prev => [...prev, currentPath!]);
        setIsDrawing(false);
    }

    const clear = () => {
        if(canvasRef.current && ctxRef.current) {
            ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            setPaths([]);
            setCurrentPath(null);
        }
    }

    const redraw = () => {
        if(canvasRef.current && ctxRef.current) {
            ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            paths.forEach(path => {
                if(ctxRef.current) {
                    ctxRef.current.lineWidth = path.brush.lineWidth;
                    ctxRef.current.lineCap = path.brush.lineCap;
                    ctxRef.current.strokeStyle = path.brush.lineColor === 'theme' ? cssVariable('--foreground-last') : path.brush.lineColor!;

                    ctxRef.current.beginPath();
                        for(let i = 1; i < path.lines.length; ++i) {
                            ctxRef.current.moveTo(path.lines[i - 1].x, path.lines[i - 1].y);
                            ctxRef.current.lineTo(path.lines[i].x, path.lines[i].y);
                        }
                    ctxRef.current.stroke();
                }
            });
        }
    }

    return {
        start,
        proceed,
        stop,
        clear
    };
}