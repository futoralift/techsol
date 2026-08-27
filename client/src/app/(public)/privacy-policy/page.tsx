"use client";

import Link from "next/link";
import React from "react";
import { motion, Variants } from "framer-motion";

// --- Framer Motion Animation Variants ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

const containerStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardHover: Variants = {
  hover: {
    y: -5,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* ─── HERO SECTION ─── */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerStagger}
        className="pt-32 pb-12 text-center px-4 max-w-4xl mx-auto"
      >
        <motion.div
          variants={fadeInUp}
          className="inline-flex items-center justify-center px-3 py-1 mb-4 rounded-full bg-[#FF5500]/10 text-[#FF5500] text-xs font-bold tracking-widest uppercase"
        >
          Legal
        </motion.div>
        <motion.h1
          variants={fadeInUp}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-white mb-4"
        >
          Privacy Policy
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="text-sm font-medium text-[#737373] dark:text-neutral-400"
        >
          Last Updated: 34 weeks ago
        </motion.p>
      </motion.section>

      {/* ─── POLICY CONTENT SECTION ─── */}
      <section className="pb-20 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          className="max-w-3xl mx-auto bg-white dark:bg-neutral-900 border border-[#E5E5E5] dark:border-neutral-800 rounded-2xl p-8 sm:p-12 shadow-sm text-[#333333] dark:text-neutral-300 leading-relaxed font-sans"
        >
          <motion.p variants={fadeInUp} className="text-[16px] mb-8 font-medium">
            At Agnos, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or engage with our services.
          </motion.p>

          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-8"
          >
            {/* 1. Information we collect */}
            <motion.div variants={fadeInUp}>
              <h2 className="text-xl font-bold text-[#0A0A0A] dark:text-white mb-3">
                1. Information we collect
              </h2>
              <p className="mb-3">We may collect the following types of information:</p>
              <ul className="list-disc pl-6 space-y-2 text-[15px]">
                <li>
                  <strong className="text-[#0A0A0A] dark:text-white">Personal Information</strong> (e.g., name, email address, phone number) — provided voluntarily through forms, contact requests, or newsletters.
                </li>
                <li>
                  <strong className="text-[#0A0A0A] dark:text-white">Project Information</strong> — details you share with us regarding your brand, business, or project requirements.
                </li>
                <li>
                  <strong className="text-[#0A0A0A] dark:text-white">Usage Data</strong> — such as IP address, browser type, pages visited, and time spent on the site (collected automatically via cookies or analytics tools).
                </li>
              </ul>
            </motion.div>

            {/* 2. How we use your information */}
            <motion.div variants={fadeInUp}>
              <h2 className="text-xl font-bold text-[#0A0A0A] dark:text-white mb-3">
                2. How we use your information
              </h2>
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2 text-[15px]">
                <li>Respond to your inquiries or project requests</li>
                <li>Provide and improve our services</li>
                <li>Communicate important updates or offers</li>
                <li>Analyze website performance and user behavior</li>
                <li>Ensure legal compliance and prevent misuse</li>
              </ul>
            </motion.div>

            {/* 3. Sharing your information */}
            <motion.div variants={fadeInUp}>
              <h2 className="text-xl font-bold text-[#0A0A0A] dark:text-white mb-3">
                3. Sharing your information
              </h2>
              <p className="mb-3">
                We do not sell or trade your personal data. We may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[15px]">
                <li>
                  Trusted third-party service providers (e.g., hosting, analytics, CRM tools) who assist in operating our business
                </li>
                <li>Law enforcement or government agencies if required by law</li>
              </ul>
              <p className="mt-3 text-sm text-[#737373]">
                All third-party services comply with applicable data protection laws.
              </p>
            </motion.div>

            {/* 4. Cookies & tracking technologies */}
            <motion.div variants={fadeInUp}>
              <h2 className="text-xl font-bold text-[#0A0A0A] dark:text-white mb-3">
                4. Cookies & tracking technologies
              </h2>
              <p className="text-[15px]">
                Our website uses cookies and similar technologies to enhance user experience and gather usage statistics. You can manage or disable cookies in your browser settings.
              </p>
            </motion.div>

            {/* 5. Data security */}
            <motion.div variants={fadeInUp}>
              <h2 className="text-xl font-bold text-[#0A0A0A] dark:text-white mb-3">
                5. Data security
              </h2>
              <p className="text-[15px]">
                We implement appropriate technical and organizational measures to safeguard your personal data from unauthorized access, alteration, or disclosure.
              </p>
            </motion.div>

            {/* 6. Your rights */}
            <motion.div variants={fadeInUp}>
              <h2 className="text-xl font-bold text-[#0A0A0A] dark:text-white mb-3">
                6. Your rights
              </h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-[15px]">
                <li>Access or update your personal information</li>
                <li>Request the deletion of your data</li>
                <li>Withdraw consent or opt out of communications</li>
              </ul>
            </motion.div>

            {/* 7. Third-Party links */}
            <motion.div variants={fadeInUp}>
              <h2 className="text-xl font-bold text-[#0A0A0A] dark:text-white mb-3">
                7. Third-Party links
              </h2>
              <p className="text-[15px]">
                Our website may contain links to third-party websites. We are not responsible for their content or privacy practices. We encourage you to review their privacy policies before sharing any data.
              </p>
            </motion.div>

            {/* 8. Changes to this policy */}
            <motion.div variants={fadeInUp}>
              <h2 className="text-xl font-bold text-[#0A0A0A] dark:text-white mb-3">
                8. Changes to this policy
              </h2>
              <p className="text-[15px]">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated date. We recommend checking back periodically to stay informed.
              </p>
            </motion.div>

            {/* 9. Contact us */}
            <motion.div variants={fadeInUp} className="pt-4 border-t border-[#E5E5E5] dark:border-neutral-800">
              <h2 className="text-xl font-bold text-[#0A0A0A] dark:text-white mb-3">
                9. Contact us
              </h2>
              <p className="text-[15px]">
                If you have any questions about this Privacy Policy or how we handle your data, please contact us at:
              </p>
              <p className="mt-2 font-semibold text-[#FF5500]">
                Email: <a href="mailto:support@example.com" className="hover:underline">support@example.com</a>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── CALL TO ACTION / BOOK A FREE CALL SECTION ─── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="mt-16 mx-auto w-full max-w-[1000px] bg-[#F4F2F0] rounded-[16px] border border-white p-5 flex items-center justify-center relative shadow-[inset_0px_0px_6px_0px_rgba(6,6,18,0.18)] overflow-clip"
      >
        <motion.div
          variants={containerStagger}
          className="w-full h-[400px] relative rounded-[12px] overflow-hidden bg-gradient-to-br from-[#FCDAA2] via-[#FBA85B] to-[#FF5500] flex flex-col md:flex-row items-center justify-between px-10 md:px-16 py-8 shadow-sm"
        >
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] rounded-full border-[30px] border-white"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-[-60%] left-[20%] w-[400px] h-[400px] rounded-full border-[20px] border-[#FF5500]"
            />
          </div>

          {/* Left Column Text Content */}
          <motion.div variants={fadeInUp} className="flex flex-col items-start max-w-sm md:max-w-md z-10 text-left">
            <span className="text-[11px] font-bold tracking-widest text-[#0A0A0A]/60 uppercase mb-3">
              LET'S BUILD SOMETHING GREAT
            </span>
            <h2 className="text-3xl md:text-[46px] font-extrabold tracking-tight text-[#0A0A0A] leading-[1.05] mb-8">
              Ready to start your next project?
            </h2>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="inline-block bg-[#05050A] text-white text-[13px] font-bold px-6 py-3.5 rounded-xl hover:bg-neutral-800 transition-colors shadow-md text-center cursor-pointer"
              >
                Get started
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Floating Card */}
          <motion.div
            variants={fadeInUp}
            whileHover="hover"
            initial="hidden"
            animate="visible"
            custom={cardHover}
            className="bg-white/95 backdrop-blur-sm border border-white/60 p-6 rounded-2xl shadow-xl w-full max-w-[350px] z-10 relative text-left"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse"></span>
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

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                className="mt-5 w-full block bg-[#FF5500] text-white text-[13px] font-bold py-3.5 rounded-xl hover:bg-[#E04B00] transition-colors shadow-sm text-center cursor-pointer"
              >
                Book a free call
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ─── FOOTER SECTION ─── */}
      <motion.footer
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerStagger}
        className="w-full bg-[#F4F2F0] pt-20 pb-12 px-6 font-sans"
      >
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-8">
          {/* Column 1: Brand & Newsletter */}
          <motion.div variants={fadeInUp} className="lg:col-span-4 flex flex-col items-start">
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
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                aria-label="Subscribe to newsletter"
                className="bg-[#FF5500] text-white w-[52px] h-[52px] rounded-[10px] flex items-center justify-center hover:bg-[#E04B00] transition-colors shadow-sm shrink-0 cursor-pointer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </motion.button>
            </form>
          </motion.div>

          {/* Column 2 & 3: Quick Links */}
          <motion.div variants={fadeInUp} className="lg:col-span-4 grid grid-cols-2 gap-x-4">
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
          </motion.div>

          {/* Column 4: Get In Touch & Social Layer */}
          <motion.div variants={fadeInUp} className="lg:col-span-4 flex flex-col items-start">
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
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-xl bg-[#1877F2] text-white flex items-center justify-center shadow-sm hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shadow-sm hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl bg-[#0A66C2] text-white flex items-center justify-center shadow-sm hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center shadow-sm border border-neutral-800 hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Clean Baseboard Copyright Wrapper Component */}
        <motion.div
          variants={fadeInUp}
          className="max-w-[1000px] mx-auto mt-16 pt-6 pb-14 sm:pb-4 border-t border-[#E5E3E1] flex flex-col sm:flex-row items-center justify-between text-xs sm:text-[14px] font-medium sm:font-semibold text-[#555555] text-center sm:text-left gap-2 sm:gap-4"
        >
          <p>© 2026 TechSol Media. All rights reserved</p>
          <p>
            Designed &amp; Developed by{" "}
            <a
              href="mailto:synergexai.official@gmail.com"
              className="text-[#FF5500] font-semibold hover:underline cursor-pointer"
            >
              SynergexAI
            </a>
          </p>
        </motion.div>
      </motion.footer>
    </>
  );
}