import { useMediaQuery } from '../../../../hooks/useMediaQuery';
import { useTooltips } from '../../../tooltip/hooks/useTooltips';
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
            title: 'TypeScript',
            description:
                'Defines structure and precision — every entity follows strict, editable rules.',
            type: 'typescript',
        },
        {
            title: 'React',
            description:
                'Brings reactivity — each part of the world responds instantly to state changes.',
            type: 'react',
        },
        {
            title: 'CSS',
            description:
                'Shapes the aesthetic — textures, gradients, and dynamic visual identity.',
            type: 'css',
        },
        {
            title: 'HTML',
            description:
                'Builds the foundation — the skeletal layout of every construct in your world.',
            type: 'html',
        },
        {
            title: 'Zustand',
            description:
                'Links entities through shared consciousness — lightweight global state control.',
            type: 'zustand',
        },
        {
            title: 'Redux',
            description:
                'Harnesses action and flow — predictable orchestration of complex systems.',
            type: 'redux',
        },
        {
            title: 'JavaScript',
            description:
                'The raw creative current — animates, calculates, and drives every interaction.',
            type: 'javascript',
        },
        {
            title: 'Next.js',
            description:
                'Structures the multiverse — pages, routing, and server-side portals in harmony.',
            type: 'nextjs',
        },
        {
            title: 'TailwindCSS',
            description:
                'Pure design energy — composes elegant form and function with atomic precision.',
            type: 'tailwind',
        },
    ];

    // media query
    const isLarge = !useMediaQuery(1024);

    // tooltips
    const tooltips = useTooltips();

    return (
        <div className='forge-select-cards'>
            {tooltips.render()}

            {isLarge ? (
                selectCards.map((card, idx) => (
                    <ForgeSelectCard
                        ref={(el) =>
                            tooltips.set(idx, card.description, el, 'down')
                        }
                        key={idx}
                        type={card.type}
                        title={card.title}
                        description={card.description}
                    />
                ))
            ) : (
                <ForgeSelectMenu selectCards={selectCards} />
            )}
        </div>
    );
};
