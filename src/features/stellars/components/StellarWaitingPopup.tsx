import { motion } from 'motion/react';
import './StellarWaitingPopup.css';

interface Props {
    text?: string[];
}

export const StellarWaitingPopup = ({ text }: Props) => {
    return (
        <>
            <div className='stellar-waiting-border' />

            <motion.div
                className='stellar-waiting-title'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <h3>
                    Waiting for the <mark>action...</mark>
                </h3>
                {text?.map((t, idx) => (
                    <p key={idx} dangerouslySetInnerHTML={{ __html: t }} />
                ))}
            </motion.div>
        </>
    );
};
