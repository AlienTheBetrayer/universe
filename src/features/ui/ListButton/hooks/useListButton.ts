import { useEffect, useState } from "react";
    
export const useListButton = (elements: string[], onSelected?: (idx: number) => void) => { 
    const [currentId, setCurrentId] = useState<number>(0);
    const [focused, setFocused] = useState<boolean>(false);

    useEffect(() => {
        onSelected?.(currentId);
    }, [currentId]);

    useEffect(() => {
        console.log(focused);
        const handle = (e: KeyboardEvent) => {
            if(!focused)
                return;
            
            switch(e.key) {
                case 'ArrowRight':
                    next();
                break;
                case 'ArrowLeft':
                    previous();
                break; 
            }
        }

        window.addEventListener('keydown', handle);
        return () => window.removeEventListener('keydown', handle);
    }, [currentId, focused]);

    const previous = () => {
        setCurrentId(currentId == 0 ? elements.length - 1 : currentId - 1);
    }

    const next = () => {
        setCurrentId(currentId == elements.length - 1 ? 0 : currentId + 1);
    }


    return {
        currentId, setCurrentId,
        focused, setFocused,
        previous, next
    };
}