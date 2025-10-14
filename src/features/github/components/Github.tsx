import './Github.css';

import { GithubHeading } from './GithubHeading';
import { GithubDescription } from './GithubDescription';
import { GithubRepository } from './GithubRepository';
import { Button } from '../../ui/Button/components/Button';
import { useGithubContext } from '../context/GithubContext';

export const Github = () => {
    const [, setContext] = useGithubContext();

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