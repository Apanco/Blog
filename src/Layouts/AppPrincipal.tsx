import { AppSidebar } from "@/components/App-Sidebar"
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"

export default function LayourPrincipal() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className=" w-full">
                <header className=" py-5 px-2 flex border-b ">
                    <SidebarTrigger className="ml-1" />
                </header>
                <Outlet/>

            </main>
        </SidebarProvider>
    )
}
