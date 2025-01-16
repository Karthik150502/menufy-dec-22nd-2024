'use server'
import prisma from "@/lib/prisma/db";
import { getSession } from "@/auth/getSession"
import { S3Handler } from "@/lib/s3/s3-main";
export async function deleteDishes(ids: string[]) {
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
    const keysToDelete = dishes.filter((item) => {
        return item.imageKey !== null || undefined
    }).map(item => {
        return { Key: item.imageKey }
    });

    await prisma.dish.deleteMany({
        where: {
            id: {
                in: ids
            }
        }
    })
    if (keysToDelete.length) {
        await S3Handler.deleteObjects(keysToDelete as { Key: string }[])
    }
}



