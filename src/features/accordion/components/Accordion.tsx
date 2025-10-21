import './Accordion.css';
import { AnimatePresence, motion } from 'motion/react';
import { HotkeyTooltip } from '../../hotkeytooltip/components/HotkeyTooltip';
import { useAccordion } from '../hooks/useAccordion';
import { useRef } from 'react';

export interface AccordionItem {
    item: string;
    dropdown: string;
}

interface Props {
    items: AccordionItem[];
    onSelect?: (idx: number) => void;
}

export const Accordion = ({ items, onSelect }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const accordion = useAccordion(containerRef, items, onSelect);

    return (
        <div ref={containerRef} className='accordion' tabIndex={0}>
            <HotkeyTooltip
                className='accordion-tooltip'
                hotkeys={['→', '←', 'Esc']}
            />

            {items.map((item, idx) => (
                <motion.div key={idx} className='accordion-item'>
                    <button
                        className={`accordion-item-open ${idx === accordion.selected ? 'accordion-item-open-toggled' : ''}`}
                        onClick={() =>
                            accordion.setSelected((prev) =>
                                prev === idx ? -1 : idx,
                            )
                        }
                    >
                        <div className='accordion-item-open-title'>
                            <h4 className='accordion-item-open-sign'>
                                {idx !== accordion.selected ? '+' : '-'}
                            </h4>
                            <h4
                                dangerouslySetInnerHTML={{ __html: item.item }}
                            />
                        </div>
                    </button>

                    <AnimatePresence initial={false}>
                        {accordion.selected === idx && (
                            <motion.div
                                key='dropdown'
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                            >
                                <p
                                    className='accordion-item-dropdown'
                                    dangerouslySetInnerHTML={{
                                        __html: item.dropdown,
                                    }}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </div>
    );
};
