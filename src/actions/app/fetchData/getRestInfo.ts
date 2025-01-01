'use server'
import { getSession } from "@/auth/getSession"
import prisma from "@/lib/prisma/db";

export async function getAllOptions() {
    const session = await getSession();
    if (!session?.user) {
        throw new Error("Unauthenticated")
    }
    const res = await prisma.restaurant.findMany({
        where: {
            userId: session?.user.id
        },
        select: {
            id: true,
            name: true,
        }
    })
    return res;
}
