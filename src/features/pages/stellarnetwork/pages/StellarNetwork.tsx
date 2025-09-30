import './StellarNetwork.css';
import { Page } from "../../../layout/components/Page"
import { StellarCanvas } from '../components/StellarCanvas';
import { StellarContext, type StellarContextData } from '../context/StellarContext';
import { useState } from 'react';
import { StellarUI } from '../components/StellarUI';
import { AnimatePresence } from 'motion/react';

// 4. if context's selected id !== -1 (selected from ^) => show UI on this page
// 5. UI on the page will be able to modify the context specific stellar's title / description  
// 6.
// 
// ADDITIONAL: hook to zustand local storage

export const StellarNetwork = () => {
    // initial context data
    const [data, setData] = useState<StellarContextData>({ 
        stellars: [
        {
            idx: 0,
            title: 'imporatant title',
            description: 'crazy exo-planet'
        },
        {
            idx: 1,
            title: 'second title',
            description: 'an even crazier exo-planet'
        },
        {
            idx: 2,
            title: 'regular one',
            description: 'just an ordinary planet'
        }],
        selected: -1
    });

    return (
        <Page>
            <StellarContext value={[data, setData]}>
                <div className='stellar-wrapper'>
                    <StellarCanvas/>

                    <AnimatePresence>
                        { data.selected !== -1 && (
                            <StellarUI object={data.stellars[data.selected]}/>
                        )}
                    </AnimatePresence>
                </div>
            </StellarContext>
        </Page>
    )
}