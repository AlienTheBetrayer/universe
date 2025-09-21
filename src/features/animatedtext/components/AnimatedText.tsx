import { motion, type HTMLMotionProps } from "motion/react"

interface Props extends HTMLMotionProps<'span'> {
    children: string;
}

export const AnimatedText = ({ children, ...rest }: Props) => {
    return (
        Array.from(children).map((c, idx) => (
            <motion.span {...rest} key={`animated-${c}-${idx}`}
            initial={{ opacity: 0, scale: 2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx / 20, duration: 0.6, type: 'spring', damping: 10, stiffness: 400 }}>
                {c.toUpperCase()}
            </motion.span>
        ))    
    )
}