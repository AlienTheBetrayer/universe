import type { StellarState } from '../types/stellarData';

export const findMax = (state: StellarState) => {
    if (state.stellars.length === 0) return -1;

    return state.stellars.reduce((acc, val) => {
        return val.idx > acc.idx ? val : acc;
    }).idx;
};
