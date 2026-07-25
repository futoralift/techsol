import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { getParam } from '../utils/helpers';
import * as blogService from '../services/blog.service';

export const getBlogs = asyncHandler(async (req: Request, res: Response) => {
  const publishedOnly = req.query.published === 'true' || !req.user;
  const result = await blogService.getAllBlogs(
    Number(req.query.page),
    Number(req.query.limit),
    publishedOnly,
    req.query.tag as string | undefined
  );

  res.json({ success: true, ...result });
});

export const getBlog = asyncHandler(async (req: Request, res: Response) => {
  const publishedOnly = !req.user;
  const blog = await blogService.getBlogBySlug(getParam(req.params.slug), publishedOnly);
  res.json({ success: true, data: blog });
});

export const getBlogById = asyncHandler(async (req: Request, res: Response) => {
  const blog = await blogService.getBlogById(getParam(req.params.id));
  res.json({ success: true, data: blog });
});

export const createBlog = asyncHandler(async (req: Request, res: Response) => {
  const blog = await blogService.createBlog({
    ...req.body,
    author: req.user!.userId,
  });
  res.status(201).json({ success: true, data: blog });
});

export const updateBlog = asyncHandler(async (req: Request, res: Response) => {
  const blog = await blogService.updateBlog(getParam(req.params.id), req.body);
  res.json({ success: true, data: blog });
});

export const deleteBlog = asyncHandler(async (req: Request, res: Response) => {
  await blogService.deleteBlog(getParam(req.params.id));
  res.json({ success: true, message: 'Blog post deleted successfully' });
});
