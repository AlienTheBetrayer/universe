import './GithubPopover.css';
import type React from 'react';
import { useTooltips } from '../../../tooltip/hooks/useTooltips';
import { Button } from '../../../ui/Button/components/Button';

interface Props {
    title: string;
    onCancel: () => void;
    children?: React.ReactNode;
}

export const GithubPopover = ({ title, children, onCancel }: Props) => {
    const tooltips = useTooltips();

    return (
        <>
            { tooltips.render() }

            <div className='github-popover'>
                <div className='github-popover-top'>
                    <h4>{title}</h4>
                    <Button
                    className='github-cancel-button'
                    ref={el => tooltips.set(0, 'Cancel', el, 'left')}
                    onClick={() => onCancel?.()}>
                    ✕
                    </Button>
                </div>

                <div className='github-popover-main'>
                    { children }
                </div>
            </div>
        </>
    )   
}