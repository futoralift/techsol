import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as analyticsService from '../services/analytics.service';

export const getOverview = asyncHandler(async (_req: Request, res: Response) => {
  const overview = await analyticsService.getAnalyticsOverview();
  res.json({ success: true, data: overview });
});

export const getRecentActivity = asyncHandler(async (req: Request, res: Response) => {
  const limit = Number(req.query.limit) || 5;

  const [recentContacts, recentUsers] = await Promise.all([
    analyticsService.getRecentContacts(limit),
    analyticsService.getRecentUsers(limit),
  ]);

  res.json({
    success: true,
    data: { recentContacts, recentUsers },
  });
});
