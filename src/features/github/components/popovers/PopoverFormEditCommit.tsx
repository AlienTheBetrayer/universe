import './PopoverFormEditCommit.css';

import { useEffect, useState } from "react";
import { Input } from "../../../ui/Input/components/Input";
import { useGithubContext, type Commit, type FormContent } from "../../context/GithubContext";
import { GithubPopover } from "./GithubPopover";

const findMax = (commits: Commit[]) => {
    if(commits.length === 0)
        return -1;
    
    return commits.reduce((acc, val) => {
        return val.idx > acc.idx ? val : acc;
    }).idx;
}

interface Props {
    newContent: FormContent;
    onCancel?: () => void;
}

export const PopoverFormEditCommit = ({ newContent, onCancel }: Props) => {
    const [, setContext] = useGithubContext();

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
                        branches: prev.data.branches.map(b =>
                            b.idx === prev.data.currentBranch
                            ? {
                                ...b,
                                commits: [...b.commits, {
                                    idx: findMax(b.commits) + 1,
                                    formIdx: prev.data.currentForm as number,
                                    name,
                                    description,
                                    pushedAt: Date.now(),
                                    data: newContent
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