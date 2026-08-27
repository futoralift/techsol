"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  FolderKanban,
  MessageSquareQuote,
  FileText,
  Mail,
  Newspaper,
  ImageIcon,
  Users,
  UsersRound,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/services", label: "Services", icon: Briefcase },
  { href: "/dashboard/portfolio", label: "Portfolio", icon: FolderKanban },
  { href: "/dashboard/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/dashboard/blog", label: "Blog", icon: FileText },
  { href: "/dashboard/contacts", label: "Contacts", icon: Mail },
  { href: "/dashboard/newsletter", label: "Newsletter", icon: Newspaper },
  { href: "/dashboard/media", label: "Media", icon: ImageIcon },
  { href: "/dashboard/users", label: "Users", icon: Users },
  { href: "/dashboard/team", label: "Team", icon: UsersRound },
];

interface DashboardSidebarProps {
  onNavigate?: () => void;
  showClose?: boolean;
}

export function DashboardSidebar({ onNavigate, showClose }: DashboardSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <aside className="flex h-full w-64 flex-col bg-secondary text-secondary-foreground">
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
        <Link href="/dashboard" className="flex items-center gap-2" onClick={onNavigate}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            T
          </div>
          <div>
            <p className="text-sm font-semibold leading-none">TechSol Media</p>
            <p className="text-xs text-white/60">Admin Panel</p>
          </div>
        </Link>
        {showClose && (
          <Button
            variant="ghost"
            size="icon"
            className="text-white/70 hover:bg-white/10 hover:text-white lg:hidden"
            onClick={onNavigate}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <Link
          href="/"
          onClick={onNavigate}
          className="flex items-center justify-center rounded-xl border border-white/10 px-3 py-2 text-xs font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          View Website
        </Link>
      </div>
    </aside>
  );
}
