import './HomePage.css';

import { useRef, useState } from 'react';
import { Page } from '../../../layout/components/Page';
import { Spotlight } from '../../../ui/Spotlight/components/Spotlight';
import { GridSection } from '../sections/GridSection';
import { HeadingSection } from '../sections/HeadingSection';
import { LockSection } from '../sections/LockSection';
import { QuestionSection } from '../sections/QuestionSection';

import { motion, useInView } from 'motion/react';
import { InteractiveParticlesCanvas } from '../../../interactiveparticles/components/InteractiveParticlesCanvas';
import { InteractiveParticlesProvider } from '../../../interactiveparticles/context/InteractiveParticlesContext';
import {
    QuestionContext,
    type QuestionContextData,
} from '../../../questionparticles/context/QuestionContext';
import { FAQSection } from '../sections/FAQSection';
import { HorizontalSection } from '../sections/HorizontalSection';
import { PaintSection } from '../sections/PaintSection';
import { ShiftingSection } from '../sections/ShiftingSection';

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
