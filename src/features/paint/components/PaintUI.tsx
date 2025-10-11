import { Button } from '../../ui/Button/components/Button';
import type { usePaintCanvas } from '../hooks/usePaintCanvas';
import './PaintUI.css';

interface Props {
    controller: ReturnType<typeof usePaintCanvas>;
}

export const PaintUI = ({ controller }: Props) => {
    return (
        <div className='paint-ui-container'>
            <div className='paint-ui-bottom-bar'>
                <Button onClick={() => controller.redraw()}>
                    Redraw
                </Button>

                <Button onClick={() => controller.clear()}>
                    Clear
                </Button>
            </div>
        </div>
    )
}