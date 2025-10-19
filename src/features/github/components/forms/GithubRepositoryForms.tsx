import './GithubRepositoryForms.css';

import { useEffect, useState } from 'react';
import { useGithubContext } from '../../context/GithubContext';
import { useTooltips } from '../../../tooltip/hooks/useTooltips';
import { GithubRepositoryFormsElement } from './GithubRepositoryFormsElement';
import { GithubRepositoryFormsInfo } from './GithubRepositoryFormsInfo';

interface Props {
    searchValue: string;
}

export const GithubRepositoryForms = ({ searchValue }: Props) => {
    // context + state variables
    const [context, ] = useGithubContext();
    const thisBranch = context.data.branches.find(b => b.idx === context.data.currentBranch);

    // filter functionality
    const [found, setFound] = useState<number[]>([]);

    useEffect(() => {
        setFound((thisBranch?.forms ?? [])
            .filter(form => (
                form.name.toLowerCase().includes(searchValue.toLowerCase())
                || form.tags.find(tag => tag.toLowerCase().includes(searchValue.toLowerCase()))
                || searchValue.trim().length === 0))
            .map(form => form.idx)
        );
    }, [searchValue, context.data]);

    // tooltips
    const tooltips = useTooltips();

    return (
        <div className='github-forms'>
            { tooltips.render() }
            
            <GithubRepositoryFormsInfo/>

            { thisBranch?.forms.map(form => (
                found.indexOf(form.idx) !== -1 && (
                    <GithubRepositoryFormsElement 
                    key={form.idx}
                    form={form}/>
                )
            ))}
        </div>
    )
}