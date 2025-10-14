import { usePopup } from '../../../hooks/usePopup';
import { MessageBox } from '../../messagebox/components/MessageBox';
import { Button } from '../../ui/Button/components/Button';
import { GithubContextInitialData, useGithubContext } from '../context/GithubContext';
import './GithubHeading.css';

export const GithubHeading = () => {
    const [, setContext] = useGithubContext();

    const wipeMessageBox = usePopup(<MessageBox 
        title='Are you sure?'
        description='You are about to <u>wipe</u> all your existing forms and their <mark>data</mark>'
        onInteract={flag => {
            if(flag)
                setContext(prev => ({ ...prev, data: GithubContextInitialData }));
            wipeMessageBox.setShown(false)
        }}/>)

    return (
        <>
            { wipeMessageBox.render() }

            <div className='github-heading'>
                <div className='github-flex'>
                    <div className='github-heading-avatar'/>

                    <h3>theuniverse</h3>

                    <div className='github-heading-forms-type'>
                        <p>Public</p>
                    </div>
                </div>

                <div className='github-heading-buttons'>
                    <Button>Pin</Button>
                    <Button>Watch</Button>
                    <Button>Fork</Button>
                    <Button onClick={() => wipeMessageBox.setShown(true)}>Wipe</Button>
                </div>
            </div>
        </>
    )
}   