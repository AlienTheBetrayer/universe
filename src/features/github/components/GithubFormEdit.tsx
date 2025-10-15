import { forwardRef } from 'react';
import './GithubFormEdit.css';
import { useGithubContext } from '../context/GithubContext';

interface Props {

}

export const GithubFormEdit = forwardRef<HTMLDivElement, Props>(({}, ref) => {
    const [context, setContext] = useGithubContext();
    
    return (
        <div 
        className='github-form-edit'
        ref={ref}>
            
        </div>
    )
});