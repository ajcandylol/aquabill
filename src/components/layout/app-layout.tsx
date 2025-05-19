"use client";

import type { ReactNode } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarInset,
} from "@/components/ui/sidebar";
import { SidebarNav } from "./sidebar-nav";
import { Toaster } from "@/components/ui/toaster";
import { usePathname } from "next/navigation";
import { capitalize } from "@/lib/utils"; // Will create this utility

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  let pageTitle = "Dashboard";
  if (pathname === "/") {
    pageTitle = "Dashboard";
  } else {
    const pathSegments = pathname.split("/").filter(Boolean);
    pageTitle = pathSegments.length > 0 ? capitalize(pathSegments[pathSegments.length - 1]) : "AquaBill";
  }


  return (
    <SidebarProvider defaultOpen>
      <Sidebar variant="sidebar" collapsible="icon">
        <SidebarNav />
      </Sidebar>
      <SidebarInset className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-background/80 backdrop-blur-sm border-b md:px-6">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <h1 className="text-xl font-semibold text-foreground">{pageTitle}</h1>
          </div>
          {/* Placeholder for user menu or other header actions */}
        </header>
        <main className="flex-1 p-4 overflow-auto md:p-6">
          {children}
        </main>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}
