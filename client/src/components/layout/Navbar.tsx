"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, Moon, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About us" },
  { href: "/portfolio", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact us" },
];

export function Navbar() {
  const pathname = usePathname();
  const { isScrolled } = useScrollPosition();
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Checks mapping paths against runtime routes to safely match active highlighting rules
  const getLinkClass = (path: string) => {
    return pathname === path
      ? "text-[#FF5500] transition-colors"
      : "hover:text-neutral-950 transition-colors";
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200/50 px-6 py-4 transition-all duration-300",
        isScrolled && "shadow-sm"
      )}
    >
      <nav className="max-w-[1000px] mx-auto flex items-center justify-between">
        
        {/* Brand Logo Match Layer */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-sm tracking-tight text-neutral-900 hover:opacity-90 transition-opacity"
        >
          <span className="text-[#FF5500] text-lg select-none">◆</span>
          TECHSOL <span className="text-neutral-400 font-normal">MEDIA</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-neutral-600">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={getLinkClass(link.href)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Action Elements Controls Container */}
        <div className="flex items-center gap-4">
          
          {/* Theme Switcher Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-xl text-neutral-600 hover:text-neutral-950"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {/* Conditional Auth Engine Rendering Block */}
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-3">
              <Link
                href={user?.role === "admin" ? "/admin" : "/dashboard"}
                className="text-xs font-bold text-neutral-600 hover:text-neutral-950 transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={() => logout()}
                className="bg-[#0A0A0A] text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-neutral-800 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-5">
              <Link
                href="/login"
                className="text-xs font-bold text-neutral-600 hover:text-neutral-950 transition-colors"
              >
                Login
              </Link>
              <button className="bg-[#0A0A0A] text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-neutral-800 transition-colors">
                Get started
              </button>
            </div>
          )}

          {/* Mobile Shell Drawer System */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-9 w-9 text-[#0A0A0A] hover:bg-neutral-100 rounded-xl"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-sm bg-white border-l border-neutral-200 p-6">
              <SheetHeader className="pb-4 border-b border-neutral-100">
                <SheetTitle className="text-left flex items-center gap-2 font-bold text-sm tracking-tight text-neutral-900">
                  <span className="text-[#FF5500] text-lg">◆</span>
                  TECHSOL <span className="text-neutral-400 font-normal">MEDIA</span>
                </SheetTitle>
              </SheetHeader>
              
              <div className="mt-8 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "text-sm font-bold py-2 transition-colors",
                      pathname === link.href ? "text-[#FF5500]" : "text-neutral-600 hover:text-neutral-950"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="mt-6 pt-6 border-t border-neutral-100 flex flex-col gap-3">
                  {isAuthenticated ? (
                    <>
                      <Link
                        href={user?.role === "admin" ? "/admin" : "/dashboard"}
                        onClick={() => setMobileOpen(false)}
                        className="text-center text-xs font-bold text-neutral-600 py-3 rounded-xl border border-neutral-200 hover:bg-neutral-50"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setMobileOpen(false);
                        }}
                        className="bg-[#0A0A0A] text-white text-xs font-bold py-3 rounded-xl hover:bg-neutral-800 transition-colors"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setMobileOpen(false)}
                        className="text-center text-xs font-bold text-neutral-600 py-3 rounded-xl border border-neutral-200 hover:bg-neutral-50"
                      >
                        Login
                      </Link>
                      <button
                        onClick={() => setMobileOpen(false)}
                        className="bg-[#0A0A0A] text-white text-xs font-bold py-3 rounded-xl hover:bg-neutral-800 transition-colors"
                      >
                        Get Started
                      </button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}