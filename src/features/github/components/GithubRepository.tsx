import './GithubRepository.css';
import { Button } from "../../ui/Button/components/Button"

import addImg from '../assets/add.svg';
import commitImg from '../assets/commit.svg';
import fileImg from '../assets/file.svg';
import branchImg from '../assets/branch.svg';
import dropdownImg from '../assets/dropdown.svg';
import tagsImg from '../assets/tags.svg';
import deleteImg from '../assets/delete.svg';

import { GithubDefaultBranch, useGithubContext } from '../context/GithubContext';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDebounced } from '../../../hooks/useDebounced';
import { PopoverButton } from '../../ui/PopoverButton/components/PopoverButton';
import { PopoverBranch } from './popovers/PopoverBranch';
import { useTooltips } from '../../tooltip/hooks/useTooltips';
import { GithubFormEdit } from './GithubFormEdit';
import { AnimatePresence } from 'motion/react';
import { PopoverCreateForm } from './popovers/PopoverCreateForm';
import { Input } from '../../ui/Input/components/Input';

import { motion } from 'motion/react';
import { usePopup } from '../../../hooks/usePopup';
import { MessageBox } from '../../messagebox/components/MessageBox';

export const GithubRepository = () => {
    // context
    const [context, setContext] = useGithubContext();

    // state variables
    const thisBranch = context.data.branches.find(b => b.idx === context.data.currentBranch);
    const tags = thisBranch?.forms?.reduce((acc, form) => acc + form.tags.length, 0) ?? 0;
    
    // search functionality 
    const [searchValue, setSearchValue] = useState<string>('');
    const debouncedSearch = useDebounced(searchValue, '');
    const [found, setFound] = useState<number[]>([]);

    useEffect(() => {
        setFound((thisBranch?.forms ?? [])
            .filter(form => (
                form.name.toLowerCase().includes(debouncedSearch.toLowerCase())
                || form.tags.find(tag => tag.toLowerCase().includes(debouncedSearch.toLowerCase()))
                || debouncedSearch.trim().length === 0))
            .map(form => form.idx)
        );
    }, [debouncedSearch, context.data]);

    // scrolling to form edit
    const formEditRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if(context.data.currentForm === false)
            return;

        const timeout = setTimeout(() => {
            formEditRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
        }, 300);

        return () => clearTimeout(timeout);

    }, [context.data.currentForm, formEditRef.current]);


    // cancel form edit if we change the branch
    useEffect(() => {
        if(context.data.currentForm !== false) {
            setContext(prev => ({ ...prev, data: 
                ({ ...prev.data, currentForm: false })
            }));
        }
    }, [context.data.currentBranch]);


    const tooltips = useTooltips();

    const branchDeleteMessageBox = usePopup(
    <MessageBox
    title='Are you sure?'
    description={`You are about to <u>permanently delete</u> <mark><b>${thisBranch?.name}</b> branch.</mark>`}
    onInteract={f => {
        if(f && thisBranch?.name !== GithubDefaultBranch) {
            setContext(prev => ({ ...prev, 
                data: ({ ...prev.data, 
                    branches: prev.data.branches.filter(b => b.idx !== prev.data.currentBranch),
                    currentBranch: 0
                })}))
        }

        branchDeleteMessageBox.setShown(false);
    }}/>);

    return (
        <>
            { tooltips.render() }
            { branchDeleteMessageBox.render() }

            <div className='github-repository'>
                <div className='github-repository-topline'>
                    <div className='github-repository-topline-info'>
                        <div>
                            <PopoverButton
                            direction='bottom-right'
                            element={<PopoverBranch/>}
                            ref={el => tooltips.set(0, 'Switch branch', el, 'up')}>
                                <img 
                                className='github-img' 
                                src={branchImg} 
                                alt='branch'/>
                                
                                <motion.div
                                key={thisBranch?.name}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}>
                                    { thisBranch?.name }
                                </motion.div>
                                
                                <img 
                                className='github-img' 
                                src={dropdownImg} 
                                alt='branch'
                                style={{ width: '12px', height: '12px'}}/>
                            </PopoverButton>
                        </div>

                        <div className='flex gap-3'>
                            <div className='flex gap-1 items-center'>
                                <img className='github-img' src={branchImg} alt='branch'/>
                                <motion.p
                                key={context.data.branches.length}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}>
                                    {context.data.branches.length} Branch{context.data.branches.length !== 1 ? 'es' : ''}
                                </motion.p>
                            </div>

                            <div className='flex gap-1 items-center'>
                                <img className='github-img' src={tagsImg} alt='tags'/>
                                <motion.p
                                key={tags}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}>
                                    {tags} Tag{tags !== 1 ? 's' : ''}
                                </motion.p>
                            </div>
                        </div>
                    </div>

                    <div className='github-repository-topline-info-2'>
                        <Input 
                        type='search'
                        placeholder='Filter forms'
                        value={searchValue}
                        onChange={val => setSearchValue(val)}
                        onClear={() => setSearchValue('')}/>

                        <PopoverButton 
                        ref={el => tooltips.set(1, 'Create a new form', el, 'up')}
                        element={<PopoverCreateForm/>}
                        direction='bottom-left'>
                            <img 
                            className='github-img' 
                            src={addImg} 
                            alt=''/>
                            Create

                            <img 
                            className='github-img' 
                            src={dropdownImg} 
                            alt='branch'
                            style={{ width: '12px', height: '12px'}}/>
                        </PopoverButton>

                        <Button
                        className='github-delete-button'
                        enabled={thisBranch?.name !== GithubDefaultBranch}
                        onClick={() => branchDeleteMessageBox.setShown(true)}
                        ref={el => tooltips.set(3, 'Delete this branch', el, 'down')}>
                            <img
                            src={deleteImg}
                            alt=''
                            className='github-img'
                            style={{ filter: 'invert(1)' }}/>
                            Delete
                        </Button>
                    </div>
                </div>
                
                <div className='github-forms'>
                    <div className='github-forms-info'>
                        <div className='github-flex'>
                            <div className='github-flex'>
                                <div className='github-heading-avatar'/>
                                <p>Gleb</p>
                            </div>
                            
                            { context.data.commits.length > 0 && (
                                <p>{context.data.commits.at(-1)!.name}</p>
                            )}
                        </div>

                        <div className='github-flex'>
                            { context.data.commits.length > 0 && (
                                <p>{context.data.commits.at(-1)!.date}</p>
                            )}

                            <Button
                            ref={el => tooltips.set(2, 'View all commits', el, 'down')}>
                                <img className='github-img' src={commitImg} alt=''/>
                                <motion.div
                                key={context.data.commits?.length}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}>
                                    { context.data.commits?.length ?? 0 } commit{ (context.data.commits?.length ?? 0) !== 1 ? 's' : ''}
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

                                <p>{ context.data.commits?.at(-1)?.date ?? 'unknown' }</p>
                            </div>
                        )
                    ))}
                </div>
                
                <AnimatePresence>
                    { context.data.currentForm !== false && (
                        <GithubFormEdit
                        ref={el => { formEditRef.current = el; }}/>
                    )}
                </AnimatePresence>
            </div>
        </>
    )   
}