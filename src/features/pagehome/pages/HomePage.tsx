import './HomePage.css';

import { Page } from "../../layout/components/Page"
import { HeadingSection } from '../sections/HeadingSection';
import { ParticlesCanvas } from '../components/ParticlesCanvas';
import { SphereCanvas } from '../components/SphereCanvas';

export const HomePage = () => {
    return (
        <Page className='home-page'>
            <ParticlesCanvas/>
            
            <HeadingSection/>
            <SphereCanvas/>
        </Page>
    )
}