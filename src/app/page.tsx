"use client";
import { FAQSection } from "@/components/FAQSection";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Lenis from "lenis";
import { Caveat, Geist } from "next/font/google";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

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
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1.0] as const,
    },
  },
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
  { other: "Delayed responses", us: "Fast communication" },
  { other: "Unclear revisions", us: "Defined revision process" },
  { other: "Generic designs", us: "Custom creative solutions" },
  { other: "No clear workflow", us: "Structured project execution" },
  { other: "One-time delivery", us: "Long-term support" },
];

const COUNTERS = ["10+", "25+", "50+"];

const REVIEWS = [
  {
    id: 1,
    name: "Dr. Sayali Vaidya",
    role: "Founder, V Anvitaara Training Center, Pune",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    text: "A highly creative professional who understands both design and business objectives. His work helped us present our brand with greater clarity, confidence, and impact.",
    stars: 5
  },
  {
    id: 2,
    name: "Rajesh Kanmuse",
    role: "Owner, Yashraj Tyres, Latur",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    text: "Professional, creative, and highly dependable. Shubham's work helped us present our brand with greater clarity, consistency, and impact.",
    stars: 5
  },
  {
    id: 3,
    name: "Shubham M.",
    role: "Founder, Arihant Industries, Pune",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    text: "Creative, professional, and result-oriented. Shubham's work brought clarity, consistency, and a stronger visual identity to our brand.",
    stars: 5
  },
  {
    id: 4,
    name: "Swaraj V W.",
    role: "Founder",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    text: "Their process was smooth, collaborative, and incredibly intuitive — the final result reflects our identity perfectly.",
    stars: 5
  },
  {
    id: 5,
    name: "Manish Shinde",
    role: "Manager",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    text: "From concept to execution, they understood our goals and crafted a digital experience that feels uniquely ours.",
    stars: 5
  },
  {
    id: 6,
    name: "Aditya Sharma",
    role: "CEO",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    text: "They made everything simple and efficient, turning our brand vision into a polished product that elevates our online presence.",
    stars: 5
  }
];

const duplicatedServices = [...services, ...services, ...services, ...services];
const counters = ["+52", "+84", "+116"];

const reviewSlideVariants = {
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

// --- MAIN REACT COMPONENT ---
export default function TechSolLandingPage() {
  const [activeProject, setActiveProject] = useState(0);
  const [currentFrameworkIdx, setCurrentFrameworkIdx] = useState(0);
  const [counterIndex, setCounterIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isSection3Toggled, setIsSection3Toggled] = useState(false);

  // GSAP Refs - Desktop
  const logo1Ref = useRef(null);
  const logo2Ref = useRef(null);
  const logo3Ref = useRef(null);
  const rightLogo1Ref = useRef(null);
  const rightLogo2Ref = useRef(null);
  const rightLogo3Ref = useRef(null);

  // GSAP Refs - Mobile
  const mLogo1Ref = useRef(null);
  const mLogo2Ref = useRef(null);
  const mLogo3Ref = useRef(null);
  const mRightLogo1Ref = useRef(null);
  const mRightLogo2Ref = useRef(null);
  const mRightLogo3Ref = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // DESKTOP ANIMATIONS (>= 768px) - Exact original behavior
    mm.add("(min-width: 768px)", () => {
      // LEFT CURVE LOGOS
      const leftLogos = [
        { ref: logo1Ref, start: 0.1 },
        { ref: logo2Ref, start: 0.433 },
        { ref: logo3Ref, start: 0.766 },
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

      // RIGHT CURVE LOGOS (Synchronized with left)
      const rightLogos = [
        { ref: rightLogo1Ref, start: 0.1 },
        { ref: rightLogo2Ref, start: 0.433 },
        { ref: rightLogo3Ref, start: 0.766 },
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
    });

    // MOBILE ANIMATIONS (< 768px) - Inside Curved Lines MotionPath (Slower speed, 3 icons on left & right in sync)
    mm.add("(max-width: 767px)", () => {
      const mobileDuration = 30; // Slower animation duration for mobile view only

      // Left side mobile icons (all moving along the INSIDE left curve, spaced evenly by 1/3)
      const mobileLeftLogos = [
        { ref: mLogo1Ref, path: "#mobileLeftPath1", progress: 0.15, duration: mobileDuration },
        { ref: mLogo2Ref, path: "#mobileLeftPath1", progress: 0.483, duration: mobileDuration },
        { ref: mLogo3Ref, path: "#mobileLeftPath1", progress: 0.816, duration: mobileDuration },
      ];

      mobileLeftLogos.forEach(({ ref, path, progress, duration }) => {
        if (!ref.current) return;
        const tween = gsap.to(ref.current, {
          duration,
          repeat: -1,
          ease: "none",
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
          },
        });
        tween.progress(progress);
      });

      // Right side mobile icons (all moving along the INSIDE right curve, matching left positions symmetrically)
      const mobileRightLogos = [
        { ref: mRightLogo1Ref, path: "#mobileRightPath1", progress: 0.15, duration: mobileDuration },
        { ref: mRightLogo2Ref, path: "#mobileRightPath1", progress: 0.483, duration: mobileDuration },
        { ref: mRightLogo3Ref, path: "#mobileRightPath1", progress: 0.816, duration: mobileDuration },
      ];

      mobileRightLogos.forEach(({ ref, path, progress, duration }) => {
        if (!ref.current) return;
        const tween = gsap.to(ref.current, {
          duration,
          repeat: -1,
          ease: "none",
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
          },
        });
        tween.progress(progress);
      });
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounterIndex((prev) => (prev + 1) % counters.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % projects.length);
    }, 4000);
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

  const firstCard = REVIEWS[currentIndex];
  const secondCard = REVIEWS[(currentIndex + 1) % REVIEWS.length];

  // Framework Section Ref for GSAP ScrollTrigger
  const frameworkSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Desktop only: Pin during scroll
    mm.add("(min-width: 768px)", () => {
      if (!frameworkSectionRef.current) return;

      const trigger = ScrollTrigger.create({
        trigger: frameworkSectionRef.current,
        start: "top top",
        end: "+=1800",
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        anticipatePin: 1,
        fastScrollEnd: true,
        preventOverlaps: true,
        onUpdate: (self) => {
          const stepIndex = Math.min(
            frameworkSteps.length - 1,
            Math.max(0, Math.floor(self.progress * frameworkSteps.length))
          );
          setCurrentFrameworkIdx(stepIndex);
        },
      });

      return () => {
        trigger.kill();
      };
    });

    return () => mm.revert();
  }, []);

  const handleFrameworkStepClick = (index: number) => {
    setCurrentFrameworkIdx(index);
  };

  // Mobile: Smooth auto-cycler every 5 seconds if on small screens
  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    if (!isMobile) return;

    const timer = setInterval(() => {
      setCurrentFrameworkIdx((prev) => (prev + 1) % frameworkSteps.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-[#F5F5F5] text-[#0A0A0A] font-sans antialiased flex flex-col selection:bg-orange-500 selection:text-white">

      {/* ================= HEADER NAVBAR ================= */}
      <section className="relative min-h-screen w-full overflow-hidden">

        {/* ================= SECTION 1: HERO CONTENT ================= */}

        {/* DESKTOP BACKGROUND IMAGE */}
        <Image
          src="/backgroundimg.png"
          alt="Desktop Background"
          fill
          priority
          sizes="100vw"
          className="hidden md:block object-fill object-center z-0"
        />

        {/* MOBILE BACKGROUND IMAGE (9:16 CURVED-LINE REFERENCE) */}
        <Image
          src="/mobile-hero-bg.jpg"
          alt="Mobile Background"
          fill
          priority
          sizes="100vw"
          className="block md:hidden object-cover object-center z-0"
        />

        {/* DESKTOP SVG MOTION PATHS */}
        <svg
          className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-[1]"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
        >
          <path
            id="leftCurve"
            d="M 120 -50 C 220 300 180 700 80 1050"
            fill="none"
            stroke="transparent"
            strokeWidth="4"
          />
          <path
            id="rightCurve"
            d="M 880 -50 C 780 300 820 700 920 1050"
            fill="none"
            stroke="transparent"
            strokeWidth="4"
          />
        </svg>

        {/* MOBILE SVG MOTION PATHS (PRECISELY ALIGNED TO MOBILE INSIDE CURVES) */}
        <svg
          className="block md:hidden absolute inset-0 w-full h-full pointer-events-none z-[1]"
          viewBox="0 0 576 1024"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            id="mobileLeftPath1"
            d="M -16 -40 C 230 260, 230 764, -16 1064"
            fill="none"
            stroke="transparent"
            strokeWidth="2"
          />
          <path
            id="mobileRightPath1"
            d="M 592 -40 C 346 260, 346 764, 592 1064"
            fill="none"
            stroke="transparent"
            strokeWidth="2"
          />
        </svg>

        {/* DESKTOP FLOATING LOGO ICONS (FOLLOWING DESKTOP SIDE CURVES) */}
        <div className="hidden md:block absolute inset-0 pointer-events-none z-[1]">
          <Image
            ref={logo1Ref}
            src="/A.jpeg"
            alt="Brand Asset 1"
            width={80}
            height={80}
            loading="eager"
            className="absolute w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl sm:rounded-2xl overflow-hidden object-cover shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-white/80"
          />

          <Image
            ref={logo2Ref}
            src="/B..png"
            alt="Brand Asset 2"
            width={80}
            height={80}
            loading="eager"
            className="absolute w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl sm:rounded-2xl overflow-hidden object-cover shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-white/80"
          />

          <Image
            ref={logo3Ref}
            src="/C.png"
            alt="Brand Asset 3"
            width={80}
            height={80}
            loading="eager"
            className="absolute w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl sm:rounded-2xl overflow-hidden object-cover shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-white/80"
          />

          <Image
            ref={rightLogo1Ref}
            src="/D.png"
            alt="Brand Asset 4"
            width={80}
            height={80}
            loading="eager"
            className="absolute w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl sm:rounded-2xl overflow-hidden object-cover shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-white/80"
          />

          <Image
            ref={rightLogo2Ref}
            src="/E.png"
            alt="Brand Asset 5"
            width={80}
            height={80}
            loading="eager"
            className="absolute w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl sm:rounded-2xl overflow-hidden object-cover shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-white/80"
          />

          <Image
            ref={rightLogo3Ref}
            src="/F.png"
            alt="Brand Asset 6"
            width={80}
            height={80}
            loading="eager"
            className="absolute w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl sm:rounded-2xl overflow-hidden object-cover shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-white/80"
          />
        </div>

        {/* MOBILE FLOATING LOGO ICONS (FOLLOWING MOBILE INSIDE CURVED RAILS - LARGER SIZE) */}
        <div className="block md:hidden absolute inset-0 pointer-events-none z-[1]">
          <Image
            ref={mLogo1Ref}
            src="/A.jpeg"
            alt="Brand Asset 1"
            width={64}
            height={64}
            loading="eager"
            className="absolute top-0 left-0 w-14 h-14 rounded-2xl overflow-hidden object-cover shadow-[0_8px_24px_rgba(0,0,0,0.12)] border-2 border-white/95 bg-white"
          />

          <Image
            ref={mLogo2Ref}
            src="/B..png"
            alt="Brand Asset 2"
            width={64}
            height={64}
            loading="eager"
            className="absolute top-0 left-0 w-14 h-14 rounded-2xl overflow-hidden object-cover shadow-[0_8px_24px_rgba(0,0,0,0.12)] border-2 border-white/95 bg-white"
          />

          <Image
            ref={mLogo3Ref}
            src="/C.png"
            alt="Brand Asset 3"
            width={64}
            height={64}
            loading="eager"
            className="absolute top-0 left-0 w-14 h-14 rounded-2xl overflow-hidden object-cover shadow-[0_8px_24px_rgba(0,0,0,0.12)] border-2 border-white/95 bg-white"
          />

          <Image
            ref={mRightLogo1Ref}
            src="/D.png"
            alt="Brand Asset 4"
            width={64}
            height={64}
            loading="eager"
            className="absolute top-0 left-0 w-14 h-14 rounded-2xl overflow-hidden object-cover shadow-[0_8px_24px_rgba(0,0,0,0.12)] border-2 border-white/95 bg-white"
          />

          <Image
            ref={mRightLogo2Ref}
            src="/E.png"
            alt="Brand Asset 5"
            width={64}
            height={64}
            loading="eager"
            className="absolute top-0 left-0 w-14 h-14 rounded-2xl overflow-hidden object-cover shadow-[0_8px_24px_rgba(0,0,0,0.12)] border-2 border-white/95 bg-white"
          />

          <Image
            ref={mRightLogo3Ref}
            src="/F.png"
            alt="Brand Asset 6"
            width={64}
            height={64}
            loading="eager"
            className="absolute top-0 left-0 w-14 h-14 rounded-2xl overflow-hidden object-cover shadow-[0_8px_24px_rgba(0,0,0,0.12)] border-2 border-white/95 bg-white"
          />
        </div>
        {/* Adjusted pt-24 on mobile / pt-36 on desktop to center content cleanly */}
        <main className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6 pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-36 md:pb-24 flex flex-col items-center justify-center min-h-screen overflow-hidden">

          {/* Digital Agency Tag */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="inline-flex items-center gap-1 border border-neutral-300/60 bg-white/60 px-3.5 py-1 rounded-full shadow-sm mb-4 sm:mb-6 z-10"
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
            className={`${geist.className} text-center text-[29px] sm:text-[44px] md:text-[54px] font-bold leading-[1.12] sm:leading-[1.1] md:leading-[1.08] tracking-tight text-[#060612] max-w-[310px] sm:max-w-2xl md:max-w-4xl mx-auto mb-4 sm:mb-6 md:mb-[32px] z-10`}
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
            className="text-xs sm:text-base md:text-[16px] max-w-[280px] sm:max-w-lg md:max-w-xl leading-[1.55] sm:leading-[1.6] font-normal z-10"
            style={{ color: "rgb(105, 104, 110)", textAlign: "center" }}
          >
            Strategic design, social media marketing, websites and digital solutions
            crafted to help businesses stand out, scale faster and achieve measurable
            results.
          </motion.p>

          {/* Action Buttons Row */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 relative pb-8 sm:pb-20 z-10">
            {/* Column 1: Discuss Button */}
            <div className="relative flex flex-col items-center">
              <motion.div
                custom={0.15}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
              >
                <Link href="/contact" className="inline-block">
                  <button className="bg-[#FF5500] text-white font-bold text-sm px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-[0_6px_20px_rgba(255,85,0,0.25)] hover:bg-orange-600 transition-all duration-200 whitespace-nowrap cursor-pointer">
                    Discuss your ideas
                  </button>
                </Link>
              </motion.div>

              {/* Handwritten Annotation Arrow */}
              <div className="relative sm:absolute sm:-left-12 sm:top-full pt-1.5 sm:pt-2 flex flex-col items-center sm:items-start select-none pointer-events-none w-full sm:w-[200px]">
                <svg
                  width="44"
                  height="36"
                  viewBox="0 0 44 36"
                  fill="none"
                  className="text-[#ff6321] overflow-visible mb-0.5 sm:mb-1 mx-auto sm:ml-6 sm:mx-0"
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
                  className={`${caveat.className} text-[13px] sm:text-[12px] font-normal leading-[1.2em] text-[#ff6321] text-center sm:text-left tracking-normal whitespace-nowrap`}
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
                  className="bg-[#0A0A0A] text-white font-bold text-sm px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:bg-neutral-800 transition-all duration-200 whitespace-nowrap cursor-pointer"
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
            className="mt-6 sm:mt-12 text-[9px] sm:text-xs font-bold tracking-[0.14em] sm:tracking-[0.18em] uppercase border-b border-dashed border-neutral-300/60 pb-6 sm:pb-8 w-full max-w-2xl z-10"
            style={{ color: "rgb(105, 104, 110)", textAlign: "center" }}
          >
            5+ YEARS EXPERIENCE • 1000+ CREATIVES DELIVERED • 100+ CAMPAIGNS MANAGED
          </motion.div>
        </main>
      </section>

      {/* ================= SECTION 2: PROJECTS SHOWCASE ================= */}
      <section id="projects-section" className="relative w-full overflow-hidden select-none border-t border-neutral-200/50 bg-[#F5F5F5]">

        {/* MOBILE VIEW (< md): 3x4 Grid + Bottom Card (Matches Framer Mobile View) */}
        <div className="block md:hidden py-12 px-4 sm:px-6">
          {/* 3-Column Thumbnails Grid */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 max-w-md mx-auto">
            {SECTION_2_IMAGES.slice(0, 12).map((imagePath, idx) => (
              <div
                key={`mobile-grid-img-${idx}`}
                className="relative aspect-[4/3] rounded-xl sm:rounded-2xl border border-neutral-300/50 overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.03)] bg-white"
              >
                <Image
                  src={imagePath}
                  alt={`Project screenshot ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="33vw"
                />
              </div>
            ))}
          </div>

          {/* Bottom Card */}
          <motion.div
            className="mt-6 max-w-md mx-auto rounded-3xl bg-white border border-neutral-200/80 p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-[0_4px_24px_rgba(0,0,0,0.03)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Logo Icon Badge */}
            <div className="mb-4 p-2.5 bg-white rounded-xl border border-neutral-200/60 shadow-sm flex items-center justify-center w-12 h-12">
              <div className="relative w-7 h-7 flex-shrink-0">
                <Image
                  src="/InalNYrT8dLQ4UagvbmFexbdio.avif"
                  alt="Logo"
                  fill
                  sizes="28px"
                  className="object-contain"
                />
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#060612] mb-5">
              100+ Premium Designs
            </h3>

            <Link href="/projects" className="w-full flex justify-center">
              <button className="w-full max-w-[260px] bg-[#ff6321] text-white text-sm font-semibold tracking-tight px-6 py-3.5 rounded-xl hover:bg-[#e05300] active:scale-[0.98] transition-all duration-200 shadow-[0_4px_14px_rgba(255,99,33,0.35)] cursor-pointer">
                Explore all Projects
              </button>
            </Link>
          </motion.div>
        </div>

        {/* DESKTOP VIEW (>= md): Infinite Scrolling Sliders + Refined Central Circle Badge */}
        <div className="hidden md:block relative py-24">
          {/* UPPER SLIDER ROW */}
          <div className="w-full flex overflow-hidden relative py-4 z-10">
            <motion.div
              className="flex gap-6 whitespace-nowrap flex-nowrap transform-gpu"
              style={{ willChange: "transform" }}
              animate={{ x: ["-33.33%", "0%"] }}
              transition={{
                ease: "linear",
                duration: 120, // Slow, elegant scrolling speed
                repeat: Infinity,
              }}
            >
              {ROW_1_IMAGES.map((imagePath, idx) => (
                <div
                  key={`row1-img-${idx}`}
                  className="relative w-[380px] lg:w-[440px] h-[260px] lg:h-[300px] flex-shrink-0 rounded-[24px] border border-neutral-300/40 overflow-hidden shadow-[0_12px_24px_rgba(0,0,0,0.02)] bg-white"
                >
                  <Image
                    src={imagePath}
                    alt={`Project screenshot ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="440px"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* LOWER SLIDER ROW */}
          <div className="w-full flex overflow-hidden relative py-4 mt-6 z-10">
            <motion.div
              className="flex gap-6 whitespace-nowrap flex-nowrap transform-gpu"
              style={{ willChange: "transform" }}
              animate={{ x: ["0%", "-33.33%"] }}
              transition={{
                ease: "linear",
                duration: 120, // Slow, elegant scrolling speed
                repeat: Infinity,
              }}
            >
              {ROW_2_IMAGES.map((imagePath, idx) => (
                <div
                  key={`row2-img-${idx}`}
                  className="relative w-[380px] lg:w-[440px] h-[260px] lg:h-[300px] flex-shrink-0 rounded-[24px] border border-neutral-300/40 overflow-hidden shadow-[0_12px_24px_rgba(0,0,0,0.02)] bg-white"
                >
                  <Image
                    src={imagePath}
                    alt={`Project screenshot ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="440px"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* CENTRAL BADGE DIALOG OVERLAY (Compact & Refined) */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
          >
            <div className="relative w-[300px] h-[300px] rounded-full bg-white/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 border border-neutral-200/60 shadow-[0_20px_50px_rgba(0,0,0,0.08),_0_0_0_6px_rgba(255,255,255,0.6)] transition-all pointer-events-auto">
              {/* Logo Icon Badge */}
              <div className="mb-3 p-2.5 bg-white rounded-xl border border-neutral-200/50 shadow-sm flex items-center justify-center w-11 h-11">
                <div className="relative w-6 h-6 flex-shrink-0">
                  <Image
                    src="/InalNYrT8dLQ4UagvbmFexbdio.avif"
                    alt="Logo"
                    fill
                    sizes="24px"
                    className="object-contain"
                  />
                </div>
              </div>

              <h3 className="text-[24px] font-bold tracking-tight text-[#060612] leading-[1.15] mb-5">
                100+ Premium<br />Designs
              </h3>

              <Link href="/projects">
                <button className="bg-[#ff6321] text-white text-sm font-semibold tracking-tight px-7 py-3 rounded-xl hover:bg-[#e05300] active:scale-[0.98] transition-all duration-200 shadow-[0_4px_14px_rgba(255,99,33,0.35)] cursor-pointer">
                  Explore all Projects
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

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
          {/* MOBILE VIEW (< md): Stacked comparison card exactly like 2nd image */}
          <motion.div
            className="block md:hidden w-full bg-white rounded-3xl border border-neutral-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden font-sans text-left mt-4 mb-6"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
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
            {/* Top Half: Other agencies */}
            <div className="flex flex-col bg-white p-6 pb-2">
              <h3 className="text-xl font-bold text-[#0A0A0A] mb-4">Other agencies</h3>
              <div className="flex flex-col">
                {comparisons.map((item, idx) => (
                  <div
                    key={`mobile-other-${idx}`}
                    className="py-3.5 text-[#2E3748] font-medium text-sm flex items-center gap-3 border-t border-neutral-100"
                  >
                    <span className="text-neutral-400 text-xs font-bold select-none">❯</span>
                    <span>{item.other}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Half: TechSol Media */}
            <div
              className={`flex flex-col p-6 pb-6 transition-all duration-300 ${
                isSection3Toggled
                  ? "bg-[#EBEAE8] text-[#0A0A0A]"
                  : "bg-[#FDA466] text-[#0A0A0A]"
              }`}
            >
              <h3 className="text-xl font-bold mb-4">TechSol Media</h3>
              <div className="flex flex-col">
                {comparisons.map((item, idx) => (
                  <div
                    key={`mobile-us-${idx}`}
                    className="py-3.5 font-semibold text-sm flex items-center gap-3 border-t border-black/10"
                  >
                    <span className="text-[#0A0A0A]/70 text-xs font-bold select-none">❯</span>
                    <span>{item.us}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* DESKTOP VIEW (>= md): Side-by-side floating comparison table */}
          <motion.div
            className="hidden md:grid w-full bg-white rounded-3xl border border-neutral-200/60 shadow-[0_4px_30px_rgba(0,0,0,0.02)] grid-cols-2 relative font-sans text-left mt-6 mb-6"
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
              <div className="p-8 pt-2">
                <h3 className="text-xl font-bold text-[#0A0A0A]">Other agencies</h3>
              </div>
              <div className="flex flex-col gap-1">
                {comparisons.map((item, idx) => (
                  <div
                    key={`desktop-other-${idx}`}
                    className="px-8 py-4 text-neutral-500 font-medium text-sm flex items-center gap-3 border-t border-neutral-100"
                  >
                    <span className="text-neutral-400 text-xs font-bold select-none">❯</span>
                    <span>{item.other}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* TechSol Media (Right Floating Side) */}
            <div
              className={`flex flex-col rounded-3xl absolute top-0 bottom-0 right-0 left-[50%] -my-6 border border-white/20 z-10 py-6 transition-all duration-300 ${
                isSection3Toggled
                  ? "bg-[#EBEAE8] text-[#0A0A0A] shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
                  : "bg-[#FDA466] text-[#0A0A0A] shadow-[0_20px_40px_rgba(253,164,102,0.25)]"
              }`}
            >
              <div className="p-8 pt-2">
                <h3 className="text-xl font-bold">TechSol Media</h3>
              </div>
              <div className="flex flex-col gap-1">
                {comparisons.map((item, idx) => (
                  <div
                    key={`desktop-us-${idx}`}
                    className="px-8 py-4 font-semibold text-sm flex items-center gap-3 border-t border-black/5"
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
            {/* Arrow & Text - Aligned to the start/left of the button (Desktop only to prevent mobile overlap) */}
            <div className="hidden md:flex absolute -top-16 left-1 flex-col items-start pointer-events-none select-none">
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

        {/* MOBILE VIEW (< md): Stacked vertically inside outer wrapper card (Matches 2nd image) */}
        <div className="block md:hidden px-4 sm:px-6">
          <div className="w-full border border-solid border-[#fff] bg-[#eeecea] p-4 sm:p-5 rounded-3xl shadow-[inset_0px_0px_6px_0px_#0606122e] flex flex-col gap-4">
            {services.map((service, idx) => (
              <div
                key={`mobile-service-${service.id || idx}`}
                className="w-full bg-white rounded-2xl border border-neutral-200/80 p-6 flex flex-col justify-between gap-4 shadow-sm"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold tracking-tight text-[#060612] leading-snug">
                      {service.title}
                    </h3>
                    <div className="w-10 h-10 rounded-xl bg-[#FAF9F9] border border-neutral-200/60 flex items-center justify-center flex-shrink-0">
                      {service.icon}
                    </div>
                  </div>

                  <div className="w-full border-b border-dashed border-neutral-200/80 my-3.5" />

                  <p className="text-[#69686E] text-sm leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>

                {/* Service Tag Pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {service.tags?.map((tag: string) => (
                    <span
                      key={`mob-tag-${tag}-${idx}`}
                      className="text-[10px] font-bold tracking-wider text-neutral-600 bg-neutral-100/90 border border-neutral-200/60 px-3 py-1.5 rounded-lg uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP VIEW (>= md): Horizontal infinite slider container */}
        <div className="hidden md:block w-full border border-solid border-[#fff] bg-[#eeecea] py-6 shadow-[inset_0px_0px_6px_0px_#0606122e]">
          {/* HORIZONTAL SLIDER (RIGHT TO LEFT AT LOW SPEED) */}
          <div className="w-full flex overflow-hidden relative z-10">
            <motion.div
              className="flex gap-6 whitespace-nowrap flex-nowrap transform-gpu"
              style={{ willChange: "transform" }}
              animate={{ x: ["0%", "-50%"] }} // Moves right-to-left
              transition={{
                ease: "linear",
                duration: 90, // Slow, aesthetic speed
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
      <motion.section className="w-full bg-[#F5F5F5] py-20 sm:py-24 overflow-hidden relative z-10 font-sans antialiased"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
        }}
        viewport={{
          once: true,
          amount: 0.15,
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
          <div className="max-w-5xl mx-auto px-0 sm:px-6 relative">

            <div
              className="flex gap-6 transition-transform duration-700 ease-out"
              style={{ transform: `translateX(calc(-${activeProject} * (100% + 1.5rem)))` }}
            >
              {projects.map((proj, idx) => {
                const isActive = idx === activeProject;
                return (
                  /* CARD WRAPPER WITH INSET SHADOW BORDER */
                  <div
                    key={proj.title || idx}
                    className={`min-w-full w-full shrink-0 border border-solid border-[#fff] rounded-[24px] bg-[#eeecea] p-3 shadow-[inset_0px_0px_6px_0px_#0606122e] transition-all duration-500 ${isActive ? "opacity-100 scale-100" : "opacity-40 scale-[0.97]"
                      }`}
                  >
                    {/* INNER CARD CONTENT */}
                    <div className="w-full bg-white rounded-[16px] border border-neutral-200/70 p-6 sm:p-12 flex flex-col md:flex-row gap-6 md:gap-8 items-center shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
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

                      <div className="flex-1 w-full h-[280px] sm:h-[400px] rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/40 relative">
                        <Image
                          src={proj.img}
                          alt={`${proj.title} showcase visual representation`}
                          fill
                          sizes="(max-width: 768px) 100vw, 500px"
                          className="object-cover transition-transform duration-700 hover:scale-[1.03]"
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
      <section
        ref={frameworkSectionRef}
        className="w-full min-h-screen flex flex-col items-center justify-center bg-[#F5F5F5] font-sans antialiased py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden z-10"
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center w-full">

            {/* HEADER */}
            <div className="inline-flex items-center gap-1.5 text-neutral-400 text-xs font-bold tracking-[0.2em] uppercase mb-2 sm:mb-3">
              <span>⁘ PROCESS ⁘</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-[44px] font-black tracking-[-0.03em] leading-[1.15] text-[#060612] max-w-2xl px-2">
              The <span className="text-[#FF5500]">TechSol Media</span> Framework
            </h2>

            <p className="text-[#69686E] text-xs sm:text-sm mt-1.5 sm:mt-2 max-w-lg font-normal leading-relaxed px-4">
              Our structured approach to building brands, websites, applications, and growth campaigns.
            </p>

            {/* BACKGROUND FAINT SPARKLES (DECORATIVE ACCENTS) */}
            <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
              <svg className="absolute left-[4%] sm:left-[8%] top-[20%] w-24 h-36 text-[#fba85b]/35 opacity-70" viewBox="0 0 100 150" fill="currentColor">
                <path d="M20 10 L22 25 L37 27 L22 29 L20 44 L18 29 L3 27 L18 25 Z" />
                <path d="M45 55 L46 64 L55 65 L46 66 L45 75 L44 66 L35 65 L44 64 Z" opacity="0.6" />
                <path d="M15 80 L16 87 L23 88 L16 89 L15 96 L14 89 L7 88 L14 87 Z" opacity="0.4" />
                <path d="M30 110 L32 122 L44 124 L32 126 L30 138 L28 126 L16 124 L28 122 Z" opacity="0.5" />
              </svg>

              <svg className="absolute right-[4%] sm:right-[8%] top-[22%] w-24 h-36 text-[#fba85b]/35 opacity-70" viewBox="0 0 100 150" fill="currentColor">
                <path d="M80 15 L78 28 L65 30 L78 32 L80 45 L82 32 L95 30 L82 28 Z" />
                <path d="M55 60 L54 68 L46 69 L54 70 L55 78 L56 70 L64 69 L56 68 Z" opacity="0.6" />
                <path d="M75 90 L74 97 L67 98 L74 99 L75 106 L76 99 L83 98 L76 97 Z" opacity="0.4" />
              </svg>
            </div>

            {/* REVOLVING ARC & STEP NODES CONTAINER (SPREAD WIDE AT BOTTOM) */}
            <div className="w-full relative flex justify-center h-[90px] sm:h-[120px] md:h-[135px] mt-4 sm:mt-6 overflow-visible">

              {/* CURVED WIDE ARCH BORDER LINE WITH SPREAD */}
              <div
                className="absolute top-[28px] sm:top-[35px] md:top-[40px] w-[350px] sm:w-[620px] md:w-[860px] lg:w-[1040px] aspect-[2/1] rounded-t-full border-[3px] sm:border-[4.5px] border-white shadow-[0_-8px_30px_rgba(255,255,255,0.95),inset_0_2px_12px_rgba(0,0,0,0.015)] pointer-events-none z-0 left-1/2 -translate-x-1/2"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 0%, black 80%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to bottom, black 0%, black 80%, transparent 100%)",
                }}
              />

              {/* REVOLVING STEP NODE ON THE RING (ONLY 1 ACTIVE STEP AT A TIME) */}
              <div className="absolute top-[28px] sm:top-[35px] md:top-[40px] w-[350px] sm:w-[620px] md:w-[860px] lg:w-[1040px] aspect-[2/1] z-10 left-1/2 -translate-x-1/2 pointer-events-none">
                {frameworkSteps.map((step, idx) => {
                  const relativeIndex = idx - currentFrameworkIdx;
                  const isActive = idx === currentFrameworkIdx;
                  const angle = relativeIndex * 38;

                  return (
                    <motion.div
                      key={step.num}
                      className="absolute pointer-events-auto origin-bottom bottom-0 left-1/2 -translate-x-1/2"
                      style={{
                        height: "100%",
                        transformOrigin: "50% 100%"
                      }}
                      animate={{
                        rotate: angle,
                        opacity: isActive ? 1 : 0,
                        pointerEvents: isActive ? "auto" : "none"
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 70,
                        damping: 16,
                        mass: 0.8
                      }}
                    >
                      <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                        <motion.div
                          animate={{
                            rotate: -angle,
                            scale: isActive ? 1 : 0.6
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 70,
                            damping: 16,
                            mass: 0.8
                          }}
                        >
                          <div className="flex flex-col items-center justify-center -mt-2 sm:-mt-3 transition-transform duration-300">
                            <span className="text-[10px] font-bold tracking-widest text-[#69686E] uppercase mb-1">
                              STEP
                            </span>
                            <div className="w-11 h-11 sm:w-14 sm:h-14 bg-[#FF5500] text-white font-black text-sm sm:text-lg rounded-2xl flex items-center justify-center shadow-[0_8px_25px_rgba(255,85,0,0.4)] border-2 border-white">
                              {step.num}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* DETAILS CONTENT (COMPLETELY TRANSPARENT / NO CARD BORDER OR BOX) */}
            <div className="w-full max-w-xl mt-3 sm:mt-4 relative z-20 flex flex-col items-center mx-auto px-4">
              <div className="w-full overflow-hidden relative min-h-[125px] sm:min-h-[140px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentFrameworkIdx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="w-full flex flex-col items-center text-center"
                  >
                    <h3 className="text-xl sm:text-3xl font-bold text-[#060612] tracking-tight">
                      {frameworkSteps[currentFrameworkIdx]?.title}
                    </h3>

                    <p className="text-[#69686E] text-xs sm:text-sm leading-relaxed mt-2 sm:mt-3 max-w-md font-normal text-center">
                      {frameworkSteps[currentFrameworkIdx]?.desc}
                    </p>

                    <div className="w-full max-w-md border-b border-dashed border-neutral-300/60 my-3.5 sm:my-5" />

                    <p className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#69686E] uppercase text-center">
                      {frameworkSteps[currentFrameworkIdx]?.tags}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* REDIRECT TO /contact BUTTON */}
              <Link href="/contact" className="mt-4 sm:mt-6 w-full max-w-[240px]">
                <button className="w-full bg-[#FF5500] text-white font-semibold text-xs sm:text-sm py-3 sm:py-3.5 px-6 rounded-xl shadow-[0_4px_14px_rgba(255,85,0,0.35)] hover:bg-orange-600 transition-all duration-200 active:scale-[0.98] cursor-pointer">
                  Start your project
                </button>
              </Link>

              {/* COUNTER (01 / 05) & PREV/NEXT CIRCULAR ARROW BUTTONS (MOBILE ONLY) */}
              <div className="mt-5 sm:mt-7 flex md:hidden flex-col items-center gap-2.5">
                <span className="text-xs font-bold tracking-widest text-neutral-400">
                  0{currentFrameworkIdx + 1} / 05
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleFrameworkStepClick((currentFrameworkIdx - 1 + frameworkSteps.length) % frameworkSteps.length)}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-300 bg-white/80 shadow-sm flex items-center justify-center text-neutral-700 hover:bg-white hover:border-black active:scale-95 transition-all cursor-pointer"
                    aria-label="Previous step"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  <button
                    onClick={() => handleFrameworkStepClick((currentFrameworkIdx + 1) % frameworkSteps.length)}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-300 bg-white/80 shadow-sm flex items-center justify-center text-neutral-700 hover:bg-white hover:border-black active:scale-95 transition-all cursor-pointer"
                    aria-label="Next step"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              </div>

            </div>

          </div>
      </section>

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
                variants={reviewSlideVariants}
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
                          <Image
                            src={review.avatar}
                            alt={review.name}
                            width={36}
                            height={36}
                            className="w-9 h-9 rounded-full object-cover shrink-0"
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
        className="mt-16 mx-auto w-full max-w-[1000px] bg-[#F4F2F0] rounded-[24px] sm:rounded-[28px] border border-white p-3 sm:p-4 md:p-5 flex items-center justify-center relative shadow-[inset_0px_0px_6px_0px_rgba(6,6,18,0.18)] overflow-hidden"
      >
        <motion.div
          variants={containerStagger}
          className="w-full h-auto md:h-[400px] relative rounded-[16px] md:rounded-[20px] bg-gradient-to-br from-[#FCDAA2] via-[#FBA85B] to-[#FF5500] flex flex-col md:flex-row items-start md:items-center justify-between p-6 sm:p-8 md:px-16 md:py-8 shadow-sm gap-8 md:gap-6"
        >
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] rounded-full border-[30px] border-white"></div>
            <div className="absolute bottom-[-60%] left-[20%] w-[400px] h-[400px] rounded-full border-[20px] border-[#FF5500]"></div>
          </div>

          {/* Left Column Text Content */}
          <motion.div variants={fadeInUp} className="flex flex-col items-start max-w-sm md:max-w-md z-10 text-left w-full">
            <span className="text-[11px] font-bold tracking-widest text-[#0A0A0A]/60 uppercase mb-3">
              LET'S BUILD SOMETHING GREAT
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[46px] font-extrabold tracking-tight text-[#0A0A0A] leading-[1.08] mb-6 md:mb-8">
              Ready to start your next project?
            </h2>

            {/* Direct Link redirecting to contact page form */}
            <Link
              href="/contact"
              className="inline-block bg-[#05050A] text-white text-[13px] font-bold px-6 py-3.5 rounded-xl hover:bg-neutral-800 transition-colors shadow-md text-center cursor-pointer mb-2 md:mb-0"
            >
              Get started
            </Link>
          </motion.div>

          {/* Right Floating Card with AMANDA Tag */}
          <div className="relative w-full max-w-full md:max-w-[350px] z-10">
            {/* AMANDA Cursor Tag */}
            <div className="absolute -top-3.5 right-2 sm:right-4 z-20 flex items-center gap-1 select-none pointer-events-none">
              <svg className="w-4 h-4 text-[#05050A] fill-current drop-shadow-sm -rotate-12" viewBox="0 0 24 24">
                <path d="M4 2l16 11-8 2-4 7z" />
              </svg>
              <span className="bg-[#05050A] text-white text-[10px] font-black tracking-wider px-3.5 py-1 rounded-full uppercase shadow-md">
                AMANDA
              </span>
            </div>

            {/* Inner White Card */}
            <motion.div
              variants={fadeInUp}
              className="bg-white/95 backdrop-blur-sm border border-white/60 p-5 sm:p-6 rounded-2xl shadow-xl w-full text-left"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 rounded-full bg-neutral-300/60 flex items-center justify-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#05050A]"></span>
                </div>
                <span className="text-[10px] font-bold tracking-wider text-[#737373] uppercase">
                  AVAILABLE FOR PROJECT
                </span>
              </div>
              <div className="flex items-center gap-2.5 mb-5">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Amanda"
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm"
                />
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
          </div>
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