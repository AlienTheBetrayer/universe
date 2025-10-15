import './PopoverBranch.css';
import { Button } from '../../../ui/Button/components/Button';
import { GithubDefaultBranch, useGithubContext, type Branch } from '../../context/GithubContext';

import checkmarkImg from '../../assets/checkmark.svg';
import branchImg from '../../assets/branch.svg';

import { useEffect, useState } from 'react';
import { useDebounced } from '../../../../hooks/useDebounced';
import { HotkeyTooltip } from '../../../hotkeytooltip/components/HotkeyTooltip';
import { useHotkeys } from '../../../../hooks/useHotkeys';
import { GithubPopover } from './GithubPopover';
import { Input } from '../../../ui/Input/components/Input';

// helper functions
const findMax = (branches: Branch[]) => {
    return branches.reduce((acc, val) => {
        return val.idx > acc.idx ? val : acc;
    }).idx;
}

interface Props {
    onCancel?: () => void;
}

export const PopoverBranch = ({ onCancel }: Props) => {
    // context
    const [context, setContext] = useGithubContext();
    const branches = context.data.branches;

    // search / creating functionality
    const [search, setSearch] = useState<string>('');
    const debouncedSearch = useDebounced(search, '');

    const [found, setFound] = useState<number[]>([]);

    useEffect(() => {
        setFound(branches
            .filter(b => (b.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || debouncedSearch.trim().length === 0))
            .map(b => b.idx)
        );
    }, [debouncedSearch]);

    const createBranch = (name: string) => {
        if(found.length !== 0 || name === '')
            return;

        setContext(prev => {
            const idx = findMax(prev.data.branches) + 1;

            return ({ ...prev, 
                data: ({ ...prev.data, 
                branches: [ ...prev.data.branches, {
                    idx: idx,
                    name: name,
                    forms: []
                }],
                currentBranch: idx,
            })});
        });
        setSearch('');
    }

    useHotkeys([
        { hotkey: 'Enter', action: () => createBranch(debouncedSearch), ignoreFocus: true }
    ]);
    
    return (
        <GithubPopover 
        title='Switch branches' 
        onCancel={() => onCancel?.()}>
            <Input
            type='search'
            placeholder='Search / Create a branch'
            value={search}
            onChange={val => setSearch(val)}
            onClear={() => setSearch('')}/>

            <h4>Branches:</h4>

            <div className='popover-branch-branches-list'>
                {/* list all branches filtered by search */}
                { branches.map(branch => (
                    found.indexOf(branch.idx) !== -1 && (
                        <Button
                        key={branch.idx}
                        className='popover-branch-branches-list-button'
                        onClick={() => {
                            setContext(prev => ({ ...prev, data: ({ ...prev.data, currentBranch: branch.idx })}))
                        }}>
                            <div className='flex gap-2 items-center'>
                                <div style={{ width: '20px', height: '20px', display: 'grid', placeItems: 'center'}}>
                                    { context.data.currentBranch === branch.idx ? (
                                        <img 
                                        src={checkmarkImg}
                                        alt='selected'
                                        className='github-img'
                                        style={{ width: '12px', height: '12px' }}/>
                                    ) : (
                                        <img 
                                        src={branchImg}
                                        alt='branch'
                                        className='github-img'/>
                                    )}
                                </div>

                                { branch.name }
                            </div>

                            { branch.name === GithubDefaultBranch && (
                                <div className='github-tiny-info-container'>
                                    <p>default</p>
                                </div>
                            )} 
                        </Button>
                    ) 
                    
                ))}

                {/* branch not found - propose to create one */}
                { (found.length === 0 && search.length > 0) && (
                    <Button 
                    className='popover-branch-branches-create-button'
                    onClick={() => {
                        createBranch(debouncedSearch);
                    }}>
                        <img
                        className='github-img'
                        src={branchImg}
                        alt=''/>

                        <mark>Create</mark> branch <b>{debouncedSearch}</b>
                        <HotkeyTooltip 
                        className='popover-branch-branches-create-button-hotkey'
                        hotkeys={['Enter']}/>
                    </Button>
                )}
            </div>
        </GithubPopover>
    )
}