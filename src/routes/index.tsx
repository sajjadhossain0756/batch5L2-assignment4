import App from "@/App";
import UpdateBook from "@/components/UpdateBook";
import AddBook from "@/pages/AddBook";
import Books from "@/pages/Books";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                Component: Books
            },
            {
                path: "add-book",
                Component: AddBook
            },
            {
                path:`update/:bookId`,
                Component: UpdateBook
            }
        ]
    }
])

export default router;