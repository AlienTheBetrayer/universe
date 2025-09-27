import './FormSection.css';
import { Form } from "../components/Form"
import { motion } from 'motion/react';

export const FormSection = () => { 
    return (
        <motion.section className='form-section container'
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 3, type: 'spring', stiffness: 160, damping: 40 }}>
            <Form/>
        </motion.section>
    )
}