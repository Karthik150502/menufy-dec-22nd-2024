import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
  // .$extends({
  //   query: {
  //     dish: {
  //       create: async ({ args, query }) => {

  //         const restaurant = await prisma.restaurant.findUnique({
  //           where: { id: args.data.restaurantId },
  //           select: { lastDishNo: true },
  //         });

  //         args.data.itemNo = (restaurant?.lastDishNo ?? 0) + 1;
  //         const next = query(args)
  //         await prisma.$transaction([
  //           prisma.restaurant.update({
  //             where: { id: args.data.restaurantId },
  //             data: {
  //               lastDishNo: { increment: 1 }, // Increment `lastDishNo`
  //             },
  //           }),
  //           next
  //         ]);
  //         return next;
  //       },
  //       delete: async ({ args, query }) => {

  //         const restaurantId = (await prisma.dish.findUnique({
  //           where: { id: args.where.id },
  //           select: { restaurantId: true },
  //         }))?.restaurantId


  //         const next = query(args)
  //         await prisma.$transaction([
  //           prisma.restaurant.update({
  //             where: { id: restaurantId },
  //             data: {
  //               lastDishNo: { decrement: 1 },
  //             },
  //           }),
  //           next
  //         ]);
  //         return next;
  //       },
  //     }
  //   }
  // })
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma


