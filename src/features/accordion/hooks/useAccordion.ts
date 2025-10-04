import { useEffect, useState } from "react";
import type { AccordionItem } from "../components/Accordion";

export const useAccordion = (items: AccordionItem[], onSelect?: (idx: number) => void) => {
    const [selected, setSelected] = useState<number>(-1);
    const [focused, setFocused] = useState<boolean>(false);

    // accessibility / usability hotkeys
    useEffect(() => {
        const handle = (e: KeyboardEvent) => {
            if(!focused)
                return;

            switch(e.key) {
                case 'Escape':
                    setFocused(false);
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
    }, [focused]);

    useEffect(() => {
        onSelect?.(selected);
    }, [selected]);

    return { selected, setSelected, focused, setFocused};
}