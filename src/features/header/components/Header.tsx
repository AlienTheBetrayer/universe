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

export const Header = () => {
    const isMobile = useMediaQuery(640);

    const headerMenuPopup = usePopup(<HeaderMenu onInteract={() => headerMenuPopup.setShown(false)}/>);
    
    const { loaded, updateLoaded } = useSessionStore();
    
    useTimeout(() => {
        if (!loaded.header)
            updateLoaded({ header: true })
    }, 4100);

    return (    
        <motion.header
        initial={{ y: -100, x: '-50%' }}
        animate={{ y: 0, x: '-50%' }}
        transition={{ delay: loaded.header ? 0 : 3.5, duration: 0.6, type: 'spring', stiffness: 200, damping: 50 }}>
            <nav>
                <UniversalLink to='/' className='home-button'>Home</UniversalLink>

                { !isMobile ? (
                    <>
                        <UniversalLink to='/philosophy'>Philosophy</UniversalLink>
                        <UniversalLink to='/contact'>Contact</UniversalLink>


                        <motion.div
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.15 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}>

                        <LinkButton className='header-launch-app' to='/app'>Launch App</LinkButton>
                        </motion.div>
                        <Settings/>
                    </>
                ) : (
                    <Button className='header-open-menu' onClick={() => headerMenuPopup.setShown(prev => !prev)}>
                        Menu
                    </Button>
                )}
            </nav>
            
            { headerMenuPopup.render() }
        </motion.header>
    )
}