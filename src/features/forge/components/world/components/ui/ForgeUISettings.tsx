import { motion } from 'motion/react';
import { Button } from '../../../../../ui/Button/components/Button';
import { useWorldContext } from '../../../../context/WorldContext';
import './ForgeUISettings.css';

interface Props {
    onCancel?: () => void;
}

export const ForgeUISettings = ({ onCancel }: Props) => {
    const [state, dispatch] = useWorldContext();

    return (
        <motion.div
            className='forge-ui-settings'
            initial={{ y: '10px', opacity: 0 }}
            animate={{ y: '-115%', opacity: 1 }}
            exit={{ y: '10px', opacity: 0, transition: { duration: 0.3 } }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
            <div className='forge-ui-settings-topline'>
                <h4>
                    <mark>World</mark> Settings
                </h4>
                <Button
                    onClick={() => onCancel?.()}
                    className='forge-cancel-button'
                    style={{ marginLeft: 'auto' }}
                >
                    ✕
                </Button>
            </div>

            <ul className='forge-ui-settings-items'>
                <li className='forge-ui-settings-item'>
                    <label>Block size</label>
                    <input
                        style={{ width: '100%' }}
                        type='range'
                        value={state.blockSize}
                        min={0.5}
                        max={3}
                        step={0.1}
                        onChange={(e) => {
                            dispatch({
                                type: 'PROPERTY_SET_BLOCK_SIZE',
                                size: Number(e.target.value),
                            });
                            dispatch({ type: 'GENERATE_FIELD' });
                        }}
                    />
                </li>
            </ul>
        </motion.div>
    );
};
