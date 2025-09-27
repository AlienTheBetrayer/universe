import './ContactCanvas.css';
import { Canvas } from "@react-three/fiber"
import { motion } from "motion/react"
import { ContactText } from './ContactText';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { ContactParticles } from './ContactParticles';

export const ContactCanvas = () => {

    return (
        <motion.div className='contact-canvas-container'
        initial={{ opacity: 0, filter: 'blur(40px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ delay: 1, duration: 3 }}>
            <Canvas style={{ width: '100%', height: '100%'}}>
                <pointLight position={[ 1, 2, 3]} intensity={2}/>

                <ContactText/>
                <ContactParticles/>

                <EffectComposer>
                    <Bloom intensity={10} luminanceThreshold={0}/>
                </EffectComposer>
            </Canvas>
        </motion.div>

    )
}