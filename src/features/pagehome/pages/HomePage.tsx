import './HomePage.css';

import { Page } from "../../layout/components/Page"
import { HeadingSection } from '../sections/HeadingSection';
import { HomeCanvas } from '../components/HomeCanvas';

export const HomePage = () => {
    return (
        <Page className='home-page'>
            <HomeCanvas/>

            <HeadingSection/>
        </Page>
    )
}