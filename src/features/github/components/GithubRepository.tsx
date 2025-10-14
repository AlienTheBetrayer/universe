import './GithubRepository.css';
import { Button } from "../../ui/Button/components/Button"
import { Search } from "../../ui/Search/Search";

import addImg from '../assets/add.svg';
import commitImg from '../assets/commit.svg';

export const GithubRepository = () => {
    return (
        <div className='github-repository'>
            <div className='github-flex-between'>
                <div className='github-flex'>
                    <Button>Branch</Button>
                    <p>1 Branch</p>
                    <p>0 Tags</p>
                </div>

                <div className='github-flex'>
                    <Search placeholder='Go to form'>
                    </Search>
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
                        <Button><img src={commitImg} alt=''/>X commits</Button>
                    </div>

                </div>

                {/* list */}
                <div className='github-form'>

                </div>
            </div>

            <div className='github-form-edit'>

            </div>
        </div>
    )   
}