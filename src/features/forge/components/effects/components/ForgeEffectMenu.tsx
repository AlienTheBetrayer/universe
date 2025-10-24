import { useEffect, useRef } from 'react';
import { useHotkeys } from '../../../../../hooks/useHotkeys';
import { Button } from '../../../../ui/Button/components/Button';
import { useEffectMenuContext } from '../../../context/EffectMenuContext';
import type { ForgeData } from '../../../context/types/data';
import './ForgeEffectMenu.css';

import { motion } from 'motion/react';
import type { ForgeReducerAction } from '../../../context/reducer/ForgeReducer';

interface Props {
    state: ForgeData;
    dispatch: React.Dispatch<ForgeReducerAction>;
    idx: number;
}

export const ForgeEffectMenu = ({ state, dispatch, idx }: Props) => {
    const [menuState, setMenuState] = useEffectMenuContext();
    const menuRef = useRef<HTMLUListElement>(null);

    useHotkeys([
        {
            hotkey: 'Escape',
            action: () => setMenuState((prev) => ({ ...prev, menuIdx: false })),
        },
    ]);

    useEffect(() => {
        const handle = (e: PointerEvent) => {
            if (menuRef.current) {
                const x = e.clientX;
                const y = e.clientY;

                const bounds = menuRef.current.getBoundingClientRect();
                if (
                    !(
                        x >= bounds.left &&
                        x <= bounds.right &&
                        y >= bounds.top &&
                        y <= bounds.bottom
                    )
                ) {
                    setMenuState((prev) => ({ ...prev, menuIdx: false }));
                }
            }
        };

        window.addEventListener('pointerdown', handle);
        return () => window.removeEventListener('pointerdown', handle);
    }, []);

    const indexes = state.cards
        .filter((card) =>
            state.effectSlots.find((slot) => slot.card.idx === card.idx)
        )
        .map((data) => data.idx);

    return (
        <motion.ul
            style={idx > 2 ? { top: 0, y: '-105%' } : { top: '110%' }}
            ref={menuRef}
            className='forge-effect-menu'
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ ease: 'easeInOut' }}
        >
            <div className='forge-effect-menu-items'>
                <h4>
                    Available <mark>effects</mark>
                </h4>

                {state.cards.map(
                    (card) =>
                        !indexes.includes(card.idx) && (
                            <li key={card.idx} className='forge-effect-menu-item'>
                                <Button
                                    onClick={() => {
                                        setMenuState(prev => ({ ...prev, menuIdx: false }));
                                        dispatch({
                                            type: 'SET_EFFECT_SLOT',
                                            effectIdx: idx,
                                            card: state.cards.find(
                                                (c) => c.idx === card.idx
                                            )!,
                                        });
                                    }}
                                >
                                    {card.type}
                                </Button>
                            </li>
                        )
                )}
            </div>
        </motion.ul>
    );
};
