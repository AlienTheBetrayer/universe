import { useEffect } from 'react';
import { useLocalStore } from '../../../zustand/localStore';
import type { TutorialPage } from '../../tutorial/components/Tutorial';
import { useTutorial } from '../../tutorial/hooks/useTutorial';
import { useGithubContext } from '../context/GithubContext';

import tutorial1Img from '../assets/tutorial/tutorial-1.png';
import tutorial2Img from '../assets/tutorial/tutorial-2.png';
import tutorial3Img from '../assets/tutorial/tutorial-3.png';
import tutorial4Img from '../assets/tutorial/tutorial-4.png';
import tutorial5Img from '../assets/tutorial/tutorial-5.png';
import tutorial6Img from '../assets/tutorial/tutorial-6.png';
import tutorial7Img from '../assets/tutorial/tutorial-7.png';
import tutorial8Img from '../assets/tutorial/tutorial-8.png';
import tutorial9Img from '../assets/tutorial/tutorial-9.png';

const pages: TutorialPage[] = [
    {
        image: tutorial1Img,
        title: 'Repository <u>editing</u>',
        description:
            'You can manually change the <mark>stats</mark> of your repository, by clicking on these or +/- buttons.',
    },
    {
        image: tutorial2Img,
        title: '<mark>Advanced</mark> settings',
        description:
            'You can then change the advanced settings of your repository.',
    },
    {
        image: tutorial3Img,
        title: 'Form <b>sending</b>',
        description:
            'You can start by <mark>sending</mark> me a form, or by <b>applying</b> the changes. (that will automatically <mark>commit</mark> the changes)',
    },
    {
        image: tutorial4Img,
        title: '<mark>Branch</mark> switching / creation',
        description:
            'You can either search for an <mark>existing branch</mark>, or <mark>create</mark> one yourself. (Delete button will be unlocked)',
    },
    {
        image: tutorial5Img,
        title: 'Form <mark>creation</mark>',
        description:
            'You can also create a new form yourself. (also <mark>unique</mark> names only)',
    },
    {
        image: tutorial6Img,
        title: 'Tag <mark>addition</mark> / <u>removal</u>',
        description:
            'Any form has its tags that you can either remove or add yourself. (You can <mark>sort</mark> by them)',
    },
    {
        image: tutorial7Img,
        title: '<mark>Commits</mark> list',
        description:
            'Any change you make to a form (create, remove, edit) will unlock this button right here.',
    },
    {
        image: tutorial8Img,
        title: 'Commit <mark>viewing</mark>',
        description:
            "You can view a specific commit if it is a commit that <u>changed</u> a form's content.",
    },
    {
        image: tutorial9Img,
        title: '<u>Diff</u><mark>checker</mark>',
        description:
            'If it is your second and subsequent commits you will be able to view the <mark>difference</mark> window.',
    },
];

export const GithubTutorial = () => {
    const [state, dispatch] = useGithubContext();
    const localStore = useLocalStore();

    const tutorial = useTutorial(
        pages,
        () => dispatch({ type: 'TUTORIAL_SET_VISIBILITY', flag: false }),
        (page) => {
            if (page > 0 && !localStore.tutorialSeen.contact)
                localStore.toggleTutorialSeen(true, 'contact');
        },
    );

    useEffect(() => {
        tutorial.setShown(state.tutorialVisible);
    }, [state.tutorialVisible]);

    return tutorial.render();
};
