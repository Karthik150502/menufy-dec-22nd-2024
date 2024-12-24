import { ItemType, SidebarSingleItemType } from "@/types/ui";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const flattenItems = (items: SidebarSingleItemType[]): ItemType[] => {
  return items.reduce((acc, item) => {
    return [...acc, ...item.items]
  }, [] as ItemType[]);
};