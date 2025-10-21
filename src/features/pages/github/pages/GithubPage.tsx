import './GithubPage.css';
import { Page } from '../../../layout/components/Page';

import { GitSection } from '../sections/GitSection';
import { Text3DCanvas } from '../../../text3d/components/Text3DCanvas';
import { GithubProvider } from '../../../github/context/GithubContext';

export const GithubPage = () => {
    return (
        <GithubProvider>
            <Page>
                <div className='contact-wrapper'>
                    <Text3DCanvas>GITHUB</Text3DCanvas>

                    <GitSection />
                </div>
            </Page>
        </GithubProvider>
    );
};
