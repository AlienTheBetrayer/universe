import { useRef, useState } from 'react';
import './Input.css';
import { Button } from '../../Button/components/Button';
import { HotkeyTooltip } from '../../../hotkeytooltip/components/HotkeyTooltip';
import { useInView } from 'motion/react';
import { useHotkeys } from '../../../../hooks/useHotkeys';

import searchImg from '../assets/search.svg';

interface Props {
    value?: string;
    placeholder?: string;
    onChange?: (newValue: string) => void;
    onClear?: () => void;
    type?: 'input' | 'search';
}

export const Input = ({ value, placeholder, onChange, onClear, type='input' }: Props) => {
    const [internal, setInternal] = useState<string>('');
    const inputValue = value ?? internal;

    // visibility / type check for hotkeys
    const ref = useRef<HTMLInputElement>(null);
    const isVisible = useInView(ref);

    useHotkeys([
        { hotkey: 'T', action: () => { 
            if(isVisible && type === 'search') 
                ref.current?.focus() } 
        },

        { hotkey: 'Escape', action: () => { 
            if(isVisible && type === 'search')
                ref.current?.blur() } 
        }
    ]);

    const ClearButton = () => {
        return (
            <Button
            className='ui-input-clear-button' 
            onClick={() => value === undefined ? setInternal('') : onClear?.() }>✕</Button>
        )
    }

    return (
        <div className='ui-input'>
            <input 
            style={{ paddingLeft: (type === 'search' ? '1.75rem' : '0')}}
            ref={ref}
            type='text'
            placeholder={placeholder}
            value={inputValue}
            onChange={ e => value === undefined ? setInternal(e.target.value) : onChange?.(e.target.value) }/>

            { type === 'search' && (
                <img
                src={searchImg} 
                alt=''
                className='ui-input-search-image'/>
            )}

            { type === 'input' ? (
                inputValue.length > 0 && <ClearButton/>
            ) : (
                inputValue.length > 0 ? (
                    <ClearButton/>
                ) : (
                    <HotkeyTooltip
                    className='search-hotkey' 
                    hotkeys={['t']}/>
                )
            )}
        </div>
    )
}