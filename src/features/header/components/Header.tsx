import { Button } from "../../../shared/Button/components/Button";
import { UniversalLink } from "../../../shared/UniversalLink/components/UniversalLink";
import { cssVariable } from "../../../utils/cssVariable";
import './Header.css';

export const Header = () => {
    const informativeElements = [
        {
            title: 'Wiki',
            to: '/wiki'
        },
        {
            title: 'Tutorial',
            to: '/tutorial'
        },
        {
            title: 'Philosophy',
            to: '/philosophy'
        }
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
                        <UniversalLink to={element.to}>
                            {element.title}
                        </UniversalLink>
                    ))}

                    <Button fillColor={cssVariable('--button-app-fill')} hoverColor={cssVariable('--button-app-hover')}>
                        Launch App
                    </Button>
                </div>
            </nav>
        </header>
    )
}