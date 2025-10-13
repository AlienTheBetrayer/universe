import './GitSection.css';
import { RevealingContainer } from '../../../revealingcontainer/components/RevealingContainer';
import { GithubEmulation } from '../../../githubemulation/components/GithubEmulation';

export const GitSection = () => { 
    return (
        <RevealingContainer>
            <section className='git-section container'>
                <h2><mark>Github</mark> emulation w/ forms</h2>

                <div className='github-container'>
                    <GithubEmulation/>
                </div>
            </section>
        </RevealingContainer>        
    )
}