import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
  } from "@/components/ui/sidebar"
  import { NavMain } from "@/components/nav-main"
import { FileText, Folder } from "lucide-react"
import AppSideHeader from "./AppSideHeader"


  const data = {
    navMain:[
        {
            title:"Categorias",
            url:"#",
            icon:Folder,
            isActive:true,
            items:[
                {
                    title:"Mis categorias",
                    url:"#"
                },
                {
                    title:"Crear categoria",
                    url:"#"
                },
            ]
        },
        {
            title:"Blogs",
            url:"#",
            icon:FileText,
            isActive:true,
            items:[
                {
                    title:"Dashboard",
                    url:"#"
                },
                {
                    title:"Mis blogs",
                    url:"#"
                },
                {
                    title:"Crear blog",
                    url:"#"
                },
            ]
        }
    ]
  }

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
      <Sidebar collapsible="icon" {...props} className=" z-50">
        <SidebarHeader>
          <AppSideHeader />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
          {/* <NavProjects projects={data.projects} /> */}
        </SidebarContent>
        <SidebarFooter>
          {/* <NavUser user={data.user} /> */}
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    )
  }