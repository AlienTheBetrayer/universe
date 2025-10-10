import { useEffect, useRef, useState } from 'react';
import './StellarTutorial.css';
import { AnimatePresence, motion } from "motion/react"
import { useHotkeys } from '../../../hooks/useHotkeys';
import { useStellarContext } from '../context/StellarContext';
import { Button } from '../../ui/Button/components/Button';
import { HotkeyTooltip } from '../../hotkeytooltip/components/HotkeyTooltip';
import { useTooltips } from '../../tooltip/hooks/useTooltips';
import { useLocalStore } from '../../../zustand/localStore';

interface TutorialPage {
    title: string;
    description: string;
    image: string;
}

export const StellarTutorial = () => {
    const [selected, setSelected] = useState<number>(0);
    const [shown, setShown] = useState<boolean>(true);
    const [state, setState] = useStellarContext();
    const shownOnce = useRef<boolean>(false);
    const localStore = useLocalStore();

    const pages: TutorialPage[] = [
        {
            title: 'titl1',
            description: 'descrip',
            image: '',
        },
        {
            title: 'hi',
            description: 'desasdf',
            image: ''
        },
        {
            title: 'hih',
            description: '33sdfsd',
            image: ''
        }
    ];

    const previous = () => setSelected(prev => prev > 0 ? prev - 1 : prev);
    const next = () => setSelected(prev => prev < pages.length - 1 ? prev + 1 : prev);
   
    useHotkeys([
        { hotkey: 'Escape', action: () => setShown(false) },
        { hotkey: 'ArrowLeft', action: () => previous()},
        { hotkey: 'ArrowRight', action: () => next()}
    ]);

    useEffect(() => {
        if(selected > 0)
            localStore.toggleTutorialSeen(true);
    }, [selected]);

    useEffect(() => {
        if(shown)
            shownOnce.current = true;
        setState(prev => ({ ...prev, tutorialVisible: shown }));
    }, [shown]);

    useEffect(() => {
        setShown(state.tutorialVisible);
    }, [state.tutorialVisible]);

    const tooltips = useTooltips();

    return (
        <>
            { tooltips.render() }
            <AnimatePresence>
                { shown && (
                    <motion.div
                    className='stellar-tutorial-container'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, delay: shownOnce.current ? 0 : 3 }}>
                        <motion.span
                        className='stellar-tutorial-idx'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        exit={{ opacity: 0 }}>
                            { selected } 
                        </motion.span>

                        <Button className='stellar-tutorial-skip-button'
                        ref={el => tooltips.set(0, 'Proceed to the game', el, 'right')}
                        onClick={() => setShown(false)}>   
                            Skip
                        </Button>

                        <motion.div
                        className='stellar-tutorial-main'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                            <Button
                            enabled={selected > 0}
                            onClick={() => previous()}
                            ref={el => tooltips.set(1, 'Previous tutorial page', el, 'up')}>
                                ←
                                <HotkeyTooltip className='stellar-tutorial-tooltip' hotkeys={['←']}/>
                            </Button>

                            <div className='stellar-tutorial-card'>
                                <div className='stellar-tutorial-card-image'>
                                    Loading...
                                </div>

                                <div className='stellar-tutorial-card-content'>
                                    <h3 dangerouslySetInnerHTML={{ __html: pages[selected].title}}/>
                                    <p dangerouslySetInnerHTML={{ __html: pages[selected].description}}/>
                                </div>
                            </div>

                            <Button
                            enabled={selected < pages.length - 1}
                            onClick={() => next()}
                            ref={el => tooltips.set(2, 'Next tutorial page', el, 'up')}>
                                →
                                <HotkeyTooltip className='stellar-tutorial-tooltip' hotkeys={['→']}/>
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}