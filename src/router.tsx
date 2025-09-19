import { createBrowserRouter } from "react-router-dom";
import { Main } from "./features/pagemain/pages/Main";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>
    },
]);