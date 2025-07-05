import App from "@/App";
import books from "@/pages/books";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                path: "books",
                Component: books
            }
        ]
    }
])

export default router;