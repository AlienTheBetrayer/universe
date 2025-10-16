import { useLayoutEffect, useRef } from 'react';
import './GithubCommitView.css';
import { useGithubContext } from '../context/GithubContext';

import commitImg from '../assets/commit.svg';

import { motion } from 'motion/react';

interface Props {

}

export const GithubCommitView = ({}: Props) => {
    // context
    const [context, ] = useGithubContext();
    const thisBranch = context.data.branches.find(b => b.idx === context.data.currentBranch);
    const thisCommit = thisBranch?.commits.find(c => c.idx === context.data.currentCommit);
    
    // div ref + scrolling to it
    const viewRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if(context.data.currentForm !== false) {
            const timeout = setTimeout(() => {
                viewRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
            }, 300);
            
            return () => clearTimeout(timeout);
        }
    }, [context.data.currentForm]);

    return (
        <motion.div 
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className='github-commit-view'
        ref={viewRef}>
            <div className='github-commit-view-topline'>
                <img
                src={commitImg}
                alt='commit'
                className='github-img'/>
                <p>
                    <mark>{ thisCommit?.name }</mark>
                </p>
            </div>

            <div className='github-commit-view-main'>

            </div>
        </motion.div>
    )
}