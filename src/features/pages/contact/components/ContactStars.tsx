import { useContactContext } from '../context/ContactContext';
import './ContactStars.css';
import { motion } from 'motion/react';

export const ContactStars = () => {
    const color = useContactContext()[0].color.map(n => n * 255);
    console.log(color);

    return (
        <>
            <motion.div className='contact-star-left'
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 1, type: 'spring', damping: 40, stiffness: 40 }}
            style={{ background: `linear-gradient(to bottom, rgb(${color[0]}, ${color[1]}, ${color[2]}), rgb(${color[0] / 5}, ${color[1] / 5}, ${color[2] / 5}))`}}>

            </motion.div>

            <motion.div className='contact-star-right'
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 1, type: 'spring', damping: 40, stiffness: 40 }}
            style={{ background: `linear-gradient(to bottom, rgb(${color[0]}, ${color[1]}, ${color[2]}), rgb(${color[0] / 5}, ${color[1] / 5}, ${color[2] / 5}))`}}>

            </motion.div>

            <motion.div className='contact-star-middle'
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 2, type: 'spring', damping: 40, stiffness: 40 }}
            style={{ background: `linear-gradient(to right, rgb(${color[0]}, ${color[1]}, ${color[2]}), rgb(${color[0] / 5}, ${color[1] / 5}, ${color[2] / 5}))`}}>
            
            </motion.div>
        </>
    )
}