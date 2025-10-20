import './GithubRepository.css';

import { AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useGithubContext } from '../context/GithubContext';
import { GithubCommits } from './commits/GithubCommits';
import { GithubCommitView } from './commits/GithubCommitView';
import { GithubFormEdit } from './forms/GithubFormEdit';
import { GithubRepositoryForms } from './forms/GithubRepositoryForms';
import { GithubRepositoryTopline } from './GithubRepositoryTopline';

export const GithubRepository = () => {
    // context
    const [context] = useGithubContext();

    // search (handled in <GithubRepositoryTopline/> and used in <GithubRepositoryForms/>)
    const [search, setSearch] = useState<string>('');

    const pageSelector = () => {
        switch (context.page) {
            case 'forms':
                return <GithubRepositoryForms search={search} />;
            case 'commits':
                return <GithubCommits search={search} />;
        }
    };

    return (
        <div className='github-repository'>
            <GithubRepositoryTopline search={[search, setSearch]} />

            {pageSelector()}

            <AnimatePresence>
                {context.data.currentForm !== false && <GithubFormEdit />}
            </AnimatePresence>

            <AnimatePresence>
                {context.data.currentCommit !== false && <GithubCommitView />}
            </AnimatePresence>
        </div>
    );
};
