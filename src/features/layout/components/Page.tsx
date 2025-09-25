import './Page.css';
import { Footer } from "../../footer/components/Footer";
import { Header } from "../../header/components/Header";
import { Content } from "./Content";
import { ScrollButton } from '../../scrollbutton/components/ScrollButton';

interface PageSettings {
    header?: boolean;
    content?: boolean;
    footer?: boolean;
    
    scrollButton?: boolean;
}

const Defaults: PageSettings = {
    header: true,
    content: true,
    footer: true,
    
    scrollButton: true,
}

interface Props extends React.HTMLAttributes<HTMLElement> {
    settings?: PageSettings;
}

export const Page = ({ className, settings, children, ...rest }: Props) => {
    return (
        <main className={`page ${className ?? ''}`} {...rest}>
            { (settings?.header ?? Defaults.header) && <Header/> }

            { (settings?.content ?? Defaults.content) && (
                <Content>
                    { children }
                </Content>
            ) }

            { (settings?.scrollButton ?? Defaults.scrollButton) && <ScrollButton/>}
            
            { (settings?.footer ?? Defaults.footer) && <Footer/> }
        </main>
    )
}