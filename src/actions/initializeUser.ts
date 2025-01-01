'use server'

import prisma from "@/lib/prisma/db"
import { User } from "@prisma/client"

export async function initializeUser(user: User) {

    const rest = await prisma.restaurant.create({
        data: {
            userId: user.id,
            name: `Default Restaurant`,
            description: `The default restaurant created for the user, can edit the info from settings.`
        }
    })
    await prisma.category.create({
        data: {
            restaurantId: rest.id,
            name: "Deserts",
        }
    })

    await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            userDataInitialized: true
        }
    })
    return true
}