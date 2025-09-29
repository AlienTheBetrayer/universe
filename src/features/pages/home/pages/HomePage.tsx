import './HomePage.css';

import { Page } from "../../../layout/components/Page"
import { HeadingSection } from '../sections/HeadingSection';
import { HeadingCanvas } from '../components/HeadingCanvas';
import { LockSection } from '../sections/LockSection';
import { HeadingContext, VectorTypes, type HeadingContextData } from '../context/HeadingContext';
import { useState } from 'react';
import { GridSection } from '../sections/GridSection';
import { Spotlight } from '../../../ui/Spotlight/components/Spotlight';
import { QuestionSection } from '../sections/QuestionSection';
import { QuestionContext, type QuestionContextData } from '../context/QuestionContext';

import { motion } from 'motion/react';

export const HomePage = () => {
    const headingContextData = useState<HeadingContextData>({ vectorType: VectorTypes.astral});
    const questionContextData = useState<QuestionContextData>({ revealed: false });
    
    return (
        <Page>
            <div className='spotlight-container'>
                <Spotlight className='-left-30 top-0 h-600 w-300 lg:h-300' fill='#9393ffff'/>
                <Spotlight className='right-0 top-0 lg:-right-60 lg:top-0 h-300 w-300 rotate-90' fill='#8888f5ff'/>
            </div>

            <motion.div className='heading-section-bgtext'
            initial={{ opacity: 0, filter: 'blur(40px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ delay: 5, duration: 5 }}>
                <h1>
                    FUTURE
                </h1>
            </motion.div>
            
            <HeadingContext value={headingContextData}>
                <div className='heading-wrapper'>
                    <HeadingCanvas/>
                    <HeadingSection/>
                    <GridSection/>
                </div>
            </HeadingContext>
            
            <LockSection/>

            <QuestionContext value={questionContextData}>
                <QuestionSection/>
            </QuestionContext>
        </Page>
    )
}