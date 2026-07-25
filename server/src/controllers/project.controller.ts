import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { getParam } from '../utils/helpers';
import * as projectService from '../services/project.service';

export const getProjects = asyncHandler(async (req: Request, res: Response) => {
  const publishedOnly = req.query.published === 'true' || !req.user;
  const featuredOnly = req.query.featured === 'true';

  const result = await projectService.getAllProjects(
    Number(req.query.page),
    Number(req.query.limit),
    publishedOnly,
    featuredOnly
  );

  res.json({ success: true, ...result });
});

export const getProject = asyncHandler(async (req: Request, res: Response) => {
  const publishedOnly = !req.user;
  const project = await projectService.getProjectBySlug(getParam(req.params.slug), publishedOnly);
  res.json({ success: true, data: project });
});

export const getProjectById = asyncHandler(async (req: Request, res: Response) => {
  const project = await projectService.getProjectById(getParam(req.params.id));
  res.json({ success: true, data: project });
});

export const createProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await projectService.createProject(req.body);
  res.status(201).json({ success: true, data: project });
});

export const updateProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await projectService.updateProject(getParam(req.params.id), req.body);
  res.json({ success: true, data: project });
});

export const deleteProject = asyncHandler(async (req: Request, res: Response) => {
  await projectService.deleteProject(getParam(req.params.id));
  res.json({ success: true, message: 'Project deleted successfully' });
});
