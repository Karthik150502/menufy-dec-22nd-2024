'use client'
import React, { useState } from 'react'

import {
    Form,
    FormControl,
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
import { useCurrentUser } from '@/hooks/use-current-user';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { updateProfile } from '@/actions/update-profile';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import ProfileImageUploader from './profileImageUploader';
import { uploadProfileImageS3 } from '@/actions/client/uploadProfileImage';
import { useSession } from 'next-auth/react';
export default function EditProfileDialog() {
    const user = useCurrentUser();
    const { update } = useSession()
    console.log("User profile = ", user);

    const [open, setOpen] = useState<boolean>(false)
    const form = useForm<UpdateProfileSchemaType>({
        resolver: zodResolver(UpdateProfileSchema),
        defaultValues: {
            name: user?.name || '',
            email: user?.tempEmail ? user.tempEmail : user?.email ? user.email : '',
            role: user?.role || 'USER',
            isTwoFactorEnabled: user?.isTwoFactorEnabled || false,
            ...(user?.image && { image: user.image })
        }
    });


    const updateMutation = useMutation({
        mutationKey: ["edit-profile", user?.image],
        mutationFn: async ({ values, imageFile }: { values: UpdateProfileSchemaType, imageFile?: File | null }) => {

            const { image: updatedImage } = values;
            const image = (await uploadProfileImageS3({
                imageFile,
                profileImage: user?.image,
                updatedImage,
                userId: user?.id
            }))[0];

            return await updateProfile({ ...values, image })
        },
        onSuccess: (data) => {
            toast.success("Updated the profile", { id: "profile=update" })
            setOpen(false)
            const { updatedUser } = data;
            update({
                name: updatedUser.name,
                isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
                role: updatedUser.role,
                image: updatedUser.image
            })
        },
        onError: (error) => {
            console.log("Error: ", error)
            toast.error("Error while updating the profile", { id: "profile=update" })
            setOpen(false)

        }
    })

    const onSubmit = (values: UpdateProfileSchemaType) => {
        toast.loading("Updating the profile", { id: "profile=update" })
        updateMutation.mutate({
            values,
            imageFile: form.getValues("imageFile")
        })
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
                                name="imageFile"
                                render={({ field }) => (
                                    <FormItem className='w-full flex items-center justify-center'>
                                        <FormControl>
                                            <ProfileImageUploader
                                                name={user?.name}
                                                setImage={(url: string) => {
                                                    form.setValue("image", url);
                                                }}
                                                image={form.getValues("image")}
                                                setFile={field.onChange} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                                <Button type="button" className='w-full' variant={"outline"} onClick={() => setOpen(false)}>Cancel</Button>
                                <Button type="submit" className='w-full'>Submit</Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}
