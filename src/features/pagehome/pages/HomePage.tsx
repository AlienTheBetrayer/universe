import './HomePage.css';

import { Page } from "../../layout/components/Page"
import { HeadingSection } from '../sections/HeadingSection';
import { ParticlesCanvas } from '../components/ParticlesCanvas';
import { LockSection } from '../sections/LockSection';

export const HomePage = () => {
    return (
        <Page className='home-page'>
            <ParticlesCanvas/>
            
            <HeadingSection/>
            <LockSection/>
        </Page>
    )
}