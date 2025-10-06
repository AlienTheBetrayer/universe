import { useState } from 'react';
import './Search.css';
import { motion } from "motion/react"
import searchImg from './assets/search.svg';

interface Props {
    className?: string;
    placeholder?: string;
    value?: string;
    onChange?: (newValue: string) => void;
}

export const Search = ({ className, placeholder, value, onChange }: Props) => {
    const [internal, setInternal] = useState<string>('');
    const inputValue = value ?? internal;
    
    const handle = (val: string) => {
        if(value === undefined)
            setInternal(val);

        onChange?.(val);
    }

    return (
        <div className='search-input-container'>
            <img src={searchImg} alt=''/>
            <input className='search-input'
            value={inputValue}
            onChange={(e) => handle(e.target.value)} type='search'
            placeholder={placeholder ?? 'Search...'}/>
        </div>
    )
}