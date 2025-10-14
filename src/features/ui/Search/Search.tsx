import { useRef, useState } from 'react';
import './Search.css';
import searchImg from './assets/search.svg';
import { useHotkeys } from '../../../hooks/useHotkeys';
import { HotkeyTooltip } from '../../hotkeytooltip/components/HotkeyTooltip';
import { Button } from '../Button/components/Button';
import { useInView } from 'motion/react';

interface Props {
    className?: string;
    placeholder?: string;
    value?: string;
    onChange?: (newValue: string) => void;
    onClear?: () => void;
}

export const Search = ({ className, placeholder, value, onChange, onClear }: Props) => {
    const [internal, setInternal] = useState<string>('');
    const inputValue = value ?? internal;
    const ref = useRef<HTMLInputElement>(null);
    const isVisible = useInView(ref);
    
    useHotkeys([
        { hotkey: 'T', action: () => { if(isVisible) ref.current?.focus() } },
        { hotkey: 'Escape', action: () => { if(isVisible) ref.current?.blur() } }
    ]);

    return (
        <div className={`search-input-container ${className ?? ''}`}>
            <img src={searchImg} alt=''/>
            <input 
            ref={ref}
            className='search-input'
            value={inputValue}
            onChange={(e) => value === undefined ? setInternal(e.target.value) : onChange?.(e.target.value)}
            type='text'
            placeholder={placeholder ?? 'Search...'}/>
            
            { inputValue === '' ? (
                <HotkeyTooltip className='search-hotkey' hotkeys={['t']}/>
            ) : (
                <Button
                className='search-clear'
                onClick={() => value === undefined ? setInternal('') : onClear?.() }>✕</Button>
            )}
        </div>
    )
}