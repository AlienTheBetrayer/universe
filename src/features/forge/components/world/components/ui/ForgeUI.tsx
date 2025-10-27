import { Button } from '../../../../../ui/Button/components/Button';
import './ForgeUI.css';

import { usePopup } from '../../../../../../hooks/usePopup';
import { MessageBox } from '../../../../../messagebox/components/MessageBox';
import { useTooltips } from '../../../../../tooltip/hooks/useTooltips';
import deleteImg from '../../../../assets/delete.svg';
import rotateImg from '../../../../assets/reverse.svg';
import { useWorldContext } from '../../../../context/WorldContext';

export const ForgeUI = () => {
    const tooltips = useTooltips();
    const [state, dispatch] = useWorldContext();

    const wipeMessageBox = usePopup(
        <MessageBox
            title='Are you sure?'
            description='You are about to <u>wipe</u> all <mark>blocks</mark>'
            onInteract={(flag) => {
                if (flag) dispatch({ type: 'WIPE_BLOCKS' });
                wipeMessageBox.setShown(false);
            }}
        />
    );

    return (
        <div className='forge-ui'>
            {tooltips.render()}
            {wipeMessageBox.render()}

            <div className='forge-ui-bottom'>
                <Button
                    onClick={() => wipeMessageBox.setShown(true)}
                    ref={(el) =>
                        tooltips.set(1, 'Delete all blocks', el, 'down')
                    }
                >
                    <img src={deleteImg} alt='' className='forge-image' />
                    <u>Clear</u>
                </Button>
                <Button
                    ref={(el) =>
                        tooltips.set(0, 'Toggle auto-rotation', el, 'down')
                    }
                    style={{ marginLeft: 'auto' }}
                    onClick={() => dispatch({ type: 'TOGGLE_AUTO_ROTATE' })}
                >
                    <img src={rotateImg} alt='' className='forge-image' />
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
