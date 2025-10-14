import './Github.css';

import { GithubHeading } from './GithubHeading';
import { GithubDescription } from './GithubDescription';
import { GithubRepository } from './GithubRepository';

export const Github = () => {
    return (
        <div className='github'>
            <div className='github-mac-buttons'>
                <div style={{ backgroundColor: '#fc5753'}}/>
                <div style={{ backgroundColor: '#fdbc40'}}/>
                <div style={{ backgroundColor: '#36c84b'}}/>
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