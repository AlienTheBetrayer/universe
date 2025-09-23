import './Page.css';
import { Footer } from "../../footer/components/Footer";
import { Header } from "../../header/components/Header";
import { Content } from "./Content";
import { Settings } from '../../settings/components/Settings';

interface PageSettings {
    header?: boolean;
    content?: boolean;
    footer?: boolean;

    settings?: boolean;
}

const Defaults: PageSettings = {
    header: true,
    content: true,
    footer: true,

    settings: true,
}

interface Props extends React.HTMLAttributes<HTMLElement> {
    settings?: PageSettings;
}

export const Page = ({ className, settings, children, ...rest }: Props) => {
    return (
        <main className={`page ${className ?? ''}`} {...rest}>
            { (settings?.header ?? Defaults.header) && <Header/> }

            { (settings?.settings ?? Defaults.settings) && <Settings/>}

            { (settings?.content ?? Defaults.content) && (
                <Content>
                    { children }
                </Content>
            ) }
            
            { (settings?.footer ?? Defaults.footer) && <Footer/> }
        </main>
    )
}