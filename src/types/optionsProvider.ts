import { Category, Restaurant } from "@prisma/client"
import { LucideIcon } from "lucide-react"
type CategoryType = Pick<Category, 'id' | 'name'>
type RestaurantType = Pick<Restaurant, 'id' | 'name'>

export type RestaurantOptionsType = {
    restaurants?: RestaurantType[]
}
export type CategoryOptionsType = {
    categories?: CategoryType[]
}

export type OptionsType = RestaurantOptionsType & CategoryOptionsType;


export type LinkItem = {
    label: string,
    link: string,
    icon: LucideIcon
}