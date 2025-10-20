import './Github.css';

import { useEffect } from 'react';
import { Button } from '../../ui/Button/components/Button';
import { useGithubContext } from '../context/GithubContext';
import { GithubDescription } from './GithubDescription';
import { GithubHeading } from './GithubHeading';
import { GithubRepository } from './GithubRepository';

export const Github = () => {
    const [state, dispatch] = useGithubContext();

    // cancel form edit and go back to forms page if we change the branch
    useEffect(() => {
        if (state.data.currentForm !== false) {
            dispatch({ type: 'DATA_SET_PAGE', page: 'forms' });
            dispatch({ type: 'FORM_FOCUS', idx: false });
        }
    }, [state.data.currentBranch]);

    // cancel form edit if we change the page
    useEffect(() => {
        dispatch({ type: 'FORM_FOCUS', idx: false });
        dispatch({ type: 'COMMIT_FOCUS', idx: false });
    }, [state.page]);

    return (
        <div className='github'>
            <div className='github-topline'>
                <div className='github-mac-buttons'>
                    <div style={{ backgroundColor: '#fc5753' }} />
                    <div style={{ backgroundColor: '#fdbc40' }} />
                    <div style={{ backgroundColor: '#36c84b' }} />
                </div>

                <Button
                    onClick={() =>
                        dispatch({
                            type: 'TUTORIAL_SET_VISIBILITY',
                            flag: true,
                        })
                    }
                >
                    Show tutorial
                </Button>
            </div>

            <GithubHeading />
            <hr />

            <div className='github-main'>
                <GithubRepository />
                <GithubDescription />
            </div>
        </div>
    );
};
