'use client'
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
import { Separator } from "./ui/separator"
import { PowerOff, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import { useSetRecoilState } from "recoil"
import { SelectedCategory } from "@/store/recoil/catAtom"
import { signOut } from "next-auth/react"
import { GlobalRestaurantSelc } from "./app/globalRestaurantSelector"
import { useMenufyOptions } from "@/providers/optionsProvider"
import Link from "next/link"
import LoaderCmp from "./app/loader"
import ConfirmModal from "./app/confirmModal"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const options = useMenufyOptions();
  const sParams = useSearchParams();
  const categoryId = sParams.get("categoryId");
  const setCat = useSetRecoilState(SelectedCategory);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Brand size="2xl" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup >
          <SidebarGroupLabel>Welcome</SidebarGroupLabel>
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
              {options?.categories ? options?.categories.map((item) => {
                return <SidebarMenuItem key={item.id} className={cn("flex items-center justify-center pr-2 border-b opacity-80 transition-opacity hover:opacity-100 duration-300")}>
                  <SidebarMenuButton asChild >
                    <Link href={`/dishes?categoryId=${item.id}`} onClick={() => {
                      setCat({
                        id: item.id,
                        name: item.name
                      })
                    }}>{item.name}</Link>
                  </SidebarMenuButton>
                  {
                    categoryId === item.id && <Check size={15} />
                  }
                </SidebarMenuItem>
              }) : <LoaderCmp />}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent >

      <SidebarRail />
      <SidebarFooter>
        <ConfirmModal label='You sure?' description='Are you sure you want to logout?' onConfirmAction={() => signOut({
          callbackUrl: "/"
        })}>
          <div className="text-xs cursor-pointer opacity-60 transition-opacity hover:opacity-100 duration-300 flex items-center justify-center gap-2">
            <PowerOff strokeWidth={1} size={15} /> <p>Sign out</p>
          </div>
        </ConfirmModal>
      </SidebarFooter>
    </Sidebar >
  )
}
