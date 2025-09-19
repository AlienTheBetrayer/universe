import './Page.css';
import { Footer } from "../../footer/components/Footer";
import { Header } from "../../header/components/Header";
import { Content } from "./Content";

interface PageSettings {
    header?: boolean;
    content?: boolean;
    footer?: boolean;
}

interface Props {
    settings?: PageSettings;
    children?: React.ReactNode;
}

export const Page = ({ settings, children }: Props) => {
    return (
        <main className='page'>
            { (settings?.header ?? true) && <Header/> }

            { (settings?.content ?? true) && (
                <Content>
                    { children }
                </Content>
            ) }
            
            { (settings?.header ?? true) && <Footer/> }
        </main>
    )
}