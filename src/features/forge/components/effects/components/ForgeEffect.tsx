import { forwardRef } from 'react';
import './ForgeEffect.css';

interface Props {

}

export const ForgeEffect = forwardRef<HTMLDivElement, Props>(({}, ref) => {
    return (
        <div className='forge-effect' ref={ref}>
        </div>
    )
});