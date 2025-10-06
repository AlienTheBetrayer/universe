import type { CatalogueItem } from './HorizontalCatalogue';
import './HorizontalMenu.css';
import React, { useEffect, useState } from "react";

interface Props {
    items: [CatalogueItem[], React.Dispatch<React.SetStateAction<CatalogueItem[]>>];
}

export const HorizontalMenu = ({ items }: Props) => {
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
        <div className='horizontal-menu'>
            <input value={search} onChange={(e) => setSearch(e.target.value)}/>
        </div>
    )
}