import './Footer.css';

import githubImg from '../assets/github.svg';
import linkedinImg from '../assets/linkedin.svg';
import prevPortfolioImg from '../assets/prev-portfolio.svg';

import { UniversalLink } from '../../ui/UniversalLink/components/UniversalLink';

import { motion } from 'motion/react';
import { useTooltips } from '../../tooltip/hooks/useTooltips';

export const Footer = () => {
    const buttons = [
        {
            src: githubImg,
            alt: 'Github',
            to: 'https://github.com/AlienTheBetrayer/theuniverse',
            text: 'This Github Repository',
        },
        {
            src: linkedinImg,
            alt: 'Linkedin',
            to: 'https://linkedin.com/in/gleb-pichkurov-14662a385/',
            text: 'Linkedin Page',
        },
        {
            src: prevPortfolioImg,
            alt: 'Prev. Proj.',
            to: 'https://portfolio-rho-tan-35.vercel.app/',
            text: 'My previous portfolio',
        },
    ];

    const tooltips = useTooltips();

    return (
        <>
            {tooltips.render()}

            <footer>
                <nav>
                    {buttons.map((button, idx) => (
                        <motion.div
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.2 }}
                            transition={{
                                type: 'spring',
                                stiffness: 200,
                                damping: 40,
                            }}
                            key={idx}
                            ref={(el) =>
                                tooltips.set(idx, button.text, el, 'up', 36)
                            }
                        >
                            <UniversalLink to={button.to} type='url'>
                                <img src={button.src} alt={button.alt} />
                            </UniversalLink>
                        </motion.div>
                    ))}
                </nav>
            </footer>
        </>
    );
};
