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
        if(context.data.currentCommit !== false) {
            const timeout = setTimeout(() => {
                viewRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
            }, 300);
            
            return () => clearTimeout(timeout);
        }
    }, [context.data.currentCommit]);

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
                <motion.p
                key={thisCommit?.idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}>
                    <mark>{ thisCommit?.name }</mark>
                </motion.p>
            </div>

            <div className='github-commit-view-main'>
                { (thisCommit?.description ?? '').trim().length > 0 && (
                    <div className='github-commit-view-main-field'>
                        <h4>Description</h4>
                        <p>{ thisCommit?.description }</p>
                    </div>
                )}

                <div className='github-commit-view-main-field'>
                    <h4>Author</h4>
                    <p>{ thisCommit?.data.author ?? '' }</p>
                </div>

                <div className='github-commit-view-main-field'>
                    <h4>E-mail</h4>
                    <p>{ thisCommit?.data.email ?? '' }</p>
                </div>

                <div className='github-commit-view-main-field'>
                    <h4>Message</h4>
                    <p>{ thisCommit?.data.message ?? '' }</p>
                </div>
            </div>
        </motion.div>
    )
}