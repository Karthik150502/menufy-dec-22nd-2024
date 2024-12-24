'use client'
import { useMemo } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Brand } from "./auth/brand"
import { SidebarItemInfo, SidebarItems } from "@/lib/config"
import { Separator } from "./ui/separator"
import { PowerOff, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname, useSearchParams } from "next/navigation"
import { signOut } from "next-auth/react"
import { GlobalRestaurantSelc } from "./app/globalRestaurantSelector"
import { useMenufyOptions } from "@/providers/optionsProvider"
import Link from "next/link"
import LoaderCmp from "./app/loader"
import ConfirmModal from "./app/confirmModal"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const pathname = usePathname();
  const activeRoute = useMemo(() => SidebarItems.find(i => pathname.includes(i.url))?.url, [pathname])
  const options = useMenufyOptions();
  const searchParams = useSearchParams();




  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Brand size="2xl" />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {SidebarItemInfo.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <Separator />
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title} className={cn("opacity-80 transition-opacity border-b hover:opacity-100 duration-300", activeRoute === item.url && "opacity-100")}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <SidebarGroup >
          <SidebarGroupLabel>Restaurant</SidebarGroupLabel>
          <Separator />
          <SidebarGroupContent>
            <SidebarMenu className="py-2">
              <GlobalRestaurantSelc />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <Separator />
          <SidebarGroupContent>
            <SidebarMenu>
              {options?.categories ? options?.categories.map((item) => (
                <SidebarMenuItem key={item.id} className={cn("flex items-center justify-center pr-2 border-b opacity-80 transition-opacity hover:opacity-100 duration-300")}>
                  <SidebarMenuButton asChild >
                    <Link href={`/dishes?categoryId=${item.id}`}>{item.name}</Link>
                  </SidebarMenuButton>
                  {
                    searchParams.get("categoryId") === `${item.id}` && <Check size={15} />
                  }
                </SidebarMenuItem>
              )) : <LoaderCmp />}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent >

      <SidebarRail />
      <SidebarFooter>
        <ConfirmModal label='You sure?' description='Are you sure you want to logout?' onConfirmAction={() => signOut()}>
          <div className="text-xs cursor-pointer opacity-60 transition-opacity hover:opacity-100 duration-300 flex items-center justify-center gap-2">
            <PowerOff strokeWidth={1} size={15} /> <p>Sign out</p>
          </div>
        </ConfirmModal>
      </SidebarFooter>
    </Sidebar >
  )
}
