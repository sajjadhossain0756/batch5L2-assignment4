import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateBookMutation } from "@/redux/api/baseApi";
import type { Ibooks } from "@/redux/interfaces/books.interface";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";



const AddBook = () => {
    const navigate = useNavigate()
    const form = useForm();

    const [createBook, {isLoading, isError }] = useCreateBookMutation();

    const onSubmit = async (Data: Ibooks) => {
        const bookData = {
            ...Data,
            available: true
        }

        try {
            await createBook(bookData).unwrap();

            toast.success("Book created successfully!");

            navigate('/');
        } catch (error: any) {
            console.error("Failed to create book:", error);
            toast.error(`Failed to create book: ${error.data?.message || error.message ||
                'An unknown error occurred.'}`);
        }
        
        form.reset()
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

export default AddBook