'use server'
import { getSession } from "@/auth/getSession"
import prisma from "@/lib/prisma/db";

export async function getFirstCategory(restId: number | null | undefined): Promise<string | null | undefined> {
    const session = await getSession();
    if (!session?.user) {
        throw new Error("Unauthenticated")
    }
    if (!restId) {
        return null
    }
    const res = (await prisma.category.findFirst({
        where: {
            restaurantId: restId
        },
        select: {
            id: true,
            name: true
        }
    }))?.id
    return res
}
