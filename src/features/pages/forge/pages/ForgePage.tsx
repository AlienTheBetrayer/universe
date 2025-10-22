import { Forge } from '../../../forge/components/Forge';
import { Page } from '../../../layout/components/Page';
import './ForgePage.css';

import { motion } from 'motion/react';

export const ForgePage = () => {
    return (
        <Page>
            <motion.section className='forge-section container'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1}}
            transition={{ delay: 1, duration: 1 }}>
                <Forge />
            </motion.section>
        </Page>
    );
};
