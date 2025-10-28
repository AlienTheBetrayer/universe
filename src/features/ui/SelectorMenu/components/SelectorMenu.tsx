import { useState } from 'react';
import './SelectorMenu.css';

import { motion } from 'motion/react';
import { Button } from '../../Button/components/Button';

interface SelectorItem {
    name: string;
    jsx: React.ReactNode;
}

interface Props {
    items: SelectorItem[];
    onSelect?: (item: SelectorItem) => void;
}

export const SelectorMenu = ({ items, onSelect }: Props) => {
    const [selectedIdx, setSelectedIdx] = useState<number>(0);

    return (
        <div className='selector-menu-container'>
            <ul className='selector-menu'>
                {items.map((item, idx) => (
                    <li className='selector-menu-item' key={idx}>
                        <Button
                            onClick={() => {
                                setSelectedIdx(idx);
                                onSelect?.(item);
                            }}
                        >
                            {item.name}
                        </Button>
                        {selectedIdx === idx && (
                            <motion.div
                                className='selector-menu-item-underline'
                                layoutId='underline'
                            />
                        )}
                    </li>
                ))}
            </ul>

            <div className='selector-menu-jsx'>{items[selectedIdx].jsx}</div>
        </div>
    );
};
