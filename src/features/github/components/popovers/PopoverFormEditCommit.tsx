import './PopoverFormEditCommit.css';

import { useEffect, useState } from 'react';
import { Input } from '../../../ui/Input/components/Input';
import { useGithubContext } from '../../context/GithubContext';
import type { FormContent } from '../../context/types/dataTypes';
import { GithubPopover } from './GithubPopover';

interface Props {
    newContent: FormContent;
    onCancel?: () => void;
}

export const PopoverFormEditCommit = ({ newContent, onCancel }: Props) => {
    const [, dispatch] = useGithubContext();

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
            success={{
                text: 'Commit',
                action: () => {
                    dispatch({
                        type: 'FORM_EDIT_COMMIT',
                        commitDescription: description,
                        commitName: name,
                        formContent: newContent,
                    });
                },
            }}
        >
            <h4>Name</h4>
            <Input
                valid={isValid}
                value={name}
                onChange={(val) => setName(val)}
                onClear={() => setName('')}
            />

            <h4>Description</h4>
            <Input
                value={description}
                onChange={(val) => setDescription(val)}
                onClear={() => setDescription('')}
            />
        </GithubPopover>
    );
};
