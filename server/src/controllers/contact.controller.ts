import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { getParam } from '../utils/helpers';
import * as contactService from '../services/contact.service';
import { ContactStatus } from '../types';

export const getContacts = asyncHandler(async (req: Request, res: Response) => {
  const result = await contactService.getAllContacts(
    Number(req.query.page),
    Number(req.query.limit),
    req.query.status as ContactStatus | undefined
  );

  res.json({ success: true, ...result });
});

export const getContact = asyncHandler(async (req: Request, res: Response) => {
  const contact = await contactService.getContactById(getParam(req.params.id));
  res.json({ success: true, data: contact });
});

export const createContact = asyncHandler(async (req: Request, res: Response) => {
  const contact = await contactService.createContact(req.body);
  res.status(201).json({
    success: true,
    message: 'Your message has been sent successfully',
    data: contact,
  });
});

export const updateContactStatus = asyncHandler(async (req: Request, res: Response) => {
  const contact = await contactService.updateContactStatus(getParam(req.params.id), req.body.status);
  res.json({ success: true, data: contact });
});

export const deleteContact = asyncHandler(async (req: Request, res: Response) => {
  await contactService.deleteContact(getParam(req.params.id));
  res.json({ success: true, message: 'Contact message deleted successfully' });
});
