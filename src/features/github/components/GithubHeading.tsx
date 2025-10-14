import { Button } from '../../ui/Button/components/Button';
import './GithubHeading.css';

export const GithubHeading = () => {
    return (
        <div className='github-heading'>
            <div className='github-flex'>
                <div className='github-heading-avatar'>

                </div>
                <h3>theuniverse</h3>
                <div className='github-heading-forms-type'>
                    {/* depends on actual space */}
                    <p>has space</p>
                </div>
            </div>

            <div className='github-flex'>
                <Button>Pin</Button>
                <Button>Watch</Button>
                <Button>Fork</Button>
                <Button>Star</Button>
            </div>
        </div>
    )
}   