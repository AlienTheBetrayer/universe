import { useEffect, useState } from "react";
import type { AccordionItem } from "../components/Accordion";
import { useInView } from "motion/react";

export const useAccordion = (containerRef: React.RefObject<HTMLElement | null>, items: AccordionItem[], onSelect?: (idx: number) => void) => {
    const [selected, setSelected] = useState<number>(-1);
    const isVisible = useInView(containerRef);

    // accessibility / usability hotkeys
    useEffect(() => {
        const handle = (e: KeyboardEvent) => {
            if(!isVisible)
                return;

            switch(e.key) {
                case 'Escape':
                    setSelected(-1);
                    break;
                case 'ArrowRight':
                    setSelected(prev => prev < items.length - 1 ? prev + 1 : 0);
                    break;
                case 'ArrowLeft':
                    setSelected(prev => prev > 0 ? prev - 1 : items.length - 1);
                    break;
            }
        }
        
        window.addEventListener('keydown', handle);
        return () => window.removeEventListener('keydown', handle);
    }, [isVisible]);

    useEffect(() => {
        onSelect?.(selected);
    }, [selected]);

    return { selected, setSelected };
}