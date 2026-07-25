'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Lenis from 'lenis';
import { motion, Variants } from 'framer-motion';

export default function BlogPage() {
  // Initialize Smooth Scroll with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Standard fade & slide up animation typed as Variants
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.25, 0.1, 0.25, 1.0] as const 
      },
    },
  };

  // Stagger wrapper for inner elements
  const containerStagger: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  // Custom Bouncing Animation from Upside
  const bounceInDown: Variants = {
    hidden: { opacity: 0, y: -80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 15,
        mass: 1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#F4F2F0] text-[#0A0A0A] font-sans antialiased overflow-x-hidden pt-20 md:pt-28">
      {/* ─── COMING SOON HERO / MAIN CONTAINER ─── */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
        className="mt-8 md:mt-12 mx-auto w-full max-w-[1000px] px-4 font-sans"
      >
        <div className="w-full border border-solid border-[#fff] rounded-[24px] bg-[#eeecea] p-3 shadow-[inset_0px_0px_6px_0px_#0606122e]">
          <motion.div 
            variants={containerStagger}
            className="w-full bg-white rounded-[16px] border border-neutral-200/70 p-12 md:p-24 flex flex-col items-center justify-center text-center shadow-[0_4px_30px_rgba(0,0,0,0.02)] min-h-[420px] overflow-hidden"
          >
            {/* BADGE (Bounces from top) */}
            <motion.span 
              variants={bounceInDown}
              className="text-[10px] font-semibold tracking-[0.2em] text-[#FF5500] uppercase mb-4 bg-[#FF5500]/10 px-3 py-1 rounded-full border border-[#FF5500]/20"
            >
              〈 INSIGHTS &amp; IDEAS 〉
            </motion.span>

            {/* MAIN HEADING (Bounces from top) */}
            <motion.h1 
              variants={bounceInDown}
              className="text-4xl md:text-6xl font-black tracking-tight text-[#060612] mb-6 uppercase"
            >
              Coming Soon
            </motion.h1>

            {/* DESCRIPTION (Bounces from top) */}
            <motion.p 
              variants={bounceInDown}
              className="text-neutral-500 font-normal text-sm md:text-base leading-relaxed max-w-lg mb-8"
            >
              We&apos;re currently crafting articles on design, web development, branding strategy, and digital experiences. Check back soon for new perspectives!
            </motion.p>

            {/* BACK HOME LINK (Bounces from top) */}
            <motion.div variants={bounceInDown}>
              <Link
                href="/"
                className="inline-block bg-[#05050A] text-white text-xs font-bold px-6 py-3.5 rounded-xl hover:bg-[#FF5500] transition-colors shadow-sm cursor-pointer"
              >
                Back to Home
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ─── CALL TO ACTION / BOOK A FREE CALL SECTION ─── */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="mt-20 mx-auto w-full max-w-[1000px] bg-[#F4F2F0] rounded-[16px] border border-white p-5 flex items-center justify-center relative shadow-[inset_0px_0px_6px_0px_rgba(6,6,18,0.18)] overflow-clip px-4"
      >
        <motion.div 
          variants={containerStagger}
          className="w-full h-[400px] relative rounded-[12px] overflow-hidden bg-gradient-to-br from-[#FCDAA2] via-[#FBA85B] to-[#FF5500] flex flex-col md:flex-row items-center justify-between px-10 md:px-16 py-8 shadow-sm"
        >
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] rounded-full border-[30px] border-white"></div>
            <div className="absolute bottom-[-60%] left-[20%] w-[400px] h-[400px] rounded-full border-[20px] border-[#FF5500]"></div>
          </div>
          
          <motion.div variants={fadeInUp} className="flex flex-col items-start max-w-sm md:max-w-md z-10 text-left">
            <span className="text-[11px] font-bold tracking-widest text-[#0A0A0A]/60 uppercase mb-3">
              LET&apos;S BUILD SOMETHING GREAT
            </span>
            <h2 className="text-3xl md:text-[46px] font-extrabold tracking-tight text-[#0A0A0A] leading-[1.05] mb-8">
              Ready to start your next project?
            </h2>
            
            <Link 
              href="/contact#contact-form" 
              className="inline-block bg-[#05050A] text-white text-[13px] font-bold px-6 py-3.5 rounded-xl hover:bg-neutral-800 transition-colors shadow-md text-center cursor-pointer"
            >
              Get started
            </Link>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="bg-white/95 backdrop-blur-sm border border-white/60 p-6 rounded-2xl shadow-xl w-full max-w-[350px] z-10 relative text-left">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
              <span className="text-[10px] font-bold tracking-wider text-[#737373] uppercase">
                AVAILABLE FOR PROJECT
              </span>
            </div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-full bg-neutral-300 flex items-center justify-center text-[10px] font-bold border-2 border-white shadow-sm">
                Pic
              </div>
              <span className="text-[#A3A3A3] font-semibold text-sm">+</span>
              <div className="w-9 h-9 rounded-full bg-[#05050A] text-white flex items-center justify-center font-bold text-xs border-2 border-white shadow-sm">
                You
              </div>
            </div>
            <h4 className="text-[17px] font-bold text-[#0A0A0A] tracking-tight">
              Quick 15-minute call
            </h4>
            <p className="text-[13px] text-[#737373] font-medium mt-0.5">
              Pick a time that works for you.
            </p>
            
            <Link 
              href="/contact#contact-form" 
              className="mt-5 w-full block bg-[#FF5500] text-white text-[13px] font-bold py-3.5 rounded-xl hover:bg-[#E04B00] transition-colors shadow-sm text-center cursor-pointer"
            >
              Book a free call
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ─── FOOTER SECTION ─── */}
      <footer className="w-full bg-[#F4F2F0] pt-20 pb-12 px-6 font-sans">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-8">

          {/* Column 1: Brand & Newsletter */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-2 font-black text-[22px] tracking-tight text-[#0A0A0A] mb-4">
              <span className="text-[#FF5500]">◆</span> TECHSOL <span className="text-[#7F7F7F] font-normal">MEDIA</span>
            </div>
            <p className="text-[15px] font-medium leading-relaxed text-[#737373] max-w-[290px] mb-8">
              Crafting digital solutions that move your business forward.
            </p>
            <h5 className="text-[16px] font-bold text-[#0A0A0A] tracking-tight mb-4">
              Updates that keep you ahead
            </h5>

            {/* Newsletter Form */}
            <form
              action="mailto:info@techsolmedia.in"
              method="GET"
              className="flex w-full max-w-[340px] items-center gap-2"
            >
              <input type="hidden" name="subject" value="Newsletter Subscription Request" />
              <input type="hidden" name="body" value="Please add my email to your updates list." />

              <input
                type="email"
                name="from"
                required
                placeholder="Enter your email"
                className="bg-white text-[14px] font-medium text-[#737373] placeholder-[#A3A3A3] border border-[#E5E5E5] rounded-[10px] px-4 py-3.5 flex-1 focus:outline-none focus:border-[#FF5500] transition-colors"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="bg-[#FF5500] text-white w-[52px] h-[52px] rounded-[10px] flex items-center justify-center hover:bg-[#E04B00] transition-colors shadow-sm shrink-0 cursor-pointer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </form>
          </div>

          {/* Column 2 & 3: Quick Links */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-x-4">
            <div>
              <h6 className="text-[12px] font-bold tracking-widest text-[#737373] uppercase mb-5">
                Quick Links
              </h6>
              <ul className="space-y-3.5 text-[15px] font-semibold">
                <li><Link href="/" className="text-[#FF5500] hover:opacity-90">Home</Link></li>
                <li><Link href="/about" className="text-[#0A0A0A] hover:text-[#FF5500] transition-colors">About us</Link></li>
                <li><Link href="/projects" className="text-[#0A0A0A] hover:text-[#FF5500] transition-colors">Projects</Link></li>
                <li><Link href="/blog" className="text-[#0A0A0A] hover:text-[#FF5500] transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div className="pt-[33px]">
              <ul className="space-y-3.5 text-[15px] font-semibold text-[#0A0A0A]">
                <li><Link href="/contact" className="hover:text-[#FF5500] transition-colors">Contact us</Link></li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-[#FF5500] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: Get In Touch & Social Layer */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <h6 className="text-[12px] font-bold tracking-widest text-[#737373] uppercase mb-5">
              Get In Touch
            </h6>
            <ul className="space-y-3.5 text-[15px] font-semibold text-[#0A0A0A] mb-8">
              <li>
                <a href="tel:+919067797939" className="hover:text-[#FF5500] transition-colors">
                  +91 90677 97939
                </a>
              </li>
              <li>
                <a href="mailto:info@techsolmedia.in" className="hover:text-[#FF5500] transition-colors">
                  info@techsolmedia.in
                </a>
              </li>
              <li className="text-[#333333] font-medium leading-relaxed max-w-[270px] pt-0.5">
                74/586<br /> Maharshi Nagar, Pune: 411037
              </li>
            </ul>

            <h6 className="text-[12px] font-bold tracking-widest text-[#737373] uppercase mb-4">
              Follow us on
            </h6>
            <div className="flex items-center gap-2.5">
              {['facebook', 'instagram', 'linkedin', 'twitter'].map((platform, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 bg-[#0A0A0A] text-white rounded-lg flex items-center justify-center hover:bg-[#FF5500] transition-colors"
                >
                  <span className="text-[13px] font-bold">
                    {platform === 'facebook' && 'f'}
                    {platform === 'instagram' && '📷'}
                    {platform === 'linkedin' && 'in'}
                    {platform === 'twitter' && '𝕏'}
                  </span>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Clean Baseboard Copyright Wrapper Component */}
        <div className="max-w-[1000px] mx-auto mt-16 pt-6 border-t border-[#E5E3E1] flex flex-col sm:flex-row items-center justify-between text-[14px] font-semibold text-[#555555]">
          <p>© 2026 TechSol Media. All rights reserved</p>
          <p>
            Designed &amp; Developed by{" "}
            <a
              href="mailto:synergexai.official@gmail.com"
              className="text-[#FF5500] hover:underline cursor-pointer"
            >
              SynergexAI (synergexai.official@gmail.com)
            </a>
          </p>
        </div>
      </footer>

    </div>
  );
}