import './Tutorial.css';
import { motion } from 'motion/react';
import { useTooltips } from '../../tooltip/hooks/useTooltips';
import { useEffect, useState } from 'react';
import { useHotkeys } from '../../../hooks/useHotkeys';
import { Button } from '../../ui/Button/components/Button';
import { HotkeyTooltip } from '../../hotkeytooltip/components/HotkeyTooltip';

export interface TutorialPage {
    title: string;
    description: string;
    image: string;
}

interface Props {
    pages: TutorialPage[];
    onSkip?: () => void;
    onSelect?: (page: number) => void;
}

export const Tutorial = ({ pages, onSkip, onSelect }: Props) => {
    const [selected, setSelected] = useState<number>(0);

    // hotkeys to go back and forth between the pages
    const previous = () => setSelected(prev => prev > 0 ? prev - 1 : prev);
    const next = () => setSelected(prev => prev < pages.length - 1 ? prev + 1 : prev);
    
    useHotkeys([
        { hotkey: 'Escape', action: () => onSkip?.() },
        { hotkey: 'ArrowLeft', action: () => previous() },
        { hotkey: 'ArrowRight', action: () => next() }
    ]);

    useEffect(() => {
        onSelect?.(selected);
    }, [selected]);

    const tooltips = useTooltips();

    return (
        <>
            { tooltips.render() }

            <motion.div
            className='tutorial-container'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}>
                <motion.span
                className='tutorial-idx'
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                exit={{ opacity: 0 }}>
                    { selected + 1 } 
                </motion.span>

                {/* skip button */}
                <Button className='tutorial-skip-button'
                ref={el => tooltips.set(0, 'Skip tutorial', el, 'right')}
                onClick={() => onSkip?.()}>   
                    Skip
                </Button>

                {/* finish button */}
                <Button className='tutorial-finish-button'
                enabled={ selected === pages.length - 1}
                ref={el => tooltips.set(1, 'Finish tutorial', el, 'left')}
                onClick={() => onSkip?.()}>   
                    Finish
                </Button>

                {/* mobile buttons */}
                <Button className='tutorial-mobile-button tutorial-left'
                enabled={selected > 0}
                onClick={() => previous()}>
                    ←
                </Button>

                <Button className='tutorial-mobile-button tutorial-right'
                enabled={selected < pages.length - 1}
                onClick={() => next()}>
                    →
                </Button>

                <motion.div
                className='tutorial-main'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
                    <Button
                    className='tutorial-pc-button'
                    enabled={selected > 0}
                    onClick={() => previous()}
                    ref={el => tooltips.set(2, 'Previous tutorial page', el, 'up')}>
                        ←
                        <HotkeyTooltip className='tutorial-tooltip' hotkeys={['←']}/>
                    </Button>

                    <div className='tutorial-card'>
                        <div className='tutorial-card-image'>
                            <img src={pages[selected].image} alt='tutorial image'/>
                        </div>

                        <div className='tutorial-card-content'>
                            <h3 dangerouslySetInnerHTML={{ __html: pages[selected].title}}/>
                            <p dangerouslySetInnerHTML={{ __html: pages[selected].description}}/>
                        </div>
                    </div>

                    <Button
                    className='tutorial-pc-button'
                    enabled={selected < pages.length - 1}
                    onClick={() => next()}
                    ref={el => tooltips.set(3, 'Next tutorial page', el, 'up')}>
                        →
                        <HotkeyTooltip className='tutorial-tooltip' hotkeys={['→']}/>
                    </Button>
                </motion.div>
            </motion.div>
        </>
    )
}