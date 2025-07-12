import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Textarea } from "./ui/textarea"
import { useGetBookByIdQuery, useUpdateBookMutation } from "@/redux/api/baseApi"
import { useParams } from "react-router-dom";
import React from "react"
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner"
import { useNavigate } from "react-router-dom";


const GENRE_OPTIONS = ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"];

const formSchema = z.object({
    title: z.string().min(1, { message: "Title is required." }),
    author: z.string().min(1, { message: "Author is required." }),
    genre: z.enum(GENRE_OPTIONS as [string, ...string[]], {
        errorMap: (issue, ctx) => {
            if (issue.code === z.ZodIssueCode.invalid_enum_value) {
                return { message: `Invalid genre. Must be one of: ${GENRE_OPTIONS.join(", ")}` };
            }
            return { message: ctx.defaultError };
        },
    }),
    isbn: z.string().min(1, { message: "ISBN is required." }),
    copies: z.coerce.number().min(0, { message: "Copies must be a positive number." }),
    description: z.string().optional(),
    available: z.boolean().optional(),
});


const UpdateBook = () => {
    const navigate = useNavigate();
    const { bookId } = useParams();
    const idToFetch = typeof bookId === 'string' ? bookId : undefined;

    const { data: fetchedBookData, isLoading: isBookLoading, isError: isBookError, isSuccess: isBookSuccess } = useGetBookByIdQuery(idToFetch as string, {
        skip: !idToFetch,
    });
    const [updateBookMutation, { isLoading: isUpdating }] = useUpdateBookMutation();


    // set default values
    const defaultFormValues = React.useMemo(() => {
        if (fetchedBookData && fetchedBookData.book) {
            return {
                title: fetchedBookData.book.title,
                author: fetchedBookData.book.author,
                genre: fetchedBookData.book.genre,
                isbn: fetchedBookData.book.isbn,
                copies: fetchedBookData.book.copies,
                description: fetchedBookData.book.description || "",
                available: fetchedBookData.book.available,
            };
        }
        return undefined;
    }, [fetchedBookData]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultFormValues, 
        values: defaultFormValues, 
    });
    React.useEffect(() => {
        if (isBookSuccess && fetchedBookData && fetchedBookData.book) {
            form.reset(defaultFormValues);
        }
    }, [isBookSuccess, fetchedBookData, form.reset, defaultFormValues]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!idToFetch) {
            toast.error("Book ID is missing for update.");
            return;
        }
        
        try {
            await updateBookMutation({ _id: idToFetch, data: values }).unwrap();
            
            toast.success("Book updated successfully!");
            
            navigate('/');
        } catch (error: any) {
            console.error("Failed to update book:", error);
            toast.error(`Failed to update book: ${error.data?.message || error.message || 
                'An unknown error occurred.'}`);
        }
    };
    if (isBookLoading || isUpdating) {
        return <p className="p-4 lg:p-20 text-center">Loading book details...</p>;
    }

    if (isBookError || !fetchedBookData || !fetchedBookData.book) {
        return <p className="p-4 lg:p-20 text-center text-red-500">Error 
        loading book or book not found.</p>;
    }

    return (
        <div className="px-4 lg:px-20">
            <h2 className="text-center text-3xl font-bold py-4 ">Update A Book</h2>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {/* for title */}
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="mb-2">
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input type="text"  placeholder="Book Title" {...field} value={field.value || " "} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {/* for author */}
                    <FormField
                        control={form.control}
                        name="author"
                        render={({ field }) => (
                            <FormItem className="mb-2">
                                <FormLabel>Author</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Book Author" {...field} value={field.value || " "} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {/* for genre */}
                    <FormField
                        control={form.control}
                        name="genre"
                        render={({ field }) => (
                            <FormItem className="mb-2">
                                <FormLabel>Genre</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Book Genre" {...field} value={field.value || " "} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {/* for ISBN */}
                    <FormField
                        control={form.control}
                        name="isbn"
                        render={({ field }) => (
                            <FormItem className="mb-2">
                                <FormLabel>ISBN</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Book ISBN" {...field} value={field.value || " "} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {/* for copies */}
                    <FormField
                        control={form.control}
                        name="copies"
                        render={({ field }) => (
                            <FormItem className="mb-2">
                                <FormLabel>Copies</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Book copies" {...field} value={field.value || " "} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {/* for description */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="mb-2">
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Book description" {...field} value={field.value || " "} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="mb-2">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default UpdateBook;