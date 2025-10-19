import { Button } from '../../../ui/Button/components/Button';
import { useGithubContext } from '../../context/GithubContext';
import './PopoverBranch.css';

import branchImg from '../../assets/branch.svg';
import checkmarkImg from '../../assets/checkmark.svg';

import { useEffect, useState } from 'react';
import { useHotkeys } from '../../../../hooks/useHotkeys';
import { HotkeyTooltip } from '../../../hotkeytooltip/components/HotkeyTooltip';
import { Input } from '../../../ui/Input/components/Input';
import { GithubDefaultBranch } from '../../context/initial/githubStrings';
import { GithubPopover } from './GithubPopover';

interface Props {
    onCancel?: () => void;
}

export const PopoverBranch = ({ onCancel }: Props) => {
    // context
    const [context, setContext] = useGithubContext();
    const branches = context.data.branches;

    // search / creating functionality
    const [search, setSearch] = useState<string>('');

    const [found, setFound] = useState<number[]>([]);

    useEffect(() => {
        setFound(branches
            .filter(b => (b.name.toLowerCase().includes(search.toLowerCase()) || search.trim().length === 0))
            .map(b => b.idx)
        );
    }, [search]);

    const createBranch = (name: string) => {
        if(found.length !== 0 || name === '')
            return;

        setContext(prev => {
            return ({ ...prev, 
                data: ({ ...prev.data,
                globalIdx: prev.data.globalIdx + 1, 
                branches: [ ...prev.data.branches, {
                    idx: prev.data.globalIdx + 1,
                    name: name,
                    forms: [],
                    commits: []
                }],
                currentBranch: prev.data.globalIdx + 1,
                currentCommit: false,
                currentForm: false,
            })});
        });
        setSearch('');
    }

    useHotkeys([
        { hotkey: 'Enter', action: () => createBranch(search), ignoreFocus: true }
    ]);
    
    return (
        <GithubPopover 
        title='<mark>Switch</mark> branches' 
        onCancel={() => onCancel?.()}>
            <Input
            autoFocus
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
                            setContext(prev => ({ ...prev, 
                                data: ({ ...prev.data, 
                                    currentBranch: branch.idx,
                                    currentForm: false,
                                    currentCommit: false
                            })}))
                            onCancel?.();
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
                                
                                { branch.name === GithubDefaultBranch ? (
                                    <mark>{branch.name}</mark>
                                ) : (
                                    branch.name
                                )}
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
                { (found.length === 0 && search.trim().length > 0) && (
                    <Button 
                    className='popover-branch-branches-create-button'
                    onClick={() => {
                        createBranch(search);
                        onCancel?.();
                    }}>
                        <img
                        className='github-img'
                        src={branchImg}
                        alt=''/>

                        <mark>Create</mark> branch <b>{search}</b>
                        <HotkeyTooltip 
                        className='popover-create-button-hotkey'
                        hotkeys={['Enter']}/>
                    </Button>
                )}
            </div>
        </GithubPopover>
    )
}