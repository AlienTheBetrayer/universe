import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { ForgeBlocks } from './blocks/components/ForgeBlocks';
import { ForgeCards } from './cards/components/ForgeCards';
import { ForgeEffects } from './effects/components/ForgeEffects';
import './Forge.css';
import { ForgeWorld } from './world/components/ForgeWorld';

export const Forge = () => {
    const isLarge = !useMediaQuery(1024);

    return (
        <div className='forge'>
            <ForgeCards />
            <hr />
            <div className='forge-main-container'>
                <ForgeEffects />
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
