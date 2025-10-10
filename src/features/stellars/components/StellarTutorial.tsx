import { useEffect, useRef, useState } from 'react';
import './StellarTutorial.css';
import { AnimatePresence, motion } from "motion/react"
import { useHotkeys } from '../../../hooks/useHotkeys';
import { useStellarContext } from '../context/StellarContext';
import { Button } from '../../ui/Button/components/Button';
import { HotkeyTooltip } from '../../hotkeytooltip/components/HotkeyTooltip';
import { useTooltips } from '../../tooltip/hooks/useTooltips';
import { useLocalStore } from '../../../zustand/localStore';

import tutorialImg1 from '../assets/tutorial/tutorial-1.png';
import tutorialImg2 from '../assets/tutorial/tutorial-2.png';
import tutorialImg3 from '../assets/tutorial/tutorial-3.png';
import tutorialImg4 from '../assets/tutorial/tutorial-4.png';
import tutorialImg5 from '../assets/tutorial/tutorial-5.png';
import tutorialImg6 from '../assets/tutorial/tutorial-6.png';
import tutorialImg7 from '../assets/tutorial/tutorial-7.png';
import tutorialImg8 from '../assets/tutorial/tutorial-8.png';

interface TutorialPage {
    title: string;
    description: string;
    image: string;
}

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
    const [selected, setSelected] = useState<number>(0);
    const [state, setState] = useStellarContext();
    const shownOnce = useRef<boolean>(false);
    const localStore = useLocalStore();

    // hotkeys to go back and forth between the pages
    const previous = () => setSelected(prev => prev > 0 ? prev - 1 : prev);
    const next = () => setSelected(prev => prev < pages.length - 1 ? prev + 1 : prev);
   
    useHotkeys([
        { hotkey: 'ArrowLeft', action: () => previous()},
        { hotkey: 'ArrowRight', action: () => next()}
    ]);

    // if we had never seen the tutorial = show it when we flip at least one page
    useEffect(() => {
        if(selected > 0 && localStore.tutorialSeen === false)
            localStore.toggleTutorialSeen(true);
    }, [selected]);

    // sync context and our state
    useEffect(() => {
        setSelected(0);
        if(state.tutorialVisible)
            shownOnce.current = true;
    }, [state.tutorialVisible]);

    const tooltips = useTooltips();

    return (
        <>
            { tooltips.render() }

            <AnimatePresence>
                { state.tutorialVisible && (
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
                            { selected + 1 } 
                        </motion.span>

                        <Button className='stellar-tutorial-skip-button'
                        ref={el => tooltips.set(0, 'Proceed to the game', el, 'right')}
                        onClick={() => setState(prev => ({ ...prev, tutorialVisible: !prev.tutorialVisible}))}>   
                            Skip
                        </Button>

                        {/* mobile buttons */}
                        <Button className='stellar-tutorial-mobile-button stellar-tutorial-left'
                        enabled={selected > 0}
                        onClick={() => previous()}>
                            ←
                        </Button>

                        <Button className='stellar-tutorial-mobile-button stellar-tutorial-right'
                        enabled={selected < pages.length - 1}
                        onClick={() => next()}>
                            →
                        </Button>

                        <motion.div
                        className='stellar-tutorial-main'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                            <Button
                            className='stellar-tutorial-pc-button'
                            enabled={selected > 0}
                            onClick={() => previous()}
                            ref={el => tooltips.set(1, 'Previous tutorial page', el, 'up')}>
                                ←
                                <HotkeyTooltip className='stellar-tutorial-tooltip' hotkeys={['←']}/>
                            </Button>

                            <div className='stellar-tutorial-card'>
                                <div className='stellar-tutorial-card-image'>
                                    <img src={pages[selected].image} alt='tutorial image'/>
                                </div>

                                <div className='stellar-tutorial-card-content'>
                                    <h3 dangerouslySetInnerHTML={{ __html: pages[selected].title}}/>
                                    <p dangerouslySetInnerHTML={{ __html: pages[selected].description}}/>
                                </div>
                            </div>

                            <Button
                            className='stellar-tutorial-pc-button'
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