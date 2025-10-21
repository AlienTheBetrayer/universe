import { motion } from 'motion/react';
import { useTooltips } from '../../../tooltip/hooks/useTooltips';
import { Button } from '../../../ui/Button/components/Button';
import { useGithubContext } from '../../context/GithubContext';
import './GithubRepositoryFormsInfo.css';

import commitImg from '../../assets/commit.svg';
import type { GithubReducerAction } from '../../context/reducer/GithubReducer';
import type { Branch } from '../../context/types/dataTypes';
import { useUpdatingDate } from '../../hooks/useUpdatingDate';

export const GithubRepositoryFormsInfo = () => {
    const [state, dispatch] = useGithubContext();
    const thisBranch = state.data.branches.find(
        (b) => b.idx === state.data.currentBranch,
    );

    return (
        <div className='github-forms-info'>
            <GithubRepositoryFormsInfoLeft thisBranch={thisBranch} />
            <GithubRepositoryFormsInfoMain
                thisBranch={thisBranch}
                dispatch={dispatch}
            />
        </div>
    );
};

interface InfoProps {
    thisBranch: Branch | undefined;
}

const GithubRepositoryFormsInfoLeft = ({ thisBranch }: InfoProps) => {
    return (
        <div className='github-flex'>
            <div className='github-flex'>
                <div className='github-heading-avatar' />
                <p>Gleb</p>
            </div>

            {(thisBranch?.commits.length ?? 0) > 0 && (
                <p>
                    <mark>
                        <b>{thisBranch?.commits.at(-1)?.name}</b>
                    </mark>
                </p>
            )}
        </div>
    );
};

interface MainProps {
    thisBranch: Branch | undefined;
    dispatch: React.Dispatch<GithubReducerAction>;
}

const GithubRepositoryFormsInfoMain = ({ thisBranch, dispatch }: MainProps) => {
    const commitDate = useUpdatingDate(
        new Date(thisBranch?.commits.at(-1)?.pushedAt ?? 0),
        false,
        60000,
        [thisBranch?.commits],
    );

    const tooltips = useTooltips();

    return (
        <div className='github-flex'>
            {tooltips.render()}

            {(thisBranch?.commits.length ?? 0) > 0 && <p>{commitDate}</p>}

            <Button
                enabled={(thisBranch?.commits.length ?? 0) > 0}
                onClick={() =>
                    dispatch({ type: 'DATA_SET_PAGE', page: 'commits' })
                }
                style={{ marginLeft: 'auto' }}
                ref={(el) => tooltips.set(0, 'View all commits', el, 'down')}
            >
                <img className='github-img' src={commitImg} alt='' />
                <motion.div
                    key={thisBranch?.commits.length ?? 0}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {thisBranch?.commits.length ?? 0} commit
                    {(thisBranch?.commits.length ?? 0) !== 1 ? 's' : ''}
                </motion.div>
            </Button>
        </div>
    );
};
