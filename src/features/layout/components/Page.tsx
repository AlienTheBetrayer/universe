import './Page.css';
import { Footer } from "../../footer/components/Footer";
import { Header } from "../../header/components/Header";
import { Content } from "./Content";
import type React from 'react';

interface PageSettings {
    header?: boolean;
    content?: boolean;
    footer?: boolean;

    pageWidth?: string;
}

const PageSettingsDefaults: PageSettings = {
    header: true,
    content: true,
    footer: true,

    pageWidth: '1000px'
}

interface Props extends React.HTMLAttributes<HTMLElement> {
    settings?: PageSettings;
}

export const Page = ({ settings, children, ...rest }: Props) => {
    return (
        <main className='page' {...rest}>
            { (settings?.header ?? PageSettingsDefaults.header) && <Header/> }

            { (settings?.content ?? PageSettingsDefaults.content) && (
                <Content style={{ maxWidth: settings?.pageWidth ?? PageSettingsDefaults.pageWidth }}>
                    { children }
                </Content>
            ) }
            
            { (settings?.header ?? PageSettingsDefaults.footer) && <Footer/> }
        </main>
    )
}