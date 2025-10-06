import './HorizontalSection.css';
import { useRef, useState } from 'react';
import { type CatalogueItem, HorizontalCatalogue } from '../../../horizontalcatalogue/components/HorizontalCatalogue';
import { HorizontalMenu } from '../../../horizontalcatalogue/components/HorizontalMenu';

export const HorizontalSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
  
    const [content, setContent] = useState<CatalogueItem[]>([
        {
            idx: 0,
            title: 'Aurora Lamp',
            content: 'A color-changing LED lamp with smooth dimming and smart-home support.',
            visible: true,
        },
        {
            idx: 1,
            title: 'Nebula Journal',
            content: 'A hardcover notebook with recycled paper and a galaxy-themed cover.',
            visible: true,
        },
        {
            idx: 2,
            title: 'Drift Bluetooth Speaker',
            content: 'Compact wireless speaker with deep bass and 12-hour battery life.',
            visible: true,
        },
        {
            idx: 3,
            title: 'Solstice Mug',
            content: 'Ceramic mug that reveals a sunrise pattern when filled with hot drinks.',
            visible: true,
        },
        {
            idx: 4,
            title: 'Vantage Backpack',
            content: 'Weather-resistant travel backpack with laptop compartment and hidden pockets.',
            visible: true,
        },
        {
            idx: 5,
            title: 'Echo Pen',
            content: 'Reusable stylus pen designed for tablets, e-ink devices, and traditional paper.',
            visible: true,
        },
        {
            idx: 6,
            title: 'Momentum Headphones',
            content: 'Noise-canceling over-ears with adaptive ambient mode and touch controls.',
            visible: true,
        },
        {
            idx: 7,
            title: 'Cascade Water Bottle',
            content: 'Insulated steel bottle that keeps drinks cold for 24h and hot for 12h.',
            visible: true,
        },
        {
            idx: 8,
            title: 'Atlas Desk Organizer',
            content: 'Minimalist aluminum organizer with modular trays and cable channels.',
            visible: true,
        },
        {
            idx: 9,
            title: 'Pulse Fitness Band',
            content: 'Lightweight activity tracker with heart-rate monitor and sleep analytics.',
            visible: true,
        },
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