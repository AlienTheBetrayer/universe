import { forwardRef, useState } from 'react';
import './GithubFormEdit.css';
import { useGithubContext } from '../context/GithubContext';

import formImg from '../assets/file.svg';
import branchImg from '../assets/branch.svg';
import { Button } from '../../ui/Button/components/Button';
import { useTooltips } from '../../tooltip/hooks/useTooltips';

interface Props {

}

export const GithubFormEdit = forwardRef<HTMLDivElement, Props>(({}, ref) => {
    // state + variables
    const [context, setContext] = useGithubContext();
    
    const branch = context.data.branches.find(b => b.idx === context.data.currentBranch);
    const form = branch?.forms?.find(f => f.idx === context.data.currentForm);
    const [author, setAuthor] = useState<string>(form?.content?.author ?? '');
    const [email, setEmail] = useState<string>(form?.content?.email ?? '');
    const [message, setMessage] = useState<string>(form?.content?.message ?? '');



    const tooltips = useTooltips();

    return (
        <>
            { tooltips.render() }

            <div 
            className='github-form-edit'
            ref={ref}>
                <div className='github-form-edit-topline'>
                    <div className='github-flex'>
                        <img
                        src={branchImg}
                        alt='branch'
                        className='github-img'/>
                        <h4><mark>{branch?.name}</mark></h4>

                        <img
                        src={formImg}
                        alt='form'
                        className='github-img'/>
                        <h4><mark>{form?.name}</mark></h4>
                    </div>
                    
                    <div className='github-form-edit-topline-tags'>
                        { form?.tags.map((tag, idx) => (
                            <div 
                            className='github-tiny-info-container'
                            key={idx}>
                                <p>
                                    { tag }
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='github-form-edit-main'>
                    <div className='github-form-edit-main-field'>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h4>Author</h4>
                            <Button 
                            className='github-cancel-button'
                            onClick={() => setAuthor('')}
                            ref={el => tooltips.set(0, 'Clear author', el, 'left')}>
                            ✕
                            </Button>
                        </div>

                        <textarea 
                        value={author}
                        onChange={e => setAuthor(e.target.value)}/>
                    </div>

                    <div className='github-form-edit-main-field'>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h4>Email</h4>
                            <Button 
                            className='github-cancel-button'
                            onClick={() => setEmail('')}
                            ref={el => tooltips.set(1, 'Clear email', el, 'left')}>
                            ✕
                            </Button>
                        </div>

                        <textarea 
                        value={email}
                        onChange={e => setEmail(e.target.value)}/>
                    </div>

                    <div 
                    className='github-form-edit-main-field github-form-edit-main-message-field'>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h4>Message</h4>
                            <Button 
                            className='github-cancel-button'
                            onClick={() => setMessage('')}
                            ref={el => tooltips.set(2, 'Clear message', el, 'left')}>
                            ✕
                            </Button>
                        </div>

                        <textarea
                        value={message} 
                        onChange={e => setMessage(e.target.value)}/>
                    </div>
                </div>

                <div className='github-form-edit-bottom'>
                    <Button 
                    ref={el => tooltips.set(3, 'Cancel', el, 'up', 16)}
                    onClick={() => {}}>
                        Cancel
                    </Button>

                    <Button 
                    ref={el => tooltips.set(4, 'Apply and update changes', el, 'up', 16)}
                    onClick={() => {}}
                    className='github-repository-settings-save-button'>
                        Save changes
                    </Button>
                </div>
            </div>
        </>
    )
});