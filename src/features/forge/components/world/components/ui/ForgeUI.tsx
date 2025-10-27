import { Button } from '../../../../../ui/Button/components/Button';
import './ForgeUI.css';

import { useTooltips } from '../../../../../tooltip/hooks/useTooltips';
import rotateImg from '../../../../assets/reverse.svg';

export const ForgeUI = () => {
    const tooltips = useTooltips();

    return (
        <div className='forge-ui'>
            {tooltips.render()}
            <div className='forge-ui-bottom'>
                <Button
                    ref={(el) =>
                        tooltips.set(0, 'Toggle auto-rotation', el, 'down')
                    }
                    style={{ marginLeft: 'auto' }}
                >
                    <img
                        src={rotateImg}
                        alt=''
                        style={{
                            width: '1rem',
                            height: '1rem',
                            filter: 'invert(0.5)',
                        }}
                    />
                    Enable auto-rotate
                </Button>
            </div>
        </div>
    );
};
