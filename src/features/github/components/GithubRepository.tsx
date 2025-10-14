import './GithubRepository.css';
import { Button } from "../../ui/Button/components/Button"
import { Search } from "../../ui/Search/Search";

import addImg from '../assets/add.svg';
import commitImg from '../assets/commit.svg';
import fileImg from '../assets/file.svg';

import { GithubDefaultBranch, useGithubContext } from '../context/GithubContext';
import { useEffect, useState } from 'react';
import { useDebounced } from '../../../hooks/useDebounced';

export const GithubRepository = () => {
    // context
    const [context, setContext] = useGithubContext();

    // states
    const [currentBranch, setCurrentBranch] = useState<string>(GithubDefaultBranch);

    // state variables
    const thisBranch = context.data.branches.find(b => b.name === currentBranch);
    // fix this \/
    const [forms, setForms] = useState(thisBranch?.forms?.map(form => ({ obj: form, visible: true })));

    const tags = thisBranch?.forms?.reduce((acc, form) => acc + form.tags.length, 0) ?? 0;
    
    // search functionality 
    const [searchValue, setSearchValue] = useState<string>('');
    const debounced = useDebounced(searchValue, '');

    useEffect(() => {
        setForms(prev => prev?.map(form => 
            ({ ...form, 
            visible: (form.obj.name.toLowerCase().includes(debounced.toLowerCase()) || debounced.trim().length === 0)})
        ))
    }, [debounced]);

    return (
        <div className='github-repository'>
            <div className='github-flex-between'>
                <div className='github-flex'>
                    <Button>Branch</Button>
                    <p>{context.data.branches.length} Branch{context.data.branches.length !== 1 ? 'es' : ''}</p>
                    <p>{tags} Tag{tags !== 1 ? 's' : ''}</p>
                </div>

                <div className='github-flex'>
                    <Search placeholder='Open a form'
                    value={searchValue}
                    onChange={val => setSearchValue(val)}
                    onClear={() => setSearchValue('')}
                    />
                    <Button><img src={addImg} alt=''/>Add form</Button>
                    <Button>Code</Button>
                </div>
            </div>
            
            <div className='github-forms'>
                <div className='github-forms-info github-flex-between'>
                    <div className='github-flex'>
                        <div className='github-heading-avatar'/>
                        <p>Your name</p>
                        <p>Last commit description</p>
                    </div>

                    <div className='github-flex'>
                        <p>Last commit date</p>
                        <Button>
                            <img src={commitImg} alt=''/>
                            { context.data.commits?.length ?? 0 } commit{ (context.data.commits?.length ?? 0) !== 1 ? 's' : ''}
                        </Button>
                    </div>

                </div>

                { forms?.map(form => (
                    form.visible && (
                        <div className='github-form'>
                            <div className='github-flex'>
                                <Button className='github-flex'>
                                    <img src={fileImg} alt=''/>
                                    <p className='github-form-p-name'>{ form.obj.name }</p>
                                </Button>

                                { form.obj.tags.map(tag => (
                                    <div className='github-form-tag'>   
                                        <p>
                                            { tag }
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <p>{ context.data.commits?.at(-1)?.date ?? 'unknown' }</p>
                        </div>
                    )
                ))}
            </div>

            <div className='github-form-edit'>

            </div>
        </div>
    )   
}