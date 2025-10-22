import { forwardRef } from 'react';
import { Button } from '../../../ui/Button/components/Button';
import './ForgeSelectCard.css';

export type ForgeCardType =
    | 'typescript'
    | 'react'
    | 'css'
    | 'html'
    | 'zustand'
    | 'redux'
    | 'javascript'
    | 'nextjs'
    | 'tailwind';

interface Props {
    title: string;
    description: string;
    type: ForgeCardType;
}

export const ForgeSelectCard = forwardRef<HTMLButtonElement, Props>(
    ({ title, description, type }, ref) => {
        return (
            <Button className='forge-select-card' ref={ref}>
                {title}
            </Button>
        );
    }
);
