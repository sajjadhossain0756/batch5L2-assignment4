import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useBorrowBooksMutation } from "@/redux/api/baseApi";
import { useForm } from "react-hook-form"
import { Calendar } from "@/components/ui/calendar"; import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";


const BorrowBooks = () => {
    const form = useForm();
    const { bookId } = useParams();
    const navigate = useNavigate();

    const [borrowBook, { data, isLoading, isError }] = useBorrowBooksMutation()

    const onSubmit = async (Data) => {
        if (!bookId) {
            toast.error("Book ID is missing for borrow.");
            return;
        }
        const borrowData = {
            ...Data,
            book: bookId
        }
        try {
            await borrowBook(borrowData).unwrap();

            toast.success("Book Borrowed successfully!");

            navigate('/borrow-summary');
        } catch (error: any) {
            console.error("Failed to Borrow book:", error);
            toast.error(`Failed to Borrow book: ${error.data?.message || error.message ||
                'An unknown error occurred.'}`);
        }
        console.log(borrowData)
        form.reset()
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
                                    <Input type="text" placeholder="Book Quantity" {...field} value={field.value || " "} />
                                </FormControl>
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


                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="my-2">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default BorrowBooks