/**
 * Vercel Serverless Function to send launch notification via Resend
 *
 * This function sends a transactional email that arrives in the main inbox
 * instead of Promotions/Spam folder.
 */

import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = new Resend(process.env.RESEND_API_KEY);

// Email templates in multiple languages
const emailTemplates: Record<string, { subject: string; getHTML: (url: string) => string }> = {
  es: {
    subject: '¡DuoMind ya está disponible en Play Store! 💙',
    getHTML: (playStoreUrl: string) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0; padding: 20px;">
  <p>Hola,</p>
  <p>¡Buenas noticias! DuoMind ya está disponible oficialmente en Google Play y puedes descargarla desde este momento.</p>
  <p>Gracias por haberte registrado para recibir este aviso. Tu apoyo significó mucho durante el proceso, y hoy por fin puedo compartirte el lanzamiento.</p>
  <p>👉 <strong>Descargar DuoMind en Play Store:</strong><br>
  <a href="${playStoreUrl}" style="color: #667eea; text-decoration: none;">${playStoreUrl}</a></p>
  <p>Espero que disfrutes la experiencia.</p>
  <p>Saludos,<br>El equipo de DuoMind</p>
  <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
  <p style="font-size: 12px; color: #999;">Recibiste este email porque te registraste en duomindbelsa.vercel.app para ser notificado cuando DuoMind estuviera disponible.</p>
</body>
</html>
    `,
  },
  en: {
    subject: 'Your DuoMind app is ready',
    getHTML: (playStoreUrl: string) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0; padding: 20px;">
  <p>Hello,</p>
  <p>We're writing to let you know that <strong>DuoMind is now available on Google Play Store</strong>.</p>
  <p>Since you signed up to be notified when the app was ready, here's the download link:</p>
  <p><a href="${playStoreUrl}" style="color: #667eea; text-decoration: none;">${playStoreUrl}</a></p>
  <p>DuoMind allows you to chat with multiple AI models simultaneously and compare their responses.</p>
  <p>Thank you for your interest,<br>The DuoMind Team</p>
  <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
  <p style="font-size: 12px; color: #999;">You received this email because you signed up at duomindbelsa.vercel.app to be notified when DuoMind was available.</p>
</body>
</html>
    `,
  },
  pt: {
    subject: 'Seu aplicativo DuoMind está pronto',
    getHTML: (playStoreUrl: string) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0; padding: 20px;">
  <p>Olá,</p>
  <p>Estamos escrevendo para informá-lo de que <strong>DuoMind já está disponível na Google Play Store</strong>.</p>
  <p>Como você se cadastrou para ser notificado quando o aplicativo estivesse pronto, aqui está o link de download:</p>
  <p><a href="${playStoreUrl}" style="color: #667eea; text-decoration: none;">${playStoreUrl}</a></p>
  <p>DuoMind permite que você converse com vários modelos de IA simultaneamente e compare suas respostas.</p>
  <p>Obrigado pelo seu interesse,<br>A equipe DuoMind</p>
  <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
  <p style="font-size: 12px; color: #999;">Você recebeu este e-mail porque se inscreveu em duomindbelsa.vercel.app para ser notificado quando o DuoMind estivesse disponível.</p>
</body>
</html>
    `,
  },
};

function getEmailTemplate(languageCode: string = 'es') {
  return emailTemplates[languageCode] || emailTemplates.es;
}

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
