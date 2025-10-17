import './GitSection.css';
import { Github } from '../../../github/components/Github';
import { GithubTutorial } from '../../../github/components/GithubTutorial';

import { motion } from 'motion/react';

export const GitSection = () => { 
    return (
        <motion.section
        className='git-section container'
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}>
            <GithubTutorial/>

            <div className='github-container'>
                <Github/>
            </div>
        </motion.section>
    )
}