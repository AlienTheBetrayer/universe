import { AnimatePresence } from 'motion/react'
import './ListButton.css'

import { motion } from 'motion/react';
import { useListButton } from './hooks/useListButton';
import { HotkeyTooltip } from '../../hotkeytooltip/components/HotkeyTooltip';
import { useTooltips } from '../../tooltip/hooks/useTooltips';
import { useRef } from 'react';

interface Props {
    elements: string[];
    className?: string;
    onSelected?: (idx: number) => void;
    children?: React.ReactNode;
}

export const ListButton = ({ onSelected, elements, className='', children='Selected:'}: Props) => {
    const tooltips = useTooltips();
    const containerRef = useRef<HTMLDivElement>(null);
    const listButton = useListButton(containerRef, elements, onSelected);

    return (
        <motion.div 
        ref={containerRef}
        className={`list-button ${className}`}
        layout
        tabIndex={0}>
            <div className='list-button-top'>
                <button className='list-button-top-previous' onClick={() => listButton.previous()}
                ref={el => tooltips.set(0, 'Previous element', el, 'down')}>
                    ↓
                    <HotkeyTooltip className='list-button-hotkey' hotkeys={['←']}/>
                </button>

                <div className='list-button-top-element'>
                    <span>
                        { children }
                    </span>

                    <AnimatePresence mode='wait'>
                        <motion.h4
                        key={listButton.currentId}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                            { elements[listButton.currentId] }
                        </motion.h4>
                    </AnimatePresence>
                </div>

                <button className='list-button-top-next' onClick={() => listButton.next()}
                ref={el => tooltips.set(1, 'Next element', el, 'down')}>
                    ↑
                    <HotkeyTooltip className='list-button-hotkey' hotkeys={['→']}/>
                </button>
                
            </div>

            { tooltips.render() }
        </motion.div>
    )
}