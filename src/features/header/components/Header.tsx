import { LinkButton } from '../../../shared/components/LinkButton';
import './Header.css';

export const Header = () => {
    const elements = [
        {
            title: 'Home',
            to: '/'
        },
        {
            title: 'App',
            to: '/app'
        }
    ];

    return (
        <header>
            <nav>
                { elements.map(elem => (
                    <LinkButton to={elem.to}>
                        {elem.title}
                    </LinkButton>
                ))}
            </nav>
        </header>
    )
}