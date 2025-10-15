import { forwardRef } from 'react';
import './GithubFormEdit.css';
import { useGithubContext } from '../context/GithubContext';

import formImg from '../assets/file.svg';
import branchImg from '../assets/branch.svg';

interface Props {

}

export const GithubFormEdit = forwardRef<HTMLDivElement, Props>(({}, ref) => {
    const [context, setContext] = useGithubContext();
    
    const branch = context.data.branches
    .find(b => b.idx === context.data.currentBranch);

    const form = branch
    ?.forms?.find(f => f.idx === context.data.currentForm);
    
    return (
        <div 
        className='github-form-edit'
        ref={ref}>
            <div className='github-form-edit-topline'>
                <div className='github-flex'>
                    <img
                    src={branchImg}
                    alt='branch'
                    className='github-img'/>
                    <h4><mark>{branch?.name}</mark></h4>

                    <img
                    src={formImg}
                    alt='form'
                    className='github-img'/>
                    <h4><mark>{form?.name}</mark></h4>
                </div>
                
                <div className='github-form-edit-topline-tags'>
                    { form?.tags.map((tag, idx) => (
                        <div 
                        className='github-tiny-info-container'
                        key={idx}>
                            <p>
                                { tag }
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
});