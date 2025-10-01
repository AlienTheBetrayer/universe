import './Contact.css';
import { Page } from "../../../layout/components/Page"

import { FormSection } from '../sections/FormSection';
import { Text3DCanvas } from '../../../text3d/components/Text3DCanvas';

export const Contact = () => {
    return (
        <Page>
            <div className='contact-wrapper'>
                <Text3DCanvas>
                    CONTACT
                </Text3DCanvas>
                <FormSection/>
            </div>
        </Page>
    )
}