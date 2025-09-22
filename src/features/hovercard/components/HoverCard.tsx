import './HoverCard.css';

import { useRef } from 'react';
import { useHoverCard } from '../hooks/useHoverCard';

interface Props extends React.HTMLAttributes<HTMLElement> {
    title?: string;
    children?: string;
}

export const HoverCard = ({ title, children, className, ...rest }: Props) => {
    const ref = useRef<HTMLElement>(null);
    // hook that handles the mouse enter / leave + portal render + blur
    
    const Contents = () => {
        return (
            <>
                <h3>{title}</h3>
                <p>{children}</p>
            </>
        )
    }

    const popup = useHoverCard(ref, Contents);
    
    return (
        <>
            <article ref={ref} className={`hover-card ${className ?? ''}`} {...rest}>
                <Contents/>
            </article>

            { popup.render() }
        </>
    )
}