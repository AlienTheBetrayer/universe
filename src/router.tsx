import { createBrowserRouter } from "react-router-dom";

import { Home } from "./features/pagemain/pages/Home";
import { App } from "./features/pageapp/pages/App";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/home',
        element: <Home/>
    },
    {
        path: '/app',
        element: <App/>
    }
]);