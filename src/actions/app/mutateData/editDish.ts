"use server"

import { getSession } from "@/auth/getSession";
import prisma from "@/lib/prisma/db";
import { DishEditSchema, DishEditType } from "@/schema/dish/create";


export async function editDish(id: string, values: DishEditType) {
    const session = await getSession();
    if (!session?.user) {
        throw new Error("Unauthenticated")
    }
    const { data, success } = DishEditSchema.safeParse(values)
    if (!success) {
        throw new Error("Invalid values.")
    }
    await prisma.dish.update({
        where: {
            id
        },
        data: {
            ...data,
            price: data.price ? parseInt(data.price) : 0
        }
    })
}