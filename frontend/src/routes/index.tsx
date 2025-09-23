import { createBrowserRouter, Navigate } from "react-router-dom";
import { PublicLayout } from "../layouts/PublicLayout";
import { Home } from "../pages/Home";
export const router = createBrowserRouter([
    {
        element: <PublicLayout />,
        children: [
            {
                path: "/inicio",
                element: <Home />
            },
            {
                path: "*", element: <Navigate to="/inicio" replace />
            }
        ]

    }
])