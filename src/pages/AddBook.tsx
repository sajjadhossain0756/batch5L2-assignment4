import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateBookMutation } from "@/redux/api/baseApi";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const addBookFormSchema = z.object({
    title: z.string().min(1, { message: "Title is required." }),
    author: z.string().min(1, { message: "Author is required." }),
    genre: z.enum(["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"], {
        errorMap: (issue, ctx) => {
            if (issue.code === z.ZodIssueCode.invalid_enum_value) {
                const validOptions = ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"].join(", ");
                return { message: `Invalid genre. Must be one of: ${validOptions}` };
            }
            return { message: ctx.defaultError };
        },
    }),
    isbn: z.string().min(1, { message: "ISBN is required." }),
    copies: z.coerce.number().min(0, { message: "Copies must be a positive number." }),
    description: z.string().optional(),
    available: z.boolean().optional(),
});

const AddBook = () => {
    const navigate = useNavigate()

    const [createBook, { isLoading, isError }] = useCreateBookMutation();

    const form = useForm<z.infer<typeof addBookFormSchema>>({
        resolver: zodResolver(addBookFormSchema),
        defaultValues: {
            title: "",
            author: "",
            genre: "FICTION",
            isbn: "",
            copies: 1,
            description: "",
            available: true,
        },
    });

    const onSubmit = async (Data: z.infer<typeof addBookFormSchema>) => {

        try {
            
            await createBook(Data).unwrap();

            toast.success("Book added successfully!");
            form.reset(); 
            navigate('/')
        } catch (error: any) {
            console.error("Failed to add book:", error);
            toast.error(`Failed to add book: ${error.data?.message || error.message || 'An unknown error occurred.'}`);
        }
    }
    if (isLoading) {
        return <p className="p-4 lg:p-20 text-center">Loading book details...</p>;
    }

    if (isError) {
        return <p className="p-4 lg:p-20 text-center text-red-500">Error
            loading book is not created.</p>;
    }

    return (
        <div className="px-4 lg:px-20">
            <h2 className="text-center text-3xl font-bold py-4 ">Create A New Book</h2>
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
                                    <Input type="text" placeholder="Book Title" {...field} value={field.value || " "} />
                                </FormControl>
                                <FormMessage />
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
                                <FormMessage />
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
                                <FormMessage />
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
                                <FormMessage />
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
                                <FormMessage />
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
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="mb-2">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default AddBook