import { HotkeyTooltip } from '../../../../../hotkeytooltip/components/HotkeyTooltip';
import { Button } from '../../../../../ui/Button/components/Button';
import { useWorldContext } from '../../../../context/WorldContext';
import './ForgeUIOverlayDelete.css';

import deleteImg from '../../../../assets/delete.svg';

interface Props {}

export const ForgeUIOverlayDelete = ({}: Props) => {
    const [state, dispatch] = useWorldContext();

    return (
        <Button
            className={`forge-ui-overlay-block ${
                state.currentInteractionMode === 'deleting'
                    ? 'forge-ui-overlay-delete-selected'
                    : ''
            }`}
            onClick={() => dispatch({ type: 'TOGGLE_INTERACTION_MODE' })}
        >
            <img src={deleteImg} alt='delete' className='forge-ui-delete-img'/>
            <HotkeyTooltip
                className='forge-ui-overlay-number-tooltip'
                hotkeys={['0']}
            />
        </Button>
    );
};
