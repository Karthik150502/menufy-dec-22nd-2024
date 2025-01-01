'use server'

import { getSession } from "@/auth/getSession"
import prisma from "@/lib/prisma/db";

export async function getDish(dishId: string) {
    const session = await getSession();
    if (!session?.user) {
        throw new Error("Unauthenticated")
    }
    const res = await prisma.dish.findUnique({
        where: {
            id: dishId
        }
    })
    return res;
}