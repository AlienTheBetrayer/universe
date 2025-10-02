import './StellarNetwork.css';
import { Page } from "../../../layout/components/Page"
import { StellarCanvas } from '../../../stellars/components/StellarCanvas';
import { SelectedStellarUI } from '../../../stellars/components/SelectedStellarUI';
import { StellarUI } from '../../../stellars/components/StellarUI';
import { motion } from 'motion/react';
import { StellarProvider } from '../../../stellars/context/StellarContext';

export const StellarNetwork = () => {
    return (
        <Page>
            <StellarProvider>
                <motion.div className='stellar-wrapper'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: 'backInOut'}}>
                    <StellarCanvas/>

                    <SelectedStellarUI/>

                    <StellarUI/>
                </motion.div>
            </StellarProvider>
        </Page>
    )
}