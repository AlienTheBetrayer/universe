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
    // all the brushes and colors
    const buttons = [
        {
            tooltip: 'Brush',
            color: 'theme',
        },
        {
            tooltip: 'Eraser',
            color: 'eraser'
        },
        {
            tooltip: 'Azure Rift',
            color: 'hsla(240, 37%, 50%, 1.00)',
        },
        {
            tooltip: 'Crimson Ember',
            color: 'hsla(0, 37%, 50%, 1.00)',
        },
        {
            tooltip: 'Verdant Grove',
            color: 'hsla(120, 37%, 50%, 1.00)',
        },
    ];

    // visibility for the hotkeys
    const containerRef = useRef<HTMLDivElement>(null);
    const isVisible = useInView(containerRef);

    // paint context states / syncing
    const [selectedColor, setSelectedColor] = useState<number>(0);
    const [brushSize, setBrushSize] = useState<number>(5);
    const [, setContext] = usePaintContext();

    useEffect(() => {
        setContext(prev => ({ ...prev, selectedColor: buttons[selectedColor].color }));
    }, [selectedColor]);

    useEffect(() => {
        setContext(prev => ({ ...prev, brushSize: brushSize }));
    }, [brushSize]);


    useHotkeys([
        { hotkey: 'ArrowRight', action: () => { if(isVisible) setSelectedColor(prev => (prev + 1) % (buttons.length)) }},
        { hotkey: 'ArrowLeft', action: () => { if(isVisible) setSelectedColor(prev => (prev - 1 + buttons.length) % (buttons.length))}}
    ]);
    
    
    // messageboxes / popups / tooltips
    const clearMessageBox = usePopup(<MessageBox title='Are you sure?' description='You are about to <u>wipe</u> all your <mark>drawings</mark>'
    onInteract={f => { clearMessageBox.setShown(false); if(f) controller.clear() }}/>)

    const tooltips = useTooltips();
    
    return (
        <>
            { tooltips.render() }
            { clearMessageBox.render() }

            <div className='paint-ui-container' ref={containerRef}>
                <div className='paint-ui-left-bar'>
                    <label htmlFor='paint-brush-thickness'> Thickness</label>
                    <input id='paint-brush-thickness' type='range' min={1} max={43} step={3} 
                    value={brushSize} onChange={e => setBrushSize(Number(e.target.value))}/>

                    <hr/>

                    <HotkeyTooltip className='paint-ui-hotkey' hotkeys={['←']}/>

                    { buttons.map((button, idx) => (
                        <React.Fragment key={idx}>
                            <Button
                            className={`paint-ui-color-button ${selectedColor === idx ? 'paint-ui-selected-color-button' : ''}`}
                            ref={el => tooltips.set(idx + 1, button.tooltip, el, 'right')}
                            onClick={() => setSelectedColor(prev => prev !== idx ? idx : prev)}>
                                <div
                                style={{ backgroundColor: button.color}}
                                className={
                                    `${button.color === 'theme' ? 'paint-ui-color-button-theme' : ''}
                                    ${button.color === 'eraser' ? 'paint-ui-color-button-eraser' : ''}`
                                }/>
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