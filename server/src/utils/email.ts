import nodemailer from 'nodemailer';
import { env } from '../config/env';
import logger from './logger';

const transporter = nodemailer.createTransport({
  host: env.smtp.host,
  port: env.smtp.port,
  secure: env.smtp.port === 465,
  auth: {
    user: env.smtp.user,
    pass: env.smtp.pass,
  },
});

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export const sendEmail = async (options: SendEmailOptions): Promise<void> => {
  try {
    await transporter.sendMail({
      from: env.smtp.from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });
    logger.info(`Email sent to ${options.to}`);
  } catch (error) {
    logger.error('Failed to send email', { error, to: options.to });
    throw error;
  }
};

export const sendVerificationEmail = async (
  email: string,
  name: string,
  token: string
): Promise<void> => {
  const verifyUrl = `${env.clientUrl}/verify-email?token=${token}`;

  await sendEmail({
    to: email,
    subject: 'Verify your TechSol Media account',
    html: `
      <h2>Welcome, ${name}!</h2>
      <p>Please verify your email address by clicking the link below:</p>
      <a href="${verifyUrl}">Verify Email</a>
      <p>This link expires in 24 hours.</p>
      <p>If you did not create an account, please ignore this email.</p>
    `,
    text: `Welcome, ${name}! Verify your email: ${verifyUrl}`,
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  name: string,
  token: string
): Promise<void> => {
  const resetUrl = `${env.clientUrl}/reset-password?token=${token}`;

  await sendEmail({
    to: email,
    subject: 'Reset your TechSol Media password',
    html: `
      <h2>Hello, ${name}</h2>
      <p>You requested a password reset. Click the link below to set a new password:</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>This link expires in 1 hour.</p>
      <p>If you did not request this, please ignore this email.</p>
    `,
    text: `Reset your password: ${resetUrl}`,
  });
};

export const sendContactNotificationEmail = async (
  contact: { name: string; email: string; subject: string; message: string }
): Promise<void> => {
  await sendEmail({
    to: env.smtp.user,
    subject: `New contact form submission: ${contact.subject}`,
    html: `
      <h2>New Contact Message</h2>
      <p><strong>From:</strong> ${contact.name} (${contact.email})</p>
      <p><strong>Subject:</strong> ${contact.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${contact.message}</p>
    `,
  });
};
