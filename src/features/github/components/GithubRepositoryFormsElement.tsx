import './GithubRepositoryFormsElement.css';
import fileImg from '../assets/file.svg';

import { Button } from '../../ui/Button/components/Button';
import { useGithubContext, type Form } from '../context/GithubContext';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { differenceInSeconds, formatDistanceToNow } from 'date-fns';

interface Props {
    form: Form;
}

export const GithubRepositoryFormsElement = ({ form }: Props) => {
    // context    
    const [context, setContext] = useGithubContext();

    // state variables
    const thisBranch = context.data.branches.find(b => b.idx === context.data.currentBranch);
    // all commits on this specific element
    const thisCommits = thisBranch?.commits.filter(c => c.form?.idx === form.idx); 

    // date updating for that specific element every second
    const [commitDate, setCommitDate] = useState<string>('');

    useEffect(() => {
        if((thisCommits?.length ?? 0) > 0) {
            const update = () => {
                const date = thisCommits?.at(-1)?.pushedAt;
                if(!date)
                    return;
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
    }, [thisCommits]);

    return (
        <div className='github-form-element'>
            <div className='github-flex flex-wrap'>
                <Button
                className='github-form-element-button'
                onClick={() => setContext(prev => ({ ...prev, data: 
                    ({ ...prev.data, currentForm: form.idx })
                }))}>
                    <img className='github-img' src={fileImg} alt=''/>
                    <p className='github-form-p-name'>{ form.name }</p>
                </Button>

                { form.tags.map((tag, idx) => (
                    <div 
                    className='github-tiny-info-container' 
                    key={`${form.idx}${idx}`}>   
                        <motion.p
                        key={tag}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}>
                            { tag }
                        </motion.p>
                    </div>
                ))}
            </div>

            { (thisCommits?.length ?? 0) > 0 && (
                <p>{ commitDate }</p>
            )}
        </div>
    )
}