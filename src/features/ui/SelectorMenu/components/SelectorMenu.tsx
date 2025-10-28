import { useState } from 'react';
import './SelectorMenu.css';

import { motion } from 'motion/react';
import { Button } from '../../Button/components/Button';

interface Props {
    items: string[];
}

export const SelectorMenu = ({ items }: Props) => {
    const [selectedIdx, setSelectedIdx] = useState<number>(0);

    return (
        <ul className='selector-menu'>
            {items.map((item, idx) => (
                <li className='selector-menu-item' key={idx}>
                    <Button onClick={() => setSelectedIdx(idx)}>{item}</Button>
                    {selectedIdx === idx && (
                        <motion.div
                            className='selector-menu-item-underline'
                            layoutId='underline'
   
                        />
                    )}
                </li>
            ))}
        </ul>
    );
};
