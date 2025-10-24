import { forwardRef } from 'react';
import { Button } from '../../../../ui/Button/components/Button';
import { useForgeContext } from '../../../context/ForgeContext';
import type { ForgeCardData } from '../../../context/types/cards';
import { useForgeCard } from '../../../hooks/useForgeCard';
import './ForgeCard.css';

interface Props {
    card: ForgeCardData;
}

export const ForgeCard = forwardRef<HTMLButtonElement, Props>(
    ({ card }, ref) => {
        const [state] = useForgeContext();

        const cardController = useForgeCard(card);

        return (
            <Button
                style={
                    state.cardDraggingIdx === card.idx ||
                    cardController.isEffected
                        ? { pointerEvents: 'none' }
                        : { pointerEvents: 'all' }
                }
                enabled={!cardController.isEffected}
                animate={cardController.controls}
                dragControls={cardController.dragControls}
                drag={state.cardDraggingIdx === card.idx}
                dragMomentum={false}
                dragListener={false}
                className='forge-card'
                ref={ref}
                onPointerDown={(e) => {
                    cardController.setSelected(true);
                    cardController.lastEvent.current = e;
                }}
                onPointerLeave={() => {
                    if (!state.cardDraggingIdx && cardController.selected)
                        cardController.setSelected(false);
                }}
                onPointerUp={() => cardController.setSelected(false)}
            >
                <img
                    draggable={false}
                    src={card.image}
                    alt=''
                    className={`${
                        card.inverted === true ? 'forge-image-inverted' : ''
                    }`}
                    style={{ zIndex: 1, width: '24px', height: '24px' }}
                />

                <span style={{ zIndex: 1 }}>{card.title}</span>

                <div
                    style={{ zIndex: 0 }}
                    ref={cardController.progressRef}
                    className='forge-card-progress'
                ></div>
            </Button>
        );
    }
);
