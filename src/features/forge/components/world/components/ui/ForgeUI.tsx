import { Button } from '../../../../../ui/Button/components/Button';
import './ForgeUI.css';

import { useTooltips } from '../../../../../tooltip/hooks/useTooltips';
import rotateImg from '../../../../assets/reverse.svg';
import { useWorldContext } from '../../../../context/WorldContext';

export const ForgeUI = () => {
    const tooltips = useTooltips();
    const [state, setState] = useWorldContext();

    return (
        <div className='forge-ui'>
            {tooltips.render()}
            <div className='forge-ui-bottom'>
                <Button
                    ref={(el) =>
                        tooltips.set(0, 'Toggle auto-rotation', el, 'down')
                    }
                    style={{ marginLeft: 'auto' }}
                    onClick={() =>
                        setState((prev) => ({
                            ...prev,
                            autoRotationEnabled: !prev.autoRotationEnabled,
                        }))
                    }
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
                    {state.autoRotationEnabled ? (
                        <u>Disable</u>
                    ) : (
                        <mark>Enable</mark>
                    )}
                    auto-rotate
                </Button>
            </div>
        </div>
    );
};
