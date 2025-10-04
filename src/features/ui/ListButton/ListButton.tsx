import { AnimatePresence } from 'motion/react'
import './ListButton.css'

import { motion } from 'motion/react';
import { useListButton } from './hooks/useListButton';
import { HotkeyTooltip } from '../../hotkeytooltip/components/HotkeyTooltip';

interface Props {
    elements: string[];
    className?: string;
    onSelected?: (idx: number) => void;
    children?: React.ReactNode;
}

export const ListButton = ({ onSelected, elements, className='', children='Selected:'}: Props) => {
    const listButton = useListButton(elements, onSelected);

    return (
        <motion.div className={`list-button ${className}`} layout
        tabIndex={0}
        onPointerOver={() => listButton.setFocused(true)}
        onBlur={() => { listButton.setFocused(false) } }
        onClick={() => listButton.setFocused(true)}>
            <div className='list-button-top'>
                <button className='list-button-top-previous' onClick={() => listButton.previous()}>
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

                <button className='list-button-top-next' onClick={() => listButton.next()}>
                    ↑
                    <HotkeyTooltip className='list-button-hotkey' hotkeys={['→']}/>
                </button>
                
            </div>

        </motion.div>
    )
}