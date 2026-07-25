import apiClient from "./axios";
import type {
  AnalyticsOverview,
  ApiResponse,
  AuthResponse,
  Blog,
  Contact,
  ContactFormData,
  ForgotPasswordData,
  LoginCredentials,
  Media,
  Newsletter,
  NewsletterSubscribeData,
  PaginatedResult,
  PaginationQuery,
  Project,
  RegisterData,
  ResetPasswordData,
  Service,
  Testimonial,
  User,
} from "@/types";

type QueryParams = PaginationQuery & Record<string, string | number | boolean | undefined>;

const buildParams = (params?: QueryParams) => {
  if (!params) return undefined;
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined)
  );
};

// Auth
export const authApi = {
  register: (data: RegisterData) =>
    apiClient.post<ApiResponse<AuthResponse>>("/auth/register", data),
  login: (data: LoginCredentials) =>
    apiClient.post<ApiResponse<AuthResponse>>("/auth/login", data),
  logout: () => apiClient.post<ApiResponse<null>>("/auth/logout"),
  refresh: () => apiClient.post<ApiResponse<null>>("/auth/refresh"),
  me: () => apiClient.get<ApiResponse<User>>("/auth/me"),
  forgotPassword: (data: ForgotPasswordData) =>
    apiClient.post<ApiResponse<null>>("/auth/forgot-password", data),
  resetPassword: (token: string, data: ResetPasswordData) =>
    apiClient.post<ApiResponse<null>>(`/auth/reset-password/${token}`, data),
  verifyEmail: (token: string) =>
    apiClient.get<ApiResponse<null>>(`/auth/verify-email/${token}`),
};

// Services
export const servicesApi = {
  getAll: (params?: QueryParams) =>
    apiClient.get<ApiResponse<PaginatedResult<Service>>>("/services", {
      params: buildParams(params),
    }),
  getBySlug: (slug: string) =>
    apiClient.get<ApiResponse<Service>>(`/services/${slug}`),
  create: (data: Partial<Service>) =>
    apiClient.post<ApiResponse<Service>>("/services", data),
  update: (id: string, data: Partial<Service>) =>
    apiClient.put<ApiResponse<Service>>(`/services/${id}`, data),
  delete: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/services/${id}`),
};

// Projects
export const projectsApi = {
  getAll: (params?: QueryParams) =>
    apiClient.get<ApiResponse<PaginatedResult<Project>>>("/projects", {
      params: buildParams(params),
    }),
  getFeatured: () =>
    apiClient.get<ApiResponse<Project[]>>("/projects/featured"),
  getBySlug: (slug: string) =>
    apiClient.get<ApiResponse<Project>>(`/projects/${slug}`),
  create: (data: Partial<Project>) =>
    apiClient.post<ApiResponse<Project>>("/projects", data),
  update: (id: string, data: Partial<Project>) =>
    apiClient.put<ApiResponse<Project>>(`/projects/${id}`, data),
  delete: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/projects/${id}`),
};

// Testimonials
export const testimonialsApi = {
  getAll: (params?: QueryParams) =>
    apiClient.get<ApiResponse<PaginatedResult<Testimonial>>>("/testimonials", {
      params: buildParams(params),
    }),
  getById: (id: string) =>
    apiClient.get<ApiResponse<Testimonial>>(`/testimonials/${id}`),
  create: (data: Partial<Testimonial>) =>
    apiClient.post<ApiResponse<Testimonial>>("/testimonials", data),
  update: (id: string, data: Partial<Testimonial>) =>
    apiClient.put<ApiResponse<Testimonial>>(`/testimonials/${id}`, data),
  delete: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/testimonials/${id}`),
};

// Blogs
export const blogsApi = {
  getAll: (params?: QueryParams) =>
    apiClient.get<ApiResponse<PaginatedResult<Blog>>>("/blogs", {
      params: buildParams(params),
    }),
  getBySlug: (slug: string) =>
    apiClient.get<ApiResponse<Blog>>(`/blogs/${slug}`),
  create: (data: Partial<Blog>) =>
    apiClient.post<ApiResponse<Blog>>("/blogs", data),
  update: (id: string, data: Partial<Blog>) =>
    apiClient.put<ApiResponse<Blog>>(`/blogs/${id}`, data),
  delete: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/blogs/${id}`),
};

// Contact
export const contactApi = {
  submit: (data: ContactFormData) =>
    apiClient.post<ApiResponse<Contact>>("/contact", data),
  getAll: (params?: QueryParams) =>
    apiClient.get<ApiResponse<PaginatedResult<Contact>>>("/contact", {
      params: buildParams(params),
    }),
  getById: (id: string) =>
    apiClient.get<ApiResponse<Contact>>(`/contact/${id}`),
  updateStatus: (id: string, status: Contact["status"]) =>
    apiClient.patch<ApiResponse<Contact>>(`/contact/${id}`, { status }),
  delete: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/contact/${id}`),
};

// Newsletter
export const newsletterApi = {
  subscribe: (data: NewsletterSubscribeData) =>
    apiClient.post<ApiResponse<Newsletter>>("/newsletter/subscribe", data),
  unsubscribe: (email: string) =>
    apiClient.post<ApiResponse<null>>("/newsletter/unsubscribe", { email }),
  getAll: (params?: QueryParams) =>
    apiClient.get<ApiResponse<PaginatedResult<Newsletter>>>("/newsletter", {
      params: buildParams(params),
    }),
};

// Media
export const mediaApi = {
  getAll: (params?: QueryParams) =>
    apiClient.get<ApiResponse<PaginatedResult<Media>>>("/media", {
      params: buildParams(params),
    }),
  upload: (formData: FormData) =>
    apiClient.post<ApiResponse<Media>>("/media/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/media/${id}`),
};

// Users (admin)
export const usersApi = {
  getAll: (params?: QueryParams) =>
    apiClient.get<ApiResponse<PaginatedResult<User>>>("/users", {
      params: buildParams(params),
    }),
  getById: (id: string) =>
    apiClient.get<ApiResponse<User>>(`/users/${id}`),
  update: (id: string, data: Partial<User>) =>
    apiClient.put<ApiResponse<User>>(`/users/${id}`, data),
  delete: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/users/${id}`),
};

// Analytics (admin)
export const analyticsApi = {
  getOverview: () =>
    apiClient.get<ApiResponse<AnalyticsOverview>>("/analytics/overview"),
};
