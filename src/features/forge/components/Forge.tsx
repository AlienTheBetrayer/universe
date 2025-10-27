import { useRef } from 'react';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { ForgeBlocks } from './blocks/components/ForgeBlocks';
import { ForgeCards } from './cards/components/ForgeCards';
import { ForgeEffects } from './effects/components/ForgeEffects';
import './Forge.css';
import { ForgeWorld } from './world/components/ForgeWorld';

export const Forge = () => {
    const isLarge = !useMediaQuery(1024);
    const effectContainerRef = useRef<HTMLDivElement>(null);

    return (
        <div className='forge'>
            <ForgeCards
                onSelect={() => {
                    if (isLarge) return;

                    setTimeout(() => {
                        if (effectContainerRef.current) {
                            const boundsTop =
                                effectContainerRef.current?.getBoundingClientRect()
                                    .top;

                            window.scrollTo({
                                top: boundsTop - 256,
                                behavior: 'smooth',
                            });
                        }
                    }, 500);
                }}
            />
            <hr />
            <div className='forge-main-container'>
                <ForgeEffects wrapperRef={effectContainerRef} />
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
