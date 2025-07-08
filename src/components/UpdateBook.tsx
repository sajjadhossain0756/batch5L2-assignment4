import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Textarea } from "./ui/textarea"
import { useGetBooksQuery } from "@/redux/api/baseApi"



const UpdateBook = () => {
    
    const form = useForm();
    const { data, isLoading, isError } = useGetBooksQuery(undefined);
   
    // const updateBookId = (id) =>{
    //     console.log(id);
    // }

    const onSubmit = (Data) => {

        console.log(Data)
        form.reset()
    }

    return (
        <div>
            <Dialog>
                <form>
                    <DialogTrigger asChild>
                        <Button >Update</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                        <DialogHeader>
                            <DialogTitle>Update Book Data</DialogTitle>
                            <DialogDescription className="sr-only">
                                Update Book Data
                            </DialogDescription>
                        </DialogHeader>
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
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button type="submit">Submit</Button>
                                </DialogFooter>
                            </form>
                        </Form>

                    </DialogContent>
                </form>
            </Dialog>
        </div>
    )
}

export default UpdateBook;