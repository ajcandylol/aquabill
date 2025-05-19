"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, History, Settings as SettingsIcon, CreditCard, Activity } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { AquaBillIcon } from "@/components/icons";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/consumption", label: "Log Consumption", icon: Activity },
  { href: "/billing", label: "View Bill", icon: CreditCard },
  { href: "/history", label: "Billing History", icon: History },
  { href: "/settings", label: "Settings", icon: SettingsIcon },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-4 py-6 mb-4 border-b border-sidebar-border">
        <AquaBillIcon className="w-8 h-8 text-primary" />
        <h1 className="text-xl font-semibold text-primary">AquaBill</h1>
      </div>
      <SidebarMenu className="flex-1 px-2">
        {navItems.map((item) => (
          <SidebarMenuItem key={item.label}>
            <Link href={item.href} passHref legacyBehavior>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{ children: item.label, side: "right", align: "center" }}
                className={cn(
                  "justify-start",
                  pathname === item.href && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
              >
                <a>
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.label}</span>
                </a>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <div className="p-4 mt-auto text-xs text-center text-sidebar-foreground/70">
        © {new Date().getFullYear()} AquaBill Inc.
      </div>
    </div>
  );
}
