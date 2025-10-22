import { Forge } from '../../../forge/components/Forge';
import { Page } from '../../../layout/components/Page';
import './ForgePage.css';

export const ForgePage = () => {
    return (
        <Page>
            <section className='forge-section container'>
                <Forge />
            </section>
        </Page>
    );
};
