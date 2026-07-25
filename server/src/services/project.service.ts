import Project, { IProject } from '../models/Project';
import { ApiError } from '../utils/apiError';
import { slugify, parsePagination } from '../utils/helpers';
import { PaginatedResult } from '../types';

export interface CreateProjectInput {
  title: string;
  description: string;
  category: string;
  client?: string;
  technologies?: string[];
  images?: string[];
  featuredImage?: string;
  liveUrl?: string;
  isFeatured?: boolean;
  isPublished?: boolean;
}

export interface UpdateProjectInput extends Partial<CreateProjectInput> {}

const ensureUniqueSlug = async (baseSlug: string, excludeId?: string): Promise<string> => {
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const query: Record<string, unknown> = { slug };
    if (excludeId) query._id = { $ne: excludeId };

    const existing = await Project.findOne(query);
    if (!existing) return slug;

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};

export const getAllProjects = async (
  page?: number,
  limit?: number,
  publishedOnly = false,
  featuredOnly = false
): Promise<PaginatedResult<IProject>> => {
  const { page: p, limit: l, skip } = parsePagination(page, limit);
  const filter: Record<string, unknown> = {};

  if (publishedOnly) filter.isPublished = true;
  if (featuredOnly) filter.isFeatured = true;

  const [data, total] = await Promise.all([
    Project.find(filter).sort({ createdAt: -1 }).skip(skip).limit(l),
    Project.countDocuments(filter),
  ]);

  return {
    data,
    pagination: { page: p, limit: l, total, totalPages: Math.ceil(total / l) || 1 },
  };
};

export const getProjectBySlug = async (slug: string, publishedOnly = false): Promise<IProject> => {
  const filter: Record<string, unknown> = { slug };
  if (publishedOnly) filter.isPublished = true;

  const project = await Project.findOne(filter);
  if (!project) {
    throw ApiError.notFound('Project not found');
  }
  return project;
};

export const getProjectById = async (id: string): Promise<IProject> => {
  const project = await Project.findById(id);
  if (!project) {
    throw ApiError.notFound('Project not found');
  }
  return project;
};

export const createProject = async (input: CreateProjectInput): Promise<IProject> => {
  const baseSlug = slugify(input.title);
  const slug = await ensureUniqueSlug(baseSlug);
  return Project.create({ ...input, slug });
};

export const updateProject = async (id: string, input: UpdateProjectInput): Promise<IProject> => {
  const project = await Project.findById(id);
  if (!project) {
    throw ApiError.notFound('Project not found');
  }

  if (input.title && input.title !== project.title) {
    const baseSlug = slugify(input.title);
    project.slug = await ensureUniqueSlug(baseSlug, id);
  }

  Object.assign(project, input);
  await project.save();
  return project;
};

export const deleteProject = async (id: string): Promise<void> => {
  const project = await Project.findByIdAndDelete(id);
  if (!project) {
    throw ApiError.notFound('Project not found');
  }
};
