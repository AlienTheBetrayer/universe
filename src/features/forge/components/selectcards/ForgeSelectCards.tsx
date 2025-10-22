import { useMediaQuery } from '../../../../hooks/useMediaQuery';
import { ForgeSelectCard, type ForgeCardType } from './ForgeSelectCard';
import './ForgeSelectCards.css';
import { ForgeSelectMenu } from './ForgeSelectMenu';

// interface for card content array
export interface ForgeSelectCardContent {
    title: string;
    description: string;
    type: ForgeCardType;
}

export const ForgeSelectCards = () => {
    // all the card contents
    const selectCards: ForgeSelectCardContent[] = [
        {
            title: 'Typescript',
            description: 'Something complicated and unique',
            type: 'typescript',
        },
        {
            title: 'React',
            description: 'Completely different and innovative',
            type: 'react',
        }, 
         {
            title: 'Typescript',
            description: 'Something complicated and unique',
            type: 'typescript',
        },
        {
            title: 'React',
            description: 'Completely different and innovative',
            type: 'react',
        },         {
            title: 'Typescript',
            description: 'Something complicated and unique',
            type: 'typescript',
        },
        {
            title: 'React',
            description: 'Completely different and innovative',
            type: 'react',
        },         {
            title: 'Typescript',
            description: 'Something complicated and unique',
            type: 'typescript',
        },
        {
            title: 'React',
            description: 'Completely different and innovative',
            type: 'react',
        },         {
            title: 'React',
            description: 'Completely different and innovative',
            type: 'react',
        }, 
    ];

    // media query
    const isLarge = !useMediaQuery(1024);

    return (
        <div className='forge-select-cards'>
            { isLarge ? (
                selectCards.map((card, idx) => (
                    <ForgeSelectCard
                        key={idx}
                        type={card.type}
                        title={card.title}
                        description={card.description}
                    />
                ))
            ) : (
                <ForgeSelectMenu selectCards={selectCards}/>
            )}
        </div>
    );
};
