import { Button } from '../../../ui/Button/components/Button';
import {
    useGithubContext,
    type GithubContextData,
} from '../../context/GithubContext';
import './PopoverBranch.css';

import branchImg from '../../assets/branch.svg';
import checkmarkImg from '../../assets/checkmark.svg';

import React, { useEffect, useState } from 'react';
import { useHotkeys } from '../../../../hooks/useHotkeys';
import { HotkeyTooltip } from '../../../hotkeytooltip/components/HotkeyTooltip';
import { Input } from '../../../ui/Input/components/Input';
import { GithubDefaultBranch } from '../../context/initial/githubStrings';
import type { GithubReducerAction } from '../../context/reducer/GithubReducer';
import { GithubPopover } from './GithubPopover';

interface Props {
    onCancel?: () => void;
}

export const PopoverBranch = ({ onCancel }: Props) => {
    // state
    const [state, dispatch] = useGithubContext();

    // search / creating functionality
    const [search, setSearch] = useState<string>('');

    // filtering functionality
    const [found, setFound] = useState<number[]>([]);

    useEffect(() => {
        setFound(
            state.data.branches
                .filter(
                    (b) =>
                        b.name.toLowerCase().includes(search.toLowerCase()) ||
                        search.trim().length === 0
                )
                .map((b) => b.idx)
        );
    }, [search]);

    // branch creation helper function
    const createBranch = (name: string) => {
        if (found.length !== 0 || name === '') return;
        dispatch({ type: 'BRANCHES_CREATE', name });

        setSearch('');
    };

    // hotkeys
    useHotkeys([
        {
            hotkey: 'Enter',
            action: () => createBranch(search),
            ignoreFocus: true,
        },
    ]);

    return (
        <GithubPopover
            title='<mark>Switch</mark> branches'
            onCancel={() => onCancel?.()}
        >
            <Input
                autoFocus
                type='search'
                placeholder='Search / Create a branch'
                value={search}
                onChange={(val) => setSearch(val)}
                onClear={() => setSearch('')}
            />

            <h4>Branches:</h4>

            <div className='popover-branch-branches-list'>
                {/* list all branches filtered by search */}
                <BranchList
                    state={state}
                    dispatch={dispatch}
                    found={found}
                    onCancel={onCancel}
                />
                <BranchCreation
                    createBranch={createBranch}
                    found={found}
                    search={search}
                    onCancel={onCancel}
                />

                {/* branch not found - propose to create one */}
            </div>
        </GithubPopover>
    );
};

interface ListProps {
    state: GithubContextData;
    dispatch: React.Dispatch<GithubReducerAction>;
    found: number[];
    onCancel?: () => void;
}

const BranchList = ({ state, found, dispatch, onCancel }: ListProps) => {
    return (
        <>
            {state.data.branches.map(
                (branch) =>
                    found.indexOf(branch.idx) !== -1 && (
                        <Button
                            key={branch.idx}
                            className='popover-branch-branches-list-button'
                            onClick={() => {
                                dispatch({
                                    type: 'BRANCHES_FOCUS',
                                    idx: branch.idx,
                                });
                                dispatch({
                                    type: 'FORM_FOCUS',
                                    idx: false,
                                });
                                dispatch({
                                    type: 'COMMIT_FOCUS',
                                    idx: false,
                                });
                                onCancel?.();
                            }}
                        >
                            <div className='flex gap-2 items-center'>
                                <div
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        display: 'grid',
                                        placeItems: 'center',
                                    }}
                                >
                                    {state.data.currentBranch === branch.idx ? (
                                        <img
                                            src={checkmarkImg}
                                            alt='selected'
                                            className='github-img'
                                            style={{
                                                width: '12px',
                                                height: '12px',
                                            }}
                                        />
                                    ) : (
                                        <img
                                            src={branchImg}
                                            alt='branch'
                                            className='github-img'
                                        />
                                    )}
                                </div>

                                {branch.name === GithubDefaultBranch ? (
                                    <mark>{branch.name}</mark>
                                ) : (
                                    branch.name
                                )}
                            </div>

                            {branch.name === GithubDefaultBranch && (
                                <div className='github-tiny-info-container'>
                                    <p>default</p>
                                </div>
                            )}
                        </Button>
                    )
            )}
        </>
    );
};

interface CreationProps {
    search: string;
    found: number[];
    onCancel?: () => void;
    createBranch: (name: string) => void;
}

const BranchCreation = ({
    search,
    found,
    onCancel,
    createBranch,
}: CreationProps) => {
    return (
        <>
            {found.length === 0 && search.trim().length > 0 && (
                <Button
                    className='popover-branch-branches-create-button'
                    onClick={() => {
                        createBranch(search);
                        onCancel?.();
                    }}
                >
                    <img className='github-img' src={branchImg} alt='' />
                    <mark>Create</mark> branch <b>{search}</b>
                    <HotkeyTooltip
                        className='popover-create-button-hotkey'
                        hotkeys={['Enter']}
                    />
                </Button>
            )}
        </>
    );
};
