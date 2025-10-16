import './GithubFormEdit.css';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useGithubContext } from '../context/GithubContext';

import formImg from '../assets/file.svg';
import branchImg from '../assets/branch.svg';
import sendImg from '../assets/send.svg';
import deleteImg from '../assets/delete.svg';
import checkmarkImg from '../assets/checkmark.svg';

import { Button } from '../../ui/Button/components/Button';
import { useTooltips } from '../../tooltip/hooks/useTooltips';

import { motion } from 'motion/react';
import { PopoverButton } from '../../ui/PopoverButton/components/PopoverButton';
import { PopoverAddTag } from './popovers/PopoverAddTag';
import { usePopup } from '../../../hooks/usePopup';
import { MessageBox } from '../../messagebox/components/MessageBox';
import { PopoverFormEditCommit } from './popovers/PopoverFormEditCommit';


interface Props {

}

export const GithubFormEdit = ({}: Props) => {
    // state + variables
    const [context, setContext] = useGithubContext();
    
    const branch = context.data.branches.find(b => b.idx === context.data.currentBranch);
    const form = branch?.forms?.find(f => f.idx === context.data.currentForm);
    

    // our new states for the description + syncing them
    const [author, setAuthor] = useState<string>(form?.content?.author ?? '');
    const [email, setEmail] = useState<string>(form?.content?.email ?? '');
    const [message, setMessage] = useState<string>(form?.content?.message ?? '');

    useEffect(() => {
        setAuthor(form?.content?.author ?? '');
        setEmail(form?.content?.email ?? '');
        setMessage(form?.content?.message ?? '');
    }, [form?.content]);


    // form ref + scrolling to it
    const formRef = useRef<HTMLFormElement>(null);

    useLayoutEffect(() => {
        if(context.data.currentForm !== false) {
            const timeout = setTimeout(() => {
                formRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
            }, 300);
            
            return () => clearTimeout(timeout);
        }
    }, [context.data.currentForm]);

    // form validity
    const [isValid, setIsValid] = useState<boolean>(false);

    useEffect(() => {
        setIsValid(formRef.current?.checkValidity() ?? false);
    }, [author, email, message]);


    // tooltips
    const tooltips = useTooltips();


    // messagebox
    const formDeleteMessageBox = usePopup(
    <MessageBox
    title='Are you sure?'
    description='You are about to <u>permanently delete</u> this form.'
    onInteract={f => {
        if(f) {
            setContext(prev => ({ ...prev, 
                data: ({ ...prev.data, 
                    branches: prev.data.branches.map(b => b.idx === prev.data.currentBranch 
                        ? { ...b, 
                            forms: b.forms.filter(f => f.idx !== prev.data.currentForm)}
                        : b
                    ), currentForm: false
                })}))
        }

        formDeleteMessageBox.setShown(false);
    }}/>);


    return (
        <>
            { tooltips.render() }
            { formDeleteMessageBox.render() }

            <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className='github-form-edit'>
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
                                <motion.p
                                key={tag}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}>
                                    {tag}
                                </motion.p>

                                <Button 
                                className='github-tag-remove-button'
                                onClick={() => setContext(prev => ({ ...prev, 
                                    data: ({ ...prev.data, 
                                        branches: prev.data.branches.map(b => b.idx === prev.data.currentBranch
                                            ? { ...b, forms: b.forms.map(f => f.idx === prev.data.currentForm
                                                ? { ...f, tags: f.tags.filter(t => t !== tag ) }
                                                : f
                                            )}
                                            : b
                                        )
                                })}))}>
                                    ✕
                                </Button>
                            </div>
                        ))}

                        <PopoverButton 
                        ref={el => tooltips.set(6, 'Create a new tag', el, 'up')}
                        className='github-cancel-button'
                        element={<PopoverAddTag/>}
                        direction='top-left'>
                            +
                        </PopoverButton>
                    </div>
                </div>

                <div className='github-form-edit-main'>
                    <form
                    ref={formRef}
                    id='github-form'
                    action='mailto:alienthebusinessman@gmail.com'
                    method='post'
                    encType='text/plain'>
                        <div className='github-form-edit-main-field'>
                            <div className='github-form-edit-main-field-wrapper'>
                                <label htmlFor='author'>
                                    Author Name
                                </label>
                                <input
                                id='author'
                                type='text'
                                value={author}
                                onChange={e => setAuthor(e.target.value)}
                                aria-label='Author Name'
                                required/>
                            </div>

                            <Button 
                            className='github-cancel-button'
                            onClick={() => setAuthor('')}
                            ref={el => tooltips.set(0, 'Clear author', el, 'left')}>
                            ✕
                            </Button>
                        </div>


                        <div className='github-form-edit-main-field'>
                            <div className='github-form-edit-main-field-wrapper'>
                                <label htmlFor='email'>
                                    E-mail
                                </label>
                                <input
                                id='email'
                                type='email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                aria-label='E-mail'
                                required/>
                            </div>

                            <Button 
                            className='github-cancel-button'
                            onClick={() => setEmail('')}
                            ref={el => tooltips.set(1, 'Clear e-mail', el, 'left')}>
                            ✕
                            </Button>
                        </div>


                        <div className='github-form-edit-main-field github-form-edit-main-message-field '>
                            <div className='github-form-edit-main-field-wrapper'>
                                <label htmlFor='message'>
                                    Message
                                </label>
                                <textarea
                                id='message'
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                aria-label='Message'
                                required/>
                            </div>

                            <Button 
                            className='github-cancel-button'
                            onClick={() => setMessage('')}
                            ref={el => tooltips.set(2, 'Clear message', el, 'left')}>
                            ✕
                            </Button>
                        </div>
                    </form>
                </div>

                <div className='github-form-edit-bottom'>
                    <Button
                    className='github-delete-button'
                    onClick={() => formDeleteMessageBox.setShown(true)}
                    ref={el => tooltips.set(7, 'Delete this form', el, 'up', 16)}>
                        <img
                        src={deleteImg}
                        alt=''
                        className='github-img'
                        style={{ filter: 'invert(1)'}}/>
                        Delete
                    </Button>

                    <Button 
                    style={{ marginLeft: 'auto' }}
                    ref={el => tooltips.set(3, 'Cancel', el, 'up', 16)}
                    onClick={() => { setContext(prev => ({ ...prev, 
                        data: ({ ...prev.data, currentForm: false })})) }}>
                        Cancel
                    </Button>

                    <Button 
                    type='submit'
                    form='github-form'
                    ref={el => tooltips.set(4, 'Send the form via E-mail', el, 'up', 16)}
                    className='github-save-button'>
                        <img 
                        src={sendImg} 
                        alt='' 
                        className='github-img'
                        style={{ filter: 'invert(1)'}}/>
                        Send
                    </Button>
                    
                    <PopoverButton 
                    element={<PopoverFormEditCommit newContent={{ author, email, message }}/>}
                    direction='top-left'
                    enabled={isValid}
                    ref={el => tooltips.set(5, 'Apply and update changes', el, 'up', 16)}
                    className='github-save-button'
                    >
                        <img 
                        src={checkmarkImg} 
                        alt='' 
                        className='github-img'
                        style={{ filter: 'invert(1)', width: '16px', height: '16px'}}/>
                        Commit
                    </PopoverButton>
                </div>
            </motion.div>
        </>
    )
}