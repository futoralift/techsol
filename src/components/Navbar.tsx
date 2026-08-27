"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <>
      {/* Primary Floating Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 w-full pt-6 px-4 flex justify-center transition-opacity duration-200 ${
          isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md rounded-full border border-neutral-200/70 shadow-[0_10px_35px_rgba(0,0,0,0.05)] px-5 py-2.5 flex items-center justify-between w-full max-w-[540px]">
          
          {/* Logo Container */}
          <div className="flex items-center gap-3 pr-4 border-r border-neutral-200/80 font-sans">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-28 h-7 flex items-center justify-start shrink-0">
                <Image
                  src="/logo.png"
                  alt="TechSol Media Logo"
                  fill
                  sizes="112px"
                  className="object-contain object-left"
                  priority
                  loading="eager"
                />
              </div>
            </Link>
          </div>

          {/* Center Column: 2-Bar Burger Icon */}
          <div className="flex-1 flex justify-center items-center">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex flex-col gap-[4px] cursor-pointer group px-4 py-2 focus:outline-none items-center justify-center"
              aria-label="Open menu"
            >
              <span className="w-5 h-[2px] bg-neutral-900 group-hover:bg-black transition-colors block rounded-full"></span>
              <span className="w-5 h-[2px] bg-neutral-900 group-hover:bg-black transition-colors block rounded-full"></span>
            </button>
          </div>

          {/* Right Action Button */}
          <div className="pl-1">
            <Link href="/contact">
              <button className="bg-[#080B15] text-white font-bold text-[13px] px-5 py-2.5 rounded-full hover:bg-black transition-all shadow-sm tracking-tight cursor-pointer active:scale-95">
                Get started
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Animated Navigation Modal */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 pt-6">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/25 backdrop-blur-[8px]"
            />

            {/* Modal Drawer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -4 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white w-full max-w-[540px] rounded-[32px] shadow-[0_30px_70px_rgba(0,0,0,0.15)] border border-neutral-200/60 overflow-hidden flex flex-col z-10"
            >
              {/* Modal Header */}
              <div className="px-5 py-2.5 flex items-center justify-between border-b border-neutral-100">
                <div className="flex items-center gap-3 pr-4 border-r border-neutral-200/80">
                  <Link href="/" onClick={() => setIsMenuOpen(false)}>
                    <div className="relative w-28 h-7 flex items-center justify-start shrink-0">
                      <Image
                        src="/logo.png"
                        alt="TechSol Media Logo"
                        fill
                        sizes="112px"
                        className="object-contain object-left"
                      />
                    </div>
                  </Link>
                </div>

                {/* Close Icon Button */}
                <div className="flex-1 flex justify-center items-center">
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="relative w-8 h-8 flex items-center justify-center cursor-pointer group focus:outline-none"
                    aria-label="Close menu"
                  >
                    <span className="absolute w-4 h-[1.5px] bg-neutral-800 group-hover:bg-black rotate-45 transition-colors"></span>
                    <span className="absolute w-4 h-[1.5px] bg-neutral-800 group-hover:bg-black -rotate-45 transition-colors"></span>
                  </button>
                </div>

                <div className="pl-1">
                  <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                    <button className="bg-[#080B15] text-white font-bold text-[13px] px-5 py-2.5 rounded-full hover:bg-black transition-all shadow-sm tracking-tight cursor-pointer">
                      Get started
                    </button>
                  </Link>
                </div>
              </div>

              {/* Navigation Links */}
              <ul className="flex flex-col px-8 py-5 font-medium text-[19px] tracking-tight font-sans">
                {NAV_LINKS.map((link, idx) => {
                  const isActive = pathname === link.href;
                  const isLast = idx === NAV_LINKS.length - 1;

                  return (
                    <li
                      key={link.href}
                      className={`py-3 ${
                        !isLast ? "border-b border-neutral-100/80" : "pt-3.5"
                      }`}
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
              <div className="bg-[#FAF9F9] px-8 py-4 flex items-center justify-between border-t border-neutral-100 text-xs">
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
        )}
      </AnimatePresence>
    </>
  );
}