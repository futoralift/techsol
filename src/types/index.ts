export type UserRole = "admin" | "client";

export type ContactStatus = "new" | "read" | "replied";

export interface BaseDocument {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface User extends BaseDocument {
  name: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
}

export interface Service extends BaseDocument {
  title: string;
  slug: string;
  description: string;
  icon: string;
  features: string[];
  image?: string;
  isActive: boolean;
  order: number;
}

export interface Project extends BaseDocument {
  title: string;
  slug: string;
  description: string;
  category: string;
  client?: string;
  technologies: string[];
  images: string[];
  featuredImage?: string;
  liveUrl?: string;
  isFeatured: boolean;
  isPublished: boolean;
}

export interface Testimonial extends BaseDocument {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
  isPublished: boolean;
}

export interface Blog extends BaseDocument {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: User | string;
  tags: string[];
  isPublished: boolean;
  publishedAt?: string;
}

export interface Contact extends BaseDocument {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: ContactStatus;
}

export interface Newsletter extends BaseDocument {
  email: string;
  isActive: boolean;
  subscribedAt: string;
}

export interface Media extends BaseDocument {
  publicId: string;
  url: string;
  filename: string;
  mimetype: string;
  size: number;
  uploadedBy: User | string;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface AuthResponse {
  user: User;
}

export interface AnalyticsOverview {
  users: { total: number; admins: number; clients: number; verified: number };
  services: { total: number; active: number };
  projects: { total: number; published: number; featured: number };
  testimonials: { total: number; published: number };
  blogs: { total: number; published: number };
  contacts: { total: number; new: number; read: number; replied: number };
  newsletter: { total: number; active: number };
  media: { total: number };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  password: string;
  confirmPassword: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface NewsletterSubscribeData {
  email: string;
}
