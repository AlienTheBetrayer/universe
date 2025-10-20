import { AnimatePresence } from 'motion/react';
import { useStellarContext } from '../context/StellarContext';
import './SelectedStellarUI.css';
import { StellarCard } from './StellarCard';

export const SelectedStellarUI = () => {
    const [state] = useStellarContext();

    return (
        <AnimatePresence>
            {state.selectedIdx !== false && (
                <>
                    <StellarCard
                        side='second'
                        className='selected-stellar-ui-right'
                    />
                    <StellarCard
                        side='first'
                        className='selected-stellar-ui-left'
                    />
                </>
            )}
        </AnimatePresence>
    );
};
