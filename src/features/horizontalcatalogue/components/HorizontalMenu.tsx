import { Search } from '../../ui/Search/Search';
import type { CatalogueItem } from './HorizontalCatalogue';
import './HorizontalMenu.css';
import React, { useEffect, useState } from "react";

interface Props {
    className?: string;
    items: [CatalogueItem[], React.Dispatch<React.SetStateAction<CatalogueItem[]>>];
}

export const HorizontalMenu = ({ className, items }: Props) => {
    // search functionality with display: none (optimized)
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        items[1](prev => prev.map(c => ({ 
            ...c,
            visible: 
            c.content.toLowerCase().includes(search.toLowerCase()) ||
            c.title.toLowerCase().includes(search.toLowerCase()) ||
            search.trim().length === 0
        })));
    }, [search]);
    
    return (
        <div className={`horizontal-menu ${className}`}>
            <div className='horizontal-menu-content'>
                <h3>{ search === '' ? <u>Filter</u> : 'Filter' } items</h3>
                <Search value={search} onChange={val => setSearch(val)}/>
            </div>
        </div>
    )
}