import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { ForgeBlocks } from './blocks/components/ForgeBlocks';
import { ForgeCards } from './cards/components/ForgeCards';
import './Forge.css';
import { ForgeSelectCards } from './selectcards/ForgeSelectCards';
import { ForgeWorld } from './world/components/ForgeWorld';

export const Forge = () => {
    const isLarge = !useMediaQuery(1024);

    return (
        <div className='forge'>
            <ForgeSelectCards />
            <hr />
            <div className='forge-main-container'>
                <ForgeCards />
                <hr />
                {!isLarge && (
                    <>
                        <ForgeBlocks />
                        <hr />
                    </>
                )}

                <ForgeWorld />
            </div>

            {isLarge && (
                <>
                    <hr />
                    <ForgeBlocks />
                    <hr />
                </>
            )}
        </div>
    );
};
