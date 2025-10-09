import './ToggleButton.css';
import { motion, type HTMLMotionProps } from 'motion/react';
import { useState } from 'react';

import checkmarkImg from './assets/checkmark.svg';
import { useTooltips } from '../../tooltip/hooks/useTooltips';

interface Props extends HTMLMotionProps<'div'> {
    value?: boolean;
    onToggled?: (state: boolean) => void;
}

export const ToggleButton = ({ value, onToggled, key }: Props) => {
    const [internal, setInternal] = useState<boolean>(false);
    const toggled = value ?? internal;

    const handle = () => {
        onToggled?.(!toggled);

        if(value === undefined)
            setInternal(prev => !prev);
    }

    const tooltip = useTooltips();

    return (
        <>
            { tooltip.render() }
            <button className='toggle-button' 
            ref={el => tooltip.set(0, 'Dark / Light theme', el, 'down', 16)}
            onClick={() => handle()}
            style={{ justifyContent: toggled ? 'flex-end' : 'flex-start' }}>
                <motion.div className='toggle-button-circle'
                layout 
                key={key}
                transition={{ type: 'spring', stiffness: 200, damping: 40 }}>

                </motion.div>

                <motion.img className='toggle-button-image' src={checkmarkImg} alt=''
                animate={{ opacity: toggled ? 1 : 0 }}>

                </motion.img>
            </button>
        </>
    )
}