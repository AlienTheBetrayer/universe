import './ToggleButton.css';
import { motion } from 'motion/react';
import { forwardRef, useState, type CSSProperties } from 'react';

import checkmarkImg from './assets/checkmark.svg';

interface Props {
    value?: boolean;
    className?: string;
    style?: CSSProperties;
    onToggled?: (state: boolean) => void;
}

export const ToggleButton = forwardRef<HTMLButtonElement, Props>(
    ({ value, onToggled, className, style, ...rest }, ref) => {
        const [internal, setInternal] = useState<boolean>(false);
        const toggled = value ?? internal;

        const handle = () => {
            onToggled?.(!toggled);

            if (value === undefined) setInternal((prev) => !prev);
        };

        return (
            <button
                className={`toggle-button ${className ?? ''}`}
                ref={ref}
                onClick={() => handle()}
                style={{
                    justifyContent: toggled ? 'flex-end' : 'flex-start',
                    ...style,
                }}
                {...rest}
            >
                <motion.div
                    className='toggle-button-circle'
                    layout
                    transition={{ type: 'spring', stiffness: 200, damping: 40 }}
                ></motion.div>

                <motion.img
                    className='toggle-button-image'
                    src={checkmarkImg}
                    alt=''
                    animate={{ opacity: toggled ? 1 : 0 }}
                ></motion.img>
            </button>
        );
    },
);
