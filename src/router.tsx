import { createBrowserRouter } from "react-router-dom";

import { HomePage } from "./features/pages/home/pages/HomePage";
import { App } from "./features/pages/app/pages/App";
import { Philosophy } from "./features/pages/philosophy/pages/Philosophy";
import { Contact } from "./features/pages/contact/pages/Contact";

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