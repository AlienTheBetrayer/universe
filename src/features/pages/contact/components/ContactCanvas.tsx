import './ContactCanvas.css';
import { Canvas } from "@react-three/fiber"
import { motion } from "motion/react"

export const ContactCanvas = () => {
    return (
        <motion.div className='contact-canvas-container'>
            <Canvas>

            </Canvas>
        </motion.div>

    )
}