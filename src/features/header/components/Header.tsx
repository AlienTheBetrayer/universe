import './Header.css';

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
        <header>
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

                    <LinkButton to='/app' fillColor={cssVariable('--button-app-fill')} hoverColor={cssVariable('--button-app-hover')}>
                        Launch App
                    </LinkButton>
                </div>
            </nav>
        </header>
    )
}