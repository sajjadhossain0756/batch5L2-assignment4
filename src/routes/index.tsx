import App from "@/App";
import AddBook from "@/pages/AddBook";
import books from "@/pages/Books";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                Component: books
            },
            {
                path: "add-book",
                Component: AddBook
            }
        ]
    }
])

export default router;