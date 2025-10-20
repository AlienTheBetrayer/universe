import { useEffect } from 'react';
import { useLocalStore } from '../../../../zustand/localStore';
import type { GithubContextData } from '../GithubContext';
import type { GithubReducerAction } from '../reducer/GithubReducer';

export const useProviderSaveLoad = (
    state: GithubContextData,
    dispatch: React.Dispatch<GithubReducerAction>
) => {
    const localStore = useLocalStore();

    // loading
    useEffect(() => {
        dispatch({
            type: 'DATA_SET',
            data: {
                data: localStore.githubData,
                page: 'forms',
                tutorialVisible: !localStore.tutorialSeen.contact,
            },
        });
    }, []);

    // saving
    useEffect(() => {
        const save = () => localStore.setGithubData(state.data);

        const timeout = setTimeout(save, 3000);

        window.addEventListener('pagehide', save);
        document.addEventListener('visibilitychange', save);

        return () => {
            clearTimeout(timeout);
            window.removeEventListener('pagehide', save);
            document.removeEventListener('visibilitychange', save);
        };
    }, [state.data]);
};
