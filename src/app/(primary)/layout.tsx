
import { AppSidebar } from "@/components/app-sidebar"
import BreadCrumbHeader from "@/components/app/breadCrumb"
import CurrentRestaurant from "@/components/app/currentRestaurant"
import FloatingDockDashboard from "@/components/app/floatingDockDashboard"
import Profile from "@/components/app/profileInfoCard"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { DarkModeToggle } from "@/components/ui/themeSwitch"
import MenufyOptsProvider from "@/providers/optionsProvider"
import React from "react"

export default function LayoutPage({ children }: { children: React.ReactNode }) {
    return (
        <MenufyOptsProvider>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b p-2">
                        <div className="h-full flex items-center justify-center gap-2">
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="mr-2 h-4" />
                            <CurrentRestaurant />
                            <Separator orientation="vertical" className="mr-2 h-4" />
                            <BreadCrumbHeader />
                        </div>
                        <div className="flex items-center justify-center gap-4">
                            <DarkModeToggle />
                            <Profile />
                        </div>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4 relative">
                        {children}
                        <FloatingDockDashboard />
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </MenufyOptsProvider>
    )
}
