import './StellarNetwork.css';
import { Page } from "../../../layout/components/Page"
import { StellarCanvas } from '../components/StellarCanvas';

export const StellarNetwork = () => {
    return (
        <Page>
            <div className='stellar-wrapper'>
                <StellarCanvas/>
            </div>
        </Page>
    )
}