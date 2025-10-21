import type { StellarState } from '../types/stellarData';

export const StellarContextInitialData: StellarState = {
    stellars: [
        {
            idx: 0,
            x: 0,
            y: 0,
            content: {
                firstTitle: 'Earth',
                secondTitle: 'We are here',
                firstDescription: 'Hello there?',
                secondDescription: 'Are we gonna succeed?',
            },
        },
        {
            idx: 1,
            x: 0,
            y: 0,
            content: {
                firstTitle: 'Mars',
                secondTitle: 'Eat me',
                firstDescription: 'Do not eat me please',
                secondDescription: 'It is scary...',
            },
        },
        {
            idx: 2,
            x: 0,
            y: 0,
            content: {
                firstTitle: 'Pluto',
                secondTitle: 'Dwarf planet',
                firstDescription: 'I am small!',
                secondDescription: 'No, I am big!!',
            },
        },
    ],
    selectedIdx: false,
    hoveredIdx: false,
    movingIdx: false,
    isMoveWaiting: false,
    isEditing: false,
    isMessageBoxVisible: false,
    viewport: { width: 0, height: 0 },
    isTutorialVisible: true,
};
