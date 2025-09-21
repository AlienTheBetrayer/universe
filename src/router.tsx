import { createBrowserRouter } from "react-router-dom";

import { HomePage } from "./features/pagehome/pages/HomePage";
import { App } from "./features/pageapp/pages/App";
import { Philosophy } from "./features/pagephilosophy/pages/Philosophy";
import { Contact } from "./features/pagecontact/pages/Contact";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage/>
    },
    {
        path: '/home',
        element: <HomePage/>
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