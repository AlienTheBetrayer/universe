import './HomePage.css';

import { Page } from "../../../layout/components/Page"
import { HeadingSection } from '../sections/HeadingSection';
import { ParticlesCanvas } from '../components/ParticlesCanvas';
import { LockSection } from '../sections/LockSection';
import { ParticlesContext, VectorTypes, type ParticlesDataInterface } from '../context/ParticlesContext';
import { useState } from 'react';
import { GridSection } from '../sections/GridSection';
import { Spotlight } from '../../../ui/Spotlight/components/Spotlight';

export const HomePage = () => {
    const particlesData = useState<ParticlesDataInterface>(
        { vectorType: VectorTypes.propulsion})

    return (
        <Page className='home-page'>
            <div className='spotlight-container'>
                <Spotlight className='-left-30 top-0 h-600 w-300 lg:h-300' fill='#9393ffff'/>
                <Spotlight className='right-0 top-0 lg:-right-60 lg:top-0 h-300 w-300 rotate-90' fill='#8888f5ff'/>
            </div>


            <ParticlesContext value={particlesData}>
                <div className='heading-wrapper'>
                    <ParticlesCanvas/>
                    <HeadingSection/>
                    <GridSection/>
                </div>
            </ParticlesContext>
            
            <LockSection/>
        </Page>
    )
}