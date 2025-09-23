import './HomePage.css';

import { Page } from "../../layout/components/Page"
import { HeadingSection } from '../sections/HeadingSection';
import { ParticlesCanvas } from '../components/ParticlesCanvas';
import { LockSection } from '../sections/LockSection';
import { ParticlesContext, type ParticlesDataInterface } from '../context/ParticlesContext';
import { useState } from 'react';

export const HomePage = () => {
    const particlesData = useState<ParticlesDataInterface>(
        { color: [0, 0, 255], vectorType: 'hui'})

    return (
        <Page className='home-page'>
            <ParticlesContext value={particlesData}>
                <div className='heading-wrapper'>
                    <ParticlesCanvas/>
                    <HeadingSection/>
                </div>
            </ParticlesContext>
            
            <LockSection/>
        </Page>
    )
}