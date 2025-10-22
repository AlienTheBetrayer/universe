import { forwardRef } from 'react';
import './ForgeSelectCard.css';
import { Button } from '../../../ui/Button/components/Button';

export type ForgeCardType = 'typescript' | 'react';

interface Props {
    title: string;
    description: string;
    type: ForgeCardType;
}

export const ForgeSelectCard = forwardRef<HTMLButtonElement, Props>(
    ({ title, description, type }, ref) => {
        return (
            <Button className='forge-select-card' ref={ref}>
                { title }
            </Button>
        );
    }
);
