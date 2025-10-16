import { useEffect, useState } from 'react';
import './GithubRepositoryForms.css';
import { useGithubContext } from '../context/GithubContext';
import { Button } from '../../ui/Button/components/Button';

import { motion } from 'motion/react';
import { useTooltips } from '../../tooltip/hooks/useTooltips';

import commitImg from '../assets/commit.svg';
import fileImg from '../assets/file.svg';

interface Props {
    searchValue: string;
}

export const GithubRepositoryForms = ({ searchValue }: Props) => {
    const [context, setContext] = useGithubContext();

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
                                {thisBranch.commits.at(-1)!.name}
                            </p>
                        )}
                    </div>

                    <div className='github-flex'>
                        { thisBranch.commits.length > 0 && (
                            <p>{thisBranch.commits.at(-1)!.pushedAt}</p>
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
                        <div
                        className='github-form-element' 
                        key={form.idx}>
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

                            { thisBranch.commits.length > 0 && (
                                <p>{ thisBranch.commits.at(-1)!.pushedAt }</p>
                            )}
                        </div>
                    )
                ))}
            </div>
        </>
    )
}