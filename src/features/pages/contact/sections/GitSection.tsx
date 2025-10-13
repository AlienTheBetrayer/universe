import './GitSection.css';
import { RevealingContainer } from '../../../revealingcontainer/components/RevealingContainer';
import { GithubEmulation } from '../../../githubemulation/components/GithubEmulation';

export const GitSection = () => { 
    return (
        <RevealingContainer>
            <section className='git-section container'>
                <GithubEmulation/>
            </section>
        </RevealingContainer>        
    )
}