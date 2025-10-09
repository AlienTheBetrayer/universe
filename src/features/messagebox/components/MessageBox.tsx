import { HotkeyTooltip } from '../../hotkeytooltip/components/HotkeyTooltip';
import { Button } from '../../ui/Button/components/Button';
import './MessageBox.css';
import { motion } from 'motion/react';
import { useHotkeys } from '../../../hooks/useHotkeys';

interface Props {
    title?: string;
    description?: string;
    onInteract?: (flag: boolean) => void;
}

export const MessageBox = ({ title, description, onInteract }: Props) => {
    useHotkeys([
        {
            hotkey: 'enter',
            action: () => onInteract?.(true)
        },
        {
            hotkey: 'escape',
            action: () => onInteract?.(false)
        }
    ]);
    
    return (
        <motion.div
        className='message-box'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
            <h3 dangerouslySetInnerHTML={{ __html: title ?? ''}}/>
            <p dangerouslySetInnerHTML={{ __html: description ?? ''}}/>
            
            <div className='message-box-buttons'>
                <Button onClick={() => onInteract?.(true)}>
                    Yes
                    <HotkeyTooltip className='message-box-yes-tooltip' hotkeys={['Enter']}/>
                </Button>
                
                <Button onClick={() => onInteract?.(false)}>
                    No
                    <HotkeyTooltip className='message-box-no-tooltip' hotkeys={['Esc']}/>
                </Button>
            </div>
        </motion.div>
    )
}