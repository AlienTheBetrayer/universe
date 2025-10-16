import { PopoverButton } from '../../ui/PopoverButton/components/PopoverButton';
import './GithubRepositoryTopline.css';
import { PopoverBranch } from './popovers/PopoverBranch';

import addImg from '../assets/add.svg';
import branchImg from '../assets/branch.svg';
import dropdownImg from '../assets/dropdown.svg';
import tagsImg from '../assets/tags.svg';
import deleteImg from '../assets/delete.svg';

import { motion } from 'motion/react';
import { useTooltips } from '../../tooltip/hooks/useTooltips';
import { useGithubContext } from '../context/GithubContext';
import { Input } from '../../ui/Input/components/Input';
import { PopoverCreateForm } from './popovers/PopoverCreateForm';
import { Button } from '../../ui/Button/components/Button';
import type React from 'react';
import { usePopup } from '../../../hooks/usePopup';
import { MessageBox } from '../../messagebox/components/MessageBox';
import { GithubDefaultBranch } from '../context/initial/githubStrings';
import { useEffect } from 'react';

interface Props {
    searchState: [string, React.Dispatch<React.SetStateAction<string>>];
}

export const GithubRepositoryTopline = ({ searchState }: Props) => {
    // context
    const [context, setContext] = useGithubContext();

    // state variables
    const thisBranch = context.data.branches.find(b => b.idx === context.data.currentBranch);
    const tags = thisBranch?.forms?.reduce((acc, form) => acc + form.tags.length, 0) ?? 0;

    // search
    const [searchValue, setSearchValue] = searchState;

    useEffect(() => {
        setSearchValue('');
    }, [context.page]);

    // tooltips
    const tooltips = useTooltips();

    // messagebox
    const branchDeleteMessageBox = usePopup(
    <MessageBox
    title='Are you sure?'
    description={`You are about to <u>permanently delete</u> <mark><b>${thisBranch?.name}</b> branch.</mark>`}
    onInteract={f => {
        if(f && thisBranch?.name !== GithubDefaultBranch) {
            setContext(prev => ({ ...prev, 
                page: 'forms',
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
                    placeholder={`Filter ${context.page === 'forms' ? 'forms' : (context.page === 'commits' ? 'commits' : '')}`}
                    value={searchValue}
                    onChange={val => setSearchValue(val)}
                    onClear={() => setSearchValue('')}/>

                    <PopoverButton 
                    enabled={context.page === 'forms'}
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
                    ref={el => tooltips.set(2, 'Delete this branch', el, 'down')}>
                        <img
                        src={deleteImg}
                        alt=''
                        className='github-img'
                        style={{ filter: 'invert(1)' }}/>
                        Delete
                    </Button>
                </div>
            </div>
        </>
    )
}