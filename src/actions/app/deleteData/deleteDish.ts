'use server'
import prisma from "@/lib/prisma/db";
import { getSession } from "@/auth/getSession"
import { S3Handler } from "@/lib/s3/s3-main";


export async function deleteDish(id: string) {
    const session = await getSession();
    if (!session?.user) {
        throw new Error("Unauthenticated")
    }
    const dish = await prisma.dish.delete({
        where: {
            id: id
        }
    })
    if (dish.imageKey) {
        await S3Handler.deletObject(dish.imageKey)
    }
}



