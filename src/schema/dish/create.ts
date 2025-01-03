import { z } from 'zod';
const DishStatus = z.enum([
    "AVAILABLE",
    "UNAVAILABLE",
    "INPREPARATION",
    "ARCHIVED"
])

export const DishCreateSchema = z.object({
    name: z.string().min(1, "Enter the name for the dish").max(50, "Dish name too long"),
    description: z.string().max(150, "Description too long").optional(),
    price: z.string().optional(),
    categoryId: z.string({ required_error: "Enter the categoryId" }),
    restaurantId: z.number({ required_error: "Enter the restaurantId" }),
    image: z.string().url().optional(),
    status: DishStatus,
});


type ImageFile = {
    imageFile?: File
}

export type DishCreateType = z.infer<(typeof DishCreateSchema)> & ImageFile;


export const DishEditSchema = z.object({
    name: z.string().min(1, "Enter the name for the dish").max(50, "Dish name too long"),
    description: z.string().max(150, "Description too long").optional(),
    price: z.string().optional(),
    categoryId: z.string({ required_error: "Enter the categoryId" }),
    restaurantId: z.number({ required_error: "Enter the restaurantId" }),
    image: z.string().url().optional(),
    status: DishStatus,
});

export type DishEditType = z.infer<(typeof DishCreateSchema)> & ImageFile;