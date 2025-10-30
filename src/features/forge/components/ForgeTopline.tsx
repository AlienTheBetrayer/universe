import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { usePopup } from '../../../hooks/usePopup';
import { MessageBox } from '../../messagebox/components/MessageBox';
import { useTooltips } from '../../tooltip/hooks/useTooltips';
import { Button } from '../../ui/Button/components/Button';
import { useForgeContext } from '../context/ForgeContext';
import './ForgeTopline.css';

import { useTutorial } from '../../tutorial/hooks/useTutorial';
import deleteImg from '../assets/delete.svg';
import randomImg from '../assets/random.svg';

import tutorial1Img from '../assets/tutorial/tutorial-1.png';
import tutorial2Img from '../assets/tutorial/tutorial-2.png';
import tutorial3Img from '../assets/tutorial/tutorial-3.png';
import tutorial4Img from '../assets/tutorial/tutorial-4.png';
import tutorial5Img from '../assets/tutorial/tutorial-5.png';
import tutorial6Img from '../assets/tutorial/tutorial-6.png';
import tutorial7Img from '../assets/tutorial/tutorial-7.png';

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

    const tutorial = useTutorial(
        [
            {
                title: '<mark>Building</mark>',
                description:
                    '<b>Select</b> a building <mark>block</mark> and build with it! <b>Left click</b> to build. <b>Right click</b> to <u>destroy.</u> (There is also a <u>destroy button</u> on the <b>very right</b>)',
                image: tutorial1Img,
            },
            {
                title: '<mark>Effects</mark>',
                description:
                    'You can either <b>click</b> or <b>drag</b> a card onto the <mark>effect slot</mark>, <b>different</b> language corresponds to a <b>different</b> effect. All of them affect the <mark>world</mark>',
                image: tutorial2Img,
            },
            {
                title: '<b>Convenient</b> effect usage',
                description:
                    'If you want to try <mark>all effects</mark> at once (randomly) or <u>wipe</u> them, there are easy-to-use buttons <b>at the top.</b>',
                image: tutorial3Img,
            },
            {
                title: '<mark>Ultimate</mark> effect',
                description:
                    'If you <b>pick</b> all 9 effects, you will be able to witness the last <mark>ultimate</mark> effect, that takes its place <b>outside</b> of the world!',
                image: tutorial4Img,
            },
            {
                title: '<mark>Effect</mark> fun',
                description:
                    "<b>Each</b> effect's strength can be <mark>configured</mark> through the <b>slider</b>, you can also <b>toggle</b> it or <u>remove</u> it altogether.",
                image: tutorial5Img,
            },
            {
                title: '<mark>Building blocks</mark>',
                description:
                    "You can either <b>choose</b> a building block from the bottom or from the world's inventory, they will <mark>sync</mark>!",
                image: tutorial6Img,
            },
            {
                title: '<mark>Saving</mark> and <u>Loading</u>',
                description:
                    'You can <b>save</b> or <b>load</b> your <mark>worlds</mark>, your filled effects, used cards, all the blocks, properties will be <mark>saved</mark>. You will be <b>prompted</b> to <mark>download</mark> a world save file that you can then <b>share</b> with other people or yourself.',
                image: tutorial7Img,
            },
        ],
        () => tutorial.setShown(false)
    );

    return (
        <div className='forge-topline'>
            {wipeMessageBox.render()}
            {tooltips.render()}
            {tutorial.render()}

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
                    onClick={() => tutorial.setShown(true)}
                    style={{ marginLeft: 'auto' }}
                >
                    {!isMobile ? 'Show ' : ' '}
                    Tutorial
                </Button>
            </div>
        </div>
    );
};
