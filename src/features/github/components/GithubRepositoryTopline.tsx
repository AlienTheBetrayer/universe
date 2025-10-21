import { PopoverButton } from '../../ui/PopoverButton/components/PopoverButton';
import './GithubRepositoryTopline.css';
import { PopoverBranch } from './popovers/PopoverBranch';

import addImg from '../assets/add.svg';
import branchImg from '../assets/branch.svg';
import deleteImg from '../assets/delete.svg';
import dropdownImg from '../assets/dropdown.svg';
import tagsImg from '../assets/tags.svg';

import { motion } from 'motion/react';
import type React from 'react';
import { useEffect } from 'react';
import { usePopup } from '../../../hooks/usePopup';
import { MessageBox } from '../../messagebox/components/MessageBox';
import { useTooltips } from '../../tooltip/hooks/useTooltips';
import { Button } from '../../ui/Button/components/Button';
import { Input } from '../../ui/Input/components/Input';
import {
    useGithubContext,
    type GithubContextData,
} from '../context/GithubContext';
import { GithubDefaultBranch } from '../context/initial/githubStrings';
import type { GithubReducerAction } from '../context/reducer/GithubReducer';
import { PopoverCreateForm } from './popovers/PopoverCreateForm';

interface Props {
    search: [string, React.Dispatch<React.SetStateAction<string>>];
}

export const GithubRepositoryTopline = ({ search }: Props) => {
    const [state, dispatch] = useGithubContext();

    return (
        <div className='github-repository-topline'>
            <GithubRepositoryToplineInfo1 state={state} />
            <GithubRepositoryToplineInfo2
                search={search}
                state={state}
                dispatch={dispatch}
            />
        </div>
    );
};

interface Info1Props {
    state: GithubContextData;
}

const GithubRepositoryToplineInfo1 = ({ state }: Info1Props) => {
    const thisBranch = state.data.branches.find(
        (b) => b.idx === state.data.currentBranch,
    );
    const tags =
        thisBranch?.forms?.reduce((acc, form) => acc + form.tags.length, 0) ??
        0;

    // tooltips
    const tooltips = useTooltips();

    return (
        <div className='github-repository-topline-info'>
            {tooltips.render()}

            <div>
                <PopoverButton
                    direction='bottom-right'
                    element={<PopoverBranch />}
                    ref={(el) => tooltips.set(0, 'Switch branch', el, 'up')}
                >
                    <img className='github-img' src={branchImg} alt='branch' />

                    <motion.div
                        key={thisBranch?.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {thisBranch?.name}
                    </motion.div>

                    <img
                        className='github-img'
                        src={dropdownImg}
                        alt='branch'
                        style={{ width: '12px', height: '12px' }}
                    />
                </PopoverButton>
            </div>

            <div className='flex gap-3'>
                <div className='flex gap-1 items-center'>
                    <img className='github-img' src={branchImg} alt='branch' />
                    <motion.p
                        key={state.data.branches.length}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {state.data.branches.length} Branch
                        {state.data.branches.length !== 1 ? 'es' : ''}
                    </motion.p>
                </div>

                <div className='flex gap-1 items-center'>
                    <img className='github-img' src={tagsImg} alt='tags' />
                    <motion.p
                        key={tags}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {tags} Tag{tags !== 1 ? 's' : ''}
                    </motion.p>
                </div>
            </div>
        </div>
    );
};

interface Info2Props {
    search: [string, React.Dispatch<React.SetStateAction<string>>];
    state: GithubContextData;
    dispatch: React.Dispatch<GithubReducerAction>;
}

const GithubRepositoryToplineInfo2 = ({
    search,
    state,
    dispatch,
}: Info2Props) => {
    const thisBranch = state.data.branches.find(
        (b) => b.idx === state.data.currentBranch,
    );

    useEffect(() => {
        search[1]('');
    }, [state.page]);

    // tooltips / messageboxes
    const tooltips = useTooltips();

    const branchDeleteMessageBox = usePopup(
        <MessageBox
            title='Are you sure?'
            description={`You are about to <u>permanently delete</u> <mark><b>${thisBranch?.name}</b> branch.</mark>`}
            onInteract={(f) => {
                if (f && thisBranch?.name !== GithubDefaultBranch) {
                    dispatch({ type: 'DATA_SET_PAGE', page: 'forms' });
                    dispatch({ type: 'BRANCHES_DELETE_CURRENT' });
                    dispatch({ type: 'BRANCHES_FOCUS', idx: 0 });
                }

                branchDeleteMessageBox.setShown(false);
            }}
        />,
    );

    return (
        <div className='github-repository-topline-info-2'>
            {tooltips.render()}
            {branchDeleteMessageBox.render()}

            <Input
                type='search'
                placeholder={`Filter ${
                    state.page === 'forms'
                        ? 'forms'
                        : state.page === 'commits'
                          ? 'commits'
                          : ''
                }`}
                value={search[0]}
                onChange={(val) => search[1](val)}
                onClear={() => search[1]('')}
            />

            <PopoverButton
                enabled={state.page === 'forms'}
                ref={(el) => tooltips.set(0, 'Create a new form', el, 'up')}
                element={<PopoverCreateForm />}
                direction='bottom-left'
            >
                <img className='github-img' src={addImg} alt='' />
                Create
                <img
                    className='github-img'
                    src={dropdownImg}
                    alt='branch'
                    style={{ width: '12px', height: '12px' }}
                />
            </PopoverButton>

            <Button
                className='github-delete-button'
                enabled={thisBranch?.name !== GithubDefaultBranch}
                onClick={() => branchDeleteMessageBox.setShown(true)}
                ref={(el) => tooltips.set(1, 'Delete this branch', el, 'down')}
            >
                <img
                    src={deleteImg}
                    alt=''
                    className='github-img'
                    style={{ filter: 'invert(1)' }}
                />
                Delete
            </Button>
        </div>
    );
};
