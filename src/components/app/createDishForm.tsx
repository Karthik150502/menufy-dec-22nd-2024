"use client"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import React from 'react'
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { DishCreateSchema, DishCreateType } from "@/schema/dish/create"
import { useMutation } from "@tanstack/react-query"
import { Input } from "../ui/input";
import { useRecoilValue } from "recoil";
import { SelectedRestaurant } from "@/store/recoil/restAtom";
import DishStatusSelector from "./dishStatusSelector";
import { DishStatus } from "@prisma/client";
import TooltipWrapper from "./tooltipWrapper";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { useInvalidateQueries } from '@/hooks/use-query-invalidate';
import ImageUploader from './imageUploader';
import axios from "axios"
import { uploadDishImageS3 } from '@/actions/client/uploadItemImageToS3';
export default function CreateDishForm({
    categoryId,
    setDialogOpen
}: {
    categoryId: string,
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {

    const rest = useRecoilValue(SelectedRestaurant);
    // const [image, setImage] = useState<File | null>(null);

    const invalidateQueries = useInvalidateQueries()
    const form = useForm<DishCreateType>({
        resolver: zodResolver(DishCreateSchema),
        defaultValues: {
            name: "",
            description: "",
            categoryId,
            restaurantId: rest?.id,
            status: DishStatus.AVAILABLE,
            image: "",
        }
    });

    const createdish = useMutation({
        mutationKey: ["dish", "create"],
        mutationFn: async (data: {
            values: DishCreateType,
            image?: File
        }) => {
            const [image, imageKey] = await uploadDishImageS3({
                imageFile: data.image,
                categoryId: data.values.categoryId,
            })
            await axios.post("api/v1/dish/create", {
                ...data.values,
                image,
                imageKey
            })
        },
        onSuccess: () => {
            toast.success("Created item", { id: "creating-item" });
            invalidateQueries(["dishes", rest?.id, categoryId])
            setDialogOpen(false);
        },
        onError: (error) => {
            console.error(error);
            if (error instanceof Error) {
                toast.error(error.message, { id: "creating-item" });
            } else {
                toast.error("Error occured while creating item", { id: "creating-item" });
            }
            setDialogOpen(false);
        }
    })

    const onSubmit = (values: DishCreateType) => {
        toast.loading("Creating item", { id: "creating-item" })
        createdish.mutate({ values, image: form.getValues("imageFile") })
    }
    return (
        <Form {...form}>
            <form className="w-full flex flex-col justify-center items-center gap-2" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="imageFile"
                    render={({ field }) => (
                        <FormItem className="w-full flex flex-col items-center justify-center">
                            <FormControl>
                                <ImageUploader setImage={(url: string) => {
                                    form.setValue("image", url)
                                }} setFile={field.onChange} image={form.getValues("image")} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    disabled={createdish.isPending}
                                    placeholder='xyx dish'
                                />

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Description <span className="text-muted-foreground text-xs font-bold">(optional)</span></FormLabel>
                            <FormControl>
                                <Textarea
                                    maxLength={250}
                                    className="max-h-[125px] no-scrollbar"
                                    {...field}
                                    disabled={createdish.isPending}
                                    placeholder='Very testy xyz'
                                />

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    disabled={createdish.isPending}
                                    placeholder='15000'
                                />
                            </FormControl>
                            <FormDescription className='text-xs'>
                                Enter price in the smallest unit, eg: for 150 Rs enter 15000, will be taken 0 if not entered.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem className="w-full flex flex-col items-center justify-between gap-2">
                            <div className='w-full flex items-center justify-between'>

                                <FormLabel>Status</FormLabel>
                                <FormControl>
                                    <TooltipWrapper content="Select the Dish/item availability status">
                                        <DishStatusSelector
                                            value={field.value}
                                            onChange={field.onChange}
                                            disabled={createdish.isPending}
                                        />
                                    </TooltipWrapper>
                                </FormControl>
                            </div>
                            <FormDescription className='text-xs'>
                                Select the status of the item, from AVAILABLE, UNAVAILABLE, or INPREPARATION.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='flex w-full items-center justify-center gap-2'>

                    <Button variant={"outline"} className="w-full" type="button" onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button className="w-full" type="submit" onClick={() => {
                        console.log(form.getValues())
                    }} >Create</Button>
                </div>
            </form>
        </Form>
    )
}
