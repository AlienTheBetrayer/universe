import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './router';
import { StoreWatcher } from './zustand/StoreWatcher';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <>
        <StoreWatcher />
        <RouterProvider router={router} />
        </>
    </StrictMode>
);
