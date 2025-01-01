import { DishStatus } from "@prisma/client";
import { Archive, Check, CookingPot, LucideIcon, X } from "lucide-react";


export type DishConfigType = {
    label: string,
    icon: LucideIcon,
    iconStyle: string
}

export const DishStatusLabel: Record<DishStatus, DishConfigType> = {
    [DishStatus.AVAILABLE]: {
        label: "Available",
        icon: Check,
        iconStyle: "stroke-green-400"
    },
    [DishStatus.UNAVAILABLE]: {
        label: "Unavailable",
        icon: X,
        iconStyle: "stroke-red-400"
    },
    [DishStatus.INPREPARATION]: {
        label: "In Preparation",
        icon: CookingPot,
        iconStyle: "stroke-yellow-400"
    },
    [DishStatus.ARCHIVED]: {
        label: "Item Archived",
        icon: Archive,
        iconStyle: "stroke-blue-600"
    }
}