import './Header.css';

import { motion } from 'motion/react';
import { UniversalLink } from "../../ui/UniversalLink/components/UniversalLink";
import { LinkButton } from "../../ui/LinkButton/components/LinkButton";
import { useMediaQuery } from '../../../hooks/useMediaQuery';

export const Header = () => {
    const informativeElements = [
        {
            title: 'Philosophy',
            to: '/philosophy'
        },
        {
            title: 'Contact',
            to: '/contact'
        },
    ];

    return (
        <motion.header
        initial={{ y: -100, x: '-50%' }}
        animate={{ y: 0, x: '-50%' }}
        transition={{ delay: 3.5, duration: 0.6, type: 'spring', stiffness: 200, damping: 50 }}>
            <nav>
                <UniversalLink to='/' className='home-button'>
                    Home
                </UniversalLink>

                { informativeElements.map(element => (
                    <UniversalLink to={element.to} key={element.title}>
                        {element.title}
                    </UniversalLink>
                ))}

                <AppButton/>
            </nav>
        </motion.header>
    )
}

const AppButton = () => {
    const isMobile = useMediaQuery(640);

    return (
        <>
            <LinkButton className='header-launch-app' to='/app'>
                { isMobile ? 'App' : 'Launch App' }
            </LinkButton>
        </>
    )
}