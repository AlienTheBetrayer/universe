import type { ForgeCardContent, ForgeCardType } from '../../../context/types/data';
import './ForgeEffect.css';

interface Props {
    type: ForgeCardType | undefined;
}

export const ForgeEffect = ({ type }: Props) => {
    return (
        <div className='forge-effect'>
            { type && type }
        </div>
    );
};
