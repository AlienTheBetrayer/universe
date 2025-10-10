import { useTooltips } from '../../tooltip/hooks/useTooltips';
import type { CatalogueItem } from './HorizontalCatalogue';
import './HorizontalCatalogueItem.css';
import { motion } from 'motion/react';

interface Props {
    item: CatalogueItem;
    onPurchase?: (item: CatalogueItem) => void;
}

export const HorizontalCatalogueItem = ({ item, onPurchase }: Props) => {
    const tooltips = useTooltips();

    return (
        <motion.div
            layout
            key={item.title}
            className='horizontal-catalogue-item'
            initial={{ opacity: 0 }}
            animate={{ opacity: item.visible ? 1 : 0, display: item.visible ? 'flex' : 'none' }}>
                { tooltips.render() }

                <h3>{item.title}</h3>
                <p>{item.content}</p>
                <span className='horizontal-catalogue-item-idx'>{item.idx + 1}</span>
                <button 
                ref={el => tooltips.set(item.idx, 'Emulate the purchase of this item', el, 'down')}
                onClick={() => onPurchase?.(item)} 
                className='horizontal-catalogue-item-order-button'>Order</button>
        </motion.div>
    )
}