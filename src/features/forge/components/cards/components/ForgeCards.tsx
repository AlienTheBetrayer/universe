import { useMediaQuery } from '../../../../../hooks/useMediaQuery';
import { useTooltips } from '../../../../tooltip/hooks/useTooltips';
import './ForgeCards.css';

import { useForgeContext } from '../../../context/ForgeContext';
import { ForgeCard } from './ForgeCard';
import { ForgeMenu } from './ForgeMenu';

export const ForgeCards = () => {
    // state
    const [state] = useForgeContext();

    // media query
    const isLarge = !useMediaQuery(1024);

    // tooltips
    const tooltips = useTooltips();

    return (
        <div className='forge-cards'>
            {state.cardDraggingIdx === false && tooltips.render()}

            {isLarge ? (
                state.cards.map((card) => (
                    <ForgeCard
                        ref={(el) =>
                            tooltips.set(card.idx, card.description, el, 'down')
                        }
                        key={card.idx}
                        card={card}
                    />
                ))
            ) : (
                <ForgeMenu />
            )}
        </div>
    );
};
