import App from "@/App";
import BorrowBooks from "@/components/BorrowBooks";
import UpdateBook from "@/components/UpdateBook";
import AddBook from "@/pages/AddBook";
import Books from "@/pages/Books";
import BorrowSummary from "@/pages/BorrowSummary";
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
            },
            {
                path: "borrow-summary",
                Component: BorrowSummary
            },
            {
                path:`borrow-books/:bookId`,
                Component: BorrowBooks
            }
        ]
    }
])

export default router;