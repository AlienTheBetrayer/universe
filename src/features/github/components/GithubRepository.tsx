import './GithubRepository.css';

import { useGithubContext } from '../context/GithubContext';
import { useState } from 'react';
import { GithubFormEdit } from './GithubFormEdit';
import { AnimatePresence } from 'motion/react';
import { GithubRepositoryForms } from './GithubRepositoryForms';
import { GithubRepositoryTopline } from './GithubRepositoryTopline';
import { GithubCommits } from './GithubCommits';
import { GithubCommitView } from './GithubCommitView';

export const GithubRepository = () => {
    // context
    const [context, ] = useGithubContext();

    // search (handled in <GithubRepositoryTopline/> and used in <GithubRepositoryForms/>)
    const [searchValue, setSearchValue] = useState<string>('');

    const pageSelector = () => {
        switch(context.page) {
            case 'forms':
                return <GithubRepositoryForms searchValue={searchValue}/>;
            case 'commits':
                return <GithubCommits searchValue={searchValue}/>
        }
    }

    return (
        <div className='github-repository'>
            <GithubRepositoryTopline searchState={[searchValue, setSearchValue]}/>
            { pageSelector() }

            <AnimatePresence>
                { context.data.currentForm !== false && (
                    <GithubFormEdit/>
                )}
            </AnimatePresence>

            <AnimatePresence>
                { context.data.currentCommit !== false && (
                    <GithubCommitView/>
                )}
            </AnimatePresence>
        </div>
    )   
}