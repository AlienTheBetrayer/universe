import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { usePopup } from '../../../hooks/usePopup';
import { MessageBox } from '../../messagebox/components/MessageBox';
import { useTooltips } from '../../tooltip/hooks/useTooltips';
import { Button } from '../../ui/Button/components/Button';
import { useForgeContext } from '../context/ForgeContext';
import './ForgeTopline.css';

import deleteImg from '../assets/delete.svg';
import randomImg from '../assets/random.svg';

export const ForgeTopline = () => {
    const [state, dispatch] = useForgeContext();
    const isMobile = useMediaQuery(640);

    const wipeMessageBox = usePopup(
        <MessageBox
            title='Are you sure?'
            description='You are about to <u>wipe</u> all your <mark>effects</mark> and their <mark>settings</mark>'
            onInteract={(flag) => {
                if (flag) dispatch({ type: 'WIPE_EFFECT_SLOTS' });
                wipeMessageBox.setShown(false);
            }}
        />
    );

    const tooltips = useTooltips(state.cardDraggingIdx === false);

    return (
        <div className='forge-topline'>
            {wipeMessageBox.render()}
            {tooltips.render()}

            <h3 className='forge-topline-heading'>
                <mark>Available</mark> effects <small>(click / drag)</small>
            </h3>
            <div className='forge-topline-buttons'>
                <Button
                    ref={(el) =>
                        tooltips.set(0, 'Empty all effect slots', el, 'down')
                    }
                    enabled={state.effectSlots.length !== 0}
                    onClick={() => wipeMessageBox.setShown(true)}
                >
                    <img
                        src={deleteImg}
                        alt=''
                        style={{
                            width: '1rem',
                            height: '1rem',
                            filter: 'invert(0.5)',
                        }}
                    />
                    <u>Wipe</u>
                    {!isMobile ? 'effects' : ''}
                </Button>

                <Button
                    ref={(el) =>
                        tooltips.set(
                            1,
                            'Randomly fill all remaining effect slots',
                            el,
                            'down'
                        )
                    }
                    enabled={state.effectSlots.length < 9}
                    onClick={() => {
                        dispatch({ type: 'FILL_REMAINING_EFFECTS' });
                    }}
                >
                    <img
                        src={randomImg}
                        alt=''
                        style={{
                            width: '1rem',
                            height: '1rem',
                            filter: 'invert(0.5)',
                        }}
                    />
                    <mark>Random fill</mark>
                    {!isMobile ? 'remaining effects' : ''}
                </Button>

                {/* right side */}
                <Button
                    ref={(el) =>
                        tooltips.set(2, 'Show the tutorial', el, 'down')
                    }
                    style={{ marginLeft: 'auto' }}
                >
                    {!isMobile ? 'Show ' : ' '}
                    Tutorial
                </Button>
            </div>
        </div>
    );
};
