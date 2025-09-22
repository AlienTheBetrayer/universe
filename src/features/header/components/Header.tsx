import './Header.css';

import { motion } from 'motion/react';
import { UniversalLink } from "../../../shared/UniversalLink/components/UniversalLink";
import { LinkButton } from "../../../shared/LinkButton/components/LinkButton";
import { cssVariable } from "../../../utils/cssVariable";

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
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 3.5, duration: 0.6, type: 'spring', stiffness: 200, damping: 50 }}>
            <nav>
                <div>
                    {/* switch this regular text to a logo */}
                    <UniversalLink to='/'>
                        Home
                    </UniversalLink>
                </div>

                <div className='flex gap align-center'>
                    { informativeElements.map(element => (
                        <UniversalLink to={element.to} key={element.title}>
                            {element.title}
                        </UniversalLink>
                    ))}

                    <LinkButton className='header-launch-app' to='/app' fillColor={cssVariable('--button-app-fill')} hoverColor={cssVariable('--button-app-hover')}>
                        Launch App
                    </LinkButton>
                </div>
            </nav>
        </motion.header>
    )
}