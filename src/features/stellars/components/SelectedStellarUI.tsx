import { AnimatePresence } from 'motion/react';
import { useStellarContext } from '../context/StellarContext';
import './SelectedStellarUI.css';
import { StellarCard } from './StellarCard';

export const SelectedStellarUI = () => {
    const [state, ] = useStellarContext();

    return (
        <AnimatePresence>
            { state.selected !== false && (
                <>
                    <StellarCard idx={state.selected} side='second' className='selected-stellar-ui-right'/>
                    <StellarCard idx={state.selected} side='first' className='selected-stellar-ui-left'/>
                </>
            )}
        </AnimatePresence>
    )
}