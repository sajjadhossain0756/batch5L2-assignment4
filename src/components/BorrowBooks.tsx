import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useBorrowBooksMutation } from "@/redux/api/baseApi";
import { useForm } from "react-hook-form"
import { Calendar } from "@/components/ui/calendar"; import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useNavigate, useParams } from "react-router-dom";
import * as z from "zod"
import { toast } from "sonner";
// import type { IBorrowBooks } from "@/redux/interfaces/borrowBook.interface";
import { zodResolver } from "@hookform/resolvers/zod";


const borrowFormSchema = z.object({
    quantity: z.coerce.number().min(1, { message: "Quantity must be at least 1." }),
    dueDate: z.date({
        required_error: "A due date is required.",
        invalid_type_error: "Invalid date format.",
    }),
});
const BorrowBooks = () => {
    const { bookId } = useParams();
    const navigate = useNavigate();

    const [borrowBook, { isLoading:isBorrowing, isError }] = useBorrowBooksMutation()
    console.log(borrowBook)

    const form = useForm<z.infer<typeof borrowFormSchema>>({
        resolver: zodResolver(borrowFormSchema),
        defaultValues: {
            quantity: 1,
        },
    });
    const onSubmit = async (Data: z.infer<typeof borrowFormSchema>) => {
        if (!bookId) {
            toast.error("Book ID is missing for borrow.");
            return;
        }
        const formattedDueDate = format(Data.dueDate, "yyyy-MM-dd");
        const borrowPayload = {
            book: bookId, 
            quantity: Data.quantity,
            dueDate: formattedDueDate, 
        };
        try {
            await borrowBook(borrowPayload).unwrap();

            toast.success("Book Borrowed successfully!");

            navigate('/borrow-summary');
        } catch (error: any) {
            console.error("Failed to Borrow book:", error);
            toast.error(`Failed to Borrow book: ${error.data?.message || error.message ||
                'An unknown error occurred.'}`);
        }
        console.log(borrowPayload)
        form.reset()
    }

    if (isBorrowing) {
        return <p className="p-4 lg:p-20 text-center">Loading book details...</p>;
    }

    if (isError) {
        return <p className="p-4 lg:p-20 text-center text-red-500">Error
            loading book or book not found.</p>;
    }
    return (
        <div className="px-4 lg:px-40">
            <h2 className="text-center text-3xl font-bold py-4 ">Borrow A Book</h2>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {/* for quantity */}
                    <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                            <FormItem className="mb-2">
                                <FormLabel>Quantity</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Book Quantity" {...field} />
                                </FormControl>
                                <FormMessage /> 
                            </FormItem>
                        )}
                    />
                    {/* for due date */}
                    <FormField
                        control={form.control}
                        name="dueDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Due Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            captionLayout="dropdown"
                                        />
                                    </PopoverContent>
                                </Popover>

                                <FormMessage /> 
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="my-2"> {isBorrowing ? "Submitting..." : "Submit"}</Button>
                </form>
            </Form>
        </div>
    )
}

export default BorrowBooks