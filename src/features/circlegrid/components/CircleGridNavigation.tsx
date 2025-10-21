import './CircleGridNavigation.css';
import './CircleGrid.css';
import type { useCircleGrid } from '../hooks/useCircleGrid';

interface Props {
    data: ReturnType<typeof useCircleGrid>;
}

export const CircleGridNavigation = ({ data }: Props) => {
    return (
        <>
            {/* 1 row */}
            <div
                className='circle-grid-element circle-grid-nav'
                style={{ gridRow: 1, gridColumn: 1 }}
            >
                <button
                    style={{ bottom: '0.5rem' }}
                    onClick={() => data.swap(0, 7)}
                >
                    ↓
                </button>
                <button
                    style={{ right: '0.5rem' }}
                    onClick={() => data.swap(0, 1)}
                >
                    →
                </button>
            </div>

            <div
                className='circle-grid-element circle-grid-nav'
                style={{ gridRow: 1, gridColumn: 2 }}
            >
                <button
                    style={{ left: '0.5rem' }}
                    onClick={() => data.swap(0, 1)}
                >
                    ←
                </button>
                <button
                    style={{ right: '0.5rem' }}
                    onClick={() => data.swap(1, 2)}
                >
                    →
                </button>
            </div>

            <div
                className='circle-grid-element circle-grid-nav'
                style={{ gridRow: 1, gridColumn: 3 }}
            >
                <button
                    style={{ left: '0.5rem' }}
                    onClick={() => data.swap(1, 2)}
                >
                    ←
                </button>
                <button
                    style={{ bottom: '0.5rem' }}
                    onClick={() => data.swap(2, 3)}
                >
                    ↓
                </button>
            </div>

            {/* 2 row */}
            <div
                className='circle-grid-element circle-grid-nav'
                style={{ gridRow: 2, gridColumn: 1 }}
            >
                <button
                    style={{ top: '0.5rem' }}
                    onClick={() => data.swap(0, 7)}
                >
                    ↑
                </button>
                <button
                    style={{ bottom: '0.5rem' }}
                    onClick={() => data.swap(6, 7)}
                >
                    ↓
                </button>
            </div>

            <div
                className='circle-grid-element circle-grid-nav'
                style={{ gridRow: 2, gridColumn: 3 }}
            >
                <button
                    style={{ top: '0.5rem' }}
                    onClick={() => data.swap(2, 3)}
                >
                    ↑
                </button>
                <button
                    style={{ bottom: '0.5rem' }}
                    onClick={() => data.swap(3, 4)}
                >
                    ↓
                </button>
            </div>

            {/* 3 row */}
            <div
                className='circle-grid-element circle-grid-nav'
                style={{ gridRow: 3, gridColumn: 1 }}
            >
                <button
                    style={{ top: '0.5rem' }}
                    onClick={() => data.swap(6, 7)}
                >
                    ↑
                </button>
                <button
                    style={{ right: '0.5rem' }}
                    onClick={() => data.swap(5, 6)}
                >
                    →
                </button>
            </div>

            <div
                className='circle-grid-element circle-grid-nav'
                style={{ gridRow: 3, gridColumn: 2 }}
            >
                <button
                    style={{ left: '0.5rem' }}
                    onClick={() => data.swap(5, 6)}
                >
                    ←
                </button>
                <button
                    style={{ right: '0.5rem' }}
                    onClick={() => data.swap(4, 5)}
                >
                    →
                </button>
            </div>

            <div
                className='circle-grid-element circle-grid-nav'
                style={{ gridRow: 3, gridColumn: 3 }}
            >
                <button
                    style={{ top: '0.5rem' }}
                    onClick={() => data.swap(3, 4)}
                >
                    ↑
                </button>
                <button
                    style={{ left: '0.5rem' }}
                    onClick={() => data.swap(4, 5)}
                >
                    ←
                </button>
            </div>
        </>
    );
};
