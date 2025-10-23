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
    dragging: {
        idx: false
    },
    effectSlots: new Map(),
    cardContents: [
        {
            title: 'TypeScript',
            description:
                'Defines structure and precision — every entity follows strict, editable rules.',
            image: typescriptImg,
            type: 'typescript',
        },
        {
            title: 'React',
            description:
                'Brings reactivity — each part of the world responds instantly to state changes.',
            image: reactImg,
            type: 'react',
        },
        {
            title: 'CSS',
            description:
                'Shapes the aesthetic — textures, gradients, and dynamic visual identity.',
            image: cssImg,
            type: 'css',
        },
        {
            title: 'HTML',
            description:
                'Builds the foundation — the skeletal layout of every construct in your world.',
            image: htmlImg,
            type: 'html',
        },
        {
            title: 'Zustand',
            description:
                'Links entities through shared consciousness — lightweight global state control.',
            image: zustandImg,
            inverted: true,
            type: 'zustand',
        },
        {
            title: 'Redux',
            description:
                'Harnesses action and flow — predictable orchestration of complex systems.',
            image: reduxImg,
            type: 'redux',
        },
        {
            title: 'JavaScript',
            description:
                'The raw creative current — animates, calculates, and drives every interaction.',
            image: javascriptImg,
            type: 'javascript',
        },
        {
            title: 'Next.js',
            description:
                'Structures the multiverse — pages, routing, and server-side portals in harmony.',
            image: nextjsImg,
            inverted: true,
            type: 'nextjs',
        },
        {
            title: 'Tailwind',
            description:
                'Pure design energy — composes elegant form and function with atomic precision.',
            image: tailwindImg,
            type: 'tailwind',
        },
    ],
};
