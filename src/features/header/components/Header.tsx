import './Header.css';

import { motion } from 'motion/react';
import { UniversalLink } from "../../ui/UniversalLink/components/UniversalLink";
import { LinkButton } from "../../ui/LinkButton/components/LinkButton";
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { Button } from '../../ui/Button/components/Button';
import { usePopup } from '../../../hooks/usePopup';
import { HeaderMenu } from '../../headermenu/components/HeaderMenu';
import { useHeaderAnimation } from '../hooks/useHeaderAnimation';

import launchImg from '../assets/launch.svg';
import starImg from '../assets/star.svg';
import stellarImg from '../assets/stellar.svg';
import forkImg from '../assets/fork.svg';


import { useLocalStore } from '../../../zustand/localStore';
import { ToggleButton } from '../../ui/ToggleButton/ToggleButton';
import { useTooltips } from '../../tooltip/hooks/useTooltips';

export const Header = () => {
    const isMobile = useMediaQuery(768);
    const { loaded, justified } = useHeaderAnimation();
    const { theme, toggleTheme } = useLocalStore();
    
    const headerMenuPopup = usePopup(<HeaderMenu onInteract={() => headerMenuPopup.setShown(false)}/>);
    const tooltips = useTooltips();

    return (    
        <motion.header
        initial={{ y: loaded.header ? 0 : -100, x: '-50%' }}
        animate={{ y: 0, x: '-50%' }}
        transition={{ delay: 4, duration: 0.6, type: 'spring', stiffness: 200, damping: 50 }}>
            { tooltips.render() }

            <motion.nav
            style={{ justifyContent: (justified || loaded.header) ? 'space-between' : 'flex-start'}}>
                <UniversalLink to='/' className='home-button'>
                    Home
                    <img src={starImg} alt=''
                    ref={el => tooltips.set(1, 'Stellar', el, 'down', 24)}/>
                </UniversalLink>

                {/* display none on mobile */}
                <motion.div className='flex align-center h-full'
                style={{ display: !isMobile ? 'flex' : 'none' }}
                layout
                initial={{ gap: loaded.header ? '1rem' : '0.1rem' }}
                animate={{ gap: '1rem', transition: { delay: 6, type: 'spring', duration: 0.6, stiffness: 200, damping: 50 } }}
                transition={{ type: 'spring', delay: 1, duration: 0.6, stiffness: 200, damping: 50 }}>
                    <LinkButton 
                    className='header-big-button header-github-button'
                    to='/github'>
                        <img src={forkImg} alt=''/>
                        Github Emulation
                    </LinkButton>

                    <LinkButton
                    className='header-big-button header-stellar-button'
                    to='/stellarnetwork'>
                        <img src={stellarImg} alt=''/>
                        Stellar Network
                    </LinkButton>

                    <LinkButton 
                    className='header-big-button header-forge-button'
                    to='/forge'>
                        <img src={launchImg} alt=''/>
                        Forge
                    </LinkButton>

                    <ToggleButton 
                    ref={el => tooltips.set(0, `${ theme === 'dark' ? '<mark>Dark</mark> / Light' : 'Dark / <mark>Light</mark>'} theme`, el, 'down', 24)}
                    value={theme === 'light'} 
                    onToggled={() => toggleTheme()}/>
                </motion.div>

                {/* mobile menu open button (display none not on mobile) */}
                <Button
                layout 
                transition={{ delay: 1, type: 'spring', stiffness: 150, damping: 50 }}
                style={{ display: isMobile ? 'flex' : 'none' }}
                className='header-open-menu' 
                onClick={() => headerMenuPopup.setShown(prev => !prev)}>
                    Menu
                </Button>
            </motion.nav>
            
            { headerMenuPopup.render() }
        </motion.header>
    )
}