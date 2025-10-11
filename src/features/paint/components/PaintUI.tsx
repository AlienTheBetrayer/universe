import { useEffect, useState } from 'react';
import { Button } from '../../ui/Button/components/Button';
import type { usePaintCanvas } from '../hooks/usePaintCanvas';
import './PaintUI.css';
import { useTooltips } from '../../tooltip/hooks/useTooltips';
import { usePaintContext } from '../context/PaintContext';
import { cssVariable } from '../../../utils/cssVariable';
import { useLocalStore } from '../../../zustand/localStore';

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
        }
    ];

    const [selectedColor, setSelectedColor] = useState<number>(0);
    const tooltips = useTooltips();
    const [context, setContext] = usePaintContext();
    const { theme } = useLocalStore();

    useEffect(() => {
        setContext(prev => ({ ...prev, selectedColor: buttons[selectedColor].color }));
    }, [selectedColor]);

    return (
        <>
            { tooltips.render() }

            <div className='paint-ui-container'>

                <div className='paint-ui-left-bar'>
                    { buttons.map((button, idx) => (
                        <>
                            <Button
                            key={idx}
                            ref={el => tooltips.set(idx, button.tooltip, el, 'right')}
                            style={{ backgroundColor: button.color}}
                            className={`${selectedColor === idx ? 'paint-ui-selected-color-button' : ''} ${button.color === 'theme' ? 'paint-ui-color-button-theme' : ''}`}
                            onClick={() => setSelectedColor(prev => prev !== idx ? idx : prev)}/>

                            <hr className={`${selectedColor === idx ? 'paint-ui-selected-hr' : ''}`}/>
                        </>
                    ))}
                </div>

                <div className='paint-ui-bottom-bar'>
                    <Button onClick={() => controller.redraw()}>
                        Redraw
                    </Button>
                    <hr className='paint-ui-vertical-hr'/>
                    <Button onClick={() => controller.clear()}>
                        Clear
                    </Button>
                </div>
            </div>
        </>
    )
}