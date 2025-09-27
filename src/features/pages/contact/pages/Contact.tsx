import './Contact.css';
import { Page } from "../../../layout/components/Page"
import { ContactCanvas } from '../components/ContactCanvas';
import { FormSection } from '../sections/FormSection';
import { IntroSection } from '../sections/IntroSection';
import { ContactStars } from '../components/ContactStars';
import { ContactContext, type ContactContextData } from '../context/ContactContext';
import { useState } from 'react';

export const Contact = () => {
    const contactContextValue = useState<ContactContextData>({ color: [0, 0, 0]});

    return (
        <Page settings={{ progressBar: false }}>
            <ContactContext value={contactContextValue}>
                <ContactStars/>

                <div className='contact-wrapper'>
                    <ContactCanvas/>
                    <FormSection/>
                    <IntroSection/>
                </div>
            </ContactContext>
        </Page>
    )
}