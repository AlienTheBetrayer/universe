import './GithubCommitsElement.css'
import { useGithubContext, type Commit } from "../context/GithubContext"
import { Button } from '../../ui/Button/components/Button';

import commitImg from '../assets/commit.svg';
import formImg from '../assets/file.svg';
import deleteImg from '../assets/delete.svg';
import addImg from '../assets/add.svg';

import { useEffect, useState } from 'react';
import { differenceInSeconds, formatDistanceToNow } from 'date-fns';


interface Props {
    commit: Commit;
}

export const GithubCommitsElement = ({ commit }: Props) => {
    // context + variables
    const [context, setContext] = useGithubContext();
    const thisBranch = context.data.branches.find(b => b.idx === context.data.currentBranch);
    const commitedForm = commit.form;

    // date updating for that specific commit every second
    const [commitDate, setCommitDate] = useState<string>('');
   
    useEffect(() => {
            if((thisBranch?.commits.length ?? 0) > 0) {
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
        }, [thisBranch?.commits]);


    // function to choose between commit types
    const commitTypeComponent = () => {
        switch(commit.type) {
            case 'form-content-change':
                return (
                    <>
                        <img
                        className='github-img'
                        src={formImg}
                        alt=''/>

                        <p>{commitedForm?.name ?? ''}</p>

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
                    </>
                );
            case 'form-creation':
                return (
                    <>
                        <img
                        className='github-img'
                        src={addImg}
                        alt=''/>
                        
                        <p>{ commit.name }</p>
                    </>
                )
            case 'form-deletion':
                return (
                    <>
                        <img
                        className='github-img'
                        src={deleteImg}
                        alt=''/>
                        
                        <p>{ commit.name }</p>
                    </>
                )
        }
    }

    return (
        <div
        className='github-commits-element'>
            { commitTypeComponent() }

            <p
            style={{ marginLeft: 'auto' }}>
                { commitDate }
            </p>
        </div>
    )
}