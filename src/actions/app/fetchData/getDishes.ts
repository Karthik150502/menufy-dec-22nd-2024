'use server'

import { getSession } from "@/auth/getSession"
import prisma from "@/lib/prisma/db";

export async function getDishes(restId: number, catId: string) {
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
                id: catId,
            },
        },
        orderBy: [{ createdAt: "desc" }],
        include: {
            category: {
                select: {
                    id: true, name: true
                }
            }
        }
    })

    return res;
}