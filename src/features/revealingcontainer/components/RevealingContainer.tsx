import { motion } from 'motion/react';

interface Props extends React.HTMLAttributes<HTMLElement> {
    delay?: number;
}

export const RevealingContainer = ({ delay, children }: Props) => {
    return (
        <motion.div
            initial={{ y: 200, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ delay: delay, duration: 1 }}
        >
            {children}
        </motion.div>
    );
};
