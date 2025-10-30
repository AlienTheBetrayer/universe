import { useEffect } from 'react';
import { useLocalStore } from '../../../zustand/localStore';
import type { TutorialPage } from '../../tutorial/components/Tutorial';
import { useTutorial } from '../../tutorial/hooks/useTutorial';
import { useForgeContext } from '../context/ForgeContext';

import tutorial1Img from '../assets/tutorial/tutorial-1.png';
import tutorial2Img from '../assets/tutorial/tutorial-2.png';
import tutorial3Img from '../assets/tutorial/tutorial-3.png';
import tutorial4Img from '../assets/tutorial/tutorial-4.png';
import tutorial5Img from '../assets/tutorial/tutorial-5.png';
import tutorial6Img from '../assets/tutorial/tutorial-6.png';
import tutorial7Img from '../assets/tutorial/tutorial-7.png';

const pages: TutorialPage[] = [
    {
        title: '<mark>Building</mark>',
        description:
            '<b>Select</b> a building <mark>block</mark> and build with it! <b>Left click</b> to build. <b>Right click</b> to <u>destroy.</u> (There is also a <u>destroy button</u> on the <b>very right</b>)',
        image: tutorial1Img,
    },
    {
        title: '<mark>Effects</mark>',
        description:
            'You can either <b>click</b> or <b>drag</b> a card onto the <mark>effect slot</mark>, <b>different</b> language corresponds to a <b>different</b> effect. All of them affect the <mark>world</mark>',
        image: tutorial2Img,
    },
    {
        title: '<b>Convenient</b> effect usage',
        description:
            'If you want to try <mark>all effects</mark> at once (randomly) or <u>wipe</u> them, there are easy-to-use buttons <b>at the top.</b>',
        image: tutorial3Img,
    },
    {
        title: '<mark>Ultimate</mark> effect',
        description:
            'If you <b>pick</b> all 9 effects, you will be able to witness the last <mark>ultimate</mark> effect, that takes its place <b>outside</b> of the world!',
        image: tutorial4Img,
    },
    {
        title: '<mark>Effect</mark> fun',
        description:
            "<b>Each</b> effect's strength can be <mark>configured</mark> through the <b>slider</b>, you can also <b>toggle</b> it or <u>remove</u> it altogether.",
        image: tutorial5Img,
    },
    {
        title: '<mark>Building blocks</mark>',
        description:
            "You can either <b>choose</b> a building block from the bottom or from the world's inventory, they will <mark>sync</mark>!",
        image: tutorial6Img,
    },
    {
        title: '<mark>Saving</mark> and <u>Loading</u>',
        description:
            'You can <b>save</b> or <b>load</b> your <mark>worlds</mark>, your filled effects, used cards, all the blocks, properties will be <mark>saved</mark>. You will be <b>prompted</b> to <mark>download</mark> a world save file that you can then <b>share</b> with other people or yourself.',
        image: tutorial7Img,
    },
];

export const ForgeTutorial = () => {
    const [state, dispatch] = useForgeContext();
    const localStore = useLocalStore();

    const tutorial = useTutorial(
        pages,
        () => dispatch({ type: 'SET_TUTORIAL_VISIBILITY', flag: false }),
        (page) => {
            if (page > 0 && !localStore.tutorialSeen.forge)
                localStore.toggleTutorialSeen(true, 'forge');
        }
    );

    useEffect(() => {
        tutorial.setShown(state.tutorialVisible);
    }, [state.tutorialVisible]);

    return tutorial.render();
};
