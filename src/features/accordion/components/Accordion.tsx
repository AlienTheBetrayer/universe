import './Accordion.css';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

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

    const handleSelect = (idx: number) => {
        setSelected(prev => prev === idx ? -1 : idx);
        onSelect?.(idx);
    }

    return (
        <div className='accordion'>
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