import { usePopup } from '../../../hooks/usePopup';
import { MessageBox } from '../../messagebox/components/MessageBox';
import { Button } from '../../ui/Button/components/Button';
import { useGithubContext } from '../context/GithubContext';
import './GithubHeading.css';

import deleteImg from '../assets/delete.svg';
import watchImg from '../assets/eye.svg';
import forkImg from '../assets/fork.svg';
import starImg from '../assets/star.svg';

interface GithubHeadingButton {
    content: string;
    image?: string;
    action: () => void;
}

export const GithubHeading = () => {
    const [state, dispatch] = useGithubContext();

    const wipeMessageBox = usePopup(
        <MessageBox
            title='Are you sure?'
            description='You are about to <mark>factory reset</mark> this repository. (All your data will be <u>gone</u>)'
            onInteract={(flag) => {
                if (flag) dispatch({ type: 'DATA_SET_INITIAL' });
                wipeMessageBox.setShown(false);
            }}
        />
    );

    const buttons: GithubHeadingButton[] = [
        {
            content: 'Star',
            image: starImg,
            action: () => dispatch({ type: 'DESCRIPTION_INCREMENT_STARS' }),
        },
        {
            content: 'Watch',
            image: watchImg,
            action: () => dispatch({ type: 'DESCRIPTION_INCREMENT_WATCHING' }),
        },
        {
            content: 'Fork',
            image: forkImg,
            action: () => dispatch({ type: 'DESCRIPTION_INCREMENT_FORKS' }),
        },
        {
            content: 'Wipe',
            image: deleteImg,
            action: () => wipeMessageBox.setShown(true),
        },
    ];

    return (
        <>
            {wipeMessageBox.render()}

            <div className='github-heading'>
                <div className='github-flex'>
                    <div className='github-heading-avatar' />

                    <h3>
                        <mark>{state.data.description.repositoryName}</mark>
                    </h3>

                    <div className='github-tiny-info-container'>
                        <p>Public</p>
                    </div>
                </div>

                <div className='github-heading-buttons'>
                    {buttons.map((button, idx) => (
                        <Button key={idx} onClick={() => button.action()}>
                            {button.image && (
                                <img
                                    style={{ width: '16px', height: '16px' }}
                                    src={button.image}
                                    alt=''
                                    className='github-img'
                                />
                            )}
                            {button.content}
                        </Button>
                    ))}
                </div>
            </div>
        </>
    );
};
