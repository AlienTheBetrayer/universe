import './GithubCommitsElement.css'
import { useGithubContext, type Commit } from "../context/GithubContext"
import { Button } from '../../ui/Button/components/Button';

import commitImg from '../assets/commit.svg';
import formImg from '../assets/file.svg';
import deleteImg from '../assets/delete.svg';

import { useEffect, useState } from 'react';
import { differenceInSeconds, formatDistanceToNow } from 'date-fns';


interface Props {
    commit: Commit;
}

export const GithubCommitsElement = ({ commit }: Props) => {
    // context + variables
    const [context, setContext] = useGithubContext();
    const thisBranch = context.data.branches.find(b => b.idx === context.data.currentBranch)!;
    const commitedForm = thisBranch.forms.find(f => f.idx === commit.formIdx);

    // date updating for that specific commit every second
    const [commitDate, setCommitDate] = useState<string>('');
   

    useEffect(() => {
            if(thisBranch.commits.length > 0) {
                const update = () => {
                    const date = commit.pushedAt;
                    const seconds = differenceInSeconds(new Date(), date);

                    if(seconds < 60) {
                        setCommitDate(`${seconds}s ago`);
                    } else {
                        setCommitDate(formatDistanceToNow(new Date(date), { addSuffix: true }));
                    }
                }

                update();
                const interval = setInterval(() => {
                    update();
                }, 1000);

                return () => clearInterval(interval);
            }
        }, [thisBranch.commits]);

    return (
        <div
        className='github-commits-element'>
            { commitedForm !== undefined ? (
                <>
                    <img
                    className='github-img'
                    src={formImg}
                    alt=''/>
                    <p>{commitedForm.name}</p>
                </>
            ) : (
                <>
                    <img
                    className='github-img'
                    src={deleteImg}
                    alt=''/>
                    <p><u>Deleted</u></p>
                </>
            )}

            <Button
            className='github-form-element-button'
            onClick={() => setContext(prev => ({ ...prev, 
            data: ({ ...prev.data,
                currentCommit: commit.idx
            })}))}>
                <img 
                className='github-img' 
                src={commitImg} 
                alt=''/>

                <p>{ commit.name }</p>
            </Button>

            <p
            style={{ marginLeft: 'auto' }}>
                { commitDate }
            </p>
        </div>
    )
}