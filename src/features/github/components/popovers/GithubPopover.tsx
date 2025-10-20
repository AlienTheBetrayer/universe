import type React from 'react';
import { useTooltips } from '../../../tooltip/hooks/useTooltips';
import { Button } from '../../../ui/Button/components/Button';
import './GithubPopover.css';

interface PopoverSuccess {
    text: string;
    action: () => void;
}

interface Props extends React.HTMLProps<HTMLDivElement> {
    title: string;
    onCancel: () => void;
    success?: PopoverSuccess;
    enabled?: boolean;

    children?: React.ReactNode;
}

export const GithubPopover = ({
    className,
    title,
    children,
    enabled,
    onCancel,
    success,
    ...rest
}: Props) => {
    const tooltips = useTooltips();

    return (
        <>
            {tooltips.render()}

            <div className={`github-popover ${className ?? ''}`} {...rest}>
                <div className='github-popover-top'>
                    <h4 dangerouslySetInnerHTML={{ __html: title }} />
                    <Button
                        className='github-cancel-button'
                        ref={(el) => tooltips.set(0, 'Cancel', el, 'left')}
                        onClick={() => onCancel?.()}
                    >
                        ✕
                    </Button>
                </div>

                <div className='github-popover-main'>{children}</div>

                {success && (
                    <div className='github-popover-bottom'>
                        <Button
                            ref={(el) =>
                                tooltips.set(1, 'Cancel', el, 'down', 16)
                            }
                            onClick={() => onCancel?.()}
                        >
                            Cancel
                        </Button>

                        <Button
                            enabled={enabled ?? true}
                            ref={(el) =>
                                tooltips.set(
                                    2,
                                    'Apply and update changes',
                                    el,
                                    'down',
                                    16
                                )
                            }
                            onClick={() => {
                                success.action();
                                onCancel?.();
                            }}
                            className='github-save-button'
                        >
                            {success.text}
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
};
