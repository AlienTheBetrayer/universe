import './HorizontalSection.css';
import { useRef, useState } from 'react';
import { type CatalogueItem, HorizontalCatalogue } from '../../../horizontalcatalogue/components/HorizontalCatalogue';
import { HorizontalMenu } from '../../../horizontalcatalogue/components/HorizontalMenu';

export const HorizontalSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
  
    const [content, setContent] = useState<CatalogueItem[]>([
        {
            title: 'a',
            content: 'yes',
            visible: true,
        },
        {
            title: 'b',
            content: 'idk',
            visible: true,
        },
        {
            title: 'c',
            content: 'search me',
            visible: true,
        }
    ]);
    
    return (
        <section ref={sectionRef} className='horizontal-section container'>
            <h2>Horizontal <mark>catalogue</mark></h2>

            <div className='horizontal-lock'>
                <HorizontalCatalogue className='lock-catalogue' containerRef={sectionRef} items={content}/>
                <HorizontalMenu className='lock-menu' items={[content, setContent]}/>
            </div>
        </section>
    )
}