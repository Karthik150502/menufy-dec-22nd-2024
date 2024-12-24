import { SidebarItemType } from "@/types/ui";
import { flattenItems } from "./utils";

export class Env {
    static readonly DEV: boolean = process.env.NODE_ENV === 'development';
    static readonly PROD: boolean = process.env.NODE_ENV === 'production';
    static readonly GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID! as string;
    static readonly GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET! as string;
    static readonly BASE_URL: string = process.env.AUTH_URL! as string;
    static readonly DEFAULT_SIGNIN_REDIRECT: string = "/dashboard"
    static readonly AWS_S3_ACCESS_KEY: string = process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY! as string;
    static readonly AWS_S3_SECRET_ACCESS_KEY: string = process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY! as string;
    static readonly AWS_S3_BUCKET_NAME: string = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME! as string;
    static readonly AWS_S3_REGION_NAME: string = process.env.NEXT_PUBLIC_AWS_S3_REGION_NAME! as string;

}



export const SidebarItemInfo: SidebarItemType = [
    {
        title: "Menu",
        url: "/",
        items: [
            {
                title: "Dashboard",
                url: "/dashboard",
            },
            {
                title: "Create a Bill",
                url: "/create-bill",
            },
            {
                title: "Customer View",
                url: "/customer-view",
            },
        ],
    },

]


export const SidebarItems = flattenItems(SidebarItemInfo);