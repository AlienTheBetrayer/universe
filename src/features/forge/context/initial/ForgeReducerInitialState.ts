import type { ForgeData } from '../types/data';

import cssImg from '../../assets/cards/css.svg';
import htmlImg from '../../assets/cards/html.svg';
import javascriptImg from '../../assets/cards/javascript.svg';
import nextjsImg from '../../assets/cards/nextjs.svg';
import reactImg from '../../assets/cards/react.svg';
import reduxImg from '../../assets/cards/redux.svg';
import tailwindImg from '../../assets/cards/tailwind.svg';
import typescriptImg from '../../assets/cards/typescript.svg';
import zustandImg from '../../assets/cards/zustand.svg';

export const ForgeReducerInitialState: ForgeData = {
    // cards
    cards: [
        {
            idx: 0,
            title: 'TypeScript',
            description:
                'Defines structure and precision — every entity follows strict, editable rules.',
            image: typescriptImg,
            type: 'typescript',
        },
        {
            idx: 1,
            title: 'React',
            description:
                'Brings reactivity — each part of the world responds instantly to state changes.',
            image: reactImg,
            type: 'react',
        },
        {
            idx: 2,
            title: 'CSS',
            description:
                'Shapes the aesthetic — textures, gradients, and dynamic visual identity.',
            image: cssImg,
            type: 'css',
        },
        {
            idx: 3,
            title: 'HTML',
            description:
                'Builds the foundation — the skeletal layout of every construct in your world.',
            image: htmlImg,
            type: 'html',
        },
        {
            idx: 4,
            title: 'Zustand',
            description:
                'Links entities through shared consciousness — lightweight global state control.',
            image: zustandImg,
            inverted: true,
            type: 'zustand',
        },
        {
            idx: 5,
            title: 'Redux',
            description:
                'Harnesses action and flow — predictable orchestration of complex systems.',
            image: reduxImg,
            type: 'redux',
        },
        {
            idx: 6,
            title: 'JavaScript',
            description:
                'The raw creative current — animates, calculates, and drives every interaction.',
            image: javascriptImg,
            type: 'javascript',
        },
        {
            idx: 7,
            title: 'Next.js',
            description:
                'Structures the multiverse — pages, routing, and server-side portals in harmony.',
            image: nextjsImg,
            inverted: true,
            type: 'nextjs',
        },
        {
            idx: 8,
            title: 'Tailwind',
            description:
                'Pure design energy — composes elegant form and function with atomic precision.',
            image: tailwindImg,
            type: 'tailwind',
        },
    ],
    awaitingCancelCardIdx: false,
    awaitingActionIdx: false,
    cardDraggingIdx: false,
    currentEffectHoveredIdx: false,

    // effects
    effectSlots: [],

    // blocks
    blocks: [
        {
            idx: 0,
            type: 'Brick',
        },
        {
            idx: 1,
            type: 'Stone',
        },
        {
            idx: 2,
            type: 'Glass',
        },
        {
            idx: 3,
            type: 'Dirt',
        },
    ],
    selectedBlockIdx: false,
};
