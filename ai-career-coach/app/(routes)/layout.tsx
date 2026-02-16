import React from 'react'
import DashboardProvider from './provider';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardProvider>
      {children}
    </DashboardProvider>
  )
}