import { ForgeAwaiting } from '../../../forge/components/cards/components/ForgeAwaiting';
import { Forge } from '../../../forge/components/Forge';
import { ForgeProvider } from '../../../forge/context/ForgeContext';
import { Page } from '../../../layout/components/Page';
import './ForgePage.css';

import { motion } from 'motion/react';

export const ForgePage = () => {
    return (
        <ForgeProvider>
            <Page className='forge-page'>
                <motion.section
                    className='forge-section container'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    <Forge />
                </motion.section>

                <ForgeAwaiting/>
            </Page>
        </ForgeProvider>
    );
};
