import { Tutorial, type TutorialPage } from "../components/Tutorial";
import { usePopup } from "../../../hooks/usePopup";

export const useTutorial = (pages: TutorialPage[], onSkipCallback?: () => void, onSelectCallback?: (page: number) => void) => {
    const popup = usePopup(
    <Tutorial pages={pages} 
            onSkip={() => { 
                popup.setShown(false);
                onSkipCallback?.();
            }}
            onSelect={page => {
                onSelectCallback?.(page);
            }}/>);
    
    return {
        render: popup.render,
        shown: popup.shown, setShown: popup.setShown
    }
}