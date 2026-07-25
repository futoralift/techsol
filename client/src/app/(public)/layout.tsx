'use client';

import React, { useState } from 'react';
import Link from 'next/link';


interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col bg-[#F4F2F0]">
      
      {/* GLOBAL AUTHORITATIVE FLOATING NAVBAR CONTAINER */}
      <div className="fixed top-6 left-0 right-0 z-50 w-full flex justify-center px-4 pointer-events-none select-none">
        <nav className="pointer-events-auto w-full max-w-[540px] bg-white/90 backdrop-blur-md border border-neutral-200/60 rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.04)] py-3 px-6 flex items-center justify-between transition-all duration-300">
          
          {/* Left: Logo Group with Vertical Divider */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-7 h-7 flex-shrink-0">
                <div className="absolute inset-0 bg-[#1D3B80] rounded-[6px_10px_6px_12px] transform -rotate-12 opacity-90 transition-transform group-hover:scale-105"></div>
                <div className="absolute inset-0 bg-[#E05300] rounded-[10px_6px_12px_6px] transform rotate-12 mix-blend-multiply opacity-90 translate-x-1.5 transition-transform group-hover:scale-105"></div>
                <div className="absolute inset-y-1 inset-x-2 bg-neutral-950/20 mix-blend-overlay rounded-full"></div>
              </div>
              
              <div className="flex flex-col justify-center leading-none">
                <span className="text-[15px] font-black tracking-tight text-[#0A0A0A]">
                  TECH<span className="text-[#FF5500]">SOL</span>
                </span>
                <span className="text-[9px] font-bold tracking-[0.15em] text-neutral-400 uppercase mt-0.5">
                  MEDIA
                </span>
              </div>
            </Link>
            
            <div className="h-6 w-[1px] bg-neutral-200/80 hidden sm:block"></div>
          </div>

          {/* Center: Hamburger Trigger */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col gap-1.5 p-2 rounded-full hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-200"
            aria-label="Toggle Menu"
          >
            <span className={`h-[2px] w-6 bg-neutral-900 rounded-full transition-transform ${isOpen ? 'translate-y-2 rotate-45' : ''}`}></span>
            <span className={`h-[2px] w-6 bg-neutral-900 rounded-full transition-opacity ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`h-[2px] w-6 bg-neutral-900 rounded-full transition-transform ${isOpen ? '-translate-y-2 -rotate-45' : ''}`}></span>
          </button>

          {/* Right: Capsule CTA Action Button */}
          <div>
            <Link 
              href="/contact" 
              className="bg-[#0B1224] text-white text-[13px] font-bold px-5 py-2 rounded-full hover:bg-[#151D33] transition-all duration-200 active:scale-[0.98] inline-block shadow-sm"
            >
              Get started
            </Link>
          </div>
        </nav>

        {/* Responsive Dropdown Drawer Menu */}
        {isOpen && (
          <div className="absolute top-20 left-4 right-4 max-w-[540px] mx-auto bg-white/95 backdrop-blur-md border border-neutral-200/60 p-6 rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.06)] pointer-events-auto animate-[slideDown_0.2s_ease-out] flex flex-col gap-4 text-center font-bold text-sm text-[#0A0A0A]">
            <Link href="/" onClick={() => setIsOpen(false)} className="py-2 hover:text-[#FF5500] transition-colors">Home</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="py-2 hover:text-[#FF5500] transition-colors">About us</Link>
            <Link href="/projects" onClick={() => setIsOpen(false)} className="py-2 hover:text-[#FF5500] transition-colors">Projects</Link>
            <Link href="/blog" onClick={() => setIsOpen(false)} className="py-2 hover:text-[#FF5500] transition-colors">Blog</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="py-2 hover:text-[#FF5500] transition-colors">Contact us</Link>
          </div>
        )}
      </div>

      {/* Global CSS Injector for Layout Transitions */}
      <style jsx global>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Page Content */}
      <div className="flex-1 w-full">
        {children}
      </div>
    </div>
  );
}