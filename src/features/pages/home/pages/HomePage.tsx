import './HomePage.css';

import { Page } from '../../../layout/components/Page';
import { HeadingSection } from '../sections/HeadingSection';
import { LockSection } from '../sections/LockSection';
import { useRef, useState } from 'react';
import { GridSection } from '../sections/GridSection';
import { Spotlight } from '../../../ui/Spotlight/components/Spotlight';
import { QuestionSection } from '../sections/QuestionSection';

import { motion, useInView } from 'motion/react';
import { InteractiveParticlesProvider } from '../../../interactiveparticles/context/InteractiveParticlesContext';
import { InteractiveParticlesCanvas } from '../../../interactiveparticles/components/InteractiveParticlesCanvas';
import {
    QuestionContext,
    type QuestionContextData,
} from '../../../questionparticles/context/QuestionContext';
import { FAQSection } from '../sections/FAQSection';
import { ShiftingSection } from '../sections/ShiftingSection';
import { HorizontalSection } from '../sections/HorizontalSection';
import { PaintSection } from '../sections/PaintSection';
import { StaggeredBackground } from '../../../staggeredbackground/components/StaggeredBackground';

export const HomePage = () => {
    const questionContextData = useState<QuestionContextData>({
        revealed: false,
    });
    const headingRef = useRef<HTMLDivElement>(null);
    const isHeadingVisible = useInView(headingRef);

    return (
        <Page>
            <div className='spotlight-container'>
                <Spotlight
                    className='-left-30 top-0 h-600 w-300 lg:h-300'
                    fill='#9393ffff'
                />
                <Spotlight
                    className='right-0 top-0 lg:-right-60 lg:top-0 h-300 w-300 rotate-90'
                    fill='#8888f5ff'
                />
            </div>

            <motion.div
                className='heading-section-bgtext'
                initial={{ opacity: 0, filter: 'blur(40px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ delay: 5, duration: 5 }}
            >
                <h1>FUTURE</h1>
            </motion.div>

            <InteractiveParticlesProvider>
                <div className='heading-wrapper' ref={headingRef}>
                    {isHeadingVisible && <InteractiveParticlesCanvas />}

                    <StaggeredBackground />

                    <HeadingSection />
                    <GridSection />
                </div>
            </InteractiveParticlesProvider>

            <FAQSection />
            <ShiftingSection />
            <HorizontalSection />
            <PaintSection />
            <LockSection />

            <QuestionContext value={questionContextData}>
                <QuestionSection />
            </QuestionContext>
        </Page>
    );
};
