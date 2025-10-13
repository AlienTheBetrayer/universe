import { useEffect } from 'react';
import { useStellarContext } from '../context/StellarContext';

import type { TutorialPage } from '../../tutorial/components/Tutorial';
import { useTutorial } from '../../tutorial/hooks/useTutorial';

// tutorial images
import tutorialImg1 from '../assets/tutorial/tutorial-1.png';
import tutorialImg2 from '../assets/tutorial/tutorial-2.png';
import tutorialImg3 from '../assets/tutorial/tutorial-3.png';
import tutorialImg4 from '../assets/tutorial/tutorial-4.png';
import tutorialImg5 from '../assets/tutorial/tutorial-5.png';
import tutorialImg6 from '../assets/tutorial/tutorial-6.png';
import tutorialImg7 from '../assets/tutorial/tutorial-7.png';
import tutorialImg8 from '../assets/tutorial/tutorial-8.png';





const pages: TutorialPage[] = [
    {
        title: 'Movement',
        description: 'Move <mark>through</mark> orbs with arrows on the sides (you can also use <b>hotkeys</b>)',
        image: tutorialImg1,
    },
    {
        title: 'Cursor',
        description: 'Move around your cursor <mark>everywhere!</mark> In the zoom-in mode — reflect on the edges, in the space — move the <b>internal Sun</b>, <mark>black hole effect, and background stars move along!</mark>',
        image: tutorialImg2
    },
    {
        title: 'Hovering',
        description: '<mark>Hover</mark> on an orb to see the details about it. <mark>Click</mark> on it to zoom in. In the zoomed-in mode, <b>click on it again</b> to go out of it.',
        image: tutorialImg3,
    },
    {
        title: 'Creating / Deleting',
        description: '<b>Right click</b>(or <b>pinch tap</b> on mobile) to open up the <mark>context menu</mark>, by default you will only able to <mark>create</mark>, if you click on an orb, you will be able to <u>delete</u> it.',
        image: tutorialImg4
    },
    {
        title: 'Moving orbs',
        description: '<b>Scroll wheel click</b> on an orb to start <b>moving</b> it(click again to finish). There is also a button that will trigger <mark>action mode.</mark> (good for mobile)',
        image: tutorialImg5
    },
    {
        title: 'Regenerating',
        description: 'If you somehow <u>screw</u> orbs up, you can fix them by clicking this button, it will <mark>fix</mark> all positions.',
        image: tutorialImg6
    },
    {
        title: 'Zoomed in deletion',
        description: 'By default, <u>X</u> button will <u>wipe all orbs</u>, however in the zoomed-in mode it will only delete the <b>currently selected one.</b>',
        image: tutorialImg7
    },
    {
        title: 'Editing',
        description: '<b>Click</b> on any text property to edit it. (Afterwards it will be visible <mark>from space</mark> while hovering).',
        image: tutorialImg8
    }
];

export const StellarTutorial = () => {
    const [state, setState] = useStellarContext();
    const tutorial = useTutorial(pages, () => setState(prev => ({ ...prev, tutorialVisible: false })));

    // if we had never seen the tutorial = show it when we flip at least one page
    // useEffect(() => {
    //     if(selected > 0 && localStore.tutorialSeen === false)
    //         localStore.toggleTutorialSeen(true);
    // }, [selected]);

    // sync context and the visibility of tutorial
    useEffect(() => {
        tutorial.setIsShown(state.tutorialVisible);
        console.log(state.tutorialVisible);
    }, [state.tutorialVisible]);

    return (
        tutorial.render()
    )
}