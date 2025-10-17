import './PopoverFormEditCommit.css';

import { useEffect, useState } from "react";
import { Input } from "../../../ui/Input/components/Input";
import { useGithubContext, type FormContent } from "../../context/GithubContext";
import { GithubPopover } from "./GithubPopover";

interface Props {
    newContent: FormContent;
    onCancel?: () => void;
}

export const PopoverFormEditCommit = ({ newContent, onCancel }: Props) => {
    const [context, setContext] = useGithubContext();
    const thisBranch = context.data.branches.find(b => b.idx === context.data.currentBranch);
    const thisForm = thisBranch?.forms.find(f => f.idx === context.data.currentForm);

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const [isValid, setIsValid] = useState<boolean>(false);

    useEffect(() => {
        setIsValid(name.trim().length > 0);
    }, [name]);
    
    return (
        <GithubPopover
        title='<mark>Commit</mark> this <b>change</b>'
        className='popover-form-edit-commit'
        enabled={isValid}
        onCancel={() => onCancel?.()}
        success={{ text: 'Commit', action: () => {
            setContext(prev => {
                return {
                    ...prev,
                    data: {
                        ...prev.data,
                        currentForm: false,
                        globalIdx: prev.data.globalIdx + 1,
                        branches: prev.data.branches.map(b =>
                            b.idx === prev.data.currentBranch
                            ? {
                                ...b,
                                commits: [...b.commits, {
                                    idx: prev.data.globalIdx + 1,
                                    form: thisForm,
                                    name,
                                    description,
                                    pushedAt: Date.now(),
                                    data: newContent,
                                    type: 'form-content-change'
                                }],
                                forms: b.forms.map(f =>
                                    f.idx === prev.data.currentForm
                                    ? { ...f, content: newContent }
                                    : f
                                ),
                                }
                            : b
                    )}}})}
                }}>

            <h4>Name</h4>
            <Input
            valid={isValid}
            value={name}
            onChange={val => setName(val)}
            onClear={() => setName('')}/>

            <h4>Description</h4>
            <Input
            value={description}
            onChange={val => setDescription(val)}
            onClear={() => setName('')}/>
        </GithubPopover>
    )
}