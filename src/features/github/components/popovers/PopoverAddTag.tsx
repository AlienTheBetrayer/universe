import './PopoverAddTag.css';
import { GithubPopover } from "./GithubPopover"
import { Input } from '../../../ui/Input/components/Input';
import { useEffect, useState } from 'react';
import { useGithubContext } from '../../context/GithubContext';
import { Button } from '../../../ui/Button/components/Button';
import { HotkeyTooltip } from '../../../hotkeytooltip/components/HotkeyTooltip';

import tagImg from '../../assets/tags.svg';
import { useHotkeys } from '../../../../hooks/useHotkeys';

interface Props {
    onCancel?: () => void;
}

export const PopoverAddTag = ({ onCancel }: Props) => {
    // context + variables
    const [context, setContext] = useGithubContext();
    const branch = context.data.branches.find(b => b.idx === context.data.currentBranch)!;
    const form = branch.forms.find(f => f.idx === context.data.currentForm)!;
    
    // search functionality
    const [inputValue, setInputValue] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(false);

    useEffect(() => {
        const found = form.tags.some(f => f === inputValue);
        setIsValid(!(found ?? true) && inputValue.trim().length > 0);
    }, [inputValue, branch]);

    const createTag = (name: string) => {
        if(!isValid)
            return;

        setContext(prev => ({ ...prev, 
            data: ({ ...prev.data, 
                branches: prev.data.branches.map(b => b.idx === prev.data.currentBranch
                    ? 
                    { ...b,
                        forms: b.forms.map(f => f.idx === prev.data.currentForm 
                            ? {
                                ...f,
                                tags: [...f.tags, name]
                            } : f
                        )
                    }
                    : b
                )
        })}));
    }

    useHotkeys([
        { hotkey: 'Enter', action: () => createTag(inputValue), ignoreFocus: true }
    ]);

    return (
        <GithubPopover 
        className='popover-add-tag'
        onCancel={() => onCancel?.()}
        title='<mark>Add</mark> a Tag'>
            hi
            <Input
            placeholder='Form name'
            value={inputValue}
            onChange={val => setInputValue(val)}
            onClear={() => setInputValue('')}/>

            { inputValue.trim().length > 0 && (
                <Button
                enabled={isValid}
                className='popover-create-button'
                onClick={() => {
                    if(isValid)
                        createTag(inputValue);
                }}>
                    <img
                    src={tagImg}
                    alt=''
                    className='github-img'/>
                    <mark>Create</mark> form <b>{inputValue}</b>

                    { !isValid ? (
                        <p style={{ marginLeft: 'auto'}}>
                            <u>Already exists!</u>
                        </p>
                    ) : (
                        <HotkeyTooltip
                        className='popover-create-button-hotkey'
                        hotkeys={['Enter']}/>
                    )}
                </Button>
            )}
        </GithubPopover>
    )
}