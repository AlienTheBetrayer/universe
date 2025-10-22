import './ForgeSelectCard.css';

export type ForgeCardType = 'typescript' | 'react';

interface Props {
    title: string;
    description: string;
    type: ForgeCardType;
}

export const ForgeSelectCard = ({ title, description, type }: Props) => {
    return (
        <div className='forge-select-card'>
            <h4 dangerouslySetInnerHTML={{ __html: title }} />
            <p dangerouslySetInnerHTML={{ __html: description }} />
        </div>
    );
};
