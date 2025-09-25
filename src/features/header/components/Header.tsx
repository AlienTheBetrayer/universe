import './Header.css';

import { motion } from 'motion/react';
import { UniversalLink } from "../../ui/UniversalLink/components/UniversalLink";
import { LinkButton } from "../../ui/LinkButton/components/LinkButton";
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { Settings } from '../../settings/components/Settings';
import { Button } from '../../ui/Button/components/Button';
import { usePopup } from '../../../hooks/usePopup';
import { HeaderMenu } from '../../headermenu/components/HeaderMenu';

export const Header = () => {
    const isMobile = useMediaQuery(640);

    const headerMenuPopup = usePopup(<HeaderMenu onInteract={() => headerMenuPopup.setShown(false)}/>);

    return (
        <motion.header
        initial={{ y: -100, x: '-50%' }}
        animate={{ y: 0, x: '-50%' }}
        transition={{ delay: 3.5, duration: 0.6, type: 'spring', stiffness: 200, damping: 50 }}>
            <nav>
                <UniversalLink to='/' className='home-button'>Home</UniversalLink>

                { !isMobile ? (
                    <>
                        <UniversalLink to='/philosophy'>Philosophy</UniversalLink>
                        <UniversalLink to='/contact'>Contact</UniversalLink>

                        <LinkButton className='header-launch-app' to='/app'>Launch App</LinkButton>

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