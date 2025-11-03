import './Header.css';

import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { usePopup } from '../../../hooks/usePopup';
import { HeaderMenu } from '../../headermenu/components/HeaderMenu';

import { motion } from 'motion/react';
import { useLocalStore } from '../../../zustand/localStore';
import { useTooltips } from '../../tooltip/hooks/useTooltips';
import { Button } from '../../ui/Button/components/Button';
import { LinkButton } from '../../ui/LinkButton/components/LinkButton';
import { ToggleButton } from '../../ui/ToggleButton/ToggleButton';
import { UniversalLink } from '../../ui/UniversalLink/components/UniversalLink';
import { useHeaderAnimation } from '../hooks/useHeaderAnimation';

import React from 'react';
import forkImg from '../assets/fork.svg';
import launchImg from '../assets/launch.svg';
import starImg from '../assets/star.svg';
import stellarImg from '../assets/stellar.svg';

export const Header = React.memo(() => {
    const isMobile = useMediaQuery(768);
    const { loaded, justified } = useHeaderAnimation();
    const { theme, toggleTheme } = useLocalStore();

    const headerMenuPopup = usePopup(
        <HeaderMenu onInteract={() => headerMenuPopup.setShown(false)} />
    );

    const tooltips = useTooltips();

    return (
        <motion.header
            initial={{ y: loaded.header ? 0 : -100, x: '-50%' }}
            animate={{ y: 0, x: '-50%' }}
            transition={{
                delay: 4,
                duration: 0.6,
                type: 'spring',
                stiffness: 200,
                damping: 50,
            }}
        >
            {tooltips.render()}
            {headerMenuPopup.render()}

            <motion.nav
                style={{
                    x: '-50%',
                    justifyContent:
                        justified || loaded.header
                            ? 'space-between'
                            : 'flex-start',
                }}
            >
                <UniversalLink to='/' className='home-button'>
                    Home
                    <img
                        src={starImg}
                        alt=''
                        ref={(el) =>
                            tooltips.set(1, '✨ Stellar', el, 'down', 24)
                        }
                    />
                </UniversalLink>

                {/* display none on mobile */}
                {!isMobile ? (
                    <motion.div
                        className='header-items'
                        layout={!(loaded && justified)}
                        initial={{
                            gap: loaded && justified ? '1rem' : '0.1rem',
                        }}
                        animate={{
                            gap: '1rem',
                            transition: {
                                delay: 6,
                                type: 'spring',
                                duration: 0.6,
                                stiffness: 200,
                                damping: 50,
                            },
                        }}
                        transition={{
                            type: 'spring',
                            delay: 1,
                            duration: 0.6,
                            stiffness: 200,
                            damping: 50,
                        }}
                    >
                        <LinkButton
                            className='header-big-button header-github-button'
                            to='/github'
                        >
                            <img src={forkImg} alt='' />
                            Github Emulation
                        </LinkButton>

                        <LinkButton
                            className='header-big-button header-stellar-button'
                            to='/stellarnetwork'
                        >
                            <img src={stellarImg} alt='' />
                            Stellar Network
                        </LinkButton>

                        <LinkButton
                            className='header-big-button header-forge-button'
                            to='/forge'
                        >
                            <img src={launchImg} alt='' />
                            Forge
                        </LinkButton>

                        <ToggleButton
                            ref={(el) =>
                                tooltips.set(
                                    0,
                                    `${
                                        theme === 'dark'
                                            ? '<mark>Dark</mark> / Light'
                                            : 'Dark / <mark>Light</mark>'
                                    } theme`,
                                    el,
                                    'down',
                                    24
                                )
                            }
                            value={theme === 'light'}
                            onToggled={() => toggleTheme()}
                        />
                    </motion.div>
                ) : (
                    <Button
                        layout
                        transition={{
                            delay: 1,
                            type: 'spring',
                            stiffness: 150,
                            damping: 50,
                        }}
                        className='header-open-menu'
                        onClick={() =>
                            headerMenuPopup.setShown((prev) => !prev)
                        }
                    >
                        Menu
                    </Button>
                )}
            </motion.nav>
        </motion.header>
    );
});
