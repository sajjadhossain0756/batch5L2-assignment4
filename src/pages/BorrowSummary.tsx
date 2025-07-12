import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetBorrowBooksQuery } from "@/redux/api/baseApi";
import type { IBorrowBookSummary } from "@/redux/interfaces/borrowBook.interface";


const BorrowSummary = () => {
  const { data:borrowBook, isLoading} = useGetBorrowBooksQuery(undefined);
  console.log(borrowBook)
  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className="px-4 lg:px-10 lg:py-5">
      <Table>
        <TableCaption className="sr-only">Summary of all Borrowed books.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead className="text-right">ISBN</TableHead>
            <TableHead className="text-right">Total Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody >
          {!isLoading && borrowBook?.data?.map((borrowBook: IBorrowBookSummary) => (
            
            <TableRow key={borrowBook?.book?.isbn} >
              <TableCell className="font-medium">{borrowBook?.book?.title}</TableCell>
              <TableCell className="text-right">{borrowBook?.book?.isbn}</TableCell>
              <TableCell className="text-right">{borrowBook?.totalQuantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default BorrowSummary