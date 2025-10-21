import './Contents.css';
import './HoverContents.css';

interface Props {
    title?: string;
    description?: string;
}

export const HoverContents = ({ title, description }: Props) => {
    return (
        <div className='sphere-card-hover-contents'>
            <h2>{title}</h2>
            <p dangerouslySetInnerHTML={{ __html: description ?? '' }} />
        </div>
    );
};
