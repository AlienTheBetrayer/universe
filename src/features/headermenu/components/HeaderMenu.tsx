import './HeaderMenu.css';
import { Button } from '../../ui/Button/components/Button';
import { motion, type HTMLMotionProps } from 'motion/react';
import { UniversalLink } from '../../ui/UniversalLink/components/UniversalLink';
import { LinkButton } from '../../ui/LinkButton/components/LinkButton';

import launchImg from '../../header/assets/launch.svg';
import { useLocalStore } from '../../../zustand/localStore';
import { ToggleButton } from '../../ui/ToggleButton/ToggleButton';

interface Props extends HTMLMotionProps<'nav'> {
    onInteract?: () => void;
}

export const HeaderMenu = ({ onInteract, className }: Props) => {
    const { theme, toggleTheme } = useLocalStore();

    return (
        <motion.nav className={`header-menu ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
            <div>
                <UniversalLink to='/' className='home-button'>Home</UniversalLink>
                <UniversalLink to='/stellarnetwork'>Stellar Network</UniversalLink>
                <UniversalLink to='/contact'>Contact</UniversalLink>
            </div>
            
            <div>
                <ToggleButton value={theme == 'light'} onToggled={() => toggleTheme()} />
                <LinkButton className='header-launch-app' to='/app'>
                    Launch App
                    <img src={launchImg} alt=''/>
                </LinkButton>
                <Button className='header-close-menu' onClick={() => onInteract?.()} >Close Menu</Button>
            </div>
        </motion.nav>
    )
}