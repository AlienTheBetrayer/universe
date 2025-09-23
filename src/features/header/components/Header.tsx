import './Header.css';

import { motion } from 'motion/react';
import { UniversalLink } from "../../../shared/UniversalLink/components/UniversalLink";
import { LinkButton } from "../../../shared/LinkButton/components/LinkButton";
import { cssVariable } from "../../../utils/cssVariable";
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
                {/* switch this regular text to a logo */}
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
            <LinkButton className='header-launch-app' to='/app' fillColor={cssVariable('--button-app-fill')} hoverColor={cssVariable('--button-app-hover')}>
                { isMobile ? 'App' : 'Launch App' }
            </LinkButton>
        </>
    )
}