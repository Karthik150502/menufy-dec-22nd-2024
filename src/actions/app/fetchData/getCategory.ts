'use server'

import prisma from "@/lib/prisma/db"

export async function getCategory(id: string) {
    return prisma.category.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            name: true
        }
    })
}