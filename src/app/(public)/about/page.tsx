'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Lenis from 'lenis';
import { motion, Variants } from 'framer-motion';

export default function AboutStoryPage() {
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

  // Explicitly typing variants resolves the Framer Motion easing type mismatch error
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

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

  return (
    <div className="min-h-screen bg-[#F4F2F0] text-[#0A0A0A] font-sans antialiased overflow-x-hidden selection:bg-[#FF5500]/20">

      {/* Main Layout Container */}
      <main className="pt-32 pb-24 px-4 flex flex-col items-center w-full">

        {/* SECTION 1: Who we are */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerStagger}
          className="max-w-[1000px] w-full flex flex-col items-center mb-28 text-center px-4"
        >
          <motion.span variants={fadeInUp} className="text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase mb-3 flex items-center gap-1.5">
            〈 ABOUT US 〉
          </motion.span>

          <motion.h1 variants={fadeInUp} className="text-4xl md:text-[56px] font-normal tracking-tight text-[#0A0A0A] mb-12 leading-[1.1]">
            Who we are
          </motion.h1>

          {/* Hero Content Frame */}
          <motion.div variants={fadeInUp} className="bg-white border border-neutral-200/40 p-5 rounded-[20px] w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch shadow-sm">
            <div className="md:col-span-5 bg-white p-6 md:p-8 flex flex-col justify-between items-start text-left rounded-xl">
              <h2 className="text-2xl md:text-[32px] font-black text-[#0A0A0A] tracking-tight leading-[1.15] mb-6">
                We Don't Just Create Brands. We Build Businesses That Stand Out.
              </h2>
              <p className="text-[14px] leading-relaxed text-[#737373] font-medium mt-auto">
                At Techsol Media, we help businesses grow through creative branding, modern websites, digital products, and result-driven marketing. By combining strategy, design, and technology, we create impactful solutions that strengthen brands, enhance customer experiences, and drive long-term success. Our goal is simple—to build brands that stand out, earn trust, and leave a lasting impression.
              </p>
              <Link href="/contact">
                <button className="mt-8 bg-[#FF5500] text-white text-xs font-bold px-5 py-3 rounded-xl hover:bg-orange-600 transition-colors shadow-sm cursor-pointer">
                  Start a project
                </button>
              </Link>
            </div>
            <div className="md:col-span-7 min-h-[300px] md:min-h-[440px] relative rounded-xl overflow-hidden bg-neutral-100">
              <div className="w-full h-full relative overflow-hidden">
                <Image
                  src="/about/about.png"
                  alt="Team photo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* SECTION 2: Our Story & Vision */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerStagger}
          className="max-w-[1000px] w-full flex flex-col items-start mb-28 px-4"
        >
          {/* SECTION LABEL */}
          <motion.span variants={fadeInUp} className="text-[10px] font-semibold tracking-[0.2em] text-neutral-400 uppercase mb-3 font-sans">
            〈 OUR STORY 〉
          </motion.span>

          {/* MAIN HEADING */}
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-[40px] font-bold tracking-tight text-[#060612] max-w-2xl leading-[1.15] mb-10 font-sans">
            The Strategy &amp; Vision Behind Techsol Media
          </motion.h2>

          {/* CARD OUTER CONTAINER */}
          <motion.div variants={fadeInUp} className="w-full border border-solid border-[#fff] rounded-[24px] bg-[#eeecea] p-3 shadow-[inset_0px_0px_6px_0px_#0606122e]">
            {/* INNER WHITE CARD */}
            <div className="w-full bg-white rounded-[16px] border border-neutral-200/70 p-8 md:p-12 flex flex-col md:flex-row gap-10 items-stretch shadow-[0_4px_30px_rgba(0,0,0,0.02)]">

              {/* LEFT: TEXT CONTENT */}
              <div className="flex-1 flex flex-col justify-between items-start text-left gap-6 font-sans">
                <p className="text-neutral-600 font-normal text-sm md:text-base leading-relaxed">
                  At Techsol Media, we believe strong brands are built at the intersection of strategy, design, and technology. Founded by <span className="font-semibold text-neutral-900">Shubham Barure</span>, our agency was created with a clear mission: to help ambitious businesses move beyond ordinary marketing and build distinct digital experiences engineered for long-term growth.
                </p>

                <p className="text-neutral-600 font-normal text-sm md:text-base leading-relaxed">
                  From brand identity and custom web applications to motion graphics and performance marketing, every solution we craft is guided by a core principle—<span className="font-semibold text-neutral-900">great design should solve business problems, not just decorate them.</span> We don&apos;t measure success by how beautiful our work looks, but by the trust it builds and the measurable results it delivers.
                </p>

                {/* QUOTE BLOCK */}
                <div className="w-full pt-4 mt-2 border-t border-neutral-100">
                  <p className="italic text-xs md:text-sm text-neutral-500 font-normal leading-relaxed">
                    &ldquo;A brand isn&apos;t defined by what it says about itself—it&apos;s defined by what people remember, trust, and experience.&rdquo;
                  </p>
                  <span className="inline-block mt-2 text-xs font-semibold text-[#FF5500]">
                    — Shubham Barure, Founder &amp; Creative Director
                  </span>
                </div>
              </div>

              {/* RIGHT: CORE VALUES PANEL */}
              <div className="w-full md:w-[320px] bg-neutral-50/80 rounded-xl p-6 md:p-7 border border-neutral-200/60 flex flex-col justify-between shrink-0 font-sans">
                <div>
                  <h3 className="text-base font-semibold text-[#0A0A0A] tracking-tight pb-3 border-b border-dashed border-neutral-200">
                    Core Values
                  </h3>

                  <ul className="mt-5 space-y-3 text-xs md:text-sm font-normal text-neutral-600">
                    {[
                      'Strategy-Led Thinking',
                      'Creative Excellence',
                      'Transparent Communication',
                      'Client-Focused Approach',
                      'Long-Term Partnerships',
                    ].map((value, idx) => (
                      <li key={idx} className="flex items-center gap-2.5">
                        <span className="text-[#FF5500] text-xs">✓</span>
                        <span>{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-200/40 text-[11px] font-medium text-neutral-400 tracking-wider">
                  © 2026 TECHSOL MEDIA
                </div>
              </div>

            </div>
          </motion.div>
        </motion.section>

        {/* SECTION 3: Stats Matrix Display */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerStagger}
          className="max-w-[1000px] w-full flex flex-col items-start mb-28 px-4"
        >
          <motion.span variants={fadeInUp} className="text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase mb-3">
            〈 STATS 〉
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-[46px] font-black tracking-tight text-[#0A0A0A] leading-[1.1] mb-12">
            Proven Through<br />Experience & Execution
          </motion.h2>

          <div className="w-full bg-white/40 border border-white p-5 rounded-[24px] grid grid-cols-1 md:grid-cols-3 gap-5 shadow-sm">
            {[
              { title: "Social Media Creatives", desc: "Designed engaging visuals that helped businesses strengthen their online presence and connect with their audience.", metric: "1000+" },
              { title: "Creative Campaigns", desc: "Executed promotional, seasonal, and brand-focused campaigns designed to increase engagement, visibility, and audience reach.", metric: "100+" },
              { title: "Years of Experience", desc: "Bringing five years of hands-on experience in graphic design, motion graphics, branding, and digital marketing solutions.", metric: "5+" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-white p-7 rounded-[16px] border border-neutral-200/30 flex flex-col justify-between min-h-[280px] transition-all duration-300 hover:shadow-md hover:translate-y-[-4px]"
              >
                <div>
                  <h4 className="text-[17px] font-extrabold text-[#0A0A0A] tracking-tight mb-3">{stat.title}</h4>
                  <p className="text-[13px] text-neutral-500 font-medium leading-relaxed">{stat.desc}</p>
                </div>
                <div className="pt-6 border-t border-dashed border-neutral-100 flex items-center justify-between">
                  <span className="text-4xl font-black tracking-tight text-[#0A0A0A]">{stat.metric}</span>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-200"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-200"></span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* SECTION 4: Team Profile Showcase */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerStagger}
          className="max-w-[1000px] w-full flex flex-col items-center mb-16 text-center px-4"
        >
          {/* SECTION LABEL */}
          <motion.span variants={fadeInUp} className="text-[10px] font-semibold tracking-[0.2em] text-neutral-400 uppercase mb-3 font-sans">
            〈 TEAM 〉
          </motion.span>

          {/* MAIN HEADING */}
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-[40px] font-bold tracking-tight text-[#060612] mb-10 font-sans">
            People behind the work
          </motion.h2>

          {/* CARD OUTER CONTAINER */}
          <div className="w-full border border-solid border-[#fff] rounded-[24px] bg-[#eeecea] p-3 shadow-[inset_0px_0px_6px_0px_#0606122e]">
            {/* 3-COLUMN GRID */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch font-sans">

              {/* LEFT MEMBER CARD */}
              <motion.div variants={fadeInUp} className="md:col-span-4 bg-white p-6 rounded-[16px] border border-neutral-200/70 flex flex-col justify-between text-left shadow-[0_4px_30px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-md">
                <div className="w-full h-[220px] bg-neutral-100 rounded-xl mb-6 relative overflow-hidden border border-neutral-200/50">
                  <div className="w-full h-[220px] bg-neutral-100 rounded-xl mb-6 relative overflow-hidden border border-neutral-200/50">
                    <div className="w-full h-full relative overflow-hidden">
                      <Image
                        src="/about/shivrajmane.jpeg"
                        alt="Shivraj Mane- Founder Shiva Digital"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 360px"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0A0A0A]">Shivraj Mane</h3>
                  <p className="text-xs uppercase font-semibold text-neutral-400 tracking-wider mt-1">
                    Founder .. Shiva Digital
                    <br />
                    (Digital Marketing Partner)
                  </p>
                  <div className="flex gap-2 mt-4 text-[11px] font-semibold text-white">
                    <span className="bg-[#0A0A0A] px-2 py-0.5 rounded cursor-pointer hover:bg-[#FF5500] transition-colors">in</span>
                    <span className="bg-[#0A0A0A] px-2 py-0.5 rounded cursor-pointer hover:bg-[#FF5500] transition-colors">𝕏</span>
                  </div>
                </div>
              </motion.div>

              {/* CENTER SPOTLIGHT CARD (FOUNDER) */}
              <motion.div variants={fadeInUp} className="md:col-span-4 bg-white p-6 rounded-[16px] border border-neutral-200/70 flex flex-col justify-between text-left shadow-[0_4px_30px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-md">
                <div className="w-full h-[260px] bg-neutral-950 rounded-xl mb-6 relative overflow-hidden border border-neutral-200/50">
                  <div className="w-full h-[260px] bg-neutral-950 rounded-xl mb-6 relative overflow-hidden border border-neutral-200/50">
                    <div className="w-full h-full relative overflow-hidden">
                      <Image
                        src="/about/shubham.jpeg"
                        alt="Shubham Barure - Founder & Creative Director"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 360px"
                        priority
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-neutral-50/80 p-5 rounded-xl border border-neutral-200/60">
                  <h3 className="text-xl font-bold text-[#0A0A0A]">Shubham Barure</h3>
                  <p className="text-xs uppercase font-semibold text-[#FF5500] tracking-wider mt-1">
                    Founder &amp; Creative Director - TechSolMedia
                  </p>
                  <div className="flex gap-2 mt-4 text-[11px] font-semibold text-white">
                    <span className="bg-[#0A0A0A] px-2 py-0.5 rounded cursor-pointer hover:bg-[#FF5500] transition-colors">in</span>
                    <span className="bg-[#0A0A0A] px-2 py-0.5 rounded cursor-pointer hover:bg-[#FF5500] transition-colors">𝕏</span>
                  </div>
                </div>
              </motion.div>

              {/* RIGHT MEMBER CARD */}
              <motion.div variants={fadeInUp} className="md:col-span-4 bg-white p-6 rounded-[16px] border border-neutral-200/70 flex flex-col justify-between text-left shadow-[0_4px_30px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-md">
                <div className="w-full h-[220px] bg-neutral-100 rounded-xl mb-6 relative overflow-hidden border border-neutral-200/50">
                  <div className="w-full h-full relative rounded-lg overflow-hidden bg-neutral-100">
                    <Image
                      src="/about/swaraj.jpeg"
                      alt="About TechSol Media"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 360px"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0A0A0A]">Swaraj Wadavale</h3>
                  <p className="text-xs uppercase font-semibold text-neutral-400 tracking-wider mt-1">
                    Founder...SynergexAI
                    <br />
                    (Technology Partner)
                  </p>
                  <div className="flex gap-2 mt-4 text-[11px] font-semibold text-white">
                    <span className="bg-[#0A0A0A] px-2 py-0.5 rounded cursor-pointer hover:bg-[#FF5500] transition-colors">in</span>
                    <span className="bg-[#0A0A0A] px-2 py-0.5 rounded cursor-pointer hover:bg-[#FF5500] transition-colors">𝕏</span>
                  </div>
                </div>

              </motion.div>

            </div>
          </div>
        </motion.section>

        {/* SECTION 5: Bottom Call-To-Action Segment */}
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
              <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] rounded-full border-[30px] border-white"></div>
              <div className="absolute bottom-[-60%] left-[20%] w-[400px] h-[400px] rounded-full border-[20px] border-[#FF5500]"></div>
            </div>

            {/* Left Column Text Content */}
            <motion.div variants={fadeInUp} className="flex flex-col items-start max-w-sm md:max-w-md z-10 text-left">
              <span className="text-[11px] font-bold tracking-widest text-[#0A0A0A]/60 uppercase mb-3">
                LET'S BUILD SOMETHING GREAT
              </span>
              <h2 className="text-3xl md:text-[46px] font-extrabold tracking-tight text-[#0A0A0A] leading-[1.05] mb-8">
                Ready to start your next project?
              </h2>

              <Link
                href="/contact"
                className="inline-block bg-[#05050A] text-white text-[13px] font-bold px-6 py-3.5 rounded-xl hover:bg-neutral-800 transition-colors shadow-md text-center cursor-pointer"
              >
                Get started
              </Link>
            </motion.div>

            {/* Right Floating Card */}
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
                href="/contact"
                className="mt-5 w-full block bg-[#FF5500] text-white text-[13px] font-bold py-3.5 rounded-xl hover:bg-[#E04B00] transition-colors shadow-sm text-center cursor-pointer"
              >
                Book a free call
              </Link>
            </motion.div>
          </motion.div>
        </motion.section>
      </main>

      {/* SECTION 6: Structured Brand Footer */}
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
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Clean Baseboard Copyright Wrapper Component */}
        <div className="max-w-[1000px] mx-auto mt-16 pt-6 pb-14 sm:pb-4 border-t border-[#E5E3E1] flex flex-col sm:flex-row items-center justify-between text-xs sm:text-[14px] font-medium sm:font-semibold text-[#555555] text-center sm:text-left gap-2 sm:gap-4">
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
        </div>
      </footer>
    </div>
  );
}