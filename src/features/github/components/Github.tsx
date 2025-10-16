import './Github.css';

import { GithubHeading } from './GithubHeading';
import { GithubDescription } from './GithubDescription';
import { GithubRepository } from './GithubRepository';
import { Button } from '../../ui/Button/components/Button';
import { useGithubContext } from '../context/GithubContext';
import { useEffect } from 'react';

export const Github = () => {
    const [context, setContext] = useGithubContext();

    // cancel form edit and go back to forms page if we change the branch
    useEffect(() => {
        if(context.data.currentForm !== false) {
            setContext(prev => ({ ...prev, 
                page: 'forms',
                data: ({ 
                    ...prev.data, currentForm: false 
                })
            }));
        }
    }, [context.data.currentBranch]);

    // cancel form edit if we change the page
    useEffect(() => {
        setContext(prev => ({ ...prev, 
            data: ({
                ...prev.data, 
                currentForm: false,
                currentCommit: false
            })
        }));
    }, [context.page]);

    return (
        <div className='github'>
            <div className='github-topline'>
                <div className='github-mac-buttons'>
                    <div style={{ backgroundColor: '#fc5753'}}/>
                    <div style={{ backgroundColor: '#fdbc40'}}/>
                    <div style={{ backgroundColor: '#36c84b'}}/>
                </div>

                <Button
                onClick={() => setContext(prev => ({ ...prev, tutorialVisible: true }))}>
                    Show tutorial
                </Button>
            </div>

            <GithubHeading/>
            <hr/>

            <div className='github-main'>
                <GithubRepository/>
                <GithubDescription/>
            </div>
        </div>
    )
}