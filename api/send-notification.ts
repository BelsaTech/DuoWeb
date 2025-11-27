/**
 * Vercel Serverless Function to send launch notification via Resend
 *
 * This function sends a transactional email that arrives in the main inbox
 * instead of Promotions/Spam folder.
 */

import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

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
  const { secret, emails } = req.body;

  if (secret !== process.env.NOTIFICATION_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!emails || !Array.isArray(emails) || emails.length === 0) {
    return res.status(400).json({ error: 'Emails array is required' });
  }

  // 🔗 IMPORTANTE: Cuando tu app esté en Play Store, actualiza este enlace:
  const APP_STORE_URL = 'https://play.google.com/store/apps/details?id=com.duomind';

  try {
    // Send emails to all subscribers
    const emailPromises = emails.map((email: string) =>
      resend.emails.send({
        from: 'DuoMind <duomind@notifications.belsatecht.lat>', // Tu dominio verificado en Resend
        to: email,
        subject: 'Tu aplicación DuoMind está lista',
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0; padding: 20px;">

  <p>Hola,</p>

  <p>Te escribimos para informarte que <strong>DuoMind ya está disponible en Google Play Store</strong>.</p>

  <p>Como te registraste para recibir una notificación cuando la aplicación estuviera lista, aquí está el enlace de descarga:</p>

  <p><a href="${APP_STORE_URL}" style="color: #667eea; text-decoration: none;">${APP_STORE_URL}</a></p>

  <p>DuoMind te permite chatear con múltiples modelos de IA simultáneamente y comparar sus respuestas.</p>

  <p>Gracias por tu interés,<br>
  El equipo de DuoMind</p>

  <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

  <p style="font-size: 12px; color: #999;">
    Recibiste este email porque te registraste en duomindbelsa.vercel.app para ser notificado cuando DuoMind estuviera disponible.
  </p>

</body>
</html>
        `,
      })
    );

    const results = await Promise.allSettled(emailPromises);

    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    return res.status(200).json({
      success: true,
      message: `Notifications sent successfully`,
      stats: {
        total: emails.length,
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
