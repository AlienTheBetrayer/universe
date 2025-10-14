import './GitSection.css';
import { Github } from '../../../github/components/Github';
import { GithubTutorial } from '../../../github/components/GithubTutorial';
import { Button } from '../../../ui/Button/components/Button';
import { useGithubContext } from '../../../github/context/GithubContext';

export const GitSection = () => { 
    const [, setContext] = useGithubContext();

    return (
        <section className='git-section container'>
            <h2>
                <mark>Github</mark> emulation w/ forms
                <Button className='contact-show-tutorial-button'
                onClick={() => setContext(prev => ({ ...prev, tutorialVisible: true }))}>
                    Show tutorial
                </Button>
            </h2>
        
            <GithubTutorial/>

            <div className='github-container'>
                <Github/>
            </div>
        </section>
    )
}