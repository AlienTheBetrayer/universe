import './GithubDescription.css';
import { Button } from "../../ui/Button/components/Button"

import gearImg from '../assets/gear.svg';
import forkImg from '../assets/fork.svg';
import eyeImg from '../assets/eye.svg';
import starImg from '../assets/star.svg';

import { useGithubContext } from '../context/GithubContext';
import { usePopup } from '../../../hooks/usePopup';
import { GithubRepositorySettings } from './GithubRepositorySettings';

import { motion } from 'motion/react';

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
                        <div 
                        className='github-flex'
                        style={{ gap: '0.2rem' }}>
                            <img src={starImg} alt='' className='github-img'/>
                            <motion.p
                            key={context.data.description.stars}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}>
                                {context.data.description.stars}
                            </motion.p>
                            <p>stars</p>
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
                        <div 
                        className='github-flex'
                        style={{ gap: '0.2rem' }}>
                            <img src={eyeImg} alt='' className='github-img'/>
                            <motion.p
                            key={context.data.description.watching}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}>
                                {context.data.description.watching}
                            </motion.p>
                            <p>watching</p>
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
                        <div 
                        className='github-flex'
                        style={{ gap: '0.2rem' }}>
                            <img src={forkImg} alt='' className='github-img'/>
                            <motion.p
                            key={context.data.description.forks}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}>
                                {context.data.description.forks}
                            </motion.p>
                            <p>forks</p>
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