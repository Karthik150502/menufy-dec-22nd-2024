'use server'
import prisma from "@/lib/prisma/db";
import { getSession } from "@/auth/getSession"
import { S3Handler } from "@/lib/s3/s3-main";



export async function deleteDish(ids: string[]) {
    const session = await getSession();
    if (!session?.user) {
        throw new Error("Unauthenticated")
    }
    const dishes = await prisma.dish.findMany({
        where: {
            id: {
                in: ids
            }
        }
    })

    dishes.forEach(async (item) => {
        if (item.imageKey) {
            await S3Handler.deletObject(item.imageKey)
        }
    })
}



