import { useEffect } from "react";
import type { TutorialPage } from "../../tutorial/components/Tutorial";
import { useTutorial } from "../../tutorial/hooks/useTutorial"

const pages: TutorialPage[] = [
    {
        image: '',
        title: 'hi',
        description: 'big description',
    },
    {
        image: '',
        title: 'bey',
        description: 'wowwwww'
    }
];

export const GithubTutorial = () => {
    const tutorial = useTutorial(pages);

    useEffect(() => {
        tutorial.setIsShown(true);
    }, []);

    return (
        tutorial.render()
    )
}