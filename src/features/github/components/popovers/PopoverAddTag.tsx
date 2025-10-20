import { useEffect, useState } from 'react';
import { HotkeyTooltip } from '../../../hotkeytooltip/components/HotkeyTooltip';
import { Button } from '../../../ui/Button/components/Button';
import { Input } from '../../../ui/Input/components/Input';
import { useGithubContext } from '../../context/GithubContext';
import { GithubPopover } from './GithubPopover';
import './PopoverAddTag.css';

import { useHotkeys } from '../../../../hooks/useHotkeys';
import tagImg from '../../assets/tags.svg';

interface Props {
    onCancel?: () => void;
}

export const PopoverAddTag = ({ onCancel }: Props) => {
    // state
    const [state, dispatch] = useGithubContext();
    const branch = state.data.branches.find(
        (b) => b.idx === state.data.currentBranch
    );
    const form = branch?.forms.find((f) => f.idx === state.data.currentForm);

    // search + validity functionality
    const [inputValue, setInputValue] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(false);

    useEffect(() => {
        const found = form?.tags.some(
            (f) => f.toLowerCase() === inputValue.toLowerCase()
        );
        setIsValid(!(found ?? true) && inputValue.trim().length > 0);
    }, [inputValue, branch]);

    // hotkeys
    useHotkeys([
        {
            hotkey: 'Enter',
            action: () => {
                if (isValid)
                    dispatch({ type: 'FORM_ADD_TAG_CURRENT', tag: inputValue });
            },
            ignoreFocus: true,
        },
    ]);

    return (
        <GithubPopover
            className='popover-add-tag'
            onCancel={() => onCancel?.()}
            title='<mark>Add</mark> a Tag'
        >
            <Input
                autoFocus
                placeholder='Tag name'
                value={inputValue}
                onChange={(val) => setInputValue(val)}
                onClear={() => setInputValue('')}
            />

            {inputValue.trim().length > 0 && (
                <Button
                    enabled={isValid}
                    className='popover-create-button'
                    onClick={() => {
                        if (isValid)
                            dispatch({
                                type: 'FORM_ADD_TAG_CURRENT',
                                tag: inputValue,
                            });
                    }}
                >
                    <img src={tagImg} alt='' className='github-img' />
                    <mark>Create</mark> tag <b>{inputValue}</b>
                    {!isValid ? (
                        <p style={{ marginLeft: 'auto' }}>
                            <u>Already exists!</u>
                        </p>
                    ) : (
                        <HotkeyTooltip
                            className='popover-create-button-hotkey'
                            hotkeys={['Enter']}
                        />
                    )}
                </Button>
            )}
        </GithubPopover>
    );
};
