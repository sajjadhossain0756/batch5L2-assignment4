import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { useGetBooksQuery } from "@/redux/api/baseApi"



const books = () => {
    const { data, isLoading, isError } = useGetBooksQuery(undefined)

    console.log({ data, isLoading, isError })
    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <Table>
                <TableCaption>A list of all books.</TableCaption>
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
                <TableBody>
                    {!isLoading && data.books.map((book) => (
                        <TableRow key={book._id}>
                            <TableCell className="font-medium">{book?.title}</TableCell>
                            <TableCell>{book?.author}</TableCell>
                            <TableCell>{book?.genre}</TableCell>
                            <TableCell className="text-right">{book?.isbn}</TableCell>
                            <TableCell className="text-right">{book?.copies}</TableCell>
                            <TableCell className="text-right">{book?.available ? "Available" : "Unavailable"}</TableCell>
                            <TableCell className="text-right">{book?.title}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default books