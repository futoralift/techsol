import Blog, { IBlog } from '../models/Blog';
import { ApiError } from '../utils/apiError';
import { slugify, parsePagination } from '../utils/helpers';
import { PaginatedResult } from '../types';

export interface CreateBlogInput {
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: string;
  tags?: string[];
  isPublished?: boolean;
}

export interface UpdateBlogInput extends Partial<Omit<CreateBlogInput, 'author'>> {}

const ensureUniqueSlug = async (baseSlug: string, excludeId?: string): Promise<string> => {
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const query: Record<string, unknown> = { slug };
    if (excludeId) query._id = { $ne: excludeId };

    const existing = await Blog.findOne(query);
    if (!existing) return slug;

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};

export const getAllBlogs = async (
  page?: number,
  limit?: number,
  publishedOnly = false,
  tag?: string
): Promise<PaginatedResult<IBlog>> => {
  const { page: p, limit: l, skip } = parsePagination(page, limit);
  const filter: Record<string, unknown> = {};

  if (publishedOnly) filter.isPublished = true;
  if (tag) filter.tags = tag;

  const [data, total] = await Promise.all([
    Blog.find(filter)
      .populate('author', 'name email')
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(l),
    Blog.countDocuments(filter),
  ]);

  return {
    data,
    pagination: { page: p, limit: l, total, totalPages: Math.ceil(total / l) || 1 },
  };
};

export const getBlogBySlug = async (slug: string, publishedOnly = false): Promise<IBlog> => {
  const filter: Record<string, unknown> = { slug };
  if (publishedOnly) filter.isPublished = true;

  const blog = await Blog.findOne(filter).populate('author', 'name email');
  if (!blog) {
    throw ApiError.notFound('Blog post not found');
  }
  return blog;
};

export const getBlogById = async (id: string): Promise<IBlog> => {
  const blog = await Blog.findById(id).populate('author', 'name email');
  if (!blog) {
    throw ApiError.notFound('Blog post not found');
  }
  return blog;
};

export const createBlog = async (input: CreateBlogInput): Promise<IBlog> => {
  const baseSlug = slugify(input.title);
  const slug = await ensureUniqueSlug(baseSlug);

  const blogData: Record<string, unknown> = { ...input, slug };

  if (input.isPublished) {
    blogData.publishedAt = new Date();
  }

  const blog = await Blog.create(blogData);
  return blog.populate('author', 'name email');
};

export const updateBlog = async (id: string, input: UpdateBlogInput): Promise<IBlog> => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw ApiError.notFound('Blog post not found');
  }

  if (input.title && input.title !== blog.title) {
    const baseSlug = slugify(input.title);
    blog.slug = await ensureUniqueSlug(baseSlug, id);
  }

  if (input.isPublished === true && !blog.isPublished) {
    blog.publishedAt = new Date();
  }

  if (input.isPublished === false) {
    blog.publishedAt = undefined;
  }

  Object.assign(blog, input);
  await blog.save();
  return blog.populate('author', 'name email');
};

export const deleteBlog = async (id: string): Promise<void> => {
  const blog = await Blog.findByIdAndDelete(id);
  if (!blog) {
    throw ApiError.notFound('Blog post not found');
  }
};
