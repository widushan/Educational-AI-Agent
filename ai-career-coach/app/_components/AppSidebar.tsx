import React from 'react'
import Link from 'next/link'
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
import { Layers, Inbox, Calendar, UserCircle } from 'lucide-react'
import Image from 'next/image'

const sidebarItems = [
  { label: 'Workspace', icon: Layers, path: '/dashboard' },
  { label: 'AI Tools', icon: Inbox, path: '/ai-tools' },
  { label: 'My History', icon: Calendar, path: '/my-history' },
  { label: 'Profile', icon: UserCircle, path: '/profile' },
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
            Build Awesome Skills With AI
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
                    <SidebarMenuButton asChild>
                      <Link href={item.path}>
                        <Icon />
                        <span>{item.label}</span>
                      </Link>
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
          Copyright @ PASINDU K.W
        </p>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

export default AppSidebar