import './GithubRepository.css';
import { Button } from "../../ui/Button/components/Button"
import { Search } from "../../ui/Search/Search";

import addImg from '../assets/add.svg';
import commitImg from '../assets/commit.svg';
import fileImg from '../assets/file.svg';
import branchImg from '../assets/branch.svg';
import dropdownImg from '../assets/dropdown.svg';
import tagsImg from '../assets/tags.svg';

import { useGithubContext } from '../context/GithubContext';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDebounced } from '../../../hooks/useDebounced';
import { PopoverButton } from '../../ui/PopoverButton/components/PopoverButton';
import { PopoverBranch } from './popovers/PopoverBranch';
import { useTooltips } from '../../tooltip/hooks/useTooltips';
import { GithubFormEdit } from './GithubFormEdit';
import { AnimatePresence } from 'motion/react';

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
    }, [debouncedSearch, thisBranch?.idx]);

    const tooltips = useTooltips();

    // scrolling to form edit
    const formEditRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if(context.data.currentForm === false)
            return;

        const timeout = setTimeout(() => {
            formEditRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
        }, 300);

        return () => clearTimeout(timeout);

    }, [context.data.currentForm]);

    return (
        <>
            { tooltips.render() }

            <div className='github-repository'>
                <div className='github-repository-topline'>
                    <div className='github-repository-topline-info'>
                        <div>
                            <PopoverButton
                            element={<PopoverBranch/>}
                            ref={el => tooltips.set(0, 'Switch branch', el, 'up')}>
                                <img className='github-img' src={branchImg} alt='branch'/>
                                { thisBranch?.name }
                                <img className='github-img' src={dropdownImg} alt='branch'/>
                            </PopoverButton>
                        </div>

                        <div className='flex gap-3'>
                            <div className='flex gap-1 items-center'>
                                <img className='github-img' src={branchImg} alt='branch'/>
                                <p>
                                    {context.data.branches.length} Branch{context.data.branches.length !== 1 ? 'es' : ''}
                                </p>
                            </div>

                            <div className='flex gap-1 items-center'>
                                <img className='github-img' src={tagsImg} alt='tags'/>
                                <p>{tags} Tag{tags !== 1 ? 's' : ''}</p>
                            </div>
                        </div>
                    </div>

                    <div className='github-repository-topline-info-2'>
                        <Search placeholder='Open a form'
                        value={searchValue}
                        onChange={val => setSearchValue(val)}
                        onClear={() => setSearchValue('')}/>

                        <PopoverButton 
                        ref={el => tooltips.set(1, 'Create a new form', el, 'up')}
                        element={<PopoverBranch/>}
                        direction='right'>
                            <img className='github-img' src={addImg} alt=''/>
                            Add form
                        </PopoverButton>

                        <Button>Code</Button>
                    </div>
                </div>
                
                <div className='github-forms'>
                    <div className='github-forms-info'>
                        <div className='github-flex'>
                            <div className='github-flex'>
                                <div className='github-heading-avatar'/>
                                <p>Your name</p>
                            </div>
                            <p>Last commit description</p>
                        </div>

                        <div className='github-flex'>
                            <p>Last commit date</p>
                            <Button
                            ref={el => tooltips.set(2, 'View all commits', el, 'down')}>
                                <img className='github-img' src={commitImg} alt=''/>
                                { context.data.commits?.length ?? 0 } commit{ (context.data.commits?.length ?? 0) !== 1 ? 's' : ''}
                            </Button>
                        </div>

                    </div>

                    { thisBranch?.forms?.map(form => (
                        found.indexOf(form.idx) !== -1 && (
                            <div
                            className='github-form' 
                            key={form.idx}>
                                <div className='github-flex'>
                                    <Button
                                    className='github-flex'
                                    onClick={() => setContext(prev => ({ ...prev, data: 
                                        ({ ...prev.data, currentForm: form.idx })
                                    }))}>
                                        <img className='github-img' src={fileImg} alt=''/>
                                        <p className='github-form-p-name'>{ form.name }</p>
                                    </Button>

                                    { form.tags.map((tag, idx) => (
                                        <div className='github-tiny-info-container' key={`${form.idx}${idx}`}>   
                                            <p>
                                                { tag }
                                            </p>
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