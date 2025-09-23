import './Contents.css';
import './HoverContents.css';

interface Props {
    title?: string;
    description?: string;
}

export const HoverContents = ({ title, description }: Props ) => {
    return (
        <div className='sphere-card-hover-contents'>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    )
}