import './CircleGridController.css';
import { HotkeyTooltip } from "../../hotkeytooltip/components/HotkeyTooltip";
import type { useCircleGrid } from "../hooks/useCircleGrid"
import { useMediaQuery } from '../../../hooks/useMediaQuery';

import randomImg from '../assets/random.svg';
import reverseImg from '../assets/reverse.svg';

interface Props {
    data: ReturnType<typeof useCircleGrid>;
}

export const CircleGridController = ({ data }: Props) => {
    const isMobile = useMediaQuery(768);

    return (
        <div style={{ gridRow: 2, gridColumn: 2 }} className='circle-grid-controller'>
            <h3>Controller</h3>

            <button className='circle-grid-button-left'
            onClick={() => data.unshift()}>
                ←
            </button>

            <button className='circle-grid-button-right'
            onClick={() => data.shift()}>
                →
            </button>

            <div className='circle-grid-bottom-bar'>
                <button onClick={() => data.reverse()}>
                    <img src={reverseImg} alt=''/>
                    { !isMobile && (
                        <span>
                            Flip
                        </span>
                    )}
                </button>

                <button onClick={() => data.random()}>
                    <img src={randomImg} alt=''/>
                    { !isMobile && (
                        <span>
                            Random
                        </span>
                    )}
                </button>
            </div>

            <HotkeyTooltip className='circle-grid-hotkeys' hotkeys={['→', '←', 'F', 'R']}/>
        </div>
    )
}