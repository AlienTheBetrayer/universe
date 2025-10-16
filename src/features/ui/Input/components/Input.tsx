import { useLayoutEffect, useRef, useState } from 'react';
import './Input.css';
import { Button } from '../../Button/components/Button';
import { HotkeyTooltip } from '../../../hotkeytooltip/components/HotkeyTooltip';
import { useInView } from 'motion/react';
import { useHotkeys } from '../../../../hooks/useHotkeys';

import searchImg from '../assets/search.svg';

interface Props {
    className?: string;
    valid?: boolean;
    value?: string;
    placeholder?: string;
    onChange?: (newValue: string) => void;
    onClear?: () => void;
    type?: 'input' | 'search';
    autoFocus?: boolean;
}

export const Input = ({ valid, className, value, placeholder, onChange, onClear, type='input', autoFocus }: Props) => {
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
            if(isVisible && document.activeElement === ref.current)
                ref.current?.blur() } 
        , ignoreFocus: true }
    ]);

    useLayoutEffect(() => {
        if(autoFocus) {
            requestAnimationFrame(() => {
                ref.current?.focus();
            });
        }
    }, []);

    const ClearButton = () => {
        return (
            <Button
            className='ui-input-clear-button' 
            onClick={() => value === undefined ? setInternal('') : onClear?.() }>✕</Button>
        )
    }

    let inputClass = `ui-input ${className ?? ''}`;
    if(valid !== undefined)
        inputClass += `${valid ? 'ui-input-valid' : 'ui-input-invalid'}`;

    return (
        <div className={inputClass}>
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