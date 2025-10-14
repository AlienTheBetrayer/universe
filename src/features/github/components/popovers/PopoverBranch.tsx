import './PopoverBranch.css';
import { useTooltips } from '../../../tooltip/hooks/useTooltips';
import { Button } from '../../../ui/Button/components/Button';
import { Search } from '../../../ui/Search/Search';
import { GithubDefaultBranch, useGithubContext } from '../../context/GithubContext';

import checkmarkImg from '../../assets/checkmark.svg';
import branchImg from '../../assets/branch.svg';

import { useEffect, useState } from 'react';
import { useDebounced } from '../../../../hooks/useDebounced';

interface Props {
    onCancel?: () => void;
}

export const PopoverBranch = ({ onCancel }: Props) => {
    const tooltips = useTooltips();
    const [context, ] = useGithubContext();
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
    
    return (
        <>
            { tooltips.render() }

            <div className='github-popover-branch'>
                <div className='github-popover-branch-topline'>
                    <h4>Switch branches</h4>
                    <Button
                    className='github-cancel-button'
                    ref={el => tooltips.set(0, 'Cancel', el, 'left')}
                    onClick={() => onCancel?.()}>
                    ✕
                    </Button>
                </div>

                <Search placeholder='Search / Create a branch'
                value={search}
                onChange={val => setSearch(val)}
                onClear={() => setSearch('')}/>

                <h4>Branches:</h4>

                <div className='popover-branch-branches-list'>
                    { branches.map(branch => (
                        found.indexOf(branch.idx) !== -1 ? (
                            <Button className='popover-branch-branches-list-button'>
                                <div className='flex gap-2 items-center'>
                                    { context.data.currentBranch === branch.idx && (
                                        <img src={checkmarkImg} alt='selected'/>
                                    )}
                                    { branch.name }
                                </div>

                                { branch.name === GithubDefaultBranch && (
                                    <div className='github-tiny-info-container'>
                                        <p>default</p>
                                    </div>
                                )} 
                            </Button>
                        ) : (
                            <Button>
                                <img className='github-img' src={branchImg} alt=''/>
                                <p><mark>Create</mark> branch <b>{debouncedSearch}</b></p>
                            </Button>
                        )
                    ))}
                </div>
            </div>
        </>
    )
}