import './Page.css';
import { Footer } from "../../footer/components/Footer";
import { Header } from "../../header/components/Header";
import { Content } from "./Content";

interface PageSettings {
    header?: boolean;
    content?: boolean;
    footer?: boolean;

    contentWidth?: string;
}

const PageSettingsDefaults: PageSettings = {
    header: true,
    content: true,
    footer: true,

    contentWidth: '1500px',
}

interface Props extends React.HTMLAttributes<HTMLElement> {
    settings?: PageSettings;
}

export const Page = ({ className, settings, children, ...rest }: Props) => {
    return (
        <main className={`page ${className ?? ''}`} {...rest}>
            { (settings?.header ?? PageSettingsDefaults.header) && <Header/> }

            { (settings?.content ?? PageSettingsDefaults.content) && (
                <Content style={{ maxWidth: settings?.contentWidth ?? PageSettingsDefaults.contentWidth }}>
                    { children }
                </Content>
            ) }
            
            { (settings?.header ?? PageSettingsDefaults.footer) && <Footer/> }
        </main>
    )
}