import { Button } from '../../../ui/Button/components/Button';
import './ForgePageTemplate.css';

import { motion, type HTMLMotionProps } from 'motion/react';
import { useTooltips } from '../../../tooltip/hooks/useTooltips';
import type React from 'react';

interface Props extends HTMLMotionProps<'div'> {
    title?: string;
    children?: React.ReactNode;
    onInteract?: () => void;
}

export const ForgePageTemplate = ({
    className,
    style,
    title,
    onInteract,
    children,
    ...rest
}: Props) => {
    const tooltips = useTooltips();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`forge-page-template ${className ?? ''}`}
            style={{ ...style }}
            {...rest}
        >
            {tooltips.render()}

            <div className='forge-page-template-topline'>
                <p dangerouslySetInnerHTML={{ __html: title ?? '' }} />
                <Button
                    ref={(el) =>
                        tooltips.set(0, 'Cancel / Go back', el, 'left')
                    }
                    style={{ marginLeft: 'auto' }}
                    className='forge-cancel-button'
                    onClick={() => onInteract?.()}
                >
                    ✕
                </Button>
            </div>

            <div className='forge-page-template-main'>{children}</div>
        </motion.div>
    );
};
