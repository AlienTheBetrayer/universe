import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useRef,
} from 'react';
import { useLocalStore } from '../../../zustand/localStore';
import { useForgeDrag } from './hooks/useForgeDrag';
import { ForgeReducerInitialState } from './initial/ForgeReducerInitialState';
import { ForgeReducer, type ForgeReducerAction } from './reducer/ForgeReducer';
import type { ForgeData } from './types/forge/data';

type ForgeContextType = [ForgeData, React.Dispatch<ForgeReducerAction>];

export const ForgeContext = createContext<ForgeContextType | null>(null);

interface Props {
    children?: React.ReactNode;
}

export const ForgeProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(
        ForgeReducer,
        ForgeReducerInitialState
    );

    useForgeDrag(state, dispatch);

    const currentEffectHoveredIdxRef = useRef<number | false>(false);
    state.currentEffectHoveredIdx = currentEffectHoveredIdxRef;

    const localStore = useLocalStore();

    useEffect(() => {
        dispatch({
            type: 'SET_TUTORIAL_VISIBILITY',
            flag: !localStore.tutorialSeen.forge,
        });
    }, []);

    return (
        <ForgeContext.Provider value={[state, dispatch]}>
            {children}
        </ForgeContext.Provider>
    );
};

export const useForgeContext = () => {
    const ctx = useContext(ForgeContext);
    if (!ctx) throw new Error('useForgeContext() is used incorrectly.');
    return ctx;
};
