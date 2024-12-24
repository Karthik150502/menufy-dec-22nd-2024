import { Category, Restaurant } from "@prisma/client"
type CategoryType = Pick<Category, 'id' | 'name'>
type RestaurantType = Pick<Restaurant, 'id' | 'name'>

export type RestaurantOptionsType = {
    restaurants?: RestaurantType[]
}
export type CategoryOptionsType = {
    categories?: CategoryType[]
}

export type OptionsType = RestaurantOptionsType & CategoryOptionsType;
