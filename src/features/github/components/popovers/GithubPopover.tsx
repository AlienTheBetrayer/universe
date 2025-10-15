import './GithubPopover.css';
import type React from 'react';
import { useTooltips } from '../../../tooltip/hooks/useTooltips';
import { Button } from '../../../ui/Button/components/Button';

interface Props extends React.HTMLProps<HTMLDivElement> {
    title: string;
    onCancel: () => void;
    children?: React.ReactNode;
}

export const GithubPopover = ({ className, title, children, onCancel, ...rest }: Props) => {
    const tooltips = useTooltips();

    return (
        <>
            { tooltips.render() }

            <div className={`github-popover ${className ?? ''}`} {...rest}>
                <div className='github-popover-top'>
                    <h4 dangerouslySetInnerHTML={{ __html: title }}/>
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