import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { getParam } from '../utils/helpers';
import * as testimonialService from '../services/testimonial.service';

export const getTestimonials = asyncHandler(async (req: Request, res: Response) => {
  const publishedOnly = req.query.published === 'true' || !req.user;
  const result = await testimonialService.getAllTestimonials(
    Number(req.query.page),
    Number(req.query.limit),
    publishedOnly
  );

  res.json({ success: true, ...result });
});

export const getTestimonial = asyncHandler(async (req: Request, res: Response) => {
  const publishedOnly = !req.user;
  const testimonial = await testimonialService.getTestimonialById(getParam(req.params.id), publishedOnly);
  res.json({ success: true, data: testimonial });
});

export const createTestimonial = asyncHandler(async (req: Request, res: Response) => {
  const testimonial = await testimonialService.createTestimonial(req.body);
  res.status(201).json({ success: true, data: testimonial });
});

export const updateTestimonial = asyncHandler(async (req: Request, res: Response) => {
  const testimonial = await testimonialService.updateTestimonial(getParam(req.params.id), req.body);
  res.json({ success: true, data: testimonial });
});

export const deleteTestimonial = asyncHandler(async (req: Request, res: Response) => {
  await testimonialService.deleteTestimonial(getParam(req.params.id));
  res.json({ success: true, message: 'Testimonial deleted successfully' });
});
