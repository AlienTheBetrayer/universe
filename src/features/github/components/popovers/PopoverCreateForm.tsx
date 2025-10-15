import './PopoverCreateForm.css';
import { useState } from "react";
import { Input } from "../../../ui/Input/components/Input";
import { GithubPopover } from "./GithubPopover"
import { Button } from "../../../ui/Button/components/Button";

import formImg from '../../assets/file.svg';

interface Props {
    onCancel?: () => void;
}

export const PopoverCreateForm = ({ onCancel }: Props) => {
    const [inputValue, setInputValue] = useState<string>('');
    
    return (
        <GithubPopover 
        title='Create a form'
        onCancel={() => onCancel?.()}>
            <Input 
            placeholder='Form name'
            value={inputValue}
            onChange={val => setInputValue(val)}
            onClear={() => setInputValue('')}/>

            { inputValue.length > 0 && (
                <Button className='popover-create-button'>
                    <img
                    src={formImg}
                    alt=''
                    className='github-img'/>
                    <mark>Create</mark> form <b>{inputValue}</b>
                </Button>
            )}
        </GithubPopover>
    )
}