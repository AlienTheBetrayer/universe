import { useHotkeys } from '../../../../../hooks/useHotkeys';
import { Button } from '../../../../ui/Button/components/Button';
import { useEffectMenuContext } from '../../../context/EffectMenuContext';
import './ForgeEffectMenu.css';

import { motion } from 'motion/react';
import { useClickOutside } from '../../../../../hooks/useClickOutside';
import type { ForgeReducerAction } from '../../../context/reducer/ForgeReducer';
import type { ForgeData } from '../../../context/types/forge/data';

interface Props {
    state: ForgeData;
    dispatch: React.Dispatch<ForgeReducerAction>;
    idx: number;
    onSelect?: (idx: number) => void;
    buttonRef: React.RefObject<HTMLButtonElement | null>;
}

export const ForgeEffectMenu = ({
    state,
    buttonRef,
    dispatch,
    onSelect,
    idx,
}: Props) => {
    const [, setMenuState] = useEffectMenuContext();

    useHotkeys([
        {
            hotkey: 'Escape',
            action: () => setMenuState((prev) => ({ ...prev, menuIdx: false })),
        },
    ]);

    const menuRef = useClickOutside<HTMLUListElement>(
        () => onSelect?.(idx),
        [buttonRef.current]
    );

    const indexes = state.cards
        .filter((card) =>
            state.effectSlots.find((slot) => slot.card.idx === card.idx)
        )
        .map((data) => data.idx);

    return (
        <motion.ul
            style={idx > 5 ? { top: 0, y: '-100%' } : { top: '50%' }}
            ref={menuRef}
            className='forge-effect-menu'
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ ease: 'easeInOut' }}
        >
            <div className='forge-effect-menu-items'>
                <h4 style={{ whiteSpace: 'nowrap'}}>
                    Available <mark>effects</mark>
                </h4>

                {state.cards.map(
                    (card) =>
                        !indexes.includes(card.idx) && (
                            <li
                                key={card.idx}
                                className='forge-effect-menu-item'
                            >
                                <Button
                                    onClick={() => {
                                        setMenuState((prev) => ({
                                            ...prev,
                                            menuIdx: false,
                                        }));
                                        dispatch({
                                            type: 'SET_EFFECT_SLOT',
                                            effectIdx: idx,
                                            card: state.cards.find(
                                                (c) => c.idx === card.idx
                                            )!,
                                        });
                                    }}
                                >
                                    <img
                                        src={card.image}
                                        className={`${
                                            card.inverted
                                                ? 'forge-image-inverted'
                                                : ''
                                        }`}
                                        style={{
                                            width: '1rem',
                                            height: '1rem',
                                        }}
                                    />
                                    {card.title}
                                </Button>
                            </li>
                        )
                )}
            </div>
        </motion.ul>
    );
};
