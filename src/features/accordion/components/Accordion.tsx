import './Accordion.css';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { HotkeyTooltip } from '../../hotkeytooltip/components/HotkeyTooltip';

export interface AccordionItem {
    item: string;
    dropdown: string;
}

interface Props {
    items: AccordionItem[];
    onSelect?: (idx: number) => void;
}

export const Accordion = ({ items, onSelect }: Props) => {
    const [selected, setSelected] = useState<number>(-1);
    const [focused, setFocused] = useState<boolean>(false);

    const handleSelect = (idx: number) => {
        setSelected(prev => prev === idx ? -1 : idx);
        onSelect?.(idx);
    }

    // accessibility / usability hotkeys
    useEffect(() => {
        const handle = (e: KeyboardEvent) => {
            if(!focused)
                return;

            switch(e.key) {
                case 'Escape':
                    setFocused(false);
                    return setSelected(-1);
                case 'ArrowRight':
                    return setSelected(prev => prev < items.length - 1 ? prev + 1 : 0);
                case 'ArrowLeft':
                    return setSelected(prev => prev > 0 ? prev - 1 : items.length - 1);
            }
        }

        window.addEventListener('keydown', handle);
        return () => window.removeEventListener('keydown', handle);
    }, [focused]);

    return (
        <div className='accordion' 
        tabIndex={0}
        onPointerOver={() => setFocused(true)}
        onBlur={() => { setFocused(false); setSelected(-1) } }
        onClick={() => setFocused(true)}>
            <HotkeyTooltip className='accordion-tooltip' hotkeys={['→', '←', 'Esc']}/>

            { items.map((item, idx) => (
                <motion.div key={idx} className='accordion-item'>
                    <button className={`accordion-item-open ${idx === selected ? 'accordion-item-open-toggled' : ''}`}
                    onClick={() => handleSelect(idx)}>
                        <div className='accordion-item-open-title'>
                            <h4 className='accordion-item-open-sign'>
                                { idx !== selected ? '+' : '-' }
                            </h4>
                            <h4 dangerouslySetInnerHTML={{ __html: item.item }}/>
                        </div>
                    </button>

                    <AnimatePresence initial={false}>
                        { selected === idx && (
                            <motion.div
                            key='dropdown'
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}>
                                <p className='accordion-item-dropdown' dangerouslySetInnerHTML={{ __html: item.dropdown }}/>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </motion.div>
            ))}
        </div>
    )
}