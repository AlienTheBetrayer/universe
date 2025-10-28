import './ForgeUIOverlay.css';

import { useTooltips } from '../../../../../tooltip/hooks/useTooltips';
import { Button } from '../../../../../ui/Button/components/Button';
import fullscreenImg from '../../../../assets/fullscreen.svg';
import { useForgeContext } from '../../../../context/ForgeContext';
import { ForgeUIOverlayBlocks } from './ForgeUIOverlayBlocks';

export const ForgeUIOverlay = () => {
    const tooltips = useTooltips();
    const [, dispatch] = useForgeContext();

    return (
        <div className='forge-ui-overlay'>
            {tooltips.render()}

            <Button
                style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
                ref={(el) =>
                    tooltips.set(0, 'Enter / exit fullscreen', el, 'down')
                }
                onClick={() => dispatch({ type: 'WORLD_FULLSCREEN_TOGGLE' })}
            >
                <img
                    src={fullscreenImg}
                    alt='fullscreen'
                    className='forge-image'
                />
            </Button>

            <ForgeUIOverlayBlocks/>
        </div>
    );
};
