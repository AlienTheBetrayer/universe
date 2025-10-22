import { ForgeCards } from './cards/components/ForgeCards';
import './Forge.css';
import { ForgeSelectCards } from './selectcards/ForgeSelectCards';
import { ForgeWorld } from './world/components/ForgeWorld';

export const Forge = () => {
    return (
        <div className='forge'>
            <ForgeSelectCards />
            <hr />
            <div className='forge-main-container'>
                <ForgeCards />
                <ForgeWorld />
            </div>
        </div>
    );
};
