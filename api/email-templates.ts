/**
 * Email templates in multiple languages
 */

export interface EmailTemplate {
  subject: string;
  getHTML: (playStoreUrl: string) => string;
}

export const emailTemplates: Record<string, EmailTemplate> = {
  // Spanish template
  es: {
    subject: 'Tu aplicación DuoMind está lista',
    getHTML: (playStoreUrl: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0; padding: 20px;">

  <p>Hola,</p>

  <p>Te escribimos para informarte que <strong>DuoMind ya está disponible en Google Play Store</strong>.</p>

  <p>Como te registraste para recibir una notificación cuando la aplicación estuviera lista, aquí está el enlace de descarga:</p>

  <p><a href="${playStoreUrl}" style="color: #667eea; text-decoration: none;">${playStoreUrl}</a></p>

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
  },

  // English template
  en: {
    subject: 'Your DuoMind app is ready',
    getHTML: (playStoreUrl: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0; padding: 20px;">

  <p>Hello,</p>

  <p>We're writing to let you know that <strong>DuoMind is now available on Google Play Store</strong>.</p>

  <p>Since you signed up to be notified when the app was ready, here's the download link:</p>

  <p><a href="${playStoreUrl}" style="color: #667eea; text-decoration: none;">${playStoreUrl}</a></p>

  <p>DuoMind allows you to chat with multiple AI models simultaneously and compare their responses.</p>

  <p>Thank you for your interest,<br>
  The DuoMind Team</p>

  <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

  <p style="font-size: 12px; color: #999;">
    You received this email because you signed up at duomindbelsa.vercel.app to be notified when DuoMind was available.
  </p>

</body>
</html>
    `,
  },

  // Portuguese template
  pt: {
    subject: 'Seu aplicativo DuoMind está pronto',
    getHTML: (playStoreUrl: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0; padding: 20px;">

  <p>Olá,</p>

  <p>Estamos escrevendo para informá-lo de que <strong>DuoMind já está disponível na Google Play Store</strong>.</p>

  <p>Como você se cadastrou para ser notificado quando o aplicativo estivesse pronto, aqui está o link de download:</p>

  <p><a href="${playStoreUrl}" style="color: #667eea; text-decoration: none;">${playStoreUrl}</a></p>

  <p>DuoMind permite que você converse com vários modelos de IA simultaneamente e compare suas respostas.</p>

  <p>Obrigado pelo seu interesse,<br>
  A equipe DuoMind</p>

  <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

  <p style="font-size: 12px; color: #999;">
    Você recebeu este e-mail porque se inscreveu em duomindbelsa.vercel.app para ser notificado quando o DuoMind estivesse disponível.
  </p>

</body>
</html>
    `,
  },
};

/**
 * Get email template by language code
 * Falls back to English if language not found
 */
export function getEmailTemplate(languageCode: string = 'en'): EmailTemplate {
  return emailTemplates[languageCode] || emailTemplates.en;
}
