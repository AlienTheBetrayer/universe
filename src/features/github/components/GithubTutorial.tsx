import { useEffect } from "react";
import type { TutorialPage } from "../../tutorial/components/Tutorial";
import { useTutorial } from "../../tutorial/hooks/useTutorial"
import { useGithubContext } from "../context/GithubContext";
import { useLocalStore } from "../../../zustand/localStore";

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
    const [context, setContext] = useGithubContext();
    const localStore = useLocalStore();

    const tutorial = useTutorial(pages,
        () => setContext(prev => ({ ...prev, tutorialVisible: false })),
        page => { if(page > 0 && !localStore.tutorialSeen.contact) localStore.toggleTutorialSeen(true, 'contact') }
    );

    useEffect(() => {
        tutorial.setShown(context.tutorialVisible);
    }, [context.tutorialVisible]);

    return (
        tutorial.render()
    )
}