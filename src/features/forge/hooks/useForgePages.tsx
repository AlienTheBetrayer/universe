import React, { useEffect } from 'react';
import { usePopup } from '../../../hooks/usePopup';
import { ForgeSaveLoad } from '../components/pages/ForgeSaveLoad';
import type { ForgeReducerAction } from '../context/reducer/ForgeReducer';
import type { ForgePage } from '../context/types/forge/data';

export const useForgePages = (
    currentPage: ForgePage,
    dispatch: React.Dispatch<ForgeReducerAction>
) => {
    const saveLoadPage = usePopup(
        <ForgeSaveLoad
            onInteract={() =>
                dispatch({ type: 'SWITCH_PAGE', page: 'default' })
            }
        />,
        true,
        () => {
            dispatch({ type: 'SWITCH_PAGE', page: 'default' });
        }
    );

    useEffect(() => {
        switch (currentPage) {
            case 'default':
                saveLoadPage.setShown(false);
                break;
            case 'save_load':
                saveLoadPage.setShown(true);
                break;
        }
    }, [currentPage]);

    return {
        render: () => {
            return saveLoadPage.render();
        },
    };
};
