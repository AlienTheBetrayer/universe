import { forwardRef, useEffect, useRef, useState } from 'react';
import './GithubFormEdit.css';
import { useGithubContext } from '../context/GithubContext';

import formImg from '../assets/file.svg';
import branchImg from '../assets/branch.svg';
import sendImg from '../assets/send.svg';

import { Button } from '../../ui/Button/components/Button';
import { useTooltips } from '../../tooltip/hooks/useTooltips';

import { motion } from 'motion/react';

interface Props {

}

export const GithubFormEdit = forwardRef<HTMLDivElement, Props>(({}, ref) => {
    // state + variables
    const [context, setContext] = useGithubContext();
    
    const branch = context.data.branches.find(b => b.idx === context.data.currentBranch);
    const form = branch?.forms?.find(f => f.idx === context.data.currentForm);
    
    // 
    const [author, setAuthor] = useState<string>(form?.content?.author ?? '');
    const [email, setEmail] = useState<string>(form?.content?.email ?? '');
    const [message, setMessage] = useState<string>(form?.content?.message ?? '');

    useEffect(() => {
        setAuthor(form?.content?.author ?? '');
        setEmail(form?.content?.email ?? '');
        setMessage(form?.content?.message ?? '');
    }, [form]);

    const formRef = useRef<HTMLFormElement>(null);

    const tooltips = useTooltips();
    const [isValid, setIsValid] = useState<boolean>(false);

    useEffect(() => {
        setIsValid(formRef.current?.checkValidity() ?? false);
    }, [author, email, message]);

    return (
        <>
            { tooltips.render() }

            <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
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
                    ref={el => tooltips.set(3, 'Cancel', el, 'up', 16)}
                    onClick={() => { setContext(prev => ({ ...prev, 
                        data: ({ ...prev.data, currentForm: false })})) }}>
                        Cancel
                    </Button>

                    <Button 
                    type='submit'
                    form='github-form'
                    ref={el => tooltips.set(4, 'Send the form via E-mail', el, 'up', 16)}
                    className='github-repository-settings-save-button'>
                        <img 
                        src={sendImg} 
                        alt='' 
                        className='github-img'
                        style={{ filter: 'invert(1)'}}/>
                        Send
                    </Button>
                    
                    <Button 
                    enabled={isValid}
                    ref={el => tooltips.set(5, 'Apply and update changes', el, 'up', 16)}
                    className='github-repository-settings-save-button'
                    onClick={() => {
                        setContext(prev => {
                        if (!isValid) {
                            formRef.current?.reportValidity();
                            return prev;
                        }

                        const newContent = { author, email, message };

                        return {
                            ...prev,
                            data: {
                            ...prev.data,
                            currentForm: false,
                            branches: prev.data.branches.map(b =>
                                b.idx === branch?.idx
                                ? {
                                    ...b,
                                    forms: b.forms.map(f =>
                                        f.idx === form?.idx
                                        ? { ...f, content: newContent }
                                        : f
                                    ),
                                    }
                                : b
                            )}}})}}>
                        Apply changes
                    </Button>
                </div>
            </motion.div>
        </>
    )
});