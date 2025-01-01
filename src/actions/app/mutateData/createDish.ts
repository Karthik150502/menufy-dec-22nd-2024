"use server"

import { getSession } from "@/auth/getSession";
import prisma from "@/lib/prisma/db";
import { DishCreateSchema, DishCreateType } from "@/schema/dish/create";

export async function createDish(values: DishCreateType) {
    const session = await getSession();
    if (!session?.user) {
        throw new Error("Unauthenticated")
    }
    const { data, success, error } = DishCreateSchema.safeParse(values)
    if (!success) {
        console.log(JSON.stringify(error.errors, null, 4))
        throw new Error("Invalid values.")
    }

    await prisma.dish.create({
        data: {
            ...data,
            price: data.price ? parseInt(data.price) : 0
        }
    })
}
