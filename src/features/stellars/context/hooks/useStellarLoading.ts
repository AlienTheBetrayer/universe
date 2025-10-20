import React, { useEffect } from 'react';
import { useLocalStore } from '../../../../zustand/localStore';
import type { StellarAction } from '../reducer/StellarReducer';

export const useStellarLoading = (dispatch: React.Dispatch<StellarAction>) => {
    const localStore = useLocalStore();

    useEffect(() => {
        dispatch({
            type: 'TUTORIAL_SET_VISIBLE',
            flag: !localStore.tutorialSeen.stellar,
        });
    }, []);
};
