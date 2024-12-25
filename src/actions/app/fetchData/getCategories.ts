'use server'
import { getSession } from "@/auth/getSession"
import prisma from "@/lib/db";
import { CategoryOptionsType } from "@/types/optionsProvider";

export async function getCategories(restId: number | null | undefined): Promise<CategoryOptionsType> {
    const session = await getSession();
    if (!session?.user) {
        throw new Error("Unauthenticated")
    }
    if (!restId) {
        return {
            categories: []
        };
    }
    const res = await prisma.category.findMany({
        where: {
            restaurantId: restId
        },
        select: {
            id: true,
            name: true
        }
    })
    return {
        categories: res
    };
}
