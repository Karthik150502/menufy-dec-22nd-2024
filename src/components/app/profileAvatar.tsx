'use client'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useCurrentUser } from '@/hooks/use-current-user';
export default function ProfileAvatar() {
    const user = useCurrentUser();
    const initials = user?.name?.split(" ").slice(0, 2).reduce((acc, val) => {
        return acc.charAt(0).toUpperCase() + val.charAt(0).toUpperCase()
    }, "")
    return (
        <Avatar>
            <AvatarImage src={user?.image ?? "https://cdn-icons-png.flaticon.com/128/847/847969.png"} />
            <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
    )
}
