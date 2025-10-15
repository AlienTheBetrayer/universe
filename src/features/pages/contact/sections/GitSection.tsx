import './GitSection.css';
import { Github } from '../../../github/components/Github';
import { GithubTutorial } from '../../../github/components/GithubTutorial';

import { motion } from 'motion/react';

export const GitSection = () => { 
    return (
        <motion.section
        className='git-section container'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1 }}>
            <h2>
                <mark>Github</mark> emulation w/ forms
            </h2>
        
            <GithubTutorial/>

            <div className='github-container'>
                <Github/>
            </div>
        </motion.section>
    )
}