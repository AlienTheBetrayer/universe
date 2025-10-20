import './GithubRepositoryFormsElement.css';

import { Button } from '../../../ui/Button/components/Button';
import fileImg from '../../assets/file.svg';
import { useGithubContext } from '../../context/GithubContext';

import { motion } from 'motion/react';
import type { GithubReducerAction } from '../../context/reducer/GithubReducer';
import type { Form } from '../../context/types/dataTypes';
import { useUpdatingDate } from '../../hooks/useUpdatingDate';

interface Props {
    form: Form;
}

export const GithubRepositoryFormsElement = ({ form }: Props) => {
    // context
    const [state, dispatch] = useGithubContext();
    const thisBranch = state.data.branches.find(
        (b) => b.idx === state.data.currentBranch
    );
    const thisCommits = thisBranch?.commits.filter(
        (c) => c.form?.idx === form.idx
    );

    // date updating for that specific element every second
    const commitDate = useUpdatingDate(
        new Date(thisCommits?.at(-1)?.pushedAt ?? 0),
        true,
        1000,
        [thisCommits]
    );

    return (
        <div className='github-form-element'>
            <GithubRepositoryFormsElementData form={form} dispatch={dispatch} />
            {(thisCommits?.length ?? 0) > 0 && <p>{commitDate}</p>}
        </div>
    );
};

interface DataProps {
    form: Form;
    dispatch: React.Dispatch<GithubReducerAction>;
}

const GithubRepositoryFormsElementData = ({ form, dispatch }: DataProps) => {
    return (
        <div className='github-flex flex-wrap'>
            <Button
                className='github-form-element-button'
                onClick={() =>
                    dispatch({ type: 'FORM_FOCUS', idx: form.idx })
                }
            >
                <img className='github-img' src={fileImg} alt='' />
                <p className='github-form-p-name'>{form.name}</p>
            </Button>

            {form.tags.map((tag, idx) => (
                <div
                    className='github-tiny-info-container'
                    key={`${form.idx}${idx}`}
                >
                    <motion.p
                        key={tag}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {tag}
                    </motion.p>
                </div>
            ))}
        </div>
    );
};
