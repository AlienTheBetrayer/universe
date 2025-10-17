import { createBrowserRouter } from "react-router-dom";

import { HomePage } from "./features/pages/home/pages/HomePage";
import { ForgePage } from "./features/pages/forge/pages/ForgePage";
import { GithubPage } from "./features/pages/github/pages/GithubPage";
import { StellarNetworkPage } from "./features/pages/stellarnetwork/pages/StellarNetworkPage";

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
        element: <ForgePage/>
    },
    {
        path: '/github',
        element: <GithubPage/>
    },
    {
        path: '/stellarnetwork',
        element: <StellarNetworkPage/>
    }
]);