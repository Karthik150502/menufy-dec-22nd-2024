import { RestaurantOptionsType } from "@/types/optionsProvider";
import { getAllOptions } from "./getRestInfo";

export async function getOptions(): Promise<RestaurantOptionsType> {
    const restaurantInfo = await getAllOptions()
    return {
        restaurants: restaurantInfo
    }
}