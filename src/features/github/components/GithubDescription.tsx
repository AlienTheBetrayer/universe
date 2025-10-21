import { Button } from '../../ui/Button/components/Button';
import './GithubDescription.css';

import eyeImg from '../assets/eye.svg';
import forkImg from '../assets/fork.svg';
import gearImg from '../assets/gear.svg';
import starImg from '../assets/star.svg';

import { usePopup } from '../../../hooks/usePopup';
import {
    useGithubContext,
    type GithubContextData,
} from '../context/GithubContext';
import { GithubRepositorySettings } from './GithubRepositorySettings';

import { motion } from 'motion/react';
import type React from 'react';
import { useTooltips } from '../../tooltip/hooks/useTooltips';
import type { GithubReducerAction } from '../context/reducer/GithubReducer';

export const GithubDescription = () => {
    // context + state
    const [state, dispatch] = useGithubContext();

    // popups / tooltips
    const settingsPopup = usePopup(
        <GithubRepositorySettings
            onInteract={() => settingsPopup.setShown(false)}
        />,
    );

    const tooltips = useTooltips();

    return (
        <>
            {tooltips.render()}
            {settingsPopup.render()}

            <div className='github-description'>
                <div className='github-description-topline'>
                    <h4>About</h4>
                    <Button
                        onClick={() => settingsPopup.setShown(true)}
                        ref={(el) =>
                            tooltips.set(0, 'Global settings', el, 'left')
                        }
                    >
                        <img
                            className='github-img'
                            src={gearImg}
                            alt='settings'
                        />
                    </Button>
                </div>

                <h4>{state.data.description.about}</h4>

                <GithubDescriptionTopics state={state} />
                <p>Readme</p>
                <p>Activity</p>

                <GithubDescriptionNumbers state={state} dispatch={dispatch} />

                <hr />
                <GithubDescriptionVisibility state={state} />
            </div>
        </>
    );
};

interface TopicsProps {
    state: GithubContextData;
}

const GithubDescriptionTopics = ({ state }: TopicsProps) => {
    return (
        <div className='github-description-topics'>
            {state.data.description.topics.map((topic, idx) => (
                <div key={idx}>
                    <p>{topic}</p>
                </div>
            ))}
        </div>
    );
};

interface VisibilityProps {
    state: GithubContextData;
}

const GithubDescriptionVisibility = ({ state }: VisibilityProps) => {
    return (
        <>
            {state.data.visibility.releases && (
                <div className='github-description-section'>
                    <h4>Releases</h4>
                    <p>No releases found</p>
                    <hr />
                </div>
            )}

            {state.data.visibility.packages && (
                <div className='github-description-section'>
                    <h4>Packages</h4>
                    <p>No packages found</p>
                    <hr />
                </div>
            )}

            {state.data.visibility.languages && (
                <div className='github-description-section'>
                    <h4>Languages</h4>
                    <hr />
                </div>
            )}
        </>
    );
};

interface NumbersProps {
    state: GithubContextData;
    dispatch: React.Dispatch<GithubReducerAction>;
}

const GithubDescriptionNumbers = ({ state, dispatch }: NumbersProps) => {
    const tooltips = useTooltips();

    return (
        <>
            {tooltips.render()}

            <div className='github-description-numbers'>
                <div className='github-flex' style={{ gap: '0.2rem' }}>
                    <img src={starImg} alt='' className='github-img' />
                    <motion.p
                        key={state.data.description.stars}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {state.data.description.stars}
                    </motion.p>
                    <p>stars</p>
                </div>

                <div className='github-flex'>
                    <Button
                        ref={(el) => tooltips.set(0, 'Add 1 star', el, 'left')}
                        onClick={() => {
                            dispatch({ type: 'DESCRIPTION_INCREMENT_STARS' });
                        }}
                    >
                        +
                    </Button>

                    <Button
                        ref={(el) => tooltips.set(1, 'Remove 1 star', el, 'up')}
                        onClick={() =>
                            dispatch({ type: 'DESCRIPTION_DECREMENT_STARS' })
                        }
                    >
                        -
                    </Button>
                </div>
            </div>

            <div className='github-description-numbers'>
                <div className='github-flex' style={{ gap: '0.2rem' }}>
                    <img src={eyeImg} alt='' className='github-img' />
                    <motion.p
                        key={state.data.description.watching}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {state.data.description.watching}
                    </motion.p>
                    <p>watching</p>
                </div>

                <div className='github-flex'>
                    <Button
                        ref={(el) =>
                            tooltips.set(2, 'Add 1 watching', el, 'left')
                        }
                        onClick={() =>
                            dispatch({ type: 'DESCRIPTION_INCREMENT_WATCHING' })
                        }
                    >
                        +
                    </Button>

                    <Button
                        ref={(el) =>
                            tooltips.set(3, 'Remove 1 watching', el, 'up')
                        }
                        onClick={() =>
                            dispatch({ type: 'DESCRIPTION_DECREMENT_WATCHING' })
                        }
                    >
                        -
                    </Button>
                </div>
            </div>

            <div className='github-description-numbers'>
                <div className='github-flex' style={{ gap: '0.2rem' }}>
                    <img src={forkImg} alt='' className='github-img' />
                    <motion.p
                        key={state.data.description.forks}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {state.data.description.forks}
                    </motion.p>
                    <p>forks</p>
                </div>

                <div className='github-flex'>
                    <Button
                        ref={(el) => tooltips.set(4, 'Add 1 fork', el, 'left')}
                        onClick={() =>
                            dispatch({ type: 'DESCRIPTION_INCREMENT_FORKS' })
                        }
                    >
                        +
                    </Button>

                    <Button
                        ref={(el) => tooltips.set(5, 'Remove 1 fork', el, 'up')}
                        onClick={() =>
                            dispatch({ type: 'DESCRIPTION_DECREMENT_FORKS' })
                        }
                    >
                        -
                    </Button>
                </div>
            </div>
        </>
    );
};
