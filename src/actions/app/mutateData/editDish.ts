"use server"

import { getSession } from "@/auth/getSession";
import prisma from "@/lib/prisma/db";
import { DishCreateSchema, DishEditType } from "@/schema/dish/create";


export async function editDish(id: string, values: DishEditType) {
    const session = await getSession();
    if (!session?.user) {
        throw new Error("Unauthenticated")
    }
    const { data, success } = DishCreateSchema.safeParse(values)
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