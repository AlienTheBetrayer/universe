import React, { useState } from 'react';
import { Button } from '../../../ui/Button/components/Button';
import type { ForgeCardContent } from './ForgeCards';
import './ForgeMenu.css';

import arrowDownImg from '../../assets/down-arrow.svg';

import { AnimatePresence, motion } from 'motion/react';
import { useHotkeys } from '../../../../hooks/useHotkeys';
import { HotkeyTooltip } from '../../../hotkeytooltip/components/HotkeyTooltip';
import { useTooltips } from '../../../tooltip/hooks/useTooltips';

interface Props {
    cards: ForgeCardContent[];
}

export const ForgeMenu = ({ cards }: Props) => {
    // state for the menu visibility
    const [menuShown, setMenuShown] = useState<boolean>(false);

    // hotkeys
    useHotkeys([
        { hotkey: 'Escape', action: () => setMenuShown(false) },
        { hotkey: 'M', action: () => setMenuShown(true) },
    ]);

    return (
        <div className='forge-menu'>
            <div>
                <h4>
                    <mark>Available</mark> cards
                </h4>
                <ForgeMenuItems menuShown={menuShown} cards={cards} />
            </div>

            <ForgeMenuOpenButton
                menuShown={menuShown}
                setMenuShown={setMenuShown}
            />
        </div>
    );
};

interface ItemsProps {
    cards: ForgeCardContent[];
    menuShown: boolean;
}

const ForgeMenuItems = ({ cards, menuShown }: ItemsProps) => {
    return (
        <AnimatePresence>
            {menuShown && (
                <motion.ul
                    className='forge-menu-items'
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ ease: 'easeInOut' }}
                >
                    {cards.map((card, idx) => (
                        <li key={idx} className='forge-menu-item'>
                            <Button>
                                <img
                                    src={card.image}
                                    alt=''
                                    style={{ width: '20px', height: '20px' }}
                                    className={`${
                                        card.inverted === true
                                            ? 'forge-image-inverted'
                                            : ''
                                    }`}
                                />

                                <h4 style={{ width: '6rem' }}>{card.title}</h4>

                                <p
                                    style={{ flex: 1, textAlign: 'right' }}
                                    dangerouslySetInnerHTML={{
                                        __html: card.description,
                                    }}
                                />
                            </Button>
                        </li>
                    ))}
                </motion.ul>
            )}
        </AnimatePresence>
    );
};

interface ButtonProps {
    menuShown: boolean;
    setMenuShown: React.Dispatch<React.SetStateAction<boolean>>;
}

const ForgeMenuOpenButton = ({ menuShown, setMenuShown }: ButtonProps) => {
    const tooltips = useTooltips();

    return (
        <Button
            ref={(el) => tooltips.set(0, 'Show / Hide the menu', el, 'down')}
            className='forge-menu-button'
            onClick={() => setMenuShown((prev) => !prev)}
        >
            {tooltips.render()}

            <motion.img
                src={arrowDownImg}
                alt=''
                className='forge-image'
                animate={{
                    transform: menuShown ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
                transition={{ type: 'spring', stiffness: 128, damping: 12 }}
            />
            <motion.span
                key={`${menuShown}`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {menuShown ? 'Collapse' : 'Expand'}
            </motion.span>
            <HotkeyTooltip hotkeys={menuShown ? ['Esc'] : ['M']} />
        </Button>
    );
};
