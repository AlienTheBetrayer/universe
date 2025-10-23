import type { CSSProperties } from 'react';
import { ForgeBlock } from './ForgeBlock';
import './ForgeBlocks.css';

interface Props {
    style?: CSSProperties;
}

export const ForgeBlocks = ({ style }: Props) => {
    return (
        <div className='forge-blocks-container'>
            <h3>Building <mark>blocks</mark></h3>
            <div className='forge-blocks' style={{ ...style }}>
                {Array.from({ length: 4 }).map((_, idx) => (
                    <ForgeBlock key={idx} />
                ))}
            </div>
        </div>
    );
};
