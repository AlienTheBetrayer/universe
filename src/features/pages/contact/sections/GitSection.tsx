import './GitSection.css';
import { RevealingContainer } from '../../../revealingcontainer/components/RevealingContainer';
import { GithubEmulation } from '../../../githubemulation/components/GithubEmulation';
import { GithubTutorial } from '../../../githubemulation/components/GithubTutorial';
import { Button } from '../../../ui/Button/components/Button';
import { useGithubContext } from '../../../githubemulation/context/GithubContext';

export const GitSection = () => { 
    const [, setContext] = useGithubContext();

    return (
        <RevealingContainer>
            <section className='git-section container'>
                <GithubTutorial/>

                <h2>
                    <mark>Github</mark> emulation w/ forms
                    <Button className='contact-show-tutorial-button'
                    onClick={() => setContext(prev => ({ ...prev, tutorialVisible: true }))}>
                        Show tutorial
                    </Button>
                </h2>

                <div className='github-container'>
                    <GithubEmulation/>
                </div>
            </section>
        </RevealingContainer>        
    )
}