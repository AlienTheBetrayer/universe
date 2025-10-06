import { usePopup } from '../../../hooks/usePopup';
import type { CatalogueItem } from './HorizontalCatalogue';
import './HorizontalCatalogueItem.css';
import { AnimatePresence, motion } from 'motion/react';
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
            <AnimatePresence>
                <motion.div
                    key={item.title}
                    className='horizontal-catalogue-item'
                    animate={{ display: item.visible ? 'flex' : 'none' }}
                    exit={{ opacity: 0 }}>
                        <h3>{item.title}</h3>
                        <p>{item.content}</p>
                        <button onClick={() => handleOrder()} className='horizontal-catalogue-item-order-button'>Order</button>
                </motion.div>
            </AnimatePresence>

            { popup.render() }
        </>
    )
}