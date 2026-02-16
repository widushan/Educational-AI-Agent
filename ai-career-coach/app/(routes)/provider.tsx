"use client"
import React from 'react'
import {
  SidebarProvider,
  SidebarInset,
} from '@/components/ui/sidebar';
import AppHeader from '../_components/AppHeader';
import AppSidebar from '../_components/AppSidebar';

function DashboardProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div className="flex-1 px-1 py-3">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardProvider
