"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import axios from "axios";
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
      {children}
    </SidebarProvider>
  )
}

export default DashboardProvider
