"use client";
import { FAQSection } from '@/components/FAQSection';


import { Paintbrush, PenTool, Layout, Code } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Lenis from "lenis";
import { Caveat, Geist } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

import { Variants } from "framer-motion";




import { useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

// --- Framer Motion Variants ---
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



import SvgArcs from "@/components/SvgArcs";
import HeroBackground from "@/components/HeroBackground";
import MotionPath from '@/components/MotionPath';








// --- FONTS ---
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["700", "900"],
});

// List of images from public/section2/
const SECTION_2_IMAGES = Array.from({ length: 12 }, (_, i) => `/section2/scrolling ${i + 1}.png`);

// Duplicate the array multiple times so the infinite scroll never breaks
const ROW_1_IMAGES = [...SECTION_2_IMAGES, ...SECTION_2_IMAGES, ...SECTION_2_IMAGES];
const ROW_2_IMAGES = [...SECTION_2_IMAGES.slice().reverse(), ...SECTION_2_IMAGES.slice().reverse(), ...SECTION_2_IMAGES.slice().reverse()];

// --- SHARED ANIMATIONS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: custom, ease: [0.215, 0.61, 0.355, 1] },
  }),
};

const cardFloat = (delay: number) => ({
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut",
      delay,
    },
  },
});

// --- DATA DEFINITIONS ---
const projectsRow1 = [
  { id: 1, title: "PLUTO", subtitle: "Digital agency & strategy platform", bg: "bg-[#EAEAEA]" },
  { id: 2, title: "Amplus", subtitle: "Financial management consultancy", bg: "bg-[#F3F2EE]" },
  { id: 3, title: "Design & Strategy", subtitle: "Creative portfolios and campaigns", bg: "bg-[#E2E4E6]" },
  { id: 4, title: "BasisLand", subtitle: "E-commerce & retail systems", bg: "bg-[#EFEFEE]" },
];

const projectsRow2 = [
  { id: 5, title: "Stark", subtitle: "SaaS layout & visual systems", bg: "bg-[#EAEAEA]" },
  { id: 6, title: "Cafen Cafe", subtitle: "Brand Identity & digital menu", bg: "bg-[#F5F2EB]" },
  { id: 7, title: "Oslo Strategy", subtitle: "Corporate operations engine", bg: "bg-[#ECECEC]" },
  { id: 8, title: "JobPort", subtitle: "Recruitment dashboard platform", bg: "bg-[#E6E8EA]" },
];

const doubleRow1 = [...projectsRow1, ...projectsRow1, ...projectsRow1];
const doubleRow2 = [...projectsRow2, ...projectsRow2, ...projectsRow2];

const services = [
  {
    id: 1,
    title: "Brand Identity Design",
    description: "Building memorable brand identities that inspire trust, establish recognition, and create meaningful connections with your audience.",
    tags: ["BRANDING", "LOGO DESIGN", "VISUAL IDENTITY", "PACKAGING"],
    icon: (
      <svg className="w-5 h-5 text-[#FF5500]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    )
  },
  {
    id: 2,
    title: "Digital Marketing",
    description: "Helping brands grow through strategic campaigns, engaging content, and digital experiences that deliver measurable impact.",
    tags: ["SOCIAL MEDIA", "CONTENT STRATEGY", "SEO", "META ADS"],
    icon: (
      <svg className="w-5 h-5 text-[#FF5500]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    )
  },
  {
    id: 3,
    title: "Performance Marketing",
    description: "Optimizing every campaign with data-driven strategies that generate qualified leads, improve conversions, and maximize return on investment.",
    tags: ["LEAD GENERATION", "PAID ADS", "CRO", "ANALYTICS"],
    icon: (
      <svg className="w-5 h-5 text-[#FF5500]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  },
  {
    id: 4,
    title: "Website & Software Development",
    description: "Designing and developing high-performance digital solutions that combine exceptional user experience with reliable technology.",
    tags: ["WEBSITES", "WEB APPS", "MOBILE APPS", "UI/UX"],
    icon: (
      <svg className="w-5 h-5 text-[#FF5500]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  {
    id: 5,
    title: "Creative & Motion Studio",
    description: "Crafting visually compelling content and motion experiences that elevate communication, engagement, and brand perception.",
    tags: ["GRAPHIC DESIGN", "MOTION GRAPHICS", "VIDEO EDITING", "REELS"],
    icon: (
      <svg className="w-5 h-5 text-[#FF5500]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 6,
    title: "Print & Brand Production",
    description: "Delivering premium print solutions that extend your brand identity beyond the digital world with consistency and quality.",
    tags: ["PRINT DESIGN", "PACKAGING", "MERCHANDISE", "COLLATERAL"],
    icon: (
      <svg className="w-5 h-5 text-[#FF5500]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
    )
  }
];

const projects = [
  {
    title: "Social Media Growth",
    industry: "Healthcare / Local Business",
    scope: "Social Media Design + Brand Identity + Website",
    desc: "Built a consistent visual presence that increased brand visibility, audience engagement, and trust across digital platforms.",
    img: "/projects/socialmediagrowth.jpg",
  },
  {
    title: "Restaurant Marketing Campaign",
    industry: "Food & Beverage",
    scope: "Social Media + Brand Identity + Application",
    desc: "Created high-converting promotional creatives that boosted customer engagement and strengthened local brand awareness.",
    img: "/projects/restaurent.png",
  },
  {
    title: "Real Estate & Brand Launch",
    industry: "Real Estate and Startups",
    scope: "Logo • Brand Collateral • Marketing Creatives",
    desc: "Developed a premium brand identity and marketing assets that helped position the project as a credible investment opportunity.",
    img: "/projects/realestate.png",
  },
  {
    title: "Orion Fitness",
    industry: "Health & Wellness",
    scope: "Brand Identity • Social Media • Mobile App UI",
    desc: "Designed a modern fitness experience with engaging visuals and intuitive interfaces to drive user motivation and retention.",
    img: "/projects/orionfitness.png",
  }
];

const frameworkSteps = [
  {
    num: "01",
    title: "Discovery & Strategy",
    desc: "We analyze your audience, map goals, and lay down a foolproof roadmap designed to secure scalable digital growth.",
    tags: "AUDIENCE RESEARCH • COMPETITOR ANALYSIS • ROADMAPPING"
  },
  {
    num: "02",
    title: "Collaborative Design",
    desc: "We turn guidelines and strategies into stunning modern wireframes, interactive user experiences, and visual styles.",
    tags: "UI/UX DESIGN • WIREFRAMING • BRAND GUIDELINES"
  },
  {
    num: "03",
    title: "Content Strategy",
    desc: "We craft persuasive copy, plan your media assets, and format your structure to convert casual visitors into advocates.",
    tags: "COPYWRITING • MEDIA PLANNING • CONVERSION ARCHITECTURE"
  },
  {
    num: "04",
    title: "Launch & Marketing",
    desc: "We launch campaigns that drive visibility, engagement, and measurable results.",
    tags: "SOCIAL MEDIA MARKETING • META ADS • CONTENT STRATEGY"
  },
  {
    num: "05",
    title: "Scale & Optimize",
    desc: "We continuously analyze, optimize, and scale digital efforts for long-term success.",
    tags: "SEO • ANALYTICS • PERFORMANCE GROWTH"
  }
];


const comparisons = [
  { other: "Slow response times", us: "Instant communication" },
  { other: "Hidden agency fees", us: "100% transparent pricing" },
  { other: "Cookie-cutter templates", us: "Custom high-converting design" },
  { other: "Unclear deliverables", us: "Clear roadmaps & updates" },
];

const COUNTERS = ["10+", "25+", "50+"];

const REVIEWS = [
  {
    id: 1,
    name: "Dr. Sayali Vaidya",
    role: "Founder, V Anvitaara Training Center, Pune",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    text: "A highly creative professional who understands both design and business objectives. His work helped us present our brand with greater clarity, confidence, and impact."
  },
  {
    id: 2,
    name: "Rajesh Kanmuse",
    role: "Owner, Yashraj Tyres, Latur",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    text: "Professional, creative, and highly dependable. Shubham's work helped us present our brand with greater clarity, consistency, and impact."
  },
  {
    id: 3,
    name: "Shubham M.",
    role: "Founder, Arihant Industries, Pune",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    text: "Creative, professional, and result-oriented. Shubham's work brought clarity, consistency, and a stronger visual identity to our brand."
  },
  {
    id: 4,
    name: "Swaraj V W.",
    role: "Founder",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    text: "Their process was smooth, collaborative, and incredibly intuitive — the final result reflects our identity perfectly."
  },
  {
    id: 5,
    name: "Manish Shinde",
    role: "Manager",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    text: "From concept to execution, they understood our goals and crafted a digital experience that feels uniquely ours."
  },
  {
    id: 6,
    name: "Aditya Sharma",
    role: "CEO",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    text: "They made everything simple and efficient, turning our brand vision into a polished product that elevates our online presence."
  }
];

// --- MAIN REACT COMPONENT ---
export default function TechSolLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [currentFrameworkIdx, setCurrentFrameworkIdx] = useState(2);
  const [counterIndex, setCounterIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  //------gsap------//
  const logo1Ref = useRef(null);
  const logo2Ref = useRef(null);
  const logo3Ref = useRef(null);

  const rightLogo1Ref = useRef(null);
  const rightLogo2Ref = useRef(null);
  const rightLogo3Ref = useRef(null);

  useEffect(() => {
    // LEFT CURVE
    const leftLogos = [
      { ref: logo1Ref, start: 0 },
      { ref: logo2Ref, start: 0.5 },
      { ref: logo3Ref, start: 1 },
    ];

    leftLogos.forEach(({ ref, start }) => {
      if (!ref.current) return;

      gsap.to(ref.current, {
        duration: 15,
        repeat: -1,
        ease: "none",
        motionPath: {
          path: "#leftCurve",
          align: "#leftCurve",
          alignOrigin: [0.5, 0.5],
          start,
          end: start + 1,
          autoRotate: false,
        },
      });
    });

    // RIGHT CURVE
    const rightLogos = [
      { ref: rightLogo1Ref, start: 0 },
      { ref: rightLogo2Ref, start: 0.5 },
      { ref: rightLogo3Ref, start: 1 },
    ];

    rightLogos.forEach(({ ref, start }) => {
      if (!ref.current) return;

      gsap.to(ref.current, {
        duration: 15,
        repeat: -1,
        ease: "none",
        motionPath: {
          path: "#rightCurve",
          align: "#rightCurve",
          alignOrigin: [0.5, 0.5],
          start,
          end: start + 1,
          autoRotate: false,
        },
      });
    });
  }, []);
  const duplicatedServices = [...services, ...services, ...services, ...services];

  // Smooth Scroll Handler to Section 4 (Services)
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [isSection3Toggled, setIsSection3Toggled] = useState(false)

  const counters = ["+52", "+84", "+116"];
  useEffect(() => {
    const interval = setInterval(() => {
      setCounterIndex((prev) => (prev + 1) % COUNTERS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % projects.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounterIndex((prevIndex) => (prevIndex + 1) % counters.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  // Place this right above TechSolLandingPage component
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  // Calculate the two current cards for side-by-side display
  const firstCard = REVIEWS[currentIndex];
  const secondCard = REVIEWS[(currentIndex + 1) % REVIEWS.length];

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFrameworkIdx((prev) => (prev + 1) % frameworkSteps.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,
      smoothWheel: true,
      touchMultiplier: 2,
    });

    //-----gsap-----//




    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#F5F5F5] text-[#0A0A0A] font-sans antialiased flex flex-col selection:bg-orange-500 selection:text-white">

      {/* ================= HEADER NAVBAR ================= */}
      <section className="relative min-h-screen w-full overflow-hidden">

        {/* ================= SECTION 1: HERO CONTENT ================= */}

        <Image
          src="/backgroundimg.png"
          alt="Background"
          fill
          priority
          className="object-fill object-center -z-0"
        />

        //-----gsap-----//
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-50"
          viewBox="0 0 1440 900"
        >
          <path
            id="leftCurve"
            d="M190 -80 C450 140 210 910 80 890"
            fill="none"
            stroke="transparent"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            id="rightCurve"
            d="M1240 -70 C990 140 1240 900 1360 890"
            fill="none"
            stroke="transparent"
            strokeWidth="4"
          />
        </svg>
        <motion.div>
          <Image
            ref={logo1Ref}
            src="/A.jpeg"
            alt="Logo"
            width={80}
            height={80}
            className="absolute rounded-2xl overflow-hidden object-cover"
          />

          <Image
            ref={logo2Ref}
            src="/B..png"
            alt="Logo"
            width={80}
            height={80}
            className="absolute rounded-2xl overflow-hidden object-cover"
          />

          <Image
            ref={logo3Ref}
            src="/C.png"
            alt="Logo"
            width={80}
            height={80}
            className="absolute rounded-2xl overflow-hidden object-cover"
          />

          <Image
            ref={rightLogo1Ref}
            src="/D.png"
            alt="Logo"
            width={80}
            height={80}
            className="absolute rounded-2xl overflow-hidden object-cover"
          />

          <Image
            ref={rightLogo2Ref}
            src="/E.png"
            alt="Logo"
            width={80}
            height={80}
            className="absolute rounded-2xl overflow-hidden object-cover"
          />

          <Image
            ref={rightLogo3Ref}
            src="/F.png"
            alt="Logo"
            width={80}
            height={80}
            className="absolute rounded-2xl overflow-hidden object-cover"
          />
        </motion.div>
        {/* Adjusted pt-36 to clear space for floating navbar */}
        <main className="relative z-10 max-w-5xl mx-auto text-center px-6 pt-36 pb-24 flex flex-col items-center justify-center min-h-screen overflow-hidden">

          {/* Digital Agency Tag */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="inline-flex items-center gap-1 border border-neutral-300/60 bg-white/60 px-3.5 py-1 rounded-full shadow-sm mb-6 z-10"
          >
            <span
              className="text-[10px] font-bold tracking-[0.25em] uppercase pl-1"
              style={{ color: "rgb(105, 104, 110)" }}
            >
              ⁘ Digital Agency ⁘
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            custom={0.15}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className={`${geist.className} text-center text-[32px] sm:text-[48px] md:text-[54px] font-bold leading-[1.08] tracking-tight text-[#060612] max-w-4xl mx-auto mb-[32px] z-10`}
            style={{
              fontFeatureSettings:
                '"blwf" on, "cv09" on, "cv03" on, "cv04" on, "cv11" on',
            }}
          >
            We build brands, websites & campaigns that{" "}
            <span className="font-black text-[#FF5500]">drive growth.</span>
          </motion.h1>

          {/* Subtitle Paragraph */}
          <motion.p
            custom={0.3}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-sm sm:text-base md:text-[16px] max-w-xl leading-[1.6] font-normal z-10"
            style={{ color: "rgb(105, 104, 110)", textAlign: "center" }}
          >
            Strategic design, social media marketing, websites and digital solutions
            crafted to help businesses stand out, scale faster and achieve measurable
            results.
          </motion.p>

          {/* Action Buttons Row */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 relative pb-20 z-10">
            {/* Column 1: Discuss Button */}
            <div className="relative">
              <motion.div
                custom={0.15}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
              >
                <Link href="/contact" className="inline-block">
                  <button className="bg-[#FF5500] text-white font-bold text-sm px-8 py-4 rounded-xl shadow-[0_6px_20px_rgba(255,85,0,0.25)] hover:bg-orange-600 transition-all duration-200 whitespace-nowrap cursor-pointer">
                    Discuss your ideas
                  </button>
                </Link>
              </motion.div>

              {/* Handwritten Annotation Arrow */}
              <div className="absolute -left-12 top-full pt-2 flex flex-col items-start select-none pointer-events-none w-[200px]">
                <svg
                  width="44"
                  height="36"
                  viewBox="0 0 44 36"
                  fill="none"
                  className="text-[#ff6321] overflow-visible mb-1 ml-6"
                >
                  <motion.path
                    d="M 6 30 C 6 16, 18 6, 36 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  <motion.path
                    d="M 28 2 L 36 6 L 30 14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.2 }}
                  />
                </svg>

                <motion.p
                  className={`${caveat.className} text-[12px] font-normal leading-[1.2em] text-[#ff6321] text-left tracking-normal whitespace-nowrap`}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.04,
                        delayChildren: 0.6,
                      },
                    },
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  {"Schedule a free call now".split("").map((char, index) => (
                    <motion.span
                      key={index}
                      variants={{
                        hidden: { opacity: 0, y: 1 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.1 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.p>
              </div>
            </div>

            {/* Column 2: View Services Button */}
            <motion.div
              custom={0.15}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <Link
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <button
                  type="button"
                  className="bg-[#0A0A0A] text-white font-bold text-sm px-8 py-4 rounded-xl shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:bg-neutral-800 transition-all duration-200 whitespace-nowrap cursor-pointer"
                >
                  View services
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Stat Line */}
          <motion.div
            custom={0.6}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mt-12 text-[10px] sm:text-xs font-bold tracking-[0.18em] uppercase border-b border-dashed border-neutral-300/60 pb-8 w-full max-w-2xl z-10"
            style={{ color: "rgb(105, 104, 110)", textAlign: "center" }}
          >
            5+ YEARS EXPERIENCE • 1000+ CREATIVES DELIVERED • 100+ CAMPAIGNS MANAGED
          </motion.div>
        </main>
      </section>

      {/* ================= SECTION 2: PROJECTS SHOWCASE ================= */}
      <section id="projects-section" className="relative py-24 w-full overflow-hidden select-none border-t border-neutral-200/50 bg-[#F5F5F5]">

        {/* UPPER SLIDER ROW */}
        <div className="w-full flex overflow-hidden relative py-4 z-10">
          <motion.div
            className="flex gap-6 whitespace-nowrap flex-nowrap"
            animate={{ x: ["-33.33%", "0%"] }}
            transition={{
              ease: "linear",
              duration: 60, // Increased duration for a slower, smoother scroll
              repeat: Infinity,
            }}
          >
            {ROW_1_IMAGES.map((imagePath, idx) => (
              <div
                key={`row1-img-${idx}`}
                className="relative w-[320px] sm:w-[380px] md:w-[440px] h-[220px] sm:h-[260px] md:h-[300px] flex-shrink-0 rounded-[24px] border border-neutral-300/40 overflow-hidden shadow-[0_12px_24px_rgba(0,0,0,0.02)] bg-white"
              >
                <Image
                  src={imagePath}
                  alt={`Project screenshot ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 380px, 440px"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* LOWER SLIDER ROW */}
        <div className="w-full flex overflow-hidden relative py-4 mt-6 z-10">
          <motion.div
            className="flex gap-6 whitespace-nowrap flex-nowrap"
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{
              ease: "linear",
              duration: 60, // Increased duration for a slower, smoother scroll
              repeat: Infinity,
            }}
          >
            {ROW_2_IMAGES.map((imagePath, idx) => (
              <div
                key={`row2-img-${idx}`}
                className="relative w-[320px] sm:w-[380px] md:w-[440px] h-[220px] sm:h-[260px] md:h-[300px] flex-shrink-0 rounded-[24px] border border-neutral-300/40 overflow-hidden shadow-[0_12px_24px_rgba(0,0,0,0.02)] bg-white"
              >
                <Image
                  src={imagePath}
                  alt={`Project screenshot ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 380px, 440px"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* CENTRAL BADGE DIALOG OVERLAY */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
        >
          <div className="relative w-[400px] h-[400px] rounded-full bg-white/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-8 border border-neutral-200/40 shadow-[0_24px_60px_rgba(0,0,0,0.08),_0_0_0_8px_rgba(255,255,255,0.4)] transition-all pointer-events-auto">

            <div className="mb-6 p-3 bg-white rounded-xl border border-neutral-200/50 shadow-sm flex items-center justify-center w-12 h-12">
              <div className="relative w-6 h-6 flex-shrink-0">
                <div className="absolute inset-0 bg-[#1D3B80] rounded-[4px_6px_4px_8px] transform -rotate-12 opacity-90"></div>
                <div className="absolute inset-0 bg-[#E05300] rounded-[6px_4px_8px_4px] transform rotate-12 mix-blend-multiply opacity-90 translate-x-1"></div>
              </div>
            </div>

            <h3 className="text-[38px] font-black tracking-tight text-[#0A0A0A] leading-[1.1] mb-8">
              100+ Premium<br />Designs
            </h3>

            <Link href="/projects">
              <button className="bg-[#FF5500] text-white text-[15px] font-bold tracking-tight px-8 py-4 rounded-[14px] hover:bg-orange-600 active:scale-[0.98] transition-all duration-200 shadow-[0_4px_14px_rgba(255,85,0,0.4),_inset_0_-2px_0_rgba(0,0,0,0.1)] cursor-pointer">
                Explore all Projects
              </button>
            </Link>

          </div>
        </motion.div>

      </section>

      {/* ================= SECTION 3: STORY / COMPARISON ================= */}
      {/* SECTION 3: Read Our Story / Comparison Section */}
      <motion.section className="w-full bg-[#F5F5F5] py-24 px-6 border-b border-neutral-200/50 transition-colors duration-300"
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 16,
          duration: 0.7,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-16 items-start">

          {/* HEADINGS & INTERACTIVE TOGGLE */}
          <div className="flex flex-col items-start text-left gap-6 font-sans w-full">
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#060612] tracking-tight leading-[1.2] max-w-xl">
              Choosing the right{" "}
              <span className={isSection3Toggled ? "text-[#0A0A0A] transition-colors duration-300" : "text-[#FF5500] transition-colors duration-300"}>
                creative partner
              </span>{" "}
              shouldn't be a gamble.
            </h2>

            <p className="text-3xl sm:text-4xl font-semibold text-[#060612] tracking-tight leading-[1.2] max-w-2xl">
              We focus on{" "}
              <span className={isSection3Toggled ? "text-[#0A0A0A] transition-colors duration-300" : "text-[#FF5500] transition-colors duration-300"}>
                clear communication, transparent processes
              </span>{" "}
              and designs that help businesses grow

              {/* Interactive Toggle Pill Button */}
              <button
                type="button"
                onClick={() => setIsSection3Toggled((prev) => !prev)}
                aria-label="Toggle preference"
                className={`inline-flex items-center mx-2.5 w-12 h-6 rounded-full p-0.5 relative top-1 shadow-inner transition-colors duration-300 focus:outline-none cursor-pointer ${isSection3Toggled ? "bg-neutral-400" : "bg-[#FF5500]"
                  }`}
              >
                <span
                  className={`bg-white w-5 h-5 rounded-full block shadow-md transform transition-transform duration-300 ${isSection3Toggled ? "translate-x-6" : "translate-x-0"
                    }`}
                />
              </button>

              without the usual agency headaches.
            </p>
          </div>

          {/* COMPARISON TABLE COMPONENT */}
          <motion.div
            className="w-full bg-white rounded-3xl border border-neutral-200/60 shadow-[0_4px_30px_rgba(0,0,0,0.02)] grid grid-cols-2 relative font-sans text-left mt-6 mb-6"
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 16,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
          >
            {/* Other Agencies (Left Side) */}
            <div className="flex flex-col py-6">
              <div className="p-6 sm:p-8 pt-2">
                <h3 className="text-xl font-bold text-[#0A0A0A]">Other agencies</h3>
              </div>
              <div className="flex flex-col gap-1">
                {comparisons.map((item, idx) => (
                  <div
                    key={idx}
                    className="px-6 sm:px-8 py-4 text-neutral-500 font-medium text-sm flex items-center gap-3 border-t border-neutral-100"
                  >
                    <span className="text-neutral-400 text-xs font-bold select-none">❯</span>
                    <span>{item.other}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* TechSol Media */}
            <div
              className={`flex flex-col rounded-3xl absolute top-0 bottom-0 right-0 left-[50%] -my-6 border border-white/20 z-10 py-6 transition-all duration-300 ${isSection3Toggled
                ? "bg-[#EBEAE8] text-[#0A0A0A] shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
                : "bg-[#FDA466] text-[#0A0A0A] shadow-[0_20px_40px_rgba(253,164,102,0.25)]"
                }`}
            >
              <div className="p-6 sm:p-8 pt-2">
                <h3 className="text-xl font-bold">TechSol Media</h3>
              </div>
              <div className="flex flex-col gap-1">
                {comparisons.map((item, idx) => (
                  <div
                    key={idx}
                    className="px-6 sm:px-8 py-4 font-semibold text-sm flex items-center gap-3 border-t border-black/5"
                  >
                    <span className="text-[#0A0A0A]/70 text-xs font-bold select-none">❯</span>
                    <span>{item.us}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* FOOTER ACTION & RATING BLOCK */}
          <motion.div
            className="w-full flex flex-col sm:flex-row sm:inline-flex sm:items-center justify-start gap-6 pt-6 border-t border-neutral-300/20 font-sans"
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 16,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
          >
            <Link href="/about" className="inline-block shrink-0">
              <button
                type="button"
                className="bg-[#FF5500] hover:bg-orange-600 active:scale-[0.98] text-white font-bold text-base px-7 py-3.5 rounded-2xl shadow-[0_4px_14px_rgba(255,85,0,0.25)] transition-all duration-200"
              >
                Read our story
              </button>
            </Link>

            <div className="flex items-center gap-6">
              <div className="flex items-center -space-x-3.5">
                <div className="w-12 h-12 rounded-full border-2 border-white ring-4 ring-[#EAEAEA]/40 overflow-hidden shadow-sm bg-neutral-800 text-white flex items-center justify-center">
                  <svg className="w-6 h-6 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>

                <div className="w-12 h-12 rounded-full border-2 border-white ring-4 ring-[#EAEAEA]/40 overflow-hidden shadow-sm bg-[#FF5500] text-white flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>

                <div className="w-12 h-12 rounded-full border-2 border-white ring-4 ring-[#EAEAEA]/40 overflow-hidden shadow-sm bg-neutral-700 text-white flex items-center justify-center">
                  <svg className="w-6 h-6 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>

                <div className="w-12 h-12 rounded-full bg-white border border-neutral-200 ring-4 ring-[#EAEAEA]/30 shadow-sm flex items-center justify-center text-sm font-bold text-[#0A0A0A] z-10">
                  <span className="tracking-tighter transition-all duration-300 inline-block">
                    {counters[counterIndex]}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-start gap-0.5">
                <div className="flex items-center text-[#FF5500] gap-0.5">
                  {"★★★★★".split("").map((star, i) => (
                    <span key={i} className="text-base">★</span>
                  ))}
                  <span className="text-base font-bold text-[#0A0A0A] ml-2">4.9/5</span>
                </div>

                <p className="text-sm text-neutral-500 font-medium">
                  Trusted by <span className="text-[#FF5500] font-bold">10+</span> visionary brands
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.section>

      {/* ================= SECTION 4: CREATIVE PARTNER COMPARISON ================= */}
      {/* ================= SECTION: SERVICES ================= */}
      <motion.section
        id="services"
        className="relative py-24 w-full overflow-hidden select-none border-t border-neutral-200/50 bg-[#F5F5F5] font-sans antialiased"
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 16,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .framer-headline-exact {
              font-family: "Geist", "Geist Placeholder", sans-serif;
              font-size: 55px;
              font-style: normal;
              font-weight: 700;
              letter-spacing: 0em;
              line-height: 1.2em;
              color: #060612;
              font-feature-settings: 'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on;
            }
            @media (max-width: 1199px) and (min-width: 810px) {
              .framer-headline-exact { font-size: 40px !important; }
            }
            @media (max-width: 809px) {
              .framer-headline-exact { font-size: 36px !important; }
            }
          `,
          }}
        />

        {/* HEADER BLOCK */}
        <div className="max-w-5xl mx-auto px-6 mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 z-10 relative">
          <div>
            <div className="inline-flex items-center gap-1 mb-4">
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#69686E]">
                ⋗ WHAT WE DO ⋖
              </span>
            </div>
            <h2 className="framer-headline-exact">
              Services built to drive impact
            </h2>
          </div>

          {/* Action Button */}
          <div className="relative inline-flex items-center flex-shrink-0">
            {/* Arrow & Text - Aligned to the start/left of the button */}
            <div className="absolute -top-16 left-1 flex flex-col items-start pointer-events-none select-none">
              {/* Handwritten Text */}
              <motion.p
                className={`${caveat?.className ?? ""} text-[13px] text-[#ff6321] whitespace-nowrap mb-0.5 ml-2`}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.04,
                      delayChildren: 0.6,
                    },
                  },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {"Let's create something impactful".split("").map((char, index) => (
                  <motion.span
                    key={`impact-char-${index}-${char}`}
                    variants={{
                      hidden: { opacity: 0, y: 1 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.1 }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.p>

              {/* Horizontally Mirrored Arrow (Guaranteed Flip via inline transform) */}
              <svg
                width="70"
                height="60"
                viewBox="0 0 70 60"
                fill="none"
                className="text-[#ff6321] ml-10 -mt-2"
              >
                {/* Curved Line */}
                <motion.path
                  d="M18 8
       C18 24 22 34 34 40
       C42 44 50 44 58 40"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                />

                {/* Arrow Head */}
                <motion.path
                  d="M52 35 L58 40 L51 45"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.55, duration: 0.2 }}
                  viewport={{ once: true }}
                />
              </svg>
            </div>

            <Link href="/contact">
              <button
                type="button"
                className="bg-[#FF5500] text-white font-bold text-sm px-7 py-4 rounded-xl shadow-[0_4px_14px_rgba(255,85,0,0.25)] hover:bg-orange-600 transition-all duration-200 z-10 cursor-pointer whitespace-nowrap"
              >
                Discuss your ideas
              </button>
            </Link>
          </div>
        </div>

        {/* OUTER WRAPPER CONTAINER WITH INSET SHADOW & BORDER */}
        <div className="w-full border border-solid border-[#fff] bg-[#eeecea] py-6 shadow-[inset_0px_0px_6px_0px_#0606122e]">
          {/* HORIZONTAL SLIDER (RIGHT TO LEFT AT LOW SPEED) */}
          <div className="w-full flex overflow-hidden relative z-10">
            <motion.div
              className="flex gap-6 whitespace-nowrap flex-nowrap"
              animate={{ x: ["0%", "-50%"] }} // Moves right-to-left
              transition={{
                ease: "linear",
                duration: 55, // Slow, aesthetic speed
                repeat: Infinity,
              }}
            >
              {duplicatedServices.map((service, idx) => (
                <div
                  key={`service-card-${service.id || idx}-${idx}`}
                  className="w-[340px] sm:w-[420px] md:w-[460px] flex-shrink-0 bg-white rounded-[12px] border border-neutral-200/80 p-8 flex flex-col justify-between gap-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] whitespace-normal"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#060612] leading-snug">
                        {service.title}
                      </h3>
                      <div className="w-10 h-10 rounded-lg bg-[#FAF9F9] border border-neutral-200/50 flex items-center justify-center flex-shrink-0">
                        {service.icon}
                      </div>
                    </div>

                    <div className="w-full border-b border-dashed border-neutral-200/80 my-4" />

                    <p className="text-[#69686E] text-sm sm:text-[15px] leading-relaxed font-normal">
                      {service.description}
                    </p>
                  </div>

                  {/* Service Tag Pills */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {service.tags?.map((tag: string) => (
                      <span
                        key={`${tag}-${idx}`}
                        className="text-[10px] font-bold tracking-wider text-neutral-500 bg-neutral-100/80 border border-neutral-200/40 px-3.5 py-1.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ================= SECTION 5: FEATURED PROJECTS ================= */}
      <motion.section className="w-full bg-[#F5F5F5] py-24 overflow-hidden relative z-10 font-sans antialiased"
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 16,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}>
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center">

          {/* SECTION LABEL */}
          <div className="inline-flex items-center gap-1.5 text-neutral-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4 font-sans">
            <span className="opacity-60 text-[10px]">❯</span>
            <span>Featured Projects</span>
            <span className="opacity-60 text-[10px]">❮</span>
          </div>

          {/* HEADING + ARROW TO THE RIGHT POINTING TO TEXT */}
          <div className="relative inline-block max-w-2xl">
            <h2
              className={`${geist.className} text-[40px] font-bold tracking-tight leading-[1.15] text-[#060612] pr-4 md:pr-0`}
              style={{
                fontFeatureSettings: '"blwf" on, "cv09" on, "cv03" on, "cv04" on, "cv11" on'
              }}
            >
              Projects that <br /> drive real results
            </h2>

            {/* ARROW ON THE RIGHT POINTING TOWARDS THE SENTENCE */}
            <div className="absolute top-[50%] left-full ml-4 transform -translate-y-1/2 hidden sm:flex flex-col items-center select-none pointer-events-none w-[180px]">
              <svg
                width="44"
                height="36"
                viewBox="0 0 44 36"
                fill="none"
                className="text-[#ff6321] overflow-visible mb-1"
              >
                <motion.path
                  d="M 38 28 C 38 16, 26 4, 8 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                <motion.path
                  d="M 16 0 L 8 4 L 14 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.2 }}
                />
              </svg>

              {/* LETTER-BY-LETTER ANIMATION */}
              <motion.p
                className={`${caveat.className} text-[13px] font-normal leading-[1.2em] text-[#ff6321] tracking-normal whitespace-nowrap mt-1`}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.04,
                      delayChildren: 0.6
                    }
                  }
                }}
                initial="hidden"
                animate="visible"
              >
                {"Where ideas take shape".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 1 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.1 }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.p>
            </div>
          </div>

          {/* SUBTITLE */}
          <p className="text-neutral-500 font-medium text-base sm:text-lg max-w-2xl mt-6 leading-relaxed font-sans">
            Explore how we've helped businesses strengthen their brand, improve their online presence, and achieve measurable growth.
          </p>
        </div>

        {/* CAROUSEL CONTAINER WITH INSET BORDER */}
        <div className="w-full mt-16 overflow-hidden px-4 md:px-0">
          <div className="max-w-5xl mx-auto px-6 relative">

            <div
              className="flex gap-6 transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${activeProject * 100}%)` }}
            >
              {projects.map((proj, idx) => {
                const isActive = idx === activeProject;
                return (
                  /* CARD WRAPPER WITH INSET SHADOW BORDER */
                  <div
                    key={proj.title || idx}
                    className={`min-w-full md:min-w-[100%] border border-solid border-[#fff] rounded-[24px] bg-[#eeecea] p-3 shadow-[inset_0px_0px_6px_0px_#0606122e] transition-all duration-500 ${isActive ? "opacity-100 scale-100" : "opacity-40 scale-[0.97]"
                      }`}
                  >
                    {/* INNER CARD CONTENT */}
                    <div className="w-full bg-white rounded-[16px] border border-neutral-200/70 p-8 sm:p-12 flex flex-col md:flex-row gap-8 items-center shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
                      <div className="flex flex-col justify-between flex-1 pr-0 md:pr-4 text-left items-start h-full gap-6">
                        <div className="flex flex-col gap-4 w-full">
                          <h3 className="text-2xl sm:text-3xl font-semibold text-[#0A0A0A] tracking-tight font-sans">
                            {proj.title}
                          </h3>

                          <div className="flex flex-col gap-2 pt-2 text-sm text-neutral-500 border-b border-neutral-100 pb-6 w-full font-sans">
                            <p className="font-medium">
                              <span className="text-neutral-400">Industry:</span>{" "}
                              <span className="text-neutral-800 font-semibold">{proj.industry}</span>
                            </p>
                            <p className="font-medium">
                              <span className="text-neutral-400">Scope:</span>{" "}
                              <span className="text-neutral-800 font-semibold">{proj.scope}</span>
                            </p>
                          </div>

                          <p className="text-neutral-500 font-medium text-base leading-relaxed pt-2 font-sans">
                            {proj.desc}
                          </p>
                        </div>
                      </div>

                      <div className="flex-1 w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/40 relative">
                        <img
                          src={proj.img}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                          alt={`${proj.title} showcase visual representation`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* DOT INDICATORS */}
            <div className="flex justify-center items-center gap-2 mt-12">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveProject(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${idx === activeProject ? "w-6 bg-[#FF5500]" : "w-2 bg-neutral-300 hover:bg-neutral-400"
                    }`}
                  aria-label={`Jump to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        </div>
      </motion.section>

      {/* ================= SECTION 6: FRAMEWORK ================= */}
      `<section className="w-full relative z-10 bg-[#F5F5F5] py-24 px-6 overflow-hidden font-sans antialiased">
        <motion.div className="max-w-5xl mx-auto flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 16,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}>

          {/* HEADER */}
          <div className="inline-flex items-center gap-1.5 text-neutral-400 text-xs font-bold tracking-[0.2em] uppercase mb-4">
            <span>⁘ PROCESS ⁘</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-[56px] font-black tracking-[-0.03em] leading-[1.1] text-[#060612] max-w-2xl">
            The <span className="text-[#FF5500]">TechSol Media</span> Framework
          </h2>

          <p className="text-[#69686E] text-sm sm:text-base mt-4 max-w-xl font-normal leading-relaxed">
            Our structured approach to building brands, websites, applications, and growth campaigns.
          </p>

          {/* ARC WRAPPER - STRETCHES ACROSS THE PAGE */}
          <motion.div
            className="w-full relative flex justify-center h-[120px] sm:h-[150px] mt-10 overflow-visible"
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 16,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
          >

            {/* FULL VIEWPORT CURVED ARCH BORDER (START TO END OF SCREEN) */}
            <div
              className="absolute top-[60px] w-[105vw] max-w-[1300px] aspect-[2/1] rounded-t-full border-[6px] border-white/90 shadow-[0_-10px_35px_rgba(255,255,255,0.8),inset_0_2px_10px_rgba(0,0,0,0.02)] pointer-events-none z-0 left-1/2 -translate-x-1/2 backdrop-blur-[1px]"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 0%, black 65%, transparent 100%)",
                maskImage:
                  "linear-gradient(to bottom, black 0%, black 65%, transparent 100%)",
              }}
            />
            {/* ROTATING STEP NODES CONTAINER */}
            <div className="absolute top-[60px] w-[110vw] max-w-[1400px] aspect-[2/1] z-10 left-1/2 -translate-x-1/2">
              {frameworkSteps.map((step, idx) => {
                const relativeIndex = idx - currentFrameworkIdx;
                const isActive = idx === currentFrameworkIdx;
                let angle = relativeIndex * 32;

                return (
                  <motion.div
                    key={step.num || idx}
                    className="absolute pointer-events-auto origin-bottom bottom-0 left-1/2 -translate-x-1/2"
                    style={{
                      height: "100%",
                      transformOrigin: "50% 100%"
                    }}
                    animate={{ rotate: angle }}
                    transition={{ type: "spring", stiffness: 70, damping: 16 }}
                  >
                    <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                      <motion.div
                        animate={{ rotate: -angle }}
                        transition={{ type: "spring", stiffness: 70, damping: 16 }}
                      >
                        {isActive ? (
                          <div className="flex flex-col items-center justify-center -mt-8 scale-105 transition-transform duration-300">
                            <span className="text-[10px] font-bold tracking-widest text-[#69686E] uppercase mb-1">
                              STEP
                            </span>
                            <button className="w-14 h-14 bg-[#FF5500] text-white font-black text-lg rounded-[14px] flex items-center justify-center shadow-[0_8px_24px_rgba(255,85,0,0.35)] border-2 border-white focus:outline-none cursor-pointer">
                              {step.num}
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setCurrentFrameworkIdx(idx)}
                            className="bg-white text-neutral-400 font-bold text-[14px] px-4 py-2 rounded-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-neutral-200/50 flex items-center justify-center transition-all duration-300 hover:text-[#060612] hover:scale-105 focus:outline-none cursor-pointer"
                          >
                            {step.num}
                          </button>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* DETAILS CARD CONTAINER */}
          <motion.div className="w-full max-w-xl bg-white rounded-[2rem] border border-neutral-200/60 p-8 sm:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.02)] mt-4 relative z-20 flex flex-col items-center"
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 16,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}>
            <div className="w-full overflow-hidden relative min-h-[160px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFrameworkIdx}
                  initial={{ opacity: 0, x: 45 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -45 }}
                  transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                  className="w-full flex flex-col items-center"
                >
                  <h3 className="text-2xl sm:text-3xl font-black text-[#060612] tracking-tight">
                    {frameworkSteps[currentFrameworkIdx]?.title}
                  </h3>

                  <p className="text-[#69686E] text-sm sm:text-[15px] leading-relaxed mt-4 max-w-md font-normal text-center">
                    {frameworkSteps[currentFrameworkIdx]?.desc}
                  </p>

                  <div className="w-full border-b border-dashed border-neutral-200/80 my-6" />

                  <p className="text-[10px] font-black tracking-widest text-[#69686E] uppercase text-center">
                    {frameworkSteps[currentFrameworkIdx]?.tags}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* REDIRECT TO /contact */}
            <Link href="/contact" className="w-full sm:w-auto mt-8">
              <button className="bg-[#FF5500] text-white font-bold text-sm px-9 py-4 rounded-xl shadow-[0_6px_20px_rgba(255,85,0,0.25)] hover:bg-orange-600 transition-all duration-200 w-full sm:w-auto active:scale-95 cursor-pointer">
                Start your project
              </button>
            </Link>

            {/* PAGINATION / DOT INDICATORS */}
            <div className="mt-8 pt-6 border-t border-neutral-100 w-full flex items-center justify-between px-2">
              <span className="text-[11px] font-black tracking-widest text-neutral-400">
                0{currentFrameworkIdx + 1} / 05
              </span>

              <div className="flex gap-1.5">
                {frameworkSteps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentFrameworkIdx(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${idx === currentFrameworkIdx ? "w-6 bg-[#FF5500]" : "w-2 bg-neutral-200 hover:bg-neutral-300"
                      }`}
                    aria-label={`Jump to framework step ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

        </motion.div>
      </section>
      `
      {/* ================= SECTION 7: REVIEWS ================= */}
      <section className="relative w-full bg-[#F5F5F5] py-24 px-4 overflow-hidden select-none">
        <motion.div className="max-w-6xl mx-auto flex flex-col items-center"
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 16,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}>

          {/* Section Header Tag */}
          <div className="inline-flex items-center gap-1 mb-3">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#69686E] uppercase">
              ⁘ TESTIMONIALS ⁘
            </span>
          </div>

          {/* Headline */}
          <h2 className={`${geist.className} text-4xl sm:text-5xl md:text-[56px] font-semibold text-[#060612] tracking-tight mb-14 text-center`}>
            What clients say
          </h2>
          {/* Animated Double-Card Slider */}
          <div className="w-full relative min-h-[340px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
              >
                {[firstCard, secondCard].map((review, idx) => (
                  <div
                    key={`${review.id}-${idx}`}
                    className="bg-[#EEECEA] border border-white rounded-[16px] p-2.5 shadow-[inset_0px_0px_6px_0px_rgba(6,6,18,0.18)]"
                  >
                    {/* INNER CARD WHITE CONTAINER */}
                    <div className="bg-white rounded-[12px] p-8 sm:p-10 min-h-[280px] flex flex-col justify-between shadow-sm">
                      {/* Review Text */}
                      <p className="text-base sm:text-lg md:text-[19px] font-medium leading-[1.5] text-[#0A0A0A] tracking-tight">
                        {review.text}
                      </p>

                      {/* Author Info & Star Ratings */}
                      <div className="flex items-center justify-between mt-8 pt-2">
                        <div className="flex items-center gap-3">
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className="w-9 h-9 rounded-full object-cover"
                          />
                          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0A0A0A]">
                            <span>{review.name}</span>
                            <span className="text-neutral-300">—</span>
                            <span className="text-neutral-500 font-normal">{review.role}</span>
                          </div>
                        </div>

                        {/* Stars */}
                        <div className="flex items-center gap-0.5 text-[#FF5500]">
                          {[...Array(review.stars)].map((_, i) => (
                            <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Downside Controls Bar */}
          <div className="relative w-full flex items-center justify-center mt-12">
            {/* Horizontal Line Background */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-neutral-200/80 -z-10" />

            {/* Centered Arrows */}
            <div className="flex items-center gap-2 bg-[#F5F5F5] px-4">
              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-xl bg-white border border-neutral-200 shadow-sm flex items-center justify-center hover:bg-neutral-100 active:scale-95 transition-all"
                aria-label="Previous review"
              >
                <svg className="w-3.5 h-3.5 text-neutral-700" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-xl bg-white border border-neutral-200 shadow-sm flex items-center justify-center hover:bg-neutral-100 active:scale-95 transition-all"
                aria-label="Next review"
              >
                <svg className="w-3.5 h-3.5 text-neutral-700" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

        </motion.div>
      </section>


      {/* ========================================================= */}
      {/* SECTION 8: FAQ Accordion Segment                           */}
      {/* ========================================================= */}
      <section className="w-full max-w-[1000px] mx-auto flex flex-col items-center justify-center mb-28 text-center px-4">
        <FAQSection />
      </section>

      {/* SECTION 9: Bottom Call-To-Action Segment */}
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

            {/* Direct Link redirecting to contact page form */}
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

            {/* Direct Link redirecting to contact page form */}
            <Link
              href="/contact"
              className="mt-5 w-full block bg-[#FF5500] text-white text-[13px] font-bold py-3.5 rounded-xl hover:bg-[#E04B00] transition-colors shadow-sm text-center cursor-pointer"
            >
              Book a free call
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>
      {/* ================= FOOTER ================= */}
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