import { useLayoutEffect, useRef } from 'react';
import './GithubCommitView.css';

import commitImg from '../../assets/commit.svg';

import { AnimatePresence, motion } from 'motion/react';

import { diffChars, type ChangeObject } from 'diff';
import { useGithubContext } from '../../context/GithubContext';
import type { Commit } from '../../context/types/dataTypes';

interface Props {}

export const GithubCommitView = ({}: Props) => {
    // state
    const [state] = useGithubContext();
    const thisBranch = state.data.branches.find(
        (b) => b.idx === state.data.currentBranch
    );

    // previous commit find
    const thisCommit = thisBranch?.commits.find(
        (c) => c.idx === state.data.currentCommit
    );
    let prevCommit: Commit | undefined = undefined;

    if (thisCommit && thisCommit.idx !== 0) {
        for (let i = thisCommit?.idx; i > 0; --i) {
            const previous = thisBranch?.commits.find((c) => c.idx === i - 1);
            if (
                previous?.type === 'form-content-change' &&
                previous.form?.idx === thisCommit.form?.idx
            ) {
                prevCommit = previous;
                break;
            }
        }
    }

    // div ref + scrolling to it
    const viewRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (state.data.currentCommit !== false) {
            const timeout = setTimeout(() => {
                viewRef.current?.scrollIntoView({
                    block: 'end',
                    behavior: 'smooth',
                });
            }, 300);

            return () => clearTimeout(timeout);
        }
    }, [state.data.currentCommit]);

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className='github-commit-view'
            ref={viewRef}
        >
            <CommitViewTopline
                thisCommit={thisCommit}
                prevCommit={prevCommit}
            />
            <CommitViewMain thisCommit={thisCommit} prevCommit={prevCommit} />
        </motion.div>
    );
};

interface ToplineProps {
    thisCommit: Commit | undefined;
    prevCommit: Commit | undefined;
}

const CommitViewTopline = ({ thisCommit, prevCommit }: ToplineProps) => {
    return (
        <div className='github-commit-view-topline'>
            <img src={commitImg} alt='commit' className='github-img' />

            <motion.p
                key={thisCommit?.idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <mark>{thisCommit?.name}</mark>
            </motion.p>

            <AnimatePresence mode='wait'>
                <motion.p
                    key={`${thisCommit?.idx}-2`}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    style={{ marginLeft: 'auto' }}
                >
                    {prevCommit === undefined ? (
                        <mark>Initial commit</mark>
                    ) : (
                        <u>{prevCommit?.name ?? ''}</u>
                    )}
                </motion.p>
            </AnimatePresence>
        </div>
    );
};

interface MainProps {
    thisCommit: Commit | undefined;
    prevCommit: Commit | undefined;
}

const CommitViewMain = ({ thisCommit, prevCommit }: MainProps) => {
    const thisContent = thisCommit?.data;
    const prevContent = prevCommit?.data;

    const difference = {
        author: diffChars(prevContent?.author ?? '', thisContent?.author ?? ''),
        email: diffChars(prevContent?.email ?? '', thisContent?.email ?? ''),
        message: diffChars(
            prevContent?.message ?? '',
            thisContent?.message ?? ''
        ),
    };

    const differenceComponent = (part: ChangeObject<string>[]) => {
        return (
            <p>
                {part.map((c, idx) => (
                    <span
                        key={idx}
                        className={`github-commit-view-diffchar ${
                            c.removed || c.added
                                ? 'github-commit-view-diffchar-highlighted'
                                : ''
                        }`}
                        style={{
                            background: c.removed
                                ? 'hsla(0, 59%, 35%, 0.5)'
                                : c.added
                                ? 'hsla(132, 59%, 35%, 0.5)'
                                : '#00000000',
                        }}
                    >
                        {c.value}
                    </span>
                ))}
            </p>
        );
    };

    return (
        <div className='github-commit-view-main'>
            {(thisCommit?.description ?? '').trim().length > 0 && (
                <div className='github-commit-view-main-field'>
                    <h4>Description</h4>
                    <p>{thisCommit?.description}</p>
                </div>
            )}

            <div className='github-commit-view-main-panel-grid'>
                <div className='github-commit-view-main-panel'>
                    {thisCommit?.idx !== 0 && (
                        <h4>
                            <mark>Current</mark>{' '}
                            <small>({thisCommit?.name ?? ''})</small>
                        </h4>
                    )}

                    <div className='github-commit-view-main-field'>
                        <h4>Author</h4>
                        <p>{thisCommit?.data?.author ?? ''}</p>
                    </div>

                    <div className='github-commit-view-main-field'>
                        <h4>E-mail</h4>
                        <p>{thisCommit?.data?.email ?? ''}</p>
                    </div>

                    <div className='github-commit-view-main-field'>
                        <h4>Message</h4>
                        <p>{thisCommit?.data?.message ?? ''}</p>
                    </div>
                </div>

                {prevCommit !== undefined && (
                    <div className='github-commit-view-main-panel'>
                        <h4>
                            <u>Previous</u> <small>({prevCommit.name})</small>
                        </h4>

                        <div className='github-commit-view-main-field'>
                            <h4>Author</h4>

                            {differenceComponent(difference.author)}
                        </div>

                        <div className='github-commit-view-main-field'>
                            <h4>E-mail</h4>

                            {differenceComponent(difference.email)}
                        </div>

                        <div className='github-commit-view-main-field'>
                            <h4>Message</h4>

                            {differenceComponent(difference.message)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};