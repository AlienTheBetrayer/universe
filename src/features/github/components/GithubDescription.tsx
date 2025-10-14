import './GithubDescription.css';
import { Button } from "../../ui/Button/components/Button"

import gearImg from '../assets/gear.svg';

export const GithubDescription = () => {
    return (
        <div className='github-description'>
            <div className='github-flex-between'>
                <h4>About</h4>
                <Button><img src={gearImg} alt='settings'/></Button>
            </div>

            <div className='github-description-section'>
                <h4>An upcoming project of mine</h4>
                <p>Readme</p>
                <p>Activity</p>
                <p>0 stars</p>
                <p>0 watching</p>
                <p>0 forks</p>
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