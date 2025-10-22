import { ForgeCards } from './cards/components/ForgeCards';
import './Forge.css';
import { ForgeMain } from './main/components/ForgeMain';
import { ForgeSelectCards } from './selectcards/ForgeSelectCards';

export const Forge = () => {
    return (
        <div className='forge'>
            <ForgeSelectCards />
            <hr />
            <div className='forge-main-container'>
                <ForgeCards />
                <ForgeMain />
            </div>
        </div>
    );
};
