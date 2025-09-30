import './StellarNetwork.css';
import { Page } from "../../../layout/components/Page"
import { StellarCanvas } from '../components/StellarCanvas';
import { useReducer } from 'react';
import { StellarUI } from '../components/StellarUI';
import { AnimatePresence } from 'motion/react';
import { StellarContext, StellarReducer, type StellarState } from '../context/StellarContext';

// 4. if context's selected id !== -1 (selected from ^) => show UI on this page
// 5. UI on the page will be able to modify the context specific stellar's title / description  
// 6.
// 
// ADDITIONAL: hook to zustand local storage

export const StellarNetwork = () => {
    const initial: StellarState = ({ 
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
        selected: -1,
        a: 10
    });

    const [state, dispatch] = useReducer(StellarReducer, initial);    

    return (
        <Page>
            <StellarContext.Provider value={[state, dispatch]}>
                <div className='stellar-wrapper'>
                    <StellarCanvas/>

                    <AnimatePresence>
                        { state.selected !== -1 && (
                            <StellarUI object={state.stellars[state.selected]}/>
                        )}
                    </AnimatePresence>
                </div>
            </StellarContext.Provider>
        </Page>
    )
}