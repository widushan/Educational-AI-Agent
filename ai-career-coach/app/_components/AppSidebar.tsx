import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { Home, Inbox, Calendar, Search, Settings } from 'lucide-react'
import Image from 'next/image'

const sidebarItems = [
  { label: 'Home', icon: Home },
  { label: 'Inbox', icon: Inbox },
  { label: 'Calendar', icon: Calendar },
  { label: 'Search', icon: Search },
  { label: 'Settings', icon: Settings },
]

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex flex-col gap-1 px-5 py-5">
          <Image
            src="/web_logo.svg"
            alt="App logo"
            width={300}
            height={250}
            className="h-20 w-auto object-contain"
          />
          <span className="text-[11px] text-muted-foreground">
            Build Awesome
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => {
                const Icon = item.icon
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton>
                      <Icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <p className="px-3 pb-1 text-[11px] text-muted-foreground">
          Copyright @Tubeguruji
        </p>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

export default AppSidebar