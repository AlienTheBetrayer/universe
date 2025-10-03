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
                <div key={idx} className='accordion-item'>
                    <button className='accordion-item-open' onClick={() => setSelected(prev => prev === idx ? -1 : idx)}>
                        { item.item }
                    </button>
                    <AnimatePresence>
                        { selected === idx && (
                            <motion.div key='content'
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            style={{ overflow: "hidden" }}>
                                { item.dropdown } 
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    )
}