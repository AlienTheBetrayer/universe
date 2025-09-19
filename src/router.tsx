import { createBrowserRouter } from "react-router-dom";

import { Home } from "./features/pagemain/pages/Home";
import { App } from "./features/pageapp/pages/App";
import { Tutorial } from "./features/pagetutorial/pages/Tutorial";
import { Wiki } from "./features/pagewiki/pages/Wiki";
import { Philosophy } from "./features/pagephilosophy/pages/Philosophy";

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
    },
    {
        path: '/wiki',
        element: <Wiki/>
    },
    {
        path: '/tutorial',
        element: <Tutorial/>
    },
    {
        path: '/philosophy',
        element: <Philosophy/>
    }
]);