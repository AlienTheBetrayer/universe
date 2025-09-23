import './ToggleButton.css';
import type { HTMLMotionProps } from "motion/react"
import { motion } from 'motion/react';
import { useState } from 'react';

interface Props extends HTMLMotionProps<'button'> {
    backgroundColor?: string;
    circleColor?: string;
    children?: string;

    onToggled?: (state: boolean) => void;
}

export const ToggleButton = ({ children, onToggled, circleColor='#0000ff', backgroundColor='#0c0c67' }: Props) => {
    const [toggled, setToggled] = useState<boolean>(false);

    const handle = () => {
        onToggled?.(!toggled);
        setToggled(prev => !prev);
    }

    return (
        <button className='toggle-button' 
        onClick={() => handle()}
        style={{ justifyContent: toggled ? 'flex-end' : 'flex-start', backgroundColor: backgroundColor}}>
            <motion.div className='toggle-button-circle'
            layout 
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            style={{ backgroundColor: circleColor }}>

            </motion.div>

        </button>
    )
}