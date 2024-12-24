'use server'

import { getSession } from "@/auth/getSession"
import prisma from "@/lib/db";

export async function getDishes(restId: number, catId: number) {
    const session = await getSession();
    if (!session?.user) {
        throw new Error("Unauthenticated")
    }
    const res = await prisma.dish.findMany({
        where: {
            restaurant: {
                id: restId,
            },
            category: {
                id: catId
            }
        }
    })
    return res;
}