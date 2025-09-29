import './ContactCanvas.css';
import { Canvas } from "@react-three/fiber"
import { motion } from "motion/react"
import { ContactText } from './ContactText';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { ContactParticles } from './ContactParticles';
import { ContactLight } from './ContactLight';

export const ContactCanvas = () => {

    return (
        <motion.div className='contact-canvas-container'
        initial={{ opacity: 0, filter: 'blur(20px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ delay: 1, duration: 1 }}>
            <Canvas style={{ width: '100%', height: '100%'}}>
                <ContactLight/>
                <ContactText/>
                <ContactParticles/>

                <EffectComposer>
                    <Bloom intensity={4} luminanceThreshold={0}/>
                </EffectComposer>
            </Canvas>
        </motion.div>

    )
}