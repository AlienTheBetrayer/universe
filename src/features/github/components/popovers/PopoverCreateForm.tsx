import { useState } from "react";
import { Input } from "../../../ui/Input/components/Input";
import { GithubPopover } from "./GithubPopover"

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
        </GithubPopover>
    )
}