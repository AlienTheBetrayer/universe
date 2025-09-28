import './Footer.css';

import githubImg from '../assets/github.svg';
import linkedinImg from '../assets/linkedin.svg';
import prevPortfolioImg from '../assets/prev-portfolio.svg';

import { UniversalLink } from '../../ui/UniversalLink/components/UniversalLink';

import { motion } from 'motion/react';

export const Footer = () => {
    const buttons = [
        {
            src: githubImg,
            alt: 'Github',
            to: 'https://github.com/AlienTheBetrayer/theuniverse'
        },
        {
            src: linkedinImg,
            alt: 'Linkedin',
            to: 'https://linkedin.com/in/gleb-pichkurov-14662a385/'
        },
        {
            src: prevPortfolioImg,
            alt: 'Prev. Proj.',
            to: 'https://glebpichkurov.vercel.app/'
        }   
    ];

    return (
        <footer>    
            <nav>
                { buttons.map(button => (
                        <motion.div
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 40 }}>

                            <UniversalLink to={button.to} type='url'>
                                <img src={button.src} alt={button.alt}/>
                            </UniversalLink>
                        </motion.div>
                ))}
            </nav>
        </footer>
    )
}