import { forwardRef } from 'react';
import { Button } from '../../../ui/Button/components/Button';
import { useForgeContext } from '../../context/ForgeContext';
import type { ForgeCardContent } from '../../context/types/data';
import { useForgeCard } from '../../hooks/useForgeCard';
import './ForgeCard.css';

interface Props {
    idx: number;
    content: ForgeCardContent;
}

export const ForgeCard = forwardRef<HTMLButtonElement, Props>(
    ({ idx, content }, ref) => {
        const [state, ] = useForgeContext();

        const cardController = useForgeCard(idx, content);

        return (
            <Button
                style={ (state.dragging.idx === idx || cardController.isEffected) ? { pointerEvents: 'none' } : { pointerEvents: 'all' }}
                enabled={!cardController.isEffected}
                animate={cardController.controls}
                dragControls={cardController.dragControls}
                drag={state.dragging.idx === idx}
                dragMomentum={false}
                dragListener={false}
                className='forge-card'
                ref={ref}
                onPointerDown={(e) => {
                    cardController.setSelected(true);
                    cardController.lastEvent.current = e;
                }}
                onPointerLeave={() => {
                    if (state.dragging.idx !== idx && cardController.selected)
                        cardController.setSelected(false);
                }}
                onPointerUp={() => cardController.setSelected(false)}
            >
                <img
                    draggable={false}
                    src={content.image}
                    alt=''
                    className={`${
                        content.inverted === true ? 'forge-image-inverted' : ''
                    }`}
                    style={{ zIndex: 1, width: '24px', height: '24px' }}
                />

                <span style={{ zIndex: 1 }}>{content.title}</span>

                <div
                    style={{ zIndex: 0 }}
                    ref={cardController.progressRef}
                    className='forge-card-progress'
                ></div>
            </Button>
        );
    }
);
