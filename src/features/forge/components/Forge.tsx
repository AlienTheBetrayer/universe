import { AnimatePresence } from 'motion/react';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { useForgeContext } from '../context/ForgeContext';
import { WorldProvider } from '../context/WorldContext';
import { useForgePages } from '../hooks/useForgePages';
import { ForgeBlocks } from './blocks/components/ForgeBlocks';
import { ForgeCards } from './cards/components/ForgeCards';
import { ForgeEffects } from './effects/components/ForgeEffects';
import './Forge.css';
import { ForgeWorld } from './world/components/ForgeWorld';
import { ForgeWorldFullscreen } from './world/components/ForgeWorldFullscreen';

export const Forge = () => {
    const isLarge = !useMediaQuery(1024);
    const effectContainerRef = useRef<HTMLDivElement>(null);

    const [state, dispatch] = useForgeContext();

    const pages = useForgePages(state.currentPage, dispatch);

    return (
        <WorldProvider>
            <div className='forge'>
                {createPortal(
                    <AnimatePresence>
                        {state.isWorldFullscreen && <ForgeWorldFullscreen />}
                    </AnimatePresence>,
                    document.body
                )}

                {pages.render()}

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

                    {!state.isWorldFullscreen && <ForgeWorld />}
                </div>

                {isLarge && (
                    <>
                        <hr />
                        <ForgeBlocks />
                        <hr />
                    </>
                )}
            </div>
        </WorldProvider>
    );
};
