"use client";

import {
  Calendar,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Link as LucideLink,
  PillIcon as Pills,
  Users2,
  FormInput as Form,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  { name: "Patients", href: "/patients", icon: Users2 },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  {
    name: "Test results",
    href: "/test-results",
    icon: FileText,
  },
  {
    name: "Billing and payments",
    href: "/billing",
    icon: ClipboardList,
  },
  { name: "Drug list", href: "/drug-list", icon: Pills },
  { name: "Tasks", href: "/tasks", icon: ClipboardList },
  { name: "STCs", href: "/stcs", icon: LucideLink },
  { name: "Form Builder", href: "/form-builder", icon: Form },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-56 flex-col border-r">
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "w-full flex items-center gap-2 rounded-md p-2 my-2 transition-colors duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
