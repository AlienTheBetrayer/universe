import { Button } from '../../../../ui/Button/components/Button';
import type { ForgeReducerAction } from '../../../context/reducer/ForgeReducer';
import type { ForgeCardType, ForgeData } from '../../../context/types/data';
import './ForgeEffect.css';

interface Props {
    type: ForgeCardType | undefined;
    state: ForgeData;
    dispatch: React.Dispatch<ForgeReducerAction>;
}

export const ForgeEffect = ({ type, state, dispatch }: Props) => {
    return (
        <div
            className={`forge-effect ${
                state.dragging.idx !== false ? 'forge-effect-hover' : ''
            }`}
        >
            {type && (
                <>
                    <div className='forge-effect-topline'>
                        <Button
                            onClick={() => {
                                dispatch({
                                    type: 'REMOVE_EFFECT_SLOT',
                                    cardType: type,
                                });
                            }}
                            className='forge-cancel-button'
                            style={{ marginLeft: 'auto' }}
                        >
                            ✕
                        </Button>
                    </div>
                    <div className='forge-effect-main'>
                        <h3>{type}</h3>
                    </div>
                </>
            )}
        </div>
    );
};
