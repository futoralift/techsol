import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { getParam } from '../utils/helpers';
import * as newsletterService from '../services/newsletter.service';

export const subscribe = asyncHandler(async (req: Request, res: Response) => {
  const subscriber = await newsletterService.subscribe(req.body.email);
  res.status(201).json({
    success: true,
    message: 'Successfully subscribed to newsletter',
    data: subscriber,
  });
});

export const unsubscribe = asyncHandler(async (req: Request, res: Response) => {
  const subscriber = await newsletterService.unsubscribe(req.body.email);
  res.json({
    success: true,
    message: 'Successfully unsubscribed from newsletter',
    data: subscriber,
  });
});

export const getSubscribers = asyncHandler(async (req: Request, res: Response) => {
  const result = await newsletterService.getAllSubscribers(
    Number(req.query.page),
    Number(req.query.limit),
    req.query.active !== 'false'
  );

  res.json({ success: true, ...result });
});

export const deleteSubscriber = asyncHandler(async (req: Request, res: Response) => {
  await newsletterService.deleteSubscriber(getParam(req.params.id));
  res.json({ success: true, message: 'Subscriber deleted successfully' });
});
