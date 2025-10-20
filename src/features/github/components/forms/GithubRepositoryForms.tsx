import './GithubRepositoryForms.css';

import { useEffect, useState } from 'react';
import { useTooltips } from '../../../tooltip/hooks/useTooltips';
import { useGithubContext } from '../../context/GithubContext';
import { GithubRepositoryFormsElement } from './GithubRepositoryFormsElement';
import { GithubRepositoryFormsInfo } from './GithubRepositoryFormsInfo';

interface Props {
    search: string;
}

export const GithubRepositoryForms = ({ search }: Props) => {
    // context + state variables
    const [context] = useGithubContext();
    const thisBranch = context.data.branches.find(
        (b) => b.idx === context.data.currentBranch
    );

    // filter functionality
    const [found, setFound] = useState<number[]>([]);

    useEffect(() => {
        setFound(
            (thisBranch?.forms ?? [])
                .filter(
                    (form) =>
                        form.name
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        form.tags.find((tag) =>
                            tag.toLowerCase().includes(search.toLowerCase())
                        ) ||
                        search.trim().length === 0
                )
                .map((form) => form.idx)
        );
    }, [search, context.data]);

    // tooltips
    const tooltips = useTooltips();

    return (
        <div className='github-forms'>
            {tooltips.render()}

            <GithubRepositoryFormsInfo />

            {thisBranch?.forms.map(
                (form) =>
                    found.indexOf(form.idx) !== -1 && (
                        <GithubRepositoryFormsElement
                            key={form.idx}
                            form={form}
                        />
                    )
            )}
        </div>
    );
};
