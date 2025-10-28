import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
} from 'react';
import { useHotkeys, type HotkeyAction } from '../../../hooks/useHotkeys';
import { WorldReducerInitialState } from './initial/WorldReducerInitialState';
import { WorldReducer, type WorldReducerAction } from './reducer/WorldReducer';
import type { WorldData } from './types/world/data';

// types
export type WorldContextType = [WorldData, React.Dispatch<WorldReducerAction>];

// context
export const WorldContext = createContext<WorldContextType | null>(null);

// provider
interface Props {
    children?: React.ReactNode;
}

export const WorldProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(
        WorldReducer,
        WorldReducerInitialState
    );

    useEffect(() => {
        dispatch({ type: 'GENERATE_MAPS' });
        dispatch({ type: 'GENERATE_FIELD' });
    }, []);

    const hotkeys: HotkeyAction[] = useMemo(() => {
        const ret: HotkeyAction[] = [];

        for (let i = 1; i < 9; ++i) {
            ret.push({
                hotkey: `${i}`,
                action: () =>
                    dispatch({ type: 'SELECT_BUILDING_BLOCK_IDX', idx: i }),
            });
        }

        return ret;
    }, []);

    useHotkeys(hotkeys);

    return (
        <WorldContext.Provider value={[state, dispatch]}>
            {children}
        </WorldContext.Provider>
    );
};

// hooks
export const useWorldContext = () => {
    const ctx = useContext(WorldContext);
    if (!ctx) throw new Error('useWorldContext() is used incorrectly.');
    return ctx;
};
