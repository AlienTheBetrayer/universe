import './GithubDescription.css';
import { Button } from "../../ui/Button/components/Button"

import gearImg from '../assets/gear.svg';
import { useGithubContext } from '../context/GithubContext';
import { usePopup } from '../../../hooks/usePopup';
import { GithubRepositorySettings } from './GithubRepositorySettings';

export const GithubDescription = () => {
    const [context,] = useGithubContext();

    const settingsPopup = usePopup(<GithubRepositorySettings
    onInteract={() => settingsPopup.setShown(false)}/>);

    return (
        <>
            { settingsPopup.render() }

            <div className='github-description'>
                <div className='github-description-topline'>
                    <h4>About</h4>
                    <Button onClick={() => settingsPopup.setShown(true)}>
                        <img className='github-img' src={gearImg} alt='settings'/>
                    </Button>
                </div>

                <div className='github-description-section'>
                    <h4>{context.data.description.about}</h4>
                    <div className='github-description-section-topics'>
                        { context.data.description.topics.map((topic, idx) => (
                            <div key={idx}>
                                <p>
                                    { topic }
                                </p>
                            </div>
                        ))}
                    </div>
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
        </>
    )
}