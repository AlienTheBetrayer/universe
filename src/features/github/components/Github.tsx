import './Github.css';

import { GithubHeading } from './GithubHeading';
import { GithubDescription } from './GithubDescription';
import { GithubRepository } from './GithubRepository';

export const Github = () => {
    return (
        <div className='github'>
            <GithubHeading/>
            <hr/>

            <div className='github-main'>
                <GithubRepository/>
                <GithubDescription/>
            </div>
        </div>
    )
}