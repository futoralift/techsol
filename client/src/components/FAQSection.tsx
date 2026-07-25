'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// FAQ Content Data
const FAQ_ITEMS = [
    {
        id: "01",
        question: "1. How long does a typical project take?",
        answer:
            "Project timeline depends on scope and requirements. Most branding and design projects are completed within 1–3 weeks, while websites and larger digital solutions may take 3–8 weeks.",
    },
    {
        id: "02",
        question: "2. Do you work with startups or only large brands?",
        answer:
            "Yes. We collaborate with startups, SMEs, real estate brands, training institutes, restaurants, fitness businesses, and growing enterprises looking to build a stronger digital presence.",
    },
    {
        id: "03",
        question: "3.What services does Techsol Media offer?",
        answer:
            "We provide branding, logo design, social media creatives, content strategy, website design, website development, mobile app UI/UX, digital marketing, and business growth solutions.",
    },
    {
        id: "04",
        question: "4. Can you handle both design and development?",
        answer:
            "Absolutely. Our team manages the complete process—from strategy and creative design to website and application development—ensuring a seamless experience.",

    },
    {
        id: "05",
        question: "5. How do we get started?",
        answer:
            "Simply schedule a consultation with us. We'll understand your goals, discuss requirements, and recommend the best strategy for your business.",
    },
    {
        id: "06",
        question: "6. Can you help with ongoing updates after launch?",
        answer:
            "Yes, We offer monthly support and on-demand updates to keep your website fresh, optimized, and performing well.",
    },
];

export function FAQSection() {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    return (
        <section className="w-full flex flex-col items-center text-center animate-[slideUp_0.9s_ease-out] px-4">

            {/* Tag Header */}
            <span className="text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase mb-3 flex items-center gap-1.5">
                ⁘ GOT QUESTIONS ⁘
            </span>

            {/* Main Title with Handwritten Annotation */}
            <div className="relative mb-12 text-center">
                <h2 className="text-3xl md:text-[40px] font-bold tracking-tight text-[#060612] leading-[1.15] font-sans">
                    Frequently Asked Questions
                </h2>

                {/* Orange Arrow & Script Annotation */}
                <div className="absolute -top-6 -right-12 sm:-right-20 hidden sm:flex flex-col items-start pointer-events-none">

                    {/* Typewriter Text */}
                    <motion.span
                        className="text-[#FF5500] text-xs sm:text-sm -rotate-6 tracking-tight font-medium"
                        style={{ fontFamily: "'Caveat', 'Comic Sans MS', cursive" }}
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{
                            duration: 1.8,
                            ease: "linear",
                        }}
                        viewport={{ once: true }}
                    >
                        <span className="overflow-hidden whitespace-nowrap block">
                            Let's clear things up
                        </span>
                    </motion.span>

                    {/* Curved Handwritten Arrow */}
                    <motion.svg
                        className="w-16 h-16 text-[#FF5500] -mt-1 ml-3"
                        viewBox="0 0 80 80"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {/* J-shaped handwritten curve */}
                        <motion.path
                            d="M8 62
       C24 62 34 58 42 48
       C50 38 54 26 55 12"
                            variants={{
                                hidden: { pathLength: 0 },
                                visible: {
                                    pathLength: 1,
                                    transition: {
                                        duration: 1.2,
                                        ease: "easeInOut",
                                    },
                                },
                            }}
                        />

                        {/* Handwritten arrow head */}
                        <motion.path
                            d="M48 20 L55 12 L62 20"
                            variants={{
                                hidden: { pathLength: 0 },
                                visible: {
                                    pathLength: 1,
                                    transition: {
                                        delay: 1,
                                        duration: 0.25,
                                    },
                                },
                            }}
                        />
                    </motion.svg>

                </div>
            </div>

            {/* Outer Card Container */}
            <div className="w-full max-w-[760px] mx-auto bg-[#EEECEA] border border-white rounded-[24px] p-4 sm:p-6 shadow-[inset_0px_0px_8px_0px_rgba(6,6,18,0.12)]">
                <div className="flex flex-col gap-3">
                    {FAQ_ITEMS.map((item, index) => {
                        const isOpen = openFaqIndex === index;

                        return (
                            <motion.div
                                key={item.id}
                                className="bg-white rounded-[16px] overflow-hidden transition-all duration-200 border border-neutral-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.12,
                                    ease: "easeOut",
                                }}
                                viewport={{
                                    once: true,
                                    amount: 0.2,
                                }}
                            >
                                {/* Question Header Button */}
                                <button
                                    type="button"
                                    onClick={() => toggleFaq(index)}
                                    className="w-full px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between text-left hover:bg-neutral-50/50 transition-colors"
                                >
                                    <span className="text-base sm:text-[17px] font-bold text-[#0A0A0A] tracking-tight">
                                        {item.question}
                                    </span>

                                    {/* Plus / Cross Indicator Circle */}
                                    <div className="flex-shrink-0 ml-4">
                                        <motion.div
                                            animate={{ rotate: isOpen ? 45 : 0 }}
                                            transition={{ duration: 0.2, ease: "easeInOut" }}
                                            className="w-8 h-8 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center shadow-sm"
                                        >
                                            <svg
                                                className="w-3.5 h-3.5"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 4.5v15m7.5-7.5h-15"
                                                />
                                            </svg>
                                        </motion.div>
                                    </div>
                                </button>

                                {/* Expandable Answer Content */}
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-left text-neutral-600 leading-relaxed border-t border-neutral-100/60">
                                                {item.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Downside "Still have questions?" Banner Segment */}
            <div className="mt-14 flex flex-col items-center text-center">

                {/* Overlapping Avatars Cluster (No External Domain Required) */}
                <div className="flex items-center justify-center -space-x-3 mb-4">
                    {/* Avatar 1 */}
                    <div className="w-12 h-12 rounded-full border-2 border-[#F4F2F0] shadow-md bg-neutral-800 text-white flex items-center justify-center">
                        <svg className="w-6 h-6 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                    </div>

                    {/* Avatar 2 (Center Highlighting) */}
                    <div className="w-13 h-13 rounded-full border-2 border-[#F4F2F0] shadow-lg z-10 bg-[#FF5500] text-white flex items-center justify-center">
                        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                    </div>

                    {/* Avatar 3 */}
                    <div className="w-12 h-12 rounded-full border-2 border-[#F4F2F0] shadow-md bg-neutral-700 text-white flex items-center justify-center">
                        <svg className="w-6 h-6 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                    </div>
                </div>

                {/* Heading - Reduced text size and margin */}
                <h3 className="text-lg sm:text-xl font-bold text-[#0A0A0A] tracking-tight mb-3">
                    Still have questions?
                </h3>

                {/* Redirecting "Let’s Talk" Button - Reduced padding and font size */}
                <Link
                    href="/contact"
                    className="bg-[#FF5500] hover:bg-[#E04B00] text-xs font-bold px-5 py-2.5 rounded-lg transition-all duration-200 shadow-[0_4px_12px_rgba(255,85,0,0.30)] hover:shadow-[0_6px_16px_rgba(255,85,0,0.40)] hover:scale-[1.02] active:scale-[0.98] inline-block"
                >
                    Let’s talk
                </Link>
            </div>

        </section>
    );
}