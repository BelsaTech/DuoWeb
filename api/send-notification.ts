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
        from: 'DuoMind <hola@notifications.belsatecht.lat>', // Tu dominio verificado en Resend
        to: email,
        subject: 'DuoMind ya está disponible',
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      text-align: center;
      padding: 40px 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 10px;
      margin-bottom: 30px;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
    }
    .content {
      padding: 20px;
      background: #f9f9f9;
      border-radius: 10px;
      margin-bottom: 20px;
    }
    .button {
      display: inline-block;
      padding: 15px 30px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white !important;
      text-decoration: none;
      border-radius: 8px;
      font-weight: bold;
      margin: 20px 0;
      text-align: center;
    }
    .features {
      list-style: none;
      padding: 0;
    }
    .features li {
      padding: 10px 0;
      padding-left: 30px;
      position: relative;
    }
    .features li:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #667eea;
      font-weight: bold;
      font-size: 20px;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #666;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🎉 ¡DuoMind ya está disponible!</h1>
  </div>

  <div class="content">
    <p>Hola,</p>

    <p><strong>¡Tenemos grandes noticias!</strong> 🚀</p>

    <p>DuoMind, la aplicación que te registraste para probar, ya está oficialmente disponible en Google Play Store.</p>

    <div style="text-align: center;">
      <a href="${APP_STORE_URL}" class="button">📱 Descargar ahora</a>
    </div>

    <p><strong>¿Qué puedes hacer con DuoMind?</strong></p>
    <ul class="features">
      <li>Chatea con múltiples modelos de IA simultáneamente</li>
      <li>Compara respuestas de diferentes asistentes</li>
      <li>Obtén las mejores respuestas para tus preguntas</li>
      <li>Interfaz intuitiva y fácil de usar</li>
    </ul>

    <p>Descárgala ahora y sé de los primeros en experimentar el futuro de los asistentes conversacionales con IA.</p>

    <p><strong>¡Gracias por tu paciencia y apoyo!</strong></p>

    <p>El equipo de DuoMind</p>
  </div>

  <div class="footer">
    <p>Recibiste este email porque te registraste en <a href="https://duomind.app">duomind.app</a> para ser notificado cuando la aplicación estuviera disponible.</p>
    <p>Si ya no deseas recibir estos emails, puedes ignorar este mensaje.</p>
  </div>
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
