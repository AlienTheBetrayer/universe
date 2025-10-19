import { formatDistanceToNow } from 'date-fns';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useTooltips } from '../../../tooltip/hooks/useTooltips';
import { Button } from '../../../ui/Button/components/Button';
import { useGithubContext } from '../../context/GithubContext';
import './GithubRepositoryFormsInfo.css';

import commitImg from '../../assets/commit.svg';

export const GithubRepositoryFormsInfo = () => {
    // context + state variables
    const [context, setContext] = useGithubContext();
    const thisBranch = context.data.branches.find(b => b.idx === context.data.currentBranch);

    // commit date updating every minute
    const [commitDate, setCommitDate] = useState<string>('');

    useEffect(() => {
        if((thisBranch?.commits.length ?? 0) > 0) {
            const update = () => {
                const date = thisBranch?.commits.at(-1)?.pushedAt;
                if(date)
                    setCommitDate(formatDistanceToNow(date, { addSuffix: true }));
            }
            
            update();
            const interval = setInterval(() => {
                update();
            }, 60000);

            return () => clearInterval(interval);
        }
    }, [thisBranch?.commits]);

    // tooltips
    const tooltips = useTooltips();

    return (
        <div className='github-forms-info'>
            { tooltips.render() }

            <div className='github-flex'>
                <div className='github-flex'>
                    <div className='github-heading-avatar'/>
                    <p>Gleb</p>
                </div>
                
                { (thisBranch?.commits.length ?? 0) > 0 && (
                    <p>
                        <mark>
                            <b>
                                {thisBranch?.commits.at(-1)?.name}
                            </b>
                        </mark>
                    </p>
                )}
            </div>

            <div className='github-flex'>
                { (thisBranch?.commits.length ?? 0) > 0 && (
                    <p>{commitDate}</p>
                )}

                <Button
                enabled={ (thisBranch?.commits.length ?? 0) > 0 }
                onClick={() => setContext(prev => ({ ...prev, page: 'commits' }))}
                style={{ marginLeft: 'auto' }}
                ref={el => tooltips.set(0, 'View all commits', el, 'down')}>
                    <img className='github-img' src={commitImg} alt=''/>
                    <motion.div
                    key={thisBranch?.commits.length ?? 0}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}>
                        { (thisBranch?.commits.length ?? 0) } commit{ (thisBranch?.commits.length ?? 0) !== 1 ? 's' : ''}
                    </motion.div>
                </Button>
            </div>

        </div>
    )
}