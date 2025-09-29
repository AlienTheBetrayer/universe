import './Header.css';

import { motion } from 'motion/react';
import { UniversalLink } from "../../ui/UniversalLink/components/UniversalLink";
import { LinkButton } from "../../ui/LinkButton/components/LinkButton";
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { Settings } from '../../settings/components/Settings';
import { Button } from '../../ui/Button/components/Button';
import { usePopup } from '../../../hooks/usePopup';
import { HeaderMenu } from '../../headermenu/components/HeaderMenu';
import { useSessionStore } from '../../../zustand/sessionStore';
import { useTimeout } from '../../../hooks/useTimeout';

import launchImg from '../assets/launch.svg';
import { useEffect, useState } from 'react';

export const Header = () => {
    const isMobile = useMediaQuery(640);

    const headerMenuPopup = usePopup(<HeaderMenu onInteract={() => headerMenuPopup.setShown(false)}/>);
    
    const { loaded, updateLoaded } = useSessionStore();
    const [justified, setJustified] = useState<boolean>(false);
    
    useTimeout(() => {
        if (!loaded.header)
            updateLoaded({ header: true });
    }, 4100);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setJustified(loaded.header);
        }, 1500);
        return () => clearTimeout(timeout);
    }, [loaded.header]);

    return (    
        <motion.header
        initial={{ y: loaded.header ? 0 : -100, x: '-50%' }}
        animate={{ y: 0, x: '-50%' }}
        transition={{ delay: 3.5, duration: 0.6, type: 'spring', stiffness: 200, damping: 50 }}>
            <motion.nav
            style={{ justifyContent: (justified || loaded.header) ? 'space-between' : 'flex-start'}}>
                <UniversalLink to='/' className='home-button'>Home</UniversalLink>

                { !isMobile ? (
                    <motion.div className='flex align-center p-1 h-full'
                    layout
                    initial={{ gap: loaded.header ? '2rem' : '0.1rem' }}
                    animate={{ gap: '2rem', transition: { delay: 5.5, type: 'spring', duration: 0.6, stiffness: 200, damping: 50 } }}
                    transition={{ type: 'spring', duration: 0.6, stiffness: 200, damping: 50 }}>
                        <UniversalLink to='/stellarnetwork'>Stellar Network</UniversalLink>
                        <UniversalLink to='/contact'>Contact</UniversalLink>

                        <motion.div
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
                            <LinkButton className='header-launch-app' to='/app'>
                                <img src={launchImg} alt=''/>
                                Launch App
                            </LinkButton>
                        </motion.div>

                        <Settings/>
                    </motion.div>
                ) : (
                    <Button className='header-open-menu' onClick={() => headerMenuPopup.setShown(prev => !prev)}>
                        Menu
                    </Button>
                )}
            </motion.nav>
            
            { headerMenuPopup.render() }
        </motion.header>
    )
}