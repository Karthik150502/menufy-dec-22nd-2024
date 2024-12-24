'use client'
import React, { useState } from 'react'

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateProfileSchema, UpdateProfileSchemaType } from '@/schema';
import { z } from 'zod';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { updateProfile } from '@/actions/update-profile';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
export default function EditProfileDialog() {
    const user = useCurrentUser();

    const [open, setOpen] = useState<boolean>(false)
    const form = useForm<z.infer<typeof UpdateProfileSchema>>({
        resolver: zodResolver(UpdateProfileSchema),
        defaultValues: {
            name: user?.name || '',
            email: user?.tempEmail ? user.tempEmail : user?.email ? user.email : '',
            role: user?.role || 'USER',
            isTwoFactorEnabled: user?.isTwoFactorEnabled || false
        }
    });


    const updateMutation = useMutation({
        mutationKey: [""],
        mutationFn: async (values: UpdateProfileSchemaType) => {
            await updateProfile(values)
        },
        onSuccess: () => {
            toast.success("Updated the profile", { id: "profile=update" })
            setOpen(false)

        },
        onError: () => {
            toast.error("Error while updating the profile", { id: "profile=update" })
            setOpen(false)

        }
    })

    const onSubmit = (values: z.infer<typeof UpdateProfileSchema>) => {
        toast.loading("Updating the profile", { id: "profile=update" })
        updateMutation.mutate(values)
    };


    return (

        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"outline"}>Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="w-full">
                <DialogHeader>
                    <DialogTitle>Profile Info</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form action="" className='w-full h-full' onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='w-full h-full flex flex-col justify-center items-center gap-2'>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                className='w-full'
                                                {...field}
                                                placeholder='Steve Roger'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                className='w-full'
                                                placeholder='steveroger@gmail.com'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="isTwoFactorEnabled"
                                render={({ field }) => (
                                    <FormItem className='w-full flex items-center justify-between'>
                                        <FormLabel>Enable two Factor Authentication </FormLabel>
                                        <FormControl>
                                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <p className='text-sm'>{field.value ? "Enabled" : "Disabled"}</p>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='w-full flex items-center justify-center gap-2 py-2'>
                                <Button type="button" variant={"outline"} onClick={() => setOpen(false)}>Cancel</Button>
                                <Button type="submit">Submit</Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}
