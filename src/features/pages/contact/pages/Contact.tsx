import './Contact.css';
import { Page } from "../../../layout/components/Page"
import { ContactCanvas } from '../components/ContactCanvas';
import { FormSection } from '../sections/FormSection';
import { IntroSection } from '../sections/IntroSection';

export const Contact = () => {
    return (
        <Page>
            <div className='contact-wrapper'>
                <ContactCanvas/>
                <IntroSection/>
                <FormSection/>
            </div>
        </Page>
    )
}