import { useEffect, useRef, useState } from 'react';
import { Button } from '../../ui/Button/components/Button';
import type { usePaintCanvas } from '../hooks/usePaintCanvas';
import './PaintUI.css';
import { useTooltips } from '../../tooltip/hooks/useTooltips';
import { usePaintContext } from '../context/PaintContext';
import { HotkeyTooltip } from '../../hotkeytooltip/components/HotkeyTooltip';
import { useHotkeys } from '../../../hooks/useHotkeys';
import { useInView } from 'motion/react';
import { usePopup } from '../../../hooks/usePopup';
import { MessageBox } from '../../messagebox/components/MessageBox';
import React from 'react';

interface Props {
    controller: ReturnType<typeof usePaintCanvas>;
}

export const PaintUI = ({ controller }: Props) => {
    const buttons = [
        {
            tooltip: 'Theme (auto-invert)',
            color: 'theme',
        },
        {
            tooltip: 'Azure Rift',
            color: '#0000ff',
        },
        {
            tooltip: 'Crimson Ember',
            color: '#ff0000',
        },
        {
            tooltip: 'Verdant Grove',
            color: '#00ff00',
        },
        {
            tooltip: 'Mystical Shroom',
            color: '#63418dff'
        }
    ];

    const containerRef = useRef<HTMLDivElement>(null);
    const isVisible = useInView(containerRef);
    const [selectedColor, setSelectedColor] = useState<number>(0);
    const tooltips = useTooltips();
    const [, setContext] = usePaintContext();

    useEffect(() => {
        setContext(prev => ({ ...prev, selectedColor: buttons[selectedColor].color }));
    }, [selectedColor]);

    useHotkeys([
        { hotkey: 'ArrowRight', action: () => { if(isVisible) setSelectedColor(prev => (prev + 1) % (buttons.length)) }},
        { hotkey: 'ArrowLeft', action: () => { if(isVisible) setSelectedColor(prev => (prev - 1 + buttons.length) % (buttons.length))}}
    ]);
    
    
    const clearMessageBox = usePopup(<MessageBox title='Are you sure?' description='You are about to <u>wipe</u> all your <mark>drawings</mark>'
    onInteract={f => { clearMessageBox.setShown(false); if(f) controller.clear() }}/>)

    return (
        <>
            { tooltips.render() }
            { clearMessageBox.render() }

            <div className='paint-ui-container' ref={containerRef}>

                <div className='paint-ui-left-bar'>
                    <HotkeyTooltip className='paint-ui-hotkey' hotkeys={['←']}/>
                    { buttons.map((button, idx) => (
                        <React.Fragment key={idx}>
                            <Button
                            className={`paint-ui-color-button ${selectedColor === idx ? 'paint-ui-selected-color-button' : ''}`}
                            ref={el => tooltips.set(idx + 1, button.tooltip, el, 'right')}
                            onClick={() => setSelectedColor(prev => prev !== idx ? idx : prev)}>
                                <div
                                style={{ backgroundColor: button.color}}
                                className={`${button.color === 'theme' ? 'paint-ui-color-button-theme' : ''}`}/>
                            </Button>

                            { idx < buttons.length - 1 && (
                                <hr/>
                            )}
                        </React.Fragment>
                    ))}

                    <HotkeyTooltip className='paint-ui-hotkey' hotkeys={['→']}/>
                </div>

                <div className='paint-ui-bottom-bar'>
                    <hr className='paint-ui-vertical-hr'/>
                    <Button onClick={() => clearMessageBox.setShown(true)}
                        ref={el => tooltips.set(0, 'Wipe all your drawings', el, 'up')}>
                        Clear
                    </Button>
                    <hr className='paint-ui-vertical-hr'/>
                </div>
            </div>
        </>
    )
}