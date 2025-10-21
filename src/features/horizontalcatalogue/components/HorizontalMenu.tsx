import { useDebounced } from '../../../hooks/useDebounced';
import { Input } from '../../ui/Input/components/Input';
import type { CatalogueItem } from './HorizontalCatalogue';
import './HorizontalMenu.css';
import React, { useEffect, useState } from 'react';

interface Props {
    className?: string;
    items: [
        CatalogueItem[],
        React.Dispatch<React.SetStateAction<CatalogueItem[]>>,
    ];
}

export const HorizontalMenu = ({ className, items }: Props) => {
    // search functionality with display: none (optimized)
    const [searchValue, setSearchValue] = useState<string>('');
    const debouncedSearch = useDebounced<string>(searchValue, '');

    useEffect(() => {
        items[1]((prev) =>
            prev.map((c) => ({
                ...c,
                visible:
                    c.content
                        .toLowerCase()
                        .includes(debouncedSearch.toLowerCase()) ||
                    c.title
                        .toLowerCase()
                        .includes(debouncedSearch.toLowerCase()) ||
                    debouncedSearch.trim().length === 0,
            })),
        );
    }, [debouncedSearch]);

    return (
        <div className={`horizontal-menu ${className}`}>
            <div className='horizontal-menu-content'>
                <h3>
                    {debouncedSearch === '' ? <u>Filter</u> : 'Filter'} items
                </h3>
                <Input
                    placeholder='Search...'
                    type='search'
                    value={searchValue}
                    onChange={(val) => setSearchValue(val)}
                />
            </div>
        </div>
    );
};
