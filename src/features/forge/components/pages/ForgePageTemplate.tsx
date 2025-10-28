import type React from 'react';
import type { CSSProperties } from 'react';
import { Button } from '../../../ui/Button/components/Button';
import './ForgePageTemplate.css';

import { motion } from 'motion/react';
import { useTooltips } from '../../../tooltip/hooks/useTooltips';

interface Props {
    title?: string;
    className?: string;
    style?: CSSProperties;
    onInteract?: () => void;
    children?: React.ReactNode;
}

export const ForgePageTemplate = ({
    className,
    style,
    title,
    onInteract,
    children,
}: Props) => {
    const tooltips = useTooltips();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`forge-page-template ${className ?? ''}`}
            style={{ ...style }}
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
