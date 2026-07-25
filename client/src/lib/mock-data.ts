import type { Blog, Project, Service, Testimonial } from "@/types";

const now = new Date().toISOString();

export const mockServices: Service[] = [
  {
    _id: "svc-1",
    title: "Brand Strategy",
    slug: "brand-strategy",
    description:
      "Define a distinctive brand identity that resonates with your audience and stands out in competitive markets.",
    icon: "Palette",
    features: [
      "Brand positioning & messaging",
      "Visual identity systems",
      "Brand guidelines",
      "Market research",
    ],
    isActive: true,
    order: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: "svc-2",
    title: "Web Design & Development",
    slug: "web-design-development",
    description:
      "Pixel-perfect, high-performance websites built with modern frameworks and conversion-focused UX.",
    icon: "Code",
    features: [
      "Custom UI/UX design",
      "Next.js & React development",
      "CMS integration",
      "Performance optimization",
    ],
    isActive: true,
    order: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: "svc-3",
    title: "Digital Marketing",
    slug: "digital-marketing",
    description:
      "Data-driven campaigns across SEO, paid media, and social to accelerate growth and maximize ROI.",
    icon: "TrendingUp",
    features: [
      "SEO & content strategy",
      "Paid advertising",
      "Social media management",
      "Analytics & reporting",
    ],
    isActive: true,
    order: 3,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: "svc-4",
    title: "Mobile Apps",
    slug: "mobile-apps",
    description:
      "Native and cross-platform mobile experiences that delight users and drive engagement.",
    icon: "Smartphone",
    features: [
      "iOS & Android development",
      "Cross-platform solutions",
      "App store optimization",
      "Push notifications",
    ],
    isActive: true,
    order: 4,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: "svc-5",
    title: "UI/UX Design",
    slug: "ui-ux-design",
    description:
      "Human-centered design that transforms complex products into intuitive, beautiful experiences.",
    icon: "Layers",
    features: [
      "User research",
      "Wireframing & prototyping",
      "Design systems",
      "Usability testing",
    ],
    isActive: true,
    order: 5,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: "svc-6",
    title: "Content Creation",
    slug: "content-creation",
    description:
      "Compelling copy, visuals, and video content that tells your brand story and drives action.",
    icon: "PenTool",
    features: [
      "Copywriting",
      "Photography & video",
      "Social content",
      "Email campaigns",
    ],
    isActive: true,
    order: 6,
    createdAt: now,
    updatedAt: now,
  },
];

export const mockProjects: Project[] = [
  {
    _id: "proj-1",
    title: "Nova Finance Platform",
    slug: "nova-finance-platform",
    description:
      "A complete rebrand and web platform for a fintech startup, resulting in 3x user sign-ups within the first quarter.",
    category: "Web Development",
    client: "Nova Finance",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
    images: [],
    featuredImage: undefined,
    liveUrl: "https://example.com",
    isFeatured: true,
    isPublished: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: "proj-2",
    title: "Bloom Wellness App",
    slug: "bloom-wellness-app",
    description:
      "A mindfulness and wellness mobile app with personalized journeys, meditation tracking, and community features.",
    category: "Mobile Apps",
    client: "Bloom Health",
    technologies: ["React Native", "Node.js", "MongoDB"],
    images: [],
    isFeatured: true,
    isPublished: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: "proj-3",
    title: "Vertex E-Commerce",
    slug: "vertex-ecommerce",
    description:
      "Premium e-commerce experience with custom product configurator and seamless checkout flow.",
    category: "E-Commerce",
    client: "Vertex Retail",
    technologies: ["Shopify", "React", "GraphQL"],
    images: [],
    isFeatured: true,
    isPublished: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: "proj-4",
    title: "Orbit SaaS Dashboard",
    slug: "orbit-saas-dashboard",
    description:
      "Enterprise analytics dashboard with real-time data visualization and team collaboration tools.",
    category: "Web Development",
    client: "Orbit Labs",
    technologies: ["React", "D3.js", "PostgreSQL"],
    images: [],
    isFeatured: false,
    isPublished: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: "proj-5",
    title: "Helix Brand Identity",
    slug: "helix-brand-identity",
    description:
      "Full brand identity system for a biotech company, from logo to marketing collateral.",
    category: "Branding",
    client: "Helix Bio",
    technologies: ["Figma", "Adobe Creative Suite"],
    images: [],
    isFeatured: false,
    isPublished: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: "proj-6",
    title: "Acme Marketing Campaign",
    slug: "acme-marketing-campaign",
    description:
      "Integrated digital marketing campaign that increased qualified leads by 240% in six months.",
    category: "Marketing",
    client: "Acme Corp",
    technologies: ["Google Ads", "Meta Ads", "HubSpot"],
    images: [],
    isFeatured: false,
    isPublished: true,
    createdAt: now,
    updatedAt: now,
  },
];

export const mockTestimonials: Testimonial[] = [
  {
    _id: "test-1",
    name: "Sarah Chen",
    role: "CEO",
    company: "Nova Finance",
    content:
      "TechSol Media transformed our digital presence completely. Their strategic approach and flawless execution exceeded every expectation.",
    rating: 5,
    isPublished: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: "test-2",
    name: "Marcus Williams",
    role: "Founder",
    company: "Bloom Health",
    content:
      "Working with TechSol felt like having an in-house team of world-class designers and developers. The app they built is stunning.",
    rating: 5,
    isPublished: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: "test-3",
    name: "Elena Rodriguez",
    role: "Marketing Director",
    company: "Vertex Retail",
    content:
      "Our e-commerce conversion rate doubled after the redesign. TechSol's attention to detail and user experience expertise is unmatched.",
    rating: 5,
    isPublished: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: "test-4",
    name: "James Park",
    role: "CTO",
    company: "Orbit Labs",
    content:
      "The dashboard they delivered handles millions of data points with ease. Professional, responsive, and always ahead of schedule.",
    rating: 5,
    isPublished: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: "test-5",
    name: "Priya Sharma",
    role: "VP Product",
    company: "Helix Bio",
    content:
      "From brand strategy to final deliverables, TechSol Media brought clarity and creativity to our rebrand. Highly recommended.",
    rating: 5,
    isPublished: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: "test-6",
    name: "David Okonkwo",
    role: "Head of Growth",
    company: "Acme Corp",
    content:
      "The marketing campaign TechSol ran for us generated more qualified leads in 3 months than the previous year combined.",
    rating: 5,
    isPublished: true,
    createdAt: now,
    updatedAt: now,
  },
];

export const mockBlogs: Blog[] = [
  {
    _id: "blog-1",
    title: "The Future of Digital Branding in 2026",
    slug: "future-of-digital-branding-2026",
    excerpt:
      "Explore how AI, immersive experiences, and authenticity are reshaping brand identity in the digital age.",
    content: `<p>Digital branding is evolving faster than ever. In 2026, successful brands are those that blend human creativity with intelligent automation while staying authentically connected to their audience.</p>
<p>Key trends include personalized brand experiences, motion-first identity systems, and sustainability as a core brand value. Companies that invest in cohesive omnichannel presence are seeing 2-3x higher customer loyalty.</p>
<p>At TechSol Media, we help brands navigate this landscape with strategy-led design that adapts and grows with your business.</p>`,
    tags: ["Branding", "Strategy", "Trends"],
    author: "TechSol Team",
    isPublished: true,
    publishedAt: "2026-06-15T10:00:00.000Z",
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: "blog-2",
    title: "Why Next.js is Our Framework of Choice",
    slug: "why-nextjs-framework-of-choice",
    excerpt:
      "A deep dive into why we build client projects with Next.js — performance, SEO, and developer experience.",
    content: `<p>Next.js has become the gold standard for modern web applications. Its App Router, server components, and built-in optimizations deliver exceptional performance out of the box.</p>
<p>For our clients, this means faster page loads, better SEO rankings, and a future-proof technology stack. We leverage Next.js for everything from marketing sites to complex SaaS platforms.</p>
<p>The result? Websites that load in under 2 seconds and convert visitors into customers.</p>`,
    tags: ["Development", "Next.js", "Performance"],
    author: "TechSol Team",
    isPublished: true,
    publishedAt: "2026-05-28T10:00:00.000Z",
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: "blog-3",
    title: "5 UX Principles That Drive Conversions",
    slug: "ux-principles-drive-conversions",
    excerpt:
      "Learn the user experience principles that consistently turn visitors into paying customers.",
    content: `<p>Great UX isn't just about aesthetics — it's about removing friction and guiding users toward action. Here are five principles we apply to every project.</p>
<p>1. Clarity over cleverness. 2. Progressive disclosure. 3. Consistent visual hierarchy. 4. Mobile-first design. 5. Data-informed iteration.</p>
<p>Brands that implement these principles see measurable improvements in engagement and conversion rates within weeks.</p>`,
    tags: ["UX", "Design", "Conversion"],
    author: "TechSol Team",
    isPublished: true,
    publishedAt: "2026-05-10T10:00:00.000Z",
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: "blog-4",
    title: "Building a Design System That Scales",
    slug: "design-system-that-scales",
    excerpt:
      "How to create a design system that grows with your product and keeps your team aligned.",
    content: `<p>A well-crafted design system is the backbone of scalable product development. It ensures consistency, speeds up delivery, and reduces design debt.</p>
<p>Start with foundational tokens — colors, typography, spacing — then build component libraries with clear documentation. Involve both designers and developers from day one.</p>
<p>We've helped dozens of companies build design systems that cut development time by 40%.</p>`,
    tags: ["Design Systems", "Product", "Scale"],
    author: "TechSol Team",
    isPublished: true,
    publishedAt: "2026-04-22T10:00:00.000Z",
    createdAt: now,
    updatedAt: now,
  },
];

export const mockTeam = [
  {
    name: "Arjun Mehta",
    role: "Founder & CEO",
    bio: "15+ years leading digital transformation for global brands.",
    initials: "AM",
  },
  {
    name: "Lisa Thompson",
    role: "Creative Director",
    bio: "Award-winning designer passionate about human-centered experiences.",
    initials: "LT",
  },
  {
    name: "Raj Patel",
    role: "Head of Engineering",
    bio: "Full-stack architect building scalable, performant web applications.",
    initials: "RP",
  },
  {
    name: "Maya Johnson",
    role: "Marketing Lead",
    bio: "Growth strategist driving measurable results for ambitious brands.",
    initials: "MJ",
  },
];

export const mockJobs = [
  {
    title: "Senior UI/UX Designer",
    department: "Design",
    location: "Remote / Mumbai",
    type: "Full-time",
    slug: "senior-ui-ux-designer",
  },
  {
    title: "Full-Stack Developer",
    department: "Engineering",
    location: "Remote / Bangalore",
    type: "Full-time",
    slug: "full-stack-developer",
  },
  {
    title: "Digital Marketing Specialist",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    slug: "digital-marketing-specialist",
  },
  {
    title: "Project Manager",
    department: "Operations",
    location: "Mumbai",
    type: "Full-time",
    slug: "project-manager",
  },
];

export const stats = [
  { label: "Projects Delivered", value: 150, suffix: "+" },
  { label: "Happy Clients", value: 80, suffix: "+" },
  { label: "Team Members", value: 25, suffix: "+" },
  { label: "Years of Excellence", value: 8, suffix: "" },
];

export const companyValues = [
  {
    title: "Innovation First",
    description:
      "We push boundaries and embrace new technologies to deliver cutting-edge solutions.",
    icon: "Lightbulb",
  },
  {
    title: "Client Partnership",
    description:
      "Your success is our success. We collaborate closely and communicate transparently.",
    icon: "Handshake",
  },
  {
    title: "Quality Craft",
    description:
      "Every pixel, line of code, and word of copy is crafted with meticulous attention.",
    icon: "Gem",
  },
  {
    title: "Impact Driven",
    description:
      "We measure success by the real business outcomes we deliver for our clients.",
    icon: "Target",
  },
];
