import { useMediaQuery } from '../../../../../hooks/useMediaQuery';
import { useTooltips } from '../../../../tooltip/hooks/useTooltips';
import './ForgeCards.css';

import { usePopup } from '../../../../../hooks/usePopup';
import { MessageBox } from '../../../../messagebox/components/MessageBox';
import { Button } from '../../../../ui/Button/components/Button';
import { useForgeContext } from '../../../context/ForgeContext';
import { ForgeCard } from './ForgeCard';
import { ForgeMenu } from './ForgeMenu';

export const ForgeCards = () => {
    // state
    const [state, dispatch] = useForgeContext();

    // media query
    const isLarge = !useMediaQuery(1024);
    const isMobile = useMediaQuery(640);

    // tooltips
    const tooltips = useTooltips();

    const wipeMessageBox = usePopup(
        <MessageBox
            title='Are you sure?'
            description='You are about to <u>wipe</u> all your <mark>effects</mark> and their <mark>settings</mark>'
            onInteract={(f) => {
                if (f) dispatch({ type: 'WIPE_EFFECT_SLOTS' });
                wipeMessageBox.setShown(false);
            }}
        />
    );

    return (
        <div className='forge-cards-container'>
            {state.cardDraggingIdx === false && tooltips.render()}
            {wipeMessageBox.render()}

            <div className='forge-cards-topline'>
                <h3 className='forge-card-topline-heading'>
                    <mark>Available</mark> effects <small>(click / drag)</small>
                </h3>
                <div className='forge-cards-topline-buttons'>
                    <Button
                        enabled={state.effectSlots.length !== 0}
                        onClick={() => wipeMessageBox.setShown(true)}
                    >
                        <u>Wipe</u>{!isMobile ? 'effects' : ''}
                    </Button>

                    <Button
                        enabled={state.effectSlots.length < 9}
                        onClick={() => {
                            const remainingCards = state.cards.filter(
                                (card) =>
                                    state.effectSlots.find(
                                        (slot) => slot.card.idx === card.idx
                                    ) === undefined
                            );

                            const occupiedSlots = state.effectSlots.map(
                                (slot) => slot.effectIdx
                            );

                            const allSlots = [...Array(9).keys()].filter(
                                (v) => !occupiedSlots.includes(v)
                            );
                            allSlots.sort(() => Math.random() - 0.5);

                            for (const idx of allSlots) {
                                const card = remainingCards.pop();
                                if (!card) return;

                                dispatch({
                                    type: 'SET_EFFECT_SLOT',
                                    effectIdx: idx,
                                    card,
                                });
                            }
                        }}
                    >
                        <mark>Random fill</mark>{!isMobile ? 'remaining effects' : ''}
                    </Button>
                </div>
            </div>
            <div className='forge-cards'>
                {isLarge ? (
                    state.cards.map((card) => (
                        <ForgeCard
                            ref={(el) =>
                                tooltips.set(
                                    card.idx,
                                    card.description,
                                    el,
                                    'down'
                                )
                            }
                            key={card.idx}
                            card={card}
                        />
                    ))
                ) : (
                    <ForgeMenu />
                )}
            </div>
        </div>
    );
};
