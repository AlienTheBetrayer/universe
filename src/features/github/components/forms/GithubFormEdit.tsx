import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './GithubFormEdit.css';

import branchImg from '../../assets/branch.svg';
import checkmarkImg from '../../assets/checkmark.svg';
import deleteImg from '../../assets/delete.svg';
import formImg from '../../assets/file.svg';
import sendImg from '../../assets/send.svg';

import { motion } from 'motion/react';
import { usePopup } from '../../../../hooks/usePopup';
import { MessageBox } from '../../../messagebox/components/MessageBox';
import { useTooltips } from '../../../tooltip/hooks/useTooltips';
import { Button } from '../../../ui/Button/components/Button';
import { PopoverButton } from '../../../ui/PopoverButton/components/PopoverButton';
import {
    useGithubContext,
    type GithubContextData,
} from '../../context/GithubContext';
import type { GithubReducerAction } from '../../context/reducer/GithubReducer';
import { PopoverAddTag } from '../popovers/PopoverAddTag';
import { PopoverFormEditCommit } from '../popovers/PopoverFormEditCommit';

interface Props {}

export const GithubFormEdit = ({}: Props) => {
    // state + variables
    const [state, dispatch] = useGithubContext();
    const branch = state.data.branches.find(
        (b) => b.idx === state.data.currentBranch
    );
    const form = branch?.forms?.find((f) => f.idx === state.data.currentForm);

    // new states for the description
    const author = useState<string>(form?.content?.author ?? '');
    const email = useState<string>(form?.content?.email ?? '');
    const message = useState<string>(form?.content?.message ?? '');

    // validity state
    const [isValid, setIsValid] = useState<boolean>(false);

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className='github-form-edit'
        >
            <GithubFormEditTopline state={state} dispatch={dispatch} />
            <GithubFormEditMain
                state={state}
                dispatch={dispatch}
                setIsValid={setIsValid}
                author={author}
                email={email}
                message={message}
            />
            <GithubFormEditBottom
                dispatch={dispatch}
                isValid={isValid}
                author={author}
                email={email}
                message={message}
            />
        </motion.div>
    );
};

interface ToplineProps {
    state: GithubContextData;
    dispatch: React.Dispatch<GithubReducerAction>;
}

const GithubFormEditTopline = ({ state, dispatch }: ToplineProps) => {
    // state
    const branch = state.data.branches.find(
        (b) => b.idx === state.data.currentBranch
    );
    const form = branch?.forms?.find((f) => f.idx === state.data.currentForm);

    // tooltips
    const tooltips = useTooltips();

    return (
        <div className='github-form-edit-topline'>
            {tooltips.render()}
            <div className='github-flex'>
                <img src={branchImg} alt='branch' className='github-img' />
                <h4>
                    <mark>{branch?.name}</mark>
                </h4>

                <img src={formImg} alt='form' className='github-img' />
                <h4>
                    <mark>{form?.name}</mark>
                </h4>
            </div>

            <div className='github-form-edit-topline-tags'>
                {form?.tags.map((tag, idx) => (
                    <div className='github-tiny-info-container' key={idx}>
                        <motion.p
                            key={tag}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {tag}
                        </motion.p>

                        <Button
                            className='github-tag-remove-button'
                            onClick={() =>
                                dispatch({
                                    type: 'FORM_REMOVE_TAG_CURRENT',
                                    tag: tag,
                                })
                            }
                        >
                            ✕
                        </Button>
                    </div>
                ))}

                <PopoverButton
                    ref={(el) => tooltips.set(0, 'Create a new tag', el, 'up')}
                    className='github-cancel-button'
                    element={<PopoverAddTag />}
                    direction='top-left'
                >
                    +
                </PopoverButton>
            </div>
        </div>
    );
};

interface MainProps {
    state: GithubContextData;
    dispatch: React.Dispatch<GithubReducerAction>;
    setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
    author: [string, React.Dispatch<React.SetStateAction<string>>];
    email: [string, React.Dispatch<React.SetStateAction<string>>];
    message: [string, React.Dispatch<React.SetStateAction<string>>];
}

const GithubFormEditMain = ({
    state,
    setIsValid,
    author,
    email,
    message,
}: MainProps) => {
    // state
    const branch = state.data.branches.find(
        (b) => b.idx === state.data.currentBranch
    );
    const form = branch?.forms?.find((f) => f.idx === state.data.currentForm);

    // syncing states if we change the current form
    useEffect(() => {
        author[1](form?.content?.author ?? '');
        email[1](form?.content?.email ?? '');
        message[1](form?.content?.message ?? '');
    }, [form?.content]);

    // setting the validity based on our <form/>
    useEffect(() => {
        setIsValid(formRef.current?.checkValidity() ?? false);
    }, [author, email, message]);

    // scrolling to <form/> 300 ms after it gets selected
    const formRef = useRef<HTMLFormElement>(null);

    useLayoutEffect(() => {
        if (state.data.currentForm !== false) {
            const timeout = setTimeout(() => {
                formRef.current?.scrollIntoView({
                    block: 'end',
                    behavior: 'smooth',
                });
            }, 300);

            return () => clearTimeout(timeout);
        }
    }, [state.data.currentForm]);

    // tooltips
    const tooltips = useTooltips();

    return (
        <div className='github-form-edit-main'>
            {tooltips.render()}

            <form
                ref={formRef}
                id='github-form'
                action='mailto:alienthebusinessman@gmail.com'
                method='post'
                encType='text/plain'
            >
                <div className='github-form-edit-main-field'>
                    <div className='github-form-edit-main-field-wrapper'>
                        <label htmlFor='author'>Author Name</label>
                        <input
                            id='author'
                            type='text'
                            value={author[0]}
                            onChange={(e) => author[1](e.target.value)}
                            aria-label='Author Name'
                            required
                        />
                    </div>

                    <Button
                        className='github-cancel-button'
                        onClick={() => author[1]('')}
                        ref={(el) =>
                            tooltips.set(0, 'Clear author', el, 'left')
                        }
                    >
                        ✕
                    </Button>
                </div>

                <div className='github-form-edit-main-field'>
                    <div className='github-form-edit-main-field-wrapper'>
                        <label htmlFor='email'>E-mail</label>
                        <input
                            id='email'
                            type='email'
                            value={email[0]}
                            onChange={(e) => email[1](e.target.value)}
                            aria-label='E-mail'
                            required
                        />
                    </div>

                    <Button
                        className='github-cancel-button'
                        onClick={() => email[1]('')}
                        ref={(el) =>
                            tooltips.set(1, 'Clear e-mail', el, 'left')
                        }
                    >
                        ✕
                    </Button>
                </div>

                <div className='github-form-edit-main-field github-form-edit-main-message-field '>
                    <div className='github-form-edit-main-field-wrapper'>
                        <label htmlFor='message'>Message</label>
                        <textarea
                            id='message'
                            value={message[0]}
                            onChange={(e) => message[1](e.target.value)}
                            aria-label='Message'
                            required
                        />
                    </div>

                    <Button
                        className='github-cancel-button'
                        onClick={() => message[1]('')}
                        ref={(el) =>
                            tooltips.set(2, 'Clear message', el, 'left')
                        }
                    >
                        ✕
                    </Button>
                </div>
            </form>
        </div>
    );
};

interface BottomProps {
    dispatch: React.Dispatch<GithubReducerAction>;
    isValid: boolean;
    author: [string, React.Dispatch<React.SetStateAction<string>>];
    email: [string, React.Dispatch<React.SetStateAction<string>>];
    message: [string, React.Dispatch<React.SetStateAction<string>>];
}

const GithubFormEditBottom = ({
    dispatch,
    isValid,
    author,
    email,
    message,
}: BottomProps) => {
    // message box
    const formDeleteMessageBox = usePopup(
        <MessageBox
            title='Are you sure?'
            description='You are about to <u>permanently delete</u> this form.'
            onInteract={(f) => {
                if (f) dispatch({ type: 'FORM_DELETE_CURRENT' });

                formDeleteMessageBox.setShown(false);
            }}
        />
    );

    // tooltips
    const tooltips = useTooltips();

    return (
        <div className='github-form-edit-bottom'>
            {tooltips.render()}
            {formDeleteMessageBox.render()}

            <Button
                className='github-delete-button'
                onClick={() => formDeleteMessageBox.setShown(true)}
                ref={(el) => tooltips.set(0, 'Delete this form', el, 'up', 16)}
            >
                <img
                    src={deleteImg}
                    alt=''
                    className='github-img'
                    style={{ filter: 'invert(1)' }}
                />
                Delete
            </Button>

            <Button
                style={{ marginLeft: 'auto' }}
                ref={(el) => tooltips.set(1, 'Cancel', el, 'up', 16)}
                onClick={() => {
                    dispatch({ type: 'FORM_FOCUS', idx: false });
                }}
            >
                Cancel
            </Button>

            <Button
                type='submit'
                form='github-form'
                ref={(el) =>
                    tooltips.set(2, 'Send the form via E-mail', el, 'up', 16)
                }
                className='github-save-button'
            >
                <img
                    src={sendImg}
                    alt=''
                    className='github-img'
                    style={{ filter: 'invert(1)' }}
                />
                Send
            </Button>

            <PopoverButton
                element={
                    <PopoverFormEditCommit
                        newContent={{
                            author: author[0],
                            email: email[0],
                            message: message[0],
                        }}
                    />
                }
                direction='top-left'
                enabled={isValid}
                ref={(el) =>
                    tooltips.set(3, 'Apply and update changes', el, 'up', 16)
                }
                className='github-save-button'
            >
                <img
                    src={checkmarkImg}
                    alt=''
                    className='github-img'
                    style={{
                        filter: 'invert(1)',
                        width: '16px',
                        height: '16px',
                    }}
                />
                Commit
            </PopoverButton>
        </div>
    );
};
