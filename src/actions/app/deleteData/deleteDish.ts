import prisma from "@/lib/db";

export async function deleteDish(id: number) {
    await prisma.dish.delete({
        where: {
            id: id
        }
    })
}