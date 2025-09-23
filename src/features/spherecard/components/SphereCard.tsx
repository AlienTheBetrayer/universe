import './SphereCard.css';

import { useRef } from 'react';
import { useSphereCardPopup } from '../hooks/useSphereCardPopup';
import { Contents } from './Contents';

interface Props extends React.HTMLAttributes<HTMLElement> {
    title?: string;
    description?: string;
    hoverDescription?: string;
}

export const SphereCard = ({ title, description, hoverDescription, className, ...rest }: Props) => {
    const ref = useRef<HTMLElement>(null);
    
    // hook that handles the mouse enter / leave + portal render + blur
    const popup = useSphereCardPopup(ref, title, hoverDescription);
    
    return (
        <>
            <article ref={ref} className={`sphere-card ${className ?? ''}`} {...rest}>
                <Contents title={title} description={description}/>
            </article>

            { popup.render() }
        </>
    )
}