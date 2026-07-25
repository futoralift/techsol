import Contact, { IContact } from '../models/Contact';
import { ApiError } from '../utils/apiError';
import { sendContactNotificationEmail } from '../utils/email';
import { parsePagination } from '../utils/helpers';
import { ContactStatus, PaginatedResult } from '../types';

export interface CreateContactInput {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export const getAllContacts = async (
  page?: number,
  limit?: number,
  status?: ContactStatus
): Promise<PaginatedResult<IContact>> => {
  const { page: p, limit: l, skip } = parsePagination(page, limit);
  const filter = status ? { status } : {};

  const [data, total] = await Promise.all([
    Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(l),
    Contact.countDocuments(filter),
  ]);

  return {
    data,
    pagination: { page: p, limit: l, total, totalPages: Math.ceil(total / l) || 1 },
  };
};

export const getContactById = async (id: string): Promise<IContact> => {
  const contact = await Contact.findById(id);
  if (!contact) {
    throw ApiError.notFound('Contact message not found');
  }
  return contact;
};

export const createContact = async (input: CreateContactInput): Promise<IContact> => {
  const contact = await Contact.create(input);

  try {
    await sendContactNotificationEmail(input);
  } catch {
    // Contact is saved even if notification email fails
  }

  return contact;
};

export const updateContactStatus = async (
  id: string,
  status: ContactStatus
): Promise<IContact> => {
  const contact = await Contact.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  );

  if (!contact) {
    throw ApiError.notFound('Contact message not found');
  }
  return contact;
};

export const deleteContact = async (id: string): Promise<void> => {
  const contact = await Contact.findByIdAndDelete(id);
  if (!contact) {
    throw ApiError.notFound('Contact message not found');
  }
};
