import { AnimatePresence } from 'motion/react';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { Spotlight } from '../../ui/Spotlight/components/Spotlight';
import { useForgeContext } from '../context/ForgeContext';
import { WorldProvider } from '../context/WorldContext';
import { useForgePages } from '../hooks/useForgePages';
import { ForgeBlocks } from './blocks/components/ForgeBlocks';
import { ForgeCards } from './cards/components/ForgeCards';
import { ForgeConfetti } from './effects/components/ForgeConfetti';
import { ForgeEffects } from './effects/components/ForgeEffects';
import './Forge.css';
import { ForgeWorld } from './world/components/ForgeWorld';
import { ForgeWorldFullscreen } from './world/components/ForgeWorldFullscreen';

import { motion } from 'motion/react';

export const Forge = () => {
    const isLarge = !useMediaQuery(1024);
    const effectContainerRef = useRef<HTMLDivElement>(null);

    const [state, dispatch] = useForgeContext();

    const pages = useForgePages(state.currentPage, dispatch);

    return (
        <WorldProvider>
            <div className='forge'>
                <AnimatePresence>
                    {state.effectSlots.length >= 9 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <ForgeConfetti />
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: '0',
                                    overflow: 'hidden',
                                }}
                            >
                                <Spotlight
                                    className='-left-30 top-0 h-600 w-300 lg:h-300'
                                    fill='#9393ffff'
                                />
                                <Spotlight
                                    className='right-0 top-0 lg:-right-60 h-300 w-300 rotate-90'
                                    fill='#8888f5ff'
                                />

                                <Spotlight
                                    className='-left-30 top-200 h-600 w-300 lg:h-300'
                                    fill='#9393ffff'
                                />
                                <Spotlight
                                    className='right-0 top-200 lg:-right-60 h-300 w-300 rotate-90'
                                    fill='#8888f5ff'
                                />

                                <Spotlight
                                    className='right-0 top-400 lg:-right-60 h-300 w-300 rotate-90'
                                    fill='#8888f5ff'
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

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
