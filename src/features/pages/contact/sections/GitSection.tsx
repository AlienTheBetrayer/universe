import './GitSection.css';
import { RevealingContainer } from '../../../revealingcontainer/components/RevealingContainer';
import { GithubEmulation } from '../../../githubemulation/components/GithubEmulation';
import { GithubTutorial } from '../../../githubemulation/components/GithubTutorial';

export const GitSection = () => { 
    return (
        <RevealingContainer>
            <section className='git-section container'>
                <GithubTutorial/>
                
                <h2><mark>Github</mark> emulation w/ forms</h2>

                <div className='github-container'>
                    <GithubEmulation/>
                </div>
            </section>
        </RevealingContainer>        
    )
}