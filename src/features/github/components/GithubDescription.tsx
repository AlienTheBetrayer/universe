import './GithubDescription.css';
import { Button } from "../../ui/Button/components/Button"

import gearImg from '../assets/gear.svg';
import forkImg from '../assets/fork.svg';
import eyeImg from '../assets/eye.svg';
import starImg from '../assets/star.svg';

import { useGithubContext } from '../context/GithubContext';
import { usePopup } from '../../../hooks/usePopup';
import { GithubRepositorySettings } from './GithubRepositorySettings';

export const GithubDescription = () => {
    const [context, setContext] = useGithubContext();

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

                    <div className='github-description-topics'>
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
                    <div className='github-description-numbers'>
                        <div className='github-flex'>
                            <img src={starImg} alt='' className='github-img'/>
                            <p>{context.data.description.stars} stars</p>
                        </div>

                        <div className='github-flex'>
                            <Button
                            onClick={() => setContext(prev => ({ ...prev, 
                            data: { ...prev.data, 
                            description: { ...prev.data.description, 
                            stars: prev.data.description.stars + 1}}}))}>
                                +
                            </Button>

                            <Button
                            onClick={() => setContext(prev => ({ ...prev, 
                            data: { ...prev.data, 
                            description: { ...prev.data.description, 
                            stars: prev.data.description.stars > 0 ? prev.data.description.stars - 1 : prev.data.description.stars }}}))}>
                                -
                            </Button>
                        </div>
                    </div>

                    <div className='github-description-numbers'>
                        <div className='github-flex'>
                            <img src={eyeImg} alt='' className='github-img'/>
                            <p>{context.data.description.watching} watching</p>
                        </div>

                        <div className='github-flex'>
                            <Button
                                onClick={() => setContext(prev => ({ ...prev, 
                                data: { ...prev.data, 
                                description: { ...prev.data.description, 
                                watching: prev.data.description.watching + 1}}}))}>
                                +
                            </Button>

                            <Button
                            onClick={() => setContext(prev => ({ ...prev, 
                            data: { ...prev.data, 
                            description: { ...prev.data.description, 
                            watching: prev.data.description.watching > 0 ? prev.data.description.watching - 1 : prev.data.description.watching}}}))}>
                                -
                            </Button>
                        </div>
                    </div>

                    <div className='github-description-numbers'>
                        <div className='github-flex'>
                            <img src={forkImg} alt='' className='github-img'/>
                            <p>{context.data.description.forks} forks</p>
                        </div>

                        <div className='github-flex'>
                            <Button
                            onClick={() => setContext(prev => ({ ...prev, 
                            data: { ...prev.data, 
                            description: { ...prev.data.description, 
                            forks: prev.data.description.forks + 1}}}))}>
                                +
                            </Button>

                            <Button
                            onClick={() => setContext(prev => ({ ...prev, 
                            data: { ...prev.data, 
                            description: { ...prev.data.description, 
                            forks: prev.data.description.forks > 0 ? prev.data.description.forks - 1 : prev.data.description.forks}}}))}>
                                -
                            </Button>
                        </div>
                    </div>
                    <hr/>
                </div>
                
                { context.data.visibility.releases && (
                    <div className='github-description-section'>
                        <h4>Releases</h4>
                        <p>No releases found</p>
                        <hr/>
                    </div>
                )}

                { context.data.visibility.packages && (
                    <div className='github-description-section'>
                        <h4>Packages</h4>
                        <p>No packages found</p>
                        <hr/>
                    </div>
                )}

                { context.data.visibility.languages && (
                    <div className='github-description-section'>
                        <h4>Languages</h4>
                        <hr/>
                    </div>
                )}
            </div>
        </>
    )
}