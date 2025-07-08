import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import UpdateBook from "@/components/UpdateBook"
import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/api/baseApi"
import type { Ibooks } from "@/redux/interfaces/books.interface"
import { toast } from "sonner"



const books = () => {
    const { data, isLoading, isError } = useGetBooksQuery(undefined);
    const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

    console.log({ data, isLoading, isError })
    if (isLoading) {
        return <p>Loading...</p>
    }
    const handleDeleteBook = async (id: string) => {
        try {
            await deleteBook({ id }).unwrap();
            toast.success("Book deleted successfully!");
        } catch (error: any) {
            console.error("Failed to delete book:", error);
            toast.error(`Failed to delete book: ${error.data?.message || error.message || 'An unknown error occurred.'}`);
        }
    };

    return (
        <div className="px-4 lg:px-10 lg:py-5">
            <Table>
                <TableCaption className="sr-only">A list of all books.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Genre</TableHead>
                        <TableHead className="text-right">ISBN</TableHead>
                        <TableHead className="text-right">Copies</TableHead>
                        <TableHead className="text-right">Availability</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody >
                    {!isLoading && data.books.map((book: Ibooks) => (
                        <TableRow key={book._id} >
                            <TableCell className="font-medium">{book?.title}</TableCell>
                            <TableCell>{book?.author}</TableCell>
                            <TableCell>{book?.genre}</TableCell>
                            <TableCell className="text-right">{book?.isbn}</TableCell>
                            <TableCell className="text-right">{book?.copies}</TableCell>
                            <TableCell className="text-right">{book?.available ? "Available" : "Unavailable"}</TableCell>
                            <TableCell className="text-right flex items-center justify-center">
                                <div className="mr-2">
                                    <UpdateBook ></UpdateBook>
                                </div>
                                {/* --- Delete Book data --- */}
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            
                                            disabled={isDeleting} 
                                        >
                                            Delete
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete
                                                "{book.title}" and remove its data from our servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() => handleDeleteBook(book._id)}
                                                disabled={isDeleting} 
                                            >
                                                {isDeleting ? "Deleting..." : "Continue"}
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default books