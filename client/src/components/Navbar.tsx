"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Navigation Links Definition
  const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <>
      {/* Floating Header - Positioned Fixed over the Page */}
      <header className="fixed top-0 left-0 right-0 z-40 w-full pt-6 px-4 flex justify-center pointer-events-none">
        <div className="bg-white/80 backdrop-blur-md rounded-[24px] border border-neutral-200/60 shadow-[0_12px_40px_rgba(0,0,0,0.04)] px-6 py-3 flex items-center justify-between w-full max-w-[540px] pointer-events-auto">
          {/* LOGO CONTAINER */}
          <div className="flex items-center gap-3 pr-5 border-r border-neutral-200/60 font-sans">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-32 h-8 flex items-center justify-start shrink-0">
                <Image
                  src="/logo.png"
                  alt="TechSol Media Logo"
                  width={160}
                  height={40}
                  className="w-full h-full object-contain object-left"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Center Column: Burger bars */}
          <div className="flex-1 flex justify-center items-center">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex flex-col gap-[5px] cursor-pointer group px-6 py-3 focus:outline-none"
              aria-label="Open menu"
            >
              <span className="w-6 h-[2px] bg-neutral-800 group-hover:bg-black transition-colors block"></span>
              <span className="w-6 h-[2px] bg-neutral-800 group-hover:bg-black transition-colors block"></span>
            </button>
          </div>

          {/* Right: Action Button */}
          <div className="pl-2">
            <Link href="/contact">
              <button className="bg-[#0B132B] text-white font-bold text-xs px-5 py-3 rounded-full hover:bg-neutral-800 transition-all shadow-sm tracking-wide cursor-pointer">
                Get started
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Animated Navigation Modal */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/25 backdrop-blur-[8px] z-50 cursor-pointer"
            />

            {/* Modal Drawer */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white w-full max-w-[540px] rounded-[32px] shadow-[0_30px_70px_rgba(0,0,0,0.15)] border border-neutral-200/60 pointer-events-auto overflow-hidden flex flex-col"
              >
                {/* Modal Header */}
                <div className="px-6 py-4 flex items-center justify-between border-b border-neutral-100">
                  <div className="flex items-center gap-3 pr-5">
                    <Link href="/" onClick={() => setIsMenuOpen(false)}>
                      <div className="relative w-32 h-8 flex items-center justify-start shrink-0">
                        <Image
                          src="/logo.png"
                          alt="TechSol Media Logo"
                          width={160}
                          height={40}
                          className="w-full h-full object-contain object-left"
                        />
                      </div>
                    </Link>
                  </div>

                  {/* Close Icon Button */}
                  <div className="flex-1 flex justify-center max-w-[90px] border-x border-neutral-100/80 h-10 items-center">
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="relative w-8 h-8 flex items-center justify-center cursor-pointer group focus:outline-none"
                      aria-label="Close menu"
                    >
                      <span className="absolute w-4 h-[1.5px] bg-neutral-400 group-hover:bg-neutral-900 rotate-45 transition-colors"></span>
                      <span className="absolute w-4 h-[1.5px] bg-neutral-400 group-hover:bg-neutral-900 -rotate-45 transition-colors"></span>
                    </button>
                  </div>

                  <div>
                    <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                      <button className="bg-[#0B132B] text-white font-bold text-xs px-5 py-3 rounded-full hover:bg-neutral-800 transition-all shadow-sm tracking-wide cursor-pointer">
                        Get started
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Navigation Links with Active Highlighting */}
                <ul className="flex flex-col px-10 py-6 font-medium text-[20px] tracking-tight font-sans">
                  {NAV_LINKS.map((link, idx) => {
                    const isActive = pathname === link.href;
                    const isLast = idx === NAV_LINKS.length - 1;

                    return (
                      <li
                        key={link.href}
                        className={`py-3.5 ${!isLast ? "border-b border-neutral-100/70" : "pt-4"}`}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`block transition-colors ${
                            isActive
                              ? "text-[#FF5500] font-semibold"
                              : "text-neutral-800 hover:text-[#FF5500]"
                          }`}
                        >
                          {link.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                {/* Footer Block */}
                <div className="bg-[#FAF9F9] px-10 py-5 flex items-center justify-between border-t border-neutral-100 text-xs">
                  <div className="flex items-center gap-2">
                    <a
                      href="#"
                      aria-label="Facebook"
                      className="w-8 h-8 rounded-full bg-neutral-200/50 hover:bg-neutral-300/60 flex items-center justify-center transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 text-neutral-600 fill-current" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      aria-label="Instagram"
                      className="w-8 h-8 rounded-full bg-neutral-200/50 hover:bg-neutral-300/60 flex items-center justify-center transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 text-neutral-600 stroke-current fill-none" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                    <a
                      href="#"
                      aria-label="LinkedIn"
                      className="w-8 h-8 rounded-full bg-neutral-200/50 hover:bg-neutral-300/60 flex items-center justify-center transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 text-neutral-600 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      aria-label="X (Twitter)"
                      className="w-8 h-8 rounded-full bg-neutral-200/50 hover:bg-neutral-300/60 flex items-center justify-center transition-colors"
                    >
                      <svg className="w-3 h-3 text-neutral-600 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  </div>

                  <span className="text-neutral-400 font-semibold tracking-wide">
                    @TechSol Media
                  </span>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}