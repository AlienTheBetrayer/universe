import './Accordion.css';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

export interface AccordionItem {
    item: string;
    dropdown: string;
}

interface Props {
    items: AccordionItem[];
}

export const Accordion = ({ items }: Props) => {
    const [selected, setSelected] = useState<number>(-1);

    return (
        <div className='accordion'>
            { items.map((item, idx) => (
                <motion.div key={idx} className='accordion-item'>
                    <button className={`accordion-item-open ${idx === selected ? 'accordion-item-open-toggled' : ''}`} onClick={() => setSelected(prev => prev === idx ? -1 : idx)}>
                        <span>{ idx !== selected ? '+' : '-' }</span>
                        { item.item }
                    </button>

                    <AnimatePresence initial={false}>
                        { selected === idx && (
                            <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}>
                                <p className='accordion-item-dropdown'>
                                    { item.dropdown } 
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </motion.div>
            ))}
        </div>
    )
}