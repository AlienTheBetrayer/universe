import './StellarWaitingPopup.css';
import { motion } from 'motion/react';

interface Props {
    text?: string;
}

export const StellarWaitingPopup = ({ text='' }: Props) => {
    return (
        <>
            <div className='stellar-waiting-border'/>

            <motion.div className='stellar-waiting-container'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
                <h3>Waiting for the <mark>action...</mark></h3>
                <p>{text}</p>
            </motion.div>
        </>
    )
}