/**
 * Vercel Serverless Function to send launch notification via Resend
 *
 * This function sends a transactional email that arrives in the main inbox
 * instead of Promotions/Spam folder.
 */

import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getEmailTemplate } from './email-templates';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify secret key to prevent unauthorized access
  const { secret, subscribers } = req.body;

  if (secret !== process.env.NOTIFICATION_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!subscribers || !Array.isArray(subscribers) || subscribers.length === 0) {
    return res.status(400).json({ error: 'Subscribers array is required' });
  }

  // 🔗 IMPORTANTE: Cuando tu app esté en Play Store, actualiza este enlace:
  const APP_STORE_URL = 'https://play.google.com/store/apps/details?id=com.duomind';

  try {
    // Send emails to all subscribers with their language
    const emailPromises = subscribers.map((subscriber: { email: string; language?: string }) => {
      const template = getEmailTemplate(subscriber.language || 'es');

      return resend.emails.send({
        from: 'DuoMind <duomind@notifications.belsatecht.lat>',
        to: subscriber.email,
        subject: template.subject,
        html: template.getHTML(APP_STORE_URL),
      });
    });

    const results = await Promise.allSettled(emailPromises);

    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    return res.status(200).json({
      success: true,
      message: `Notifications sent successfully`,
      stats: {
        total: subscribers.length,
        successful,
        failed,
      },
    });

  } catch (error) {
    console.error('Error sending notifications:', error);
    return res.status(500).json({
      error: 'Failed to send notifications',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
