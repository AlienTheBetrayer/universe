import { createBrowserRouter } from "react-router-dom";

import { Home } from "./features/pagehome/pages/Home";
import { App } from "./features/pageapp/pages/App";
import { Philosophy } from "./features/pagephilosophy/pages/Philosophy";
import { Contact } from "./features/pagecontact/pages/Contact";

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
        path: '/contact',
        element: <Contact/>
    },
    {
        path: '/philosophy',
        element: <Philosophy/>
    }
]);