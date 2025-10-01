import './SelectedStellarUI.css';
import { StellarCard } from './StellarCard';

interface Props {
    idx: number;
}

export const SelectedStellarUI = ({ idx }: Props) => {
    return (
        <>
            <StellarCard idx={idx} side='first' className='selected-stellar-ui-left'/>
            <StellarCard idx={idx} side='second' className='selected-stellar-ui-right'/>
        </>
    )
}