import './ContactCanvas.css';
import { Canvas } from "@react-three/fiber"
import { motion } from "motion/react"
import { ContactText } from './ContactText';
import { Bloom, EffectComposer } from '@react-three/postprocessing';

export const ContactCanvas = () => {

    return (
        <motion.div className='contact-canvas-container'
        initial={{ opacity: 0, filter: 'blur(40px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ delay: 1, duration: 3 }}>
            <Canvas>
                <pointLight position={[ 1, 2, 3]} intensity={2}/>

                <ContactText/>

                <EffectComposer>
                    <Bloom intensity={10} luminanceThreshold={0}/>
                </EffectComposer>
            </Canvas>
        </motion.div>

    )
}