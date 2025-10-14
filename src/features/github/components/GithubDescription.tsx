import './GithubDescription.css';
import { Button } from "../../ui/Button/components/Button"

import gearImg from '../assets/gear.svg';
import { useGithubContext } from '../context/GithubContext';

export const GithubDescription = () => {
    const [context, ] = useGithubContext();

    return (
        <div className='github-description'>
            <div className='github-description-topline'>
                <h4>About</h4>
                <Button>
                    <img className='github-img' src={gearImg} alt='settings'/>
                </Button>
            </div>

            <div className='github-description-section'>
                <h4>{context.data.description.about}</h4>
                <p>Readme</p>
                <p>Activity</p>
                <p>{context.data.description.stars} stars</p>
                <p>{context.data.description.watching} watching</p>
                <p>{context.data.description.forks} forks</p>
                <hr/>
            </div>

            <div className='github-description-section'>
                <h4>Releases</h4>
                <p>No releases found</p>
                <hr/>
            </div>
            
            <div className='github-description-section'>
                <h4>Packages</h4>
                <p>No packages found</p>
                <hr/>
            </div>

            <div className='github-description-section'>
                <h4>Languages</h4>
                <hr/>
            </div>
        </div>
    )
}