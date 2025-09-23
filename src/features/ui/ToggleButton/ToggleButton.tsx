import './ToggleButton.css';
import { motion } from 'motion/react';
import { useState } from 'react';

interface Props {
    backgroundColor?: string;
    circleColor?: string;

    onToggled?: (state: boolean) => void;
}

export const ToggleButton = ({ onToggled }: Props) => {
    const [toggled, setToggled] = useState<boolean>(false);

    const handle = () => {
        onToggled?.(!toggled);
        setToggled(prev => !prev);
    }

    return (
        <button className='toggle-button' 
        onClick={() => handle()}
        style={{ justifyContent: toggled ? 'flex-end' : 'flex-start' }}>
            <motion.div className='toggle-button-circle'
            layout 
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}>

            </motion.div>

        </button>
    )
}