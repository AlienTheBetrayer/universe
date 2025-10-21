import { useTooltips } from '../../../tooltip/hooks/useTooltips';
import { Button } from '../../../ui/Button/components/Button';
import { useGithubContext } from '../../context/GithubContext';
import './GithubCommits.css';
import { GithubCommitsElement } from './GithubCommitsElement';

interface Props {
    search: string;
}

export const GithubCommits = ({ search }: Props) => {
    // context
    const [state, dispatch] = useGithubContext();
    const thisBranch = state.data.branches.find(
        (b) => b.idx === state.data.currentBranch,
    );

    // tooltips
    const tooltips = useTooltips();

    return (
        <>
            {tooltips.render()}

            <div className='github-commits'>
                <div className='github-commits-topline'>
                    <h4>
                        This branch's {thisBranch?.commits.length}{' '}
                        <mark>
                            commit{thisBranch?.commits.length === 1 ? '' : 's'}
                        </mark>
                    </h4>

                    <Button
                        onClick={() =>
                            dispatch({ type: 'DATA_SET_PAGE', page: 'forms' })
                        }
                        ref={(el) =>
                            tooltips.set(0, 'Go back to forms', el, 'left')
                        }
                        style={{ marginLeft: 'auto' }}
                        className='github-cancel-button'
                    >
                        ✕
                    </Button>
                </div>

                <div className='github-commits-main'>
                    {thisBranch?.commits.map(
                        (commit, idx) =>
                            commit.name
                                .toLowerCase()
                                .includes(search.toLowerCase()) && (
                                <GithubCommitsElement
                                    key={idx}
                                    commit={commit}
                                />
                            ),
                    )}
                </div>
            </div>
        </>
    );
};
