import './GithubRepository.css';

import { useGithubContext } from '../context/GithubContext';
import { useEffect, useState } from 'react';
import { GithubFormEdit } from './GithubFormEdit';
import { AnimatePresence } from 'motion/react';
import { GithubRepositoryForms } from './GithubRepositoryForms';
import { GithubRepositoryTopline } from './GithubRepositoryTopline';

export const GithubRepository = () => {
    // context
    const [context, setContext] = useGithubContext();

    // search (worked in <GithubRepositoryForms/>)
    const [searchValue, setSearchValue] = useState<string>('');

    // cancel form edit if we change the branch
    useEffect(() => {
        if(context.data.currentForm !== false) {
            setContext(prev => ({ ...prev, data: 
                ({ ...prev.data, currentForm: false })
            }));
        }
    }, [context.data.currentBranch]);

    return (
        <div className='github-repository'>
            <GithubRepositoryTopline
            searchState={[searchValue, setSearchValue]}/>
            
            <GithubRepositoryForms
            searchValue={searchValue}/>

            <AnimatePresence>
                { context.data.currentForm !== false && (
                    <GithubFormEdit/>
                )}
            </AnimatePresence>
        </div>
    )   
}