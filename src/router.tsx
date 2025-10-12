import { createBrowserRouter } from "react-router-dom";

import { HomePage } from "./features/pages/home/pages/HomePage";
import { Forge } from "./features/pages/forge/pages/Forge";
import { StellarNetwork } from "./features/pages/stellarnetwork/pages/StellarNetwork";
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
        path: '/forge',
        element: <Forge/>
    },
    {
        path: '/contact',
        element: <Contact/>
    },
    {
        path: '/stellarnetwork',
        element: <StellarNetwork/>
    }
]);