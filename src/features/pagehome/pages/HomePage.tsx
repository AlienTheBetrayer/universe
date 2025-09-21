import './HomePage.css';

import { Page } from "../../layout/components/Page"
import { HeadingSection } from '../sections/HeadingSection';

export const HomePage = () => {
    return (
        <Page className='home-page'>
            <HeadingSection/>
        </Page>
    )
}