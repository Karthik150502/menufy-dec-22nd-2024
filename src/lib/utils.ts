import { ItemType, SidebarSingleItemType } from "@/types/ui";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Env } from "./config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const flattenItems = (items: SidebarSingleItemType[]): ItemType[] => {
  return items.reduce((acc, item) => {
    return [...acc, ...item.items]
  }, [] as ItemType[]);
};

export const getS3ImageKey = (fileUrl: string) => {
  return fileUrl.replace(`https://${Env.AWS_S3_BUCKET_NAME}.s3.${Env.AWS_S3_REGION_NAME}.amazonaws.com/`, "")
}