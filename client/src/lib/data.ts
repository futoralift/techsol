import {
  blogsApi,
  projectsApi,
  servicesApi,
  testimonialsApi,
} from "@/lib/api";
import {
  mockBlogs,
  mockProjects,
  mockServices,
  mockTestimonials,
} from "@/lib/mock-data";
import type { Blog, Project, Service, Testimonial } from "@/types";

export async function getServices(): Promise<Service[]> {
  try {
    const res = await servicesApi.getAll({ limit: 100, sort: "order" });
    return res.data.data.data;
  } catch {
    return mockServices;
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const res = await servicesApi.getBySlug(slug);
    return res.data.data;
  } catch {
    return mockServices.find((s) => s.slug === slug) ?? null;
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const res = await projectsApi.getAll({ limit: 100 });
    return res.data.data.data;
  } catch {
    return mockProjects;
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const res = await projectsApi.getFeatured();
    return res.data.data;
  } catch {
    return mockProjects.filter((p) => p.isFeatured);
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const res = await projectsApi.getBySlug(slug);
    return res.data.data;
  } catch {
    return mockProjects.find((p) => p.slug === slug) ?? null;
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const res = await testimonialsApi.getAll({ limit: 100 });
    return res.data.data.data;
  } catch {
    return mockTestimonials;
  }
}

export async function getBlogs(): Promise<Blog[]> {
  try {
    const res = await blogsApi.getAll({ limit: 100 });
    return res.data.data.data;
  } catch {
    return mockBlogs;
  }
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const res = await blogsApi.getBySlug(slug);
    return res.data.data;
  } catch {
    return mockBlogs.find((b) => b.slug === slug) ?? null;
  }
}
