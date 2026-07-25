import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { getParam } from '../utils/helpers';
import * as serviceService from '../services/service.service';

export const getServices = asyncHandler(async (req: Request, res: Response) => {
  const activeOnly = req.query.active === 'true' || !req.user;
  const result = await serviceService.getAllServices(
    Number(req.query.page),
    Number(req.query.limit),
    activeOnly
  );

  res.json({ success: true, ...result });
});

export const getService = asyncHandler(async (req: Request, res: Response) => {
  const activeOnly = !req.user;
  const service = await serviceService.getServiceBySlug(getParam(req.params.slug), activeOnly);

  res.json({ success: true, data: service });
});

export const getServiceById = asyncHandler(async (req: Request, res: Response) => {
  const service = await serviceService.getServiceById(getParam(req.params.id));
  res.json({ success: true, data: service });
});

export const createService = asyncHandler(async (req: Request, res: Response) => {
  const service = await serviceService.createService(req.body);
  res.status(201).json({ success: true, data: service });
});

export const updateService = asyncHandler(async (req: Request, res: Response) => {
  const service = await serviceService.updateService(getParam(req.params.id), req.body);
  res.json({ success: true, data: service });
});

export const deleteService = asyncHandler(async (req: Request, res: Response) => {
  await serviceService.deleteService(getParam(req.params.id));
  res.json({ success: true, message: 'Service deleted successfully' });
});
