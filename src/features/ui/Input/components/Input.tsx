import { useState } from 'react';
import './Input.css';

interface Props {
    value?: string;
    placeholder?: string;
    onChange?: (newValue: string) => void;
}

export const Input = ({ value, placeholder, onChange }: Props) => {
    const [internal, setInternal] = useState<string>('');
    const inputValue = value ?? internal;

    return (
        <input 
        className='ui-input' type='text'
        placeholder={placeholder}
        value={inputValue}
        onChange={ e => value === undefined ? setInternal(e.target.value) : onChange?.(e.target.value) }/>
    )
}