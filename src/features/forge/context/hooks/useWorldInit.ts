import type React from 'react';
import { useEffect, useMemo } from 'react';
import { useHotkeys, type HotkeyAction } from '../../../../hooks/useHotkeys';
import type { WorldReducerAction } from '../reducer/WorldReducer';

export const useWorldInit = (dispatch: React.Dispatch<WorldReducerAction>) => {
    // generating internal map storage
    // generating the actual field
    useEffect(() => {
        dispatch({ type: 'GENERATE_MAPS' });
        dispatch({ type: 'GENERATE_FIELD' });
    }, []);

    // 1-9 hotkeys for inventory
    // 0 for deletion
    const hotkeys: HotkeyAction[] = useMemo(() => {
        const ret: HotkeyAction[] = [];

        for (let i = 1; i < 9; ++i) {
            ret.push({
                hotkey: `${i}`,
                action: () =>
                    dispatch({ type: 'SELECT_BUILDING_BLOCK_IDX', idx: i }),
            });
        }
        ret.push({
            hotkey: '0',
            action: () => dispatch({ type: 'TOGGLE_INTERACTION_MODE' }),
        });

        return ret;
    }, []);

    useHotkeys(hotkeys);
};
