"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Plus, Minus, Mail, Phone, MapPin } from 'lucide-react';
import { Geist, Caveat } from 'next/font/google';

// Import Navbar component
import Navbar from '@/components/Navbar';

const geist = Geist({ subsets: ['latin'] });
const caveat = Caveat({ subsets: ['latin'] });

export default function ContactPage() {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  // Handle Form Input Changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // WhatsApp Submission Handler
  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const phoneNumber = '919067797939'; // Country code + 10-digit number without '+' or spaces

    // Format the message body
    const textMessage =
      `*New Contact Request from Website* 🚀\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Email:* ${formData.email}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Company:* ${formData.company || 'N/A'}\n` +
      `*Message:* ${formData.message || 'N/A'}`;

    // Safely encode text for URL parameters
    const encodedMessage = encodeURIComponent(textMessage);

    // Redirect to WhatsApp web/app
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
      question: "3. What services does Techsol Media offer?",
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

  // Animation variants explicitly typed
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] as const },
    },
  };

  return (
    <div className="min-h-screen w-full bg-[#F5F5F5] text-[#0A0A0A] font-sans antialiased overflow-x-hidden selection:bg-orange-500 selection:text-white flex flex-col items-center">
      
      {/* ─── CONTACT FORM & INFO SECTION ─── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
        className="w-full max-w-6xl mx-auto px-6 pt-32 pb-24"
      >
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1 border border-neutral-300/60 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm mb-6"
          >
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-neutral-500">⁘ LET&apos;S CONNECT ⁘</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`${geist.className} text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[#060612]`}
          >
            Contact us
          </motion.h1>
        </div>

        <motion.div
          variants={fadeInUp}
          className="w-full grid grid-cols-1 lg:grid-cols-12 bg-white/90 backdrop-blur-md rounded-3xl border border-neutral-200/80 shadow-[0_4px_30px_rgba(0,0,0,0.04)] overflow-hidden"
        >
          {/* Left Column: Metadata Details */}
          <div className="lg:col-span-5 p-8 sm:p-12 bg-neutral-50/70 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-neutral-200/60">
            <div className="flex flex-col gap-8">
              <h3 className="text-xl font-bold text-[#060612]">Start a Conversation</h3>

              <div className="flex flex-col gap-5 text-sm sm:text-base font-medium text-neutral-600">
                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-neutral-400 shrink-0" />
                  <span><strong className="text-neutral-400 text-xs tracking-wider uppercase mr-1">CALL ON:</strong> +91 9067797939</span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-neutral-400 shrink-0" />
                  <span><strong className="text-neutral-400 text-xs tracking-wider uppercase mr-1">EMAIL ON:</strong> info@techsolmedia.in</span>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
                  <span><strong className="text-neutral-400 text-xs tracking-wider uppercase block mb-0.5">ADDRESS:</strong> 74/586 ,<br />Maharshi Nagar ,Pune :411037</span>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-dashed border-neutral-200/80">
              <p className="text-neutral-600 italic leading-relaxed text-sm sm:text-base mb-4">
                &quot;Their attention to detail and commitment to quality set them apart. The new dashboard improved both usability and client satisfaction.&quot;
              </p>
              <span className="text-xs font-bold tracking-wider uppercase text-[#060612]">
                SHUBHAM BARURE — <span className="text-neutral-400 font-medium">FOUNDER, TECHSOLMEDIA</span>
              </span>
            </div>
          </div>

          {/* Right Column: Interaction Form connected to WhatsApp */}
          <form className="lg:col-span-7 p-8 sm:p-12 flex flex-col gap-6" onSubmit={handleWhatsAppSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-neutral-700 tracking-wider uppercase">Name*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Dennis Barrett"
                  className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm font-medium focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-neutral-700 tracking-wider uppercase">Email*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="dannis@barrett.com"
                  className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm font-medium focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-neutral-700 tracking-wider uppercase">Phone*</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="+91 90677 97939"
                  className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm font-medium focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-neutral-700 tracking-wider uppercase">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Framer"
                  className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm font-medium focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-700 tracking-wider uppercase">Message</label>
              <textarea
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Write what's on your mind"
                className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm font-medium focus:outline-none focus:border-orange-500 transition-colors resize-none"
              />
            </div>

            <div className="mt-2">
              <button
                type="submit"
                className="bg-[#FF5500] text-white font-bold text-sm px-8 py-4 rounded-xl shadow-[0_4px_14px_rgba(255,85,0,0.2)] hover:bg-orange-600 transition-all duration-200 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Send a message</span>
              </button>
            </div>
          </form>
        </motion.div>
      </motion.section>

      {/* ─── FAQ ACCORDION SECTION ─── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="w-full bg-white/60 backdrop-blur-sm py-24 px-6 border-y border-neutral-200/60 relative flex justify-center"
      >
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-16 relative">
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-neutral-500 block mb-3">⁘ GOT QUESTIONS ⁘</span>
            <h2 className={`${geist.className} text-4xl sm:text-5xl font-black tracking-tight text-[#060612] relative inline-block`}>
              We&apos;ve got answers
              <div className="absolute -right-20 -top-8 hidden md:flex flex-col items-start pointer-events-none select-none">
                <span className={`${caveat.className} text-orange-500 text-sm whitespace-nowrap mb-1`}>Let&apos;s clear things up</span>
                <svg width="24" height="16" viewBox="0 0 24 16" fill="none" className="text-orange-500 ml-2">
                  <path d="M1 14C5 10 12 4 22 2M22 2L15 1M22 2L21 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </h2>
          </div>

          <div className="flex flex-col gap-4 bg-neutral-200/50 backdrop-blur-sm p-5 sm:p-7 rounded-3xl border border-neutral-200/60">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="w-full bg-white/90 rounded-2xl border border-neutral-100 shadow-sm overflow-hidden transition-all duration-200">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 flex items-center justify-between text-left gap-4 font-bold text-[#060612] text-sm sm:text-base hover:bg-neutral-50/80 transition-colors"
                  >
                    <span>{item.question}</span>
                    <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 pt-1 text-sm sm:text-base font-normal text-neutral-500 border-t border-neutral-50/50 leading-relaxed">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* ─── FIXED & CENTERED CALL BOOKING SECTION CONTAINER ─── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="w-full flex justify-center items-center py-20 px-6"
      >
        <div className="w-full max-w-[1000px] bg-[#F4F2F0]/90 backdrop-blur-md rounded-[2rem] p-4 flex items-center justify-center relative shadow-[inset_0px_0px_6px_0px_rgba(6,6,18,0.12)] overflow-hidden mx-auto">
          <div className="w-full h-auto min-h-[380px] relative rounded-[1.5rem] overflow-hidden bg-gradient-to-br from-[#FCDAA2] via-[#FBA85B] to-[#FF5500] flex flex-col md:flex-row items-center justify-between px-8 sm:px-12 md:px-16 py-10 gap-8 shadow-sm">

            {/* Background Aesthetic Rings */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
              <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] rounded-full border-[30px] border-white"></div>
              <div className="absolute bottom-[-60%] left-[20%] w-[400px] h-[400px] rounded-full border-[20px] border-[#FF5500]"></div>
            </div>

            {/* Left Column Content */}
            <div className="flex flex-col items-start max-w-xs sm:max-w-sm md:max-w-[380px] z-10 text-left">
              <span className="text-[10px] font-bold tracking-widest text-[#0A0A0A]/60 uppercase mb-3">LET&apos;S BUILD SOMETHING GREAT</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0A0A0A] leading-[1.1] mb-6">
                Ready to start your next project?
              </h2>
              <button className="bg-[#05050A] text-white text-[13px] font-bold px-6 py-3.5 rounded-xl hover:bg-neutral-800 transition-colors shadow-md cursor-pointer">
                Get started
              </button>
            </div>

            {/* Right Card Content */}
            <div className="bg-white/95 backdrop-blur-sm border border-white/60 p-6 rounded-2xl shadow-xl w-full max-w-[330px] z-10 relative text-left shrink-0">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
                <span className="text-[10px] font-bold tracking-wider text-[#737373] uppercase">AVAILABLE FOR PROJECT</span>
              </div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-full bg-neutral-300 flex items-center justify-center text-[10px] font-bold border-2 border-white shadow-sm">Pic</div>
                <span className="text-[#A3A3A3] font-semibold text-sm">+</span>
                <div className="w-8 h-8 rounded-full bg-[#05050A] text-white flex items-center justify-center font-bold text-[10px] border-2 border-white shadow-sm">You</div>
              </div>
              <h4 className="text-[16px] font-bold text-[#0A0A0A] tracking-tight">Quick 15-minute call</h4>
              <p className="text-[12px] text-[#737373] font-medium mt-0.5">Pick a time that works for you.</p>
              <button
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  })
                }
                className="mt-5 w-full bg-[#FF5500] text-white text-[13px] font-bold py-3.5 rounded-xl hover:bg-[#E04B00] transition-colors shadow-sm cursor-pointer"
              >
                Book a free call
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── GLOBAL BRAND FOOTER ─── */}
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
                  className="w-9 h-9 bg-[#0A0A0A] text-[#fff] rounded-lg flex items-center justify-center hover:bg-[#FF5500] transition-colors"
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