import './PopoverCreateForm.css';
import { useEffect, useState } from "react";
import { Input } from "../../../ui/Input/components/Input";
import { GithubPopover } from "./GithubPopover"
import { Button } from "../../../ui/Button/components/Button";

import formImg from '../../assets/file.svg';
import { useGithubContext, type Form } from '../../context/GithubContext';
import { useHotkeys } from '../../../../hooks/useHotkeys';
import { HotkeyTooltip } from '../../../hotkeytooltip/components/HotkeyTooltip';

const findMax = (forms: Form[]) => {
    if(forms.length === 0)
        return 0;
    
    return forms.reduce((acc, val) => {
        return val.idx > acc.idx ? val : acc;
    }).idx;
}

interface Props {
    onCancel?: () => void;
}

export const PopoverCreateForm = ({ onCancel }: Props) => {
    // state + variables
    const [context, setContext] = useGithubContext();
    const branch = context.data.branches.find(b => b.idx === context.data.currentBranch)!;
    
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
            const newForm: Form = {
                idx: findMax(prev.data.branches.find(b => b.idx === prev.data.currentBranch)!.forms) + 1,
                name,
                tags: [],
            };

            return {
                ...prev,
                data: {
                ...prev.data,
                branches: prev.data.branches.map(b =>
                    b.idx === branch.idx
                    ? {
                        ...b,
                        forms: [...b.forms, newForm],
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