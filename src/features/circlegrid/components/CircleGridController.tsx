import './CircleGridController.css';
import { HotkeyTooltip } from '../../hotkeytooltip/components/HotkeyTooltip';
import type { useCircleGrid } from '../hooks/useCircleGrid';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

import randomImg from '../assets/random.svg';
import reverseImg from '../assets/reverse.svg';
import { useTooltips } from '../../tooltip/hooks/useTooltips';

interface Props {
    data: ReturnType<typeof useCircleGrid>;
}

export const CircleGridController = ({ data }: Props) => {
    const isMobile = useMediaQuery(768);

    const tooltips = useTooltips();

    return (
        <div
            style={{ gridRow: 2, gridColumn: 2 }}
            className='circle-grid-controller'
        >
            {tooltips.render()}

            <h3>Controller</h3>

            <button
                className='circle-grid-button-left'
                ref={(el) => tooltips.set(0, 'Shift leftwards', el, 'left')}
                onClick={() => data.unshift()}
            >
                ←
            </button>

            <button
                className='circle-grid-button-right'
                ref={(el) => tooltips.set(1, 'Shift rightwards', el, 'right')}
                onClick={() => data.shift()}
            >
                →
            </button>

            <div className='circle-grid-bottom-bar'>
                <button
                    onClick={() => data.reverse()}
                    ref={(el) => tooltips.set(2, 'Flip the elements', el, 'up')}
                >
                    <img src={reverseImg} alt='' />
                    {!isMobile && <span>Flip</span>}
                </button>

                <button
                    onClick={() => data.random()}
                    ref={(el) =>
                        tooltips.set(3, 'Randomize the elements', el, 'up')
                    }
                >
                    <img src={randomImg} alt='' />
                    {!isMobile && <span>Random</span>}
                </button>
            </div>

            <HotkeyTooltip
                className='circle-grid-hotkeys'
                hotkeys={['→', '←', 'F', 'R']}
            />
        </div>
    );
};
