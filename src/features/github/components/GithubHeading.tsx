import { usePopup } from '../../../hooks/usePopup';
import { MessageBox } from '../../messagebox/components/MessageBox';
import { Button } from '../../ui/Button/components/Button';
import { useGithubContext } from '../context/GithubContext';
import './GithubHeading.css';

import starImg from '../assets/star.svg';
import watchImg from '../assets/eye.svg';
import forkImg from '../assets/fork.svg';
import deleteImg from '../assets/delete.svg';
import { GithubContextInitialData } from '../context/initial/githubData';

interface GithubHeadingButton {
    content: string;
    image?: string;
    action: () => void;
}

export const GithubHeading = () => {
    const [context, setContext] = useGithubContext();

    const wipeMessageBox = usePopup(<MessageBox 
        title='Are you sure?'
        description='You are about to <mark>factory reset</mark> this repository. (All your data will be <u>gone</u>)'
        onInteract={flag => {
            if(flag)
                setContext(prev => ({ ...prev, data: GithubContextInitialData }));
            wipeMessageBox.setShown(false)
        }}/>)

    const buttons: GithubHeadingButton[] = [
        {
            content: 'Star',
            image: starImg,
            action: () => setContext(prev => ({ ...prev, 
                data: ({ ...prev.data, 
                    description: ({ ...prev.data.description, stars: prev.data.description.stars + 1})
                })}))
        },
        {
            content: 'Watch',
            image: watchImg,
            action: () => setContext(prev => ({ ...prev, 
                data: ({ ...prev.data, 
                    description: ({ ...prev.data.description, watching: prev.data.description.watching + 1})
                })}))
        },
        {
            content: 'Fork',
            image: forkImg,
            action: () => setContext(prev => ({ ...prev, 
                data: ({ ...prev.data, 
                    description: ({ ...prev.data.description, forks: prev.data.description.forks + 1})
                })}))
        },
        {
            content: 'Wipe',
            image: deleteImg,
            action: () => wipeMessageBox.setShown(true)
        }
    ]

    return (
        <>
            { wipeMessageBox.render() }

            <div className='github-heading'>
                <div className='github-flex'>
                    <div className='github-heading-avatar'/>

                    <h3><mark>{context.data.repositoryName}</mark></h3>

                    <div className='github-tiny-info-container'>
                        <p>Public</p>
                    </div>
                </div>

                <div className='github-heading-buttons'>
                    { buttons.map(button => (
                        <Button
                        onClick={() => button.action()}>
                            { button.image && (
                                <img
                                style={{ width: '16px', height: '16px' }}
                                src={button.image}
                                alt=''
                                className='github-img'/>
                            )}
                            { button.content } 
                        </Button>
                    ))}
                </div>
            </div>
        </>
    )
}   