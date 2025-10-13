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
    const localStore = useLocalStore();
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const [context, ] = usePaintContext();

    // drawing states
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const currentPath = useRef<Path | null>(null);
    const [paths, setPaths] = useState<Path[]>([]);
    const [brushes, setBrushes] = useState(new Map<string, string>());

    // helper functions
    const applyBrush = (brush: Brush) => {
        if(ctxRef.current) {
            ctxRef.current.lineWidth = brush.lineWidth;
            ctxRef.current.lineCap = brush.lineCap;
            const brushColor = brushes.get(brush.lineColor);
            ctxRef.current.strokeStyle = brushColor ? brushColor : brush.lineColor;
        }
    }

    const getPos = (e: EventType) => {
        if(!canvasRef.current)
            return { x: -1, y: -1 };
        
        const rect = canvasRef.current.getBoundingClientRect();
        const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
        const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;
        return { x, y };
    };

    // theme handling
    useEffect(() => {
        setBrushes(new Map<string, string>([
            ['theme', cssVariable('--foreground-last')],
            ['eraser', cssVariable('--background-2')],
        ]));
    }, [localStore.theme]);

    useEffect(() => {
        redraw();
    }, [brushes]);

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
    }, []); 
    
    // user functions
    const start = (e: EventType) => {
        const brush: Brush = {
            lineCap: 'round',
            lineWidth: context.brushSize,
            lineColor: context.selectedColor
        };

        applyBrush(brush);
        setIsDrawing(true);

        currentPath.current = {
            lines: [getPos(e)],
            brush: brush
        };
    }

    const proceed = (e: EventType) => {
        if (!isDrawing)
            return;

        if(ctxRef.current && currentPath.current) {
            const pos = getPos(e);
            const last = currentPath.current.lines.at(-1);

            if(last) {
                ctxRef.current.beginPath();
                ctxRef.current.moveTo(last.x, last.y);
                ctxRef.current.lineTo(pos.x, pos.y);
                ctxRef.current.stroke();
            }

            currentPath.current.lines.push(pos);
        }
    }

    const stop = () => {
        if(!isDrawing || !currentPath.current)
            return;

        const path = currentPath.current;
        setPaths(prev => [...prev, path]);
        currentPath.current = null;
        setIsDrawing(false);
    }

    const clear = () => {
        if(canvasRef.current && ctxRef.current) {
            ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            setPaths([]);
            currentPath.current = null;
        }
    }

    const redraw = () => {
        if(canvasRef.current && ctxRef.current) {
            ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            paths.forEach(path => {
                if(ctxRef.current) {
                    applyBrush(path.brush);

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