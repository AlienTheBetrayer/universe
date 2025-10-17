import './Contact.css';
import { Page } from "../../../layout/components/Page"

import { GitSection } from '../sections/GitSection';
import { Text3DCanvas } from '../../../text3d/components/Text3DCanvas';
import { GithubProvider } from '../../../github/context/GithubContext';

export const Contact = () => {
    return (
        <GithubProvider>
            <Page>
                <div className='contact-wrapper'>
                    <Text3DCanvas>
                        CONTACT
                    </Text3DCanvas>
                </div>

                <GitSection/>
            </Page>
        </GithubProvider>
    )
}