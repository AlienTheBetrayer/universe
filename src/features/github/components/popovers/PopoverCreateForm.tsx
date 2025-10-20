import { useEffect, useState } from 'react';
import { Button } from '../../../ui/Button/components/Button';
import { Input } from '../../../ui/Input/components/Input';
import formImg from '../../assets/file.svg';
import { GithubPopover } from './GithubPopover';
import './PopoverCreateForm.css';

import { useHotkeys } from '../../../../hooks/useHotkeys';
import { HotkeyTooltip } from '../../../hotkeytooltip/components/HotkeyTooltip';
import { useGithubContext } from '../../context/GithubContext';

interface Props {
    onCancel?: () => void;
}

export const PopoverCreateForm = ({ onCancel }: Props) => {
    // state + variables
    const [state, dispatch] = useGithubContext();
    const branch = state.data.branches.find(
        (b) => b.idx === state.data.currentBranch
    );

    // input functionality + validity
    const [inputValue, setInputValue] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(false);

    useEffect(() => {
        const found = branch?.forms?.some(
            (f) => f.name.toLowerCase() === inputValue.toLowerCase()
        );
        setIsValid(!(found ?? true) && inputValue.trim().length > 0);
    }, [inputValue, branch]);

    // hotkeys
    useHotkeys([
        {
            hotkey: 'Enter',
            action: () => {
                if (isValid)
                    dispatch({ type: 'FORM_CREATE', name: inputValue });
            },
            ignoreFocus: true,
        },
    ]);

    return (
        <GithubPopover
            className='popover-create-form'
            title='<mark>Create</mark> a form'
            onCancel={() => onCancel?.()}
        >
            <Input
                autoFocus
                placeholder='Form name'
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
                            dispatch({ type: 'FORM_CREATE', name: inputValue });
                    }}
                >
                    <img src={formImg} alt='' className='github-img' />
                    <mark>Create</mark> form <b>{inputValue}</b>
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
