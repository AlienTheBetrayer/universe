import { Button } from '../../ui/Button/components/Button';
import { Search } from '../../ui/Search/Search';
import './GithubEmulation.css';

import addImg from '../assets/add.svg';
import gearImg from '../assets/gear.svg';
import commitImg from '../assets/commit.svg';

export const GithubEmulation = () => {
    return (
        <div className='github-emulation'>
            <div className='github-heading'>
                <div className='github-flex'>
                    <div className='github-heading-avatar'>

                    </div>
                    <h3>theuniverse</h3>
                    <div className='github-heading-forms-type'>
                        {/* depends on actual space */}
                        <p>has space</p>
                    </div>
                </div>

                <div className='github-flex'>
                    <Button>Pin</Button>
                    <Button>Watch</Button>
                    <Button>Fork</Button>
                    <Button>Star</Button>
                </div>
            </div>

            <hr/>

            <div className='github-forms'>
                <div className='github-forms-content'>
                    <div className='github-flex-between'>
                        <div className='github-flex'>
                            <Button>Branch</Button>
                            <p>1 Branch</p>
                            <p>0 Tags</p>
                        </div>

                        <div className='github-flex'>
                            <Search placeholder='Go to form'/>
                            <Button><img src={addImg} alt=''/>Add form</Button>
                            <Button>Code</Button>
                        </div>
                    </div>
                    
                    <div className='github-forms-repository'>
                        <div className='github-forms-repository-info github-flex-between'>
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
                        <div className='github-forms-repository-form'>

                        </div>
                    </div>
                </div>

                <div className='github-forms-description'>
                    <div className='github-flex-between'>
                        <h4>About</h4>
                        <Button><img src={gearImg} alt='settings'/></Button>
                    </div>
                    <div className='github-forms-description-section'>
                        <h4>An upcoming project of mine</h4>
                        <p>Readme</p>
                        <p>Activity</p>
                        <p>0 stars</p>
                        <p>0 watching</p>
                        <p>0 forks</p>
                        <hr/>
                    </div>

                    <div className='github-forms-description-section'>
                        <h4>Releases</h4>
                        <p>No releases found</p>
                        <hr/>
                    </div>
                    
                    <div className='github-forms-description-section'>
                        <h4>Packages</h4>
                        <p>No packages found</p>
                        <hr/>
                    </div>

                    <div className='github-forms-description-section'>
                        <h4>Languages</h4>
                        <hr/>
                    </div>
                </div>
            </div>

        </div>
    )
}