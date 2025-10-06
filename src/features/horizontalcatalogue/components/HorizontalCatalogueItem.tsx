import { usePopup } from '../../../hooks/usePopup';
import type { CatalogueItem } from './HorizontalCatalogue';
import './HorizontalCatalogueItem.css';
import { motion } from 'motion/react';
import { HorizontalOrderPopup } from './HorizontalOrderPopup';

interface Props {
    item: CatalogueItem;
    onPurchase?: () => void;
}

export const HorizontalCatalogueItem = ({ item, onPurchase }: Props) => {
    const handleOrder = () => {
        onPurchase?.();
        popup.setShown(true);
        setTimeout(() => popup.setShown(false), 5000);
    }

    const popup = usePopup(<HorizontalOrderPopup item={item}/>, false);

    return (
        <>
            <motion.div
                layout
                key={item.title}
                className='horizontal-catalogue-item'
                initial={{ opacity: 0 }}
                animate={{ opacity: item.visible ? 1 : 0, display: item.visible ? 'flex' : 'none' }}>
                    <h3>{item.title}</h3>
                    <p>{item.content}</p>
                    <span className='horizontal-catalogue-item-idx'>{item.idx + 1}</span>
                    <button onClick={() => handleOrder()} className='horizontal-catalogue-item-order-button'>Order</button>
            </motion.div>

            { popup.render() }
        </>
    )
}