import './GithubCommitsElement.css';

import addImg from '../../assets/add.svg';
import commitImg from '../../assets/commit.svg';
import deleteImg from '../../assets/delete.svg';
import formImg from '../../assets/file.svg';

import { Button } from '../../../ui/Button/components/Button';
import { useGithubContext } from '../../context/GithubContext';
import type { Commit } from '../../context/types/dataTypes';
import { useUpdatingDate } from '../../hooks/useUpdatingDate';

interface Props {
    commit: Commit;
}

export const GithubCommitsElement = ({ commit }: Props) => {
    // state
    const [state, dispatch] = useGithubContext();
    const thisBranch = state.data.branches.find(
        (b) => b.idx === state.data.currentBranch,
    );

    // updating date
    const commitDate = useUpdatingDate(
        new Date(commit.pushedAt),
        true,
        1000,
        thisBranch?.commits,
    );

    // function to choose between commit types
    const commitTypeComponent = () => {
        switch (commit.type) {
            case 'form-content-change':
                return (
                    <>
                        <img className='github-img' src={formImg} alt='' />

                        <p>{commit.form?.name ?? ''}</p>

                        <Button
                            className='github-form-element-button'
                            onClick={() =>
                                dispatch({
                                    type: 'COMMIT_FOCUS',
                                    idx: commit.idx,
                                })
                            }
                        >
                            <img
                                className='github-img'
                                src={commitImg}
                                alt=''
                            />

                            <p>{commit.name}</p>
                        </Button>
                    </>
                );
            case 'form-creation':
                return (
                    <>
                        <img className='github-img' src={addImg} alt='' />

                        <p>{commit.name}</p>
                    </>
                );
            case 'form-deletion':
                return (
                    <>
                        <img className='github-img' src={deleteImg} alt='' />

                        <p>{commit.name}</p>
                    </>
                );
        }
    };

    return (
        <div className='github-commits-element'>
            {commitTypeComponent()}

            <p style={{ marginLeft: 'auto' }}>{commitDate}</p>
        </div>
    );
};
