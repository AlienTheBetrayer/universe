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
        transition={{ delay: 3.5, duration: 0.6, type: 'spring', stiffness: 200, damping: 50 }}>
            { tooltips.render() }

            <motion.nav
            style={{ justifyContent: (justified || loaded.header) ? 'space-between' : 'flex-start'}}>
                <UniversalLink to='/' className='home-button'>
                    Home
                    <img src={starImg} alt=''/>
                </UniversalLink>

                {/* display none on mobile */}
                <motion.div className='flex align-center p-1 h-full'
                style={{ display: !isMobile ? 'flex' : 'none' }}
                layout
                initial={{ gap: loaded.header ? '2rem' : '0.1rem' }}
                animate={{ gap: '2rem', transition: { delay: 5.5, type: 'spring', duration: 0.6, stiffness: 200, damping: 50 } }}
                transition={{ type: 'spring', duration: 0.6, stiffness: 200, damping: 50 }}>
                    <UniversalLink 
                    to='/stellarnetwork'>
                    Stellar Network</UniversalLink>

                    <UniversalLink 
                    to='/contact'>
                    Contact</UniversalLink>

                    <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
                        <LinkButton 
                        className='header-launch-app'
                        to='/app'>
                            <img src={launchImg} alt=''/>
                            Launch App
                        </LinkButton>
                    </motion.div>

                    <ToggleButton 
                    ref={el => tooltips.set(0, `${ theme === 'dark' ? '<mark>Dark</mark> / Light' : 'Dark / <mark>Light</mark>'} theme`, el, 'down', 24)}
                    value={theme === 'light'} 
                    onToggled={() => toggleTheme()}/>
                </motion.div>

                {/* mobile menu open button */}
                <Button 
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