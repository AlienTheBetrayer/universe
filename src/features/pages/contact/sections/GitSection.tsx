import './GitSection.css';
import { Github } from '../../../github/components/Github';
import { GithubTutorial } from '../../../github/components/GithubTutorial';

export const GitSection = () => { 
    return (
        <section className='git-section container'>
            <h2>
                <mark>Github</mark> emulation w/ forms
            </h2>
        
            <GithubTutorial/>

            <div className='github-container'>
                <Github/>
            </div>
        </section>
    )
}