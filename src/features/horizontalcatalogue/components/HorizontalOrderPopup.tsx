import { useTooltips } from '../../tooltip/hooks/useTooltips';
import type { CatalogueItem } from './HorizontalCatalogue';
import './HorizontalOrderPopup.css';
import { motion } from 'motion/react';

interface Props {
    items?: CatalogueItem[];
}

export const HorizontalOrderPopup = ({ items }: Props) => {
    const tooltips = useTooltips();

    return (
        <div className='horizontal-order-popup-container'>
            {tooltips.render()}
            {items?.map((item, idx) => (
                <motion.div
                    className='horizontal-order-popup'
                    ref={(el) => tooltips.set(idx, item.content, el, 'left')}
                    key={item.title}
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.75, ease: 'backInOut' }}
                >
                    <h3>New order request</h3>
                    <p>{item.title}</p>
                    <span className='horizontal-order-popup-idx'>
                        {item.idx + 1}
                    </span>
                </motion.div>
            ))}
        </div>
    );
};
