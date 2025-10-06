import type { CatalogueItem } from './HorizontalCatalogue';
import './HorizontalOrderPopup.css';
import { motion } from "motion/react"

interface Props {
    item: CatalogueItem;
}

export const HorizontalOrderPopup = ({ item }: Props) => {
    return (
        <motion.div className='horizontal-order-popup'
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ type: 'spring', damping: 12 }}>
            <h3>New order request</h3>
            <p>{item.title}</p>
            
        </motion.div>
    )
}