import React, { useEffect, useState, type RefObject } from "react";
import { cssVariable } from "../../../utils/cssVariable";
import { useLocalStore } from "../../../zustand/localStore";

interface Pos {
    x: number;
    y: number;
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

    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [currentPath, setCurrentPath] = useState<Pos[]>([]);
    const [paths, setPaths] = useState<Pos[][]>([]);
    const localStore = useLocalStore();

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
            }
            redraw();
        }

        handle();

        window.addEventListener('resize', handle);
        return () => window.removeEventListener('resize', handle);
    }, [paths]); 
    
    // user functions
    const start = (e: EventType) => {
        setIsDrawing(true);
        const pos = getPos(e);
        setCurrentPath([pos]);
    }

    const proceed = (e: EventType) => {
        if (!isDrawing)
            return;

        if(canvasRef.current) {
            const pos = getPos(e);
            setCurrentPath(prev => [...prev, pos]);

            const ctx = canvasRef.current.getContext("2d");
            if(ctx) {
                ctx.lineWidth = 1;
                ctx.lineCap = 'round';
                ctx.strokeStyle = cssVariable('--foreground-last');

                const last = currentPath.at(-1);
                if(last) {
                    ctx.beginPath();
                    ctx.moveTo(last.x, last.y);
                    ctx.lineTo(pos.x, pos.y);
                    ctx.stroke();
                }
            }
        }
    }


    const stop = () => {
        if(!isDrawing)
            return;

        setCurrentPath([]);
        setPaths(prev => [...prev, currentPath]);
        setIsDrawing(false);
    }

    const clear = () => {
        if(canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if(ctx)
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
    }

    const redraw = () => {
        if(canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            if(ctx) {
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                ctx.lineWidth = 1;
                ctx.lineCap = 'round';
                ctx.strokeStyle = cssVariable('--foreground-last');

                paths.forEach(path => {
                    ctx.beginPath();
                    for(let i = 1; i < path.length; ++i) {
                        ctx.moveTo(path[i - 1].x, path[i - 1].y);
                        ctx.lineTo(path[i].x, path[i].y);
                    }
                    ctx.stroke();
                });
            }
        }

    }

    return {
        start,
        proceed,
        stop,
        clear, redraw
    };
}