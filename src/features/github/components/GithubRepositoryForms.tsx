import { useEffect, useState } from 'react';
import './GithubRepositoryForms.css';
import { useGithubContext } from '../context/GithubContext';
import { Button } from '../../ui/Button/components/Button';

import { motion } from 'motion/react';
import { useTooltips } from '../../tooltip/hooks/useTooltips';

import commitImg from '../assets/commit.svg';
import { GithubRepositoryFormsElement } from './GithubRepositoryFormsElement';
import { formatDistanceToNow } from 'date-fns';

interface Props {
    searchValue: string;
}

export const GithubRepositoryForms = ({ searchValue }: Props) => {
    const [context, ] = useGithubContext();

    // state variables
    const thisBranch = context.data.branches.find(b => b.idx === context.data.currentBranch)!;


    // filter functionality
    const [found, setFound] = useState<number[]>([]);

    useEffect(() => {
        setFound((thisBranch?.forms ?? [])
            .filter(form => (
                form.name.toLowerCase().includes(searchValue.toLowerCase())
                || form.tags.find(tag => tag.toLowerCase().includes(searchValue.toLowerCase()))
                || searchValue.trim().length === 0))
            .map(form => form.idx)
        );
    }, [searchValue, context.data]);


    // date updating (latest commit overall) every minute
    const [commitDate, setCommitDate] = useState<string>('');

    useEffect(() => {
        if(thisBranch.commits.length > 0) {
            const update = () => {
                const date = thisBranch.commits.at(-1)!.pushedAt;
                setCommitDate(formatDistanceToNow(date, { addSuffix: true }));
            }
            
            update();
            const interval = setInterval(() => {
                update();
            }, 60000);

            return () => clearInterval(interval);
        }
    }, [thisBranch.commits]);
    

    // tooltips
    const tooltips = useTooltips();

    return (
        <>
            { tooltips.render() }

            <div className='github-forms'>
                <div className='github-forms-info'>
                    <div className='github-flex'>
                        <div className='github-flex'>
                            <div className='github-heading-avatar'/>
                            <p>Gleb</p>
                        </div>
                        
                        { thisBranch.commits.length > 0 && (
                            <p>
                                <mark>
                                    <b>
                                        {thisBranch.commits.at(-1)!.name}
                                    </b>
                                </mark>
                            </p>
                        )}
                    </div>

                    <div className='github-flex'>
                        { thisBranch.commits.length > 0 && (
                            <p>{commitDate}</p>
                        )}

                        <Button
                        style={{ marginLeft: 'auto' }}
                        ref={el => tooltips.set(0, 'View all commits', el, 'down')}>
                            <img className='github-img' src={commitImg} alt=''/>
                            <motion.div
                            key={thisBranch.commits.length}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}>
                                { thisBranch.commits.length ?? 0 } commit{ (thisBranch.commits.length ?? 0) !== 1 ? 's' : ''}
                            </motion.div>
                        </Button>
                    </div>

                </div>

                { thisBranch?.forms.map(form => (
                    found.indexOf(form.idx) !== -1 && (
                        <GithubRepositoryFormsElement 
                        key={form.idx}
                        form={form}/>
                    )
                ))}
            </div>
        </>
    )
}