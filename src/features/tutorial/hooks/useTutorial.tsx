import { useState } from "react";
import { Tutorial, type TutorialPage } from "../components/Tutorial";
import { AnimatePresence } from "motion/react";

export const useTutorial = (pages: TutorialPage[], onSkipCallback?: () => void, onSelectCallback?: (page: number) => void) => {
    const [isShown, setIsShown] = useState<boolean>(false);
    
    const render = () => {
        return (
            <AnimatePresence>
                { isShown && (
                    <Tutorial 
                    pages={pages} 
                    onSkip={() => { 
                        setIsShown(false);
                        onSkipCallback?.();
                    }}
                    onSelect={page => {
                        onSelectCallback?.(page);
                    }}/>
                )}
            </AnimatePresence>
        )
    }
    
    return {
        isShown, setIsShown,
        render
    }
}