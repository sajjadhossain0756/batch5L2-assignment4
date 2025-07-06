import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateBookMutation } from "@/redux/api/baseApi";
import { useForm } from "react-hook-form"



const AddBook = () => {

    const form = useForm();

    const [createBook,{data,isLoading,isError}] = useCreateBookMutation();

    const onSubmit = (Data) => {
        const bookData = {
            ...Data,
            available: true
        }
        createBook(bookData);
        console.log(bookData)
        form.reset()
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
                        render={({field}) => (
                            <FormItem className="mb-2">
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input type="text"  placeholder="Book Title" {...field} value={field.value || " "}  />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {/* for author */}
                    <FormField
                        control={form.control}
                        name="author"
                        render={({field}) => (
                            <FormItem className="mb-2">
                                <FormLabel>Author</FormLabel>
                                <FormControl>
                                    <Input type="text"  placeholder="Book Author" {...field} value={field.value || " "}  />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {/* for genre */}
                    <FormField
                        control={form.control}
                        name="genre"
                        render={({field}) => (
                            <FormItem className="mb-2">
                                <FormLabel>Genre</FormLabel>
                                <FormControl>
                                    <Input type="text"  placeholder="Book Genre" {...field} value={field.value || " "}  />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {/* for ISBN */}
                    <FormField
                        control={form.control}
                        name="isbn"
                        render={({field}) => (
                            <FormItem className="mb-2">
                                <FormLabel>ISBN</FormLabel>
                                <FormControl>
                                    <Input type="text"  placeholder="Book ISBN" {...field} value={field.value || " "}  />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {/* for copies */}
                    <FormField
                        control={form.control}
                        name="copies"
                        render={({field}) => (
                            <FormItem className="mb-2">
                                <FormLabel>Copies</FormLabel>
                                <FormControl>
                                    <Input type="number"  placeholder="Book copies" {...field} value={field.value || " "}  />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {/* for description */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({field}) => (
                            <FormItem className="mb-2">
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea   placeholder="Book description" {...field} value={field.value || " "}  />
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