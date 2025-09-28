import './Footer.css';

import githubImg from '../assets/github.svg';
import linkedinImg from '../assets/linkedin.svg';
import prevPortfolioImg from '../assets/prev-portfolio.svg';

import { UniversalLink } from '../../ui/UniversalLink/components/UniversalLink';

import { motion } from 'motion/react';
import { useRef } from 'react';
import { useFooterPopup } from '../hooks/useFooterPopup';

export const Footer = () => {
    const buttons = [
        {
            src: githubImg,
            alt: 'Github',
            to: 'https://github.com/AlienTheBetrayer/theuniverse',
            text: 'Github Repository'
        },
        {
            src: linkedinImg,
            alt: 'Linkedin',
            to: 'https://linkedin.com/in/gleb-pichkurov-14662a385/',
            text: 'Linkedin Page'
        },
        {
            src: prevPortfolioImg,
            alt: 'Prev. Proj.',
            to: 'https://glebpichkurov.vercel.app/',
            text: 'My previous portfolio'
        }   
    ];

    const buttonRefs = useRef<(HTMLDivElement | null)[]>([]);
    const footerPopups = useFooterPopup(buttonRefs);

    return (
        <footer>    
            <nav>
                { buttons.map((button, idx) => (
                    <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 40 }}
                    key={idx} ref={el => { buttonRefs.current[idx] = el }}
                    onPointerEnter={() => footerPopups.update(idx, true, button.text)}
                    onPointerLeave={() => footerPopups.update(idx, false)}>
                        <UniversalLink to={button.to} type='url'>
                            <img src={button.src} alt={button.alt}/>
                        </UniversalLink>
                    </motion.div>
                ))}

                { footerPopups.render() }
            </nav>
        </footer>
    )
}