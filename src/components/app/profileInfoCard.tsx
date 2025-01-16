'use client'
import React from 'react'
import { signOut } from 'next-auth/react'
import { Check, X } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '../ui/button'
import Image from 'next/image'
import ProfileAvatar from './profileAvatar'
import { useCurrentUser } from '@/hooks/use-current-user'
import EditProfileDialog from './editProfileDialog'
import ConfirmModal from './confirmModal'
export default function Profile() {
    const user = useCurrentUser();

    return (
        <Popover>
            <PopoverTrigger>
                <ProfileAvatar />
            </PopoverTrigger>
            <PopoverContent>
                <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <div className='w-full relative flex flex-col items-center justify-canter gap-2'>
                        <Image alt={user?.name ? user.name : "User profile pic"} src={user?.image ? user.image : "https://cdn-icons-png.flaticon.com/128/847/847969.png"} height={100} width={100} className='rounded-full object-cover border h-[100px] w-[100px]' />
                    </div>
                    <div className='w-full flex flex-col items-start justify-canter gap-2'>
                        <p className='text-xl'>{user?.name}</p>
                        <p className='text-sm text-muted-foreground'>{user?.email}</p>
                        <div className='flex items-center justify-center'>
                            <p className='text-sm text-muted-foreground'>Enabled two factor authentication</p>
                            {
                                user?.isTwoFactorEnabled ? <Check size={18} className='stroke-green-400' /> : <X size={18} className='stroke-red-400' />
                            }
                        </div>
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                        <EditProfileDialog />
                        <ConfirmModal
                            label='You sure?'
                            description='Are you sure you want to logout?'
                            onConfirmAction={() => {
                                signOut({
                                    callbackUrl: "/",
                                })
                            }}
                            onConfirmVariant={"destructive"}
                        >
                            <Button variant={"destructive"}>Sign Out</Button>
                        </ConfirmModal>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
