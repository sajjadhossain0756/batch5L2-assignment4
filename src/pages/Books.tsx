import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/api/baseApi"
import type { Ibooks } from "@/redux/interfaces/books.interface"
import { toast } from "sonner"
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card"



const books = () => {
    const { data, isLoading, isError } = useGetBooksQuery(undefined);
    const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

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
    if (isError) {
        return <p className="p-4 lg:p-20 text-center text-red-500">Error loading books. Please try again.</p>;
    }

    return (
        <div >
            <div className="mx-4 lg:mx-10 lg:my-5 ">
                <Table className="hidden md:table ">
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
                                    {/* --- Update Book Button --- */}
                                    <div className="mr-2">
                                        <Link to={`/update/${book._id}`}><Button>Update</Button> </Link>
                                    </div>
                                    {/* --- Borrow Book Button --- */}
                                    <div className="mr-2">
                                        <Link to={`/borrow-books/${book._id}`}><Button>Borrow</Button> </Link>
                                    </div>
                                    {/* --- Delete Book Button --- */}
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
            {/* Mobile Navigation (visible on small screens) */}
            {!isLoading && data.books.map((book: Ibooks) => (
                <div key={book._id} className="flex flex-col justify-center items-center my-5">
                <Card className="w-full max-w-sm mb-2 md:hidden ">
                    <CardContent>
                        <div className="flex flex-col gap-4">
                            <div >
                                <span className="mr-[100px]">Title</span>
                                <span>{book?.title}</span>
                            </div>
                            <div >
                                <span className="mr-[78px]">Author</span>
                                <span>{book?.author}</span>
                            </div>
                            <div >
                                <span className="mr-[90px]">Genre</span>
                                <span>{book?.genre}</span>
                            </div>
                            <div >
                                <span className="mr-[93px]">ISBN</span>
                                <span>{book?.isbn}</span>
                            </div>
                            <div >
                                <span className="mr-[86px]">Copies</span>
                                <span>{book?.copies}</span>
                            </div>
                            <div >
                                <span className="mr-[62px]">Availablity</span>
                                <span>{book?.available ? "Available" : "Unavailable"}</span>
                            </div>
                        </div>
                    </CardContent>
                    {/* card footer */}
                    <CardFooter className="flex gap-2">
                        <div className="mr-2">
                            <Link to={`/update/${book._id}`}><Button>Update</Button> </Link>
                        </div>
                        {/* --- Borrow Book Button --- */}
                        <div className="mr-2">
                            <Link to={`/borrow-books/${book._id}`}><Button>Borrow</Button> </Link>
                        </div>
                        {/* --- Delete Book Button --- */}
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
                    </CardFooter>
                </Card>
                </div>
            ))}
        </div>
    )
}

export default books