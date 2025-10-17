import './PopoverCreateForm.css';
import { useEffect, useState } from "react";
import { Input } from "../../../ui/Input/components/Input";
import { GithubPopover } from "./GithubPopover"
import { Button } from "../../../ui/Button/components/Button";

import formImg from '../../assets/file.svg';
import { useGithubContext } from '../../context/GithubContext';
import { useHotkeys } from '../../../../hooks/useHotkeys';
import { HotkeyTooltip } from '../../../hotkeytooltip/components/HotkeyTooltip';

interface Props {
    onCancel?: () => void;
}

export const PopoverCreateForm = ({ onCancel }: Props) => {
    // state + variables
    const [context, setContext] = useGithubContext();
    const branch = context.data.branches.find(b => b.idx === context.data.currentBranch);
    
    // input functionality + validity
    const [inputValue, setInputValue] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(false);

    useEffect(() => {
        const found = branch?.forms?.some(f => f.name.toLowerCase() === inputValue.toLowerCase());
        setIsValid(!(found ?? true) && inputValue.trim().length > 0);
    }, [inputValue, branch]);

    // hotkeys
    const createForm = (name: string) => {
        if(!isValid)
            return;

        setContext(prev => {
            const currentBranch = prev.data.branches.find(b => b.idx === prev.data.currentBranch);

            if(!branch || !currentBranch)
                return prev;

            return {
                ...prev,
                data: {
                    ...prev.data,
                    globalIdx: prev.data.globalIdx + 2,
                    branches: prev.data.branches.map(b =>
                        b.idx === prev.data.currentBranch
                        ? {
                            ...b,
                            forms: [...b.forms, {
                                idx: prev.data.globalIdx + 1,
                                name: name,
                                tags: [],
                            }],

                            commits: [...b.commits, {
                                idx: prev.data.globalIdx + 2,
                                name: `${name} form created`,
                                description: '',
                                pushedAt: Date.now(),
                                type: 'form-creation',
                                form: {
                                    idx: prev.data.globalIdx + 1,
                                    name: name,
                                    tags: [],
                                }
                            }]
                            }
                        : b
                )}}
            }
        );
    }

    useHotkeys([
        { hotkey: 'Enter', action: () => createForm(inputValue), ignoreFocus: true }
    ]);
    
    return (
        <GithubPopover
        className='popover-create-form'
        title='<mark>Create</mark> a form'
        onCancel={() => onCancel?.()}>
            <Input 
            autoFocus
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
                        createForm(inputValue);
                }}>
                    <img
                    src={formImg}
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