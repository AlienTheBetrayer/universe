import './HeaderMenu.css';
import { Button } from '../../ui/Button/components/Button';
import { motion, type HTMLMotionProps } from 'motion/react';
import { UniversalLink } from '../../ui/UniversalLink/components/UniversalLink';
import { LinkButton } from '../../ui/LinkButton/components/LinkButton';

import launchImg from '../../header/assets/launch.svg';
import stellarImg from '../../header/assets/stellar.svg';
import forkImg from '../../header/assets/fork.svg';

import { useLocalStore } from '../../../zustand/localStore';
import { ToggleButton } from '../../ui/ToggleButton/ToggleButton';

interface Props extends HTMLMotionProps<'nav'> {
    onInteract?: () => void;
}

export const HeaderMenu = ({ onInteract, className }: Props) => {
    const { theme, toggleTheme } = useLocalStore();

    return (
        <motion.nav 
        className={`header-menu ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
            <UniversalLink 
            to='/' 
            className='home-button'
            >Home</UniversalLink>
            
            <ToggleButton
            style={{ marginBottom: 'auto' }}
            value={theme == 'light'} onToggled={() => toggleTheme()} />

            <LinkButton className='header-big-button header-github-button' to='/github'
            >
                <img src={forkImg} alt=''/>
                Github Emulation
            </LinkButton>
            
            <LinkButton className='header-big-button header-stellar-button' to='/stellarnetwork'>
                <img src={stellarImg} alt=''/>
                Stellar Network
            </LinkButton>

            <LinkButton className='header-big-button header-forge-button' to='/forge'>
                <img src={launchImg} alt=''/>
                Forge
            </LinkButton>

            <Button className='header-close-menu' onClick={() => onInteract?.()} >Close Menu</Button>
        </motion.nav>
    )
}