import { useLayoutEffect, useRef } from 'react';
import './GithubCommitView.css';
import { useGithubContext } from '../context/GithubContext';

import commitImg from '../assets/commit.svg';

import { AnimatePresence, motion } from 'motion/react';

import { diffChars, type ChangeObject } from 'diff';

interface Props {

}

export const GithubCommitView = ({}: Props) => {
    // context
    const [context, ] = useGithubContext();
    const thisBranch = context.data.branches.find(b => b.idx === context.data.currentBranch);
    
    // commits + diff
    const thisCommit = thisBranch?.commits.find(c => c.idx === context.data.currentCommit);
    const prevCommit = (thisCommit?.idx ?? 0) > 0 ? thisBranch?.commits.at((thisCommit?.idx ?? 1) - 1) : undefined;
    const thisContent = thisCommit?.data;
    const prevContent = prevCommit?.data;

    const difference = {
        author: diffChars(prevContent?.author ?? '', thisContent?.author ?? ''),
        email: diffChars(prevContent?.email ?? '', thisContent?.email ?? ''),
        message: diffChars(prevContent?.message ?? '', thisContent?.message ?? ''),
    }
    
    const differenceComponent = (part: ChangeObject<string>[]) => {
        return (
            <p>
                { part.map(c => (
                    <span
                    className={`github-commit-view-diffchar ${(c.removed || c.added ? 'github-commit-view-diffchar-highlighted' : '')}`}
                    style={{
                        background: c.removed ? 'hsla(0, 59%, 35%, 0.5)' : (c.added ? 'hsla(132, 59%, 35%, 0.5)' : '#00000000')
                    }}>
                        {c.value}
                    </span>
                ))}
            </p>
        )
    }


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

                <AnimatePresence mode='wait'>
                        <motion.p
                        key={`${thisCommit?.idx}-2`}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }} 
                        exit={{ opacity: 0, x: 10 }}
                        style={{ marginLeft: 'auto' }}>
                            { thisCommit?.idx === 0 ? (
                                <mark>Initial commit</mark>
                            ) : (
                                <u>{prevCommit?.name ?? ''}</u>
                            )}
                        </motion.p>
                </AnimatePresence>
            </div>

            <div className='github-commit-view-main'>
                { (thisCommit?.description ?? '').trim().length > 0 && (
                    <div className='github-commit-view-main-field'>
                        <h4>Description</h4>
                        <p>{ thisCommit?.description }</p>
                    </div>
                )}

                <div className='github-commit-view-main-panel-grid'>
                    <div className='github-commit-view-main-panel'>
                        { thisCommit?.idx !== 0 && (
                            <h4><mark>Current</mark> <small>({thisCommit?.name ?? ''})</small></h4>
                        )}

                        <div className='github-commit-view-main-field'>
                            <h4>Author</h4>
                            <p>{ thisCommit?.data?.author ?? '' }</p>
                        </div>

                        <div className='github-commit-view-main-field'>
                            <h4>E-mail</h4>
                            <p>{ thisCommit?.data?.email ?? '' }</p>
                        </div>

                        <div className='github-commit-view-main-field'>
                            <h4>Message</h4>
                            <p>{ thisCommit?.data?.message ?? '' }</p>
                        </div>
                    </div>
                    
                    { prevCommit && (
                        <div className='github-commit-view-main-panel'>
                            <h4><u>Previous</u> <small>({prevCommit.name})</small></h4>

                            <div className='github-commit-view-main-field'>
                                <h4>Author</h4>

                                { differenceComponent(difference.author) }
                            </div>

                            <div className='github-commit-view-main-field'>
                                <h4>E-mail</h4>

                                { differenceComponent(difference.email) }
                            </div>

                            <div className='github-commit-view-main-field'>
                                <h4>Message</h4>

                                { differenceComponent(difference.message) }
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    )
}